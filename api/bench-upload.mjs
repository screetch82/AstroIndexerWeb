import crypto from "node:crypto";

// Sibling of api/contact.mjs: receives an anonymized AstroIndexer benchmark
// bundle from the desktop app and stores it in a PRIVATE Backblaze B2 bucket as
// customer/<install_id>/<run_id>.json. The B2 credential lives ONLY in Vercel
// env vars (B2_KEY_ID / B2_APPLICATION_KEY / B2_BUCKET_ID) - never in the app
// binary. CI later pulls these objects into the warehouse as lane='customer'.
//
// Privacy contract: ONLY ALLOWED_KEYS are persisted, rebuilt field-by-field, so
// no hostname / path / filename can ever be stored even if the app sends extra.
// Anti-abuse: schema_version + size cap + idempotent object key (re-posts
// overwrite the same key, so spam cannot multiply warehouse rows).

const DEFAULT_ALLOWED_ORIGINS = [
    "https://astroindexer.com",
    "https://www.astroindexer.com",
    "https://screetch82.github.io",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
];

const SCHEMA_VERSION = 1;
const MAX_BODY_BYTES = 256 * 1024;

// The ONLY fields persisted. Mirrors the app-side scrubber allowlist.
const ALLOWED_KEYS = [
    "schema_version", "install_id", "run_id", "timestamp", "app_version", "execution_mode",
    "os_name", "os_version", "cpu_model", "cores_physical", "cores_logical", "memory_gb",
    "gpu_backend", "total_files", "files_per_second", "avg_time_per_file", "total_time_seconds",
    "workers_used", "native_dll_version", "avg_fwhm", "avg_stars_per_sec", "total_stars",
    "peak_cpu_percent", "avg_cpu_percent", "peak_memory_gb", "stage_means",
];

export async function OPTIONS(request) {
    const origin = request.headers.get("Origin") || "";
    return new Response(null, {
        status: isAllowedOrigin(origin) ? 204 : 204,
        headers: corsHeaders(origin),
    });
}

export async function GET(request) {
    const origin = request.headers.get("Origin") || "";
    return jsonResponse({ ok: false, error: "Method not allowed." }, 405, origin, {
        Allow: "POST, OPTIONS",
    });
}

export async function POST(request) {
    const origin = request.headers.get("Origin") || "";

    // Browser callers (if any) must be allow-listed; the desktop app sends no Origin.
    if (origin && !isAllowedOrigin(origin)) {
        return jsonResponse({ ok: false, error: "Origin not allowed." }, 403, origin);
    }

    const contentType = request.headers.get("Content-Type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
        return jsonResponse({ ok: false, error: "JSON body required." }, 415, origin);
    }

    const declaredLength = Number(request.headers.get("Content-Length") || "0");
    if (declaredLength && declaredLength > MAX_BODY_BYTES) {
        return jsonResponse({ ok: false, error: "Payload too large." }, 413, origin);
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
        return jsonResponse({ ok: false, error: "Payload too large." }, 413, origin);
    }

    let payload;
    try {
        payload = JSON.parse(raw);
    } catch (error) {
        return jsonResponse({ ok: false, error: "Invalid JSON body." }, 400, origin);
    }

    if (!payload || payload.schema_version !== SCHEMA_VERSION) {
        return jsonResponse({ ok: false, error: "Unsupported schema_version." }, 400, origin);
    }

    const installId = sanitizeId(payload.install_id);
    const runId = sanitizeId(payload.run_id);
    if (!installId || !runId) {
        return jsonResponse({ ok: false, error: "install_id and run_id are required." }, 400, origin);
    }

    // Defence-in-depth: persist ONLY allow-listed keys, rebuilt field-by-field.
    const clean = {};
    for (const key of ALLOWED_KEYS) {
        if (Object.prototype.hasOwnProperty.call(payload, key)) {
            clean[key] = payload[key];
        }
    }

    const keyId = process.env.B2_KEY_ID;
    const appKey = process.env.B2_APPLICATION_KEY;
    const bucketId = process.env.B2_BUCKET_ID;
    if (!keyId || !appKey || !bucketId) {
        console.error("Missing B2 env vars (B2_KEY_ID / B2_APPLICATION_KEY / B2_BUCKET_ID).");
        return jsonResponse({ ok: false, error: "Benchmark upload is not configured." }, 500, origin);
    }

    const objectKey = `customer/${installId}/${runId}.json`;
    try {
        await uploadToB2(objectKey, JSON.stringify(clean), { keyId, appKey, bucketId });
        return jsonResponse({ ok: true }, 200, origin);
    } catch (error) {
        console.error("B2 benchmark upload failed.", error);
        return jsonResponse({ ok: false, error: "Unable to store benchmark right now." }, 502, origin);
    }
}

// --- Backblaze B2 native API (authorize -> get_upload_url -> upload), no deps ---

async function uploadToB2(objectKey, bodyString, creds) {
    const basic = Buffer.from(`${creds.keyId}:${creds.appKey}`).toString("base64");
    const authResp = await fetch("https://api.backblazeb2.com/b2api/v2/b2_authorize_account", {
        headers: { Authorization: `Basic ${basic}` },
    });
    if (!authResp.ok) {
        throw new Error(`b2_authorize_account ${authResp.status}`);
    }
    const auth = await authResp.json();

    const uploadUrlResp = await fetch(`${auth.apiUrl}/b2api/v2/b2_get_upload_url`, {
        method: "POST",
        headers: { Authorization: auth.authorizationToken, "Content-Type": "application/json" },
        body: JSON.stringify({ bucketId: creds.bucketId }),
    });
    if (!uploadUrlResp.ok) {
        throw new Error(`b2_get_upload_url ${uploadUrlResp.status}`);
    }
    const uploadTarget = await uploadUrlResp.json();

    const sha1 = crypto.createHash("sha1").update(bodyString, "utf8").digest("hex");
    const putResp = await fetch(uploadTarget.uploadUrl, {
        method: "POST",
        headers: {
            Authorization: uploadTarget.authorizationToken,
            "X-Bz-File-Name": encodeURIComponent(objectKey),
            "Content-Type": "application/json",
            "X-Bz-Content-Sha1": sha1,
        },
        body: bodyString,
    });
    if (!putResp.ok) {
        const detail = await putResp.text().catch(() => "");
        throw new Error(`b2_upload_file ${putResp.status} ${detail.slice(0, 200)}`);
    }
}

function sanitizeId(value) {
    if (typeof value !== "string") {
        return "";
    }
    return value.replace(/[^A-Za-z0-9._-]/g, "_").replace(/^_+|_+$/g, "").slice(0, 128);
}

function jsonResponse(body, status, origin, extraHeaders = {}) {
    return Response.json(body, {
        status,
        headers: {
            ...corsHeaders(origin),
            ...extraHeaders,
        },
    });
}

function corsHeaders(origin) {
    const headers = {
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
        Vary: "Origin",
    };
    if (isAllowedOrigin(origin)) {
        headers["Access-Control-Allow-Origin"] = origin;
    }
    return headers;
}

function isAllowedOrigin(origin) {
    if (!origin) {
        return false;
    }
    return getAllowedOrigins().includes(origin);
}

function getAllowedOrigins() {
    const configured = process.env.ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(",");
    return configured.split(",").map((item) => item.trim()).filter(Boolean);
}
