import nodemailer from "nodemailer";

const DEFAULT_ALLOWED_ORIGINS = [
    "https://astroindexer.com",
    "https://www.astroindexer.com",
    "https://screetch82.github.io",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
];
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 4000;

export async function OPTIONS(request) {
    const origin = request.headers.get("Origin") || "";
    return new Response(null, {
        status: isAllowedOrigin(origin) ? 204 : 403,
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

    if (!isAllowedOrigin(origin)) {
        return jsonResponse({ ok: false, error: "Origin not allowed." }, 403, origin);
    }

    const contentType = request.headers.get("Content-Type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
        return jsonResponse({ ok: false, error: "JSON body required." }, 415, origin);
    }

    let payload;
    try {
        payload = await request.json();
    } catch (error) {
        return jsonResponse({ ok: false, error: "Invalid JSON body." }, 400, origin);
    }

    if (typeof payload.website === "string" && payload.website.trim() !== "") {
        return jsonResponse({ ok: true }, 202, origin);
    }

    const normalized = normalizePayload(payload);
    if (normalized.error) {
        return jsonResponse({ ok: false, error: normalized.error }, 400, origin);
    }

    const smtpPass = process.env.SMTP_PASS;
    if (!smtpPass) {
        console.error("Missing SMTP_PASS environment variable.");
        return jsonResponse({ ok: false, error: "Contact form is not configured." }, 500, origin);
    }

    try {
        await sendContactEmail(normalized.value, smtpPass);
        return jsonResponse({ ok: true }, 200, origin);
    } catch (error) {
        console.error("Contact form SMTP delivery failed.", error);
        return jsonResponse({ ok: false, error: "Unable to send message right now." }, 502, origin);
    }
}

function sendContactEmail(payload, smtpPass) {
    const smtpHost = process.env.SMTP_HOST || "mail.privateemail.com";
    const smtpPort = Number(process.env.SMTP_PORT || "465");
    const smtpUser = process.env.SMTP_USER || "support@astroindexer.com";
    const to = process.env.CONTACT_TO || "support@astroindexer.com";
    const from = process.env.CONTACT_FROM || "AstroIndexer Website <support@astroindexer.com>";
    const submittedAt = new Date().toISOString();

    const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
    });

    return transporter.sendMail({
        from,
        to,
        replyTo: payload.email,
        subject: cleanHeader(`AstroIndexer: ${payload.subject}`, MAX_SUBJECT_LENGTH + 20),
        text: buildTextEmail(payload, submittedAt),
        html: buildHtmlEmail(payload, submittedAt),
    });
}

function normalizePayload(payload) {
    const name = cleanText(payload.name, MAX_NAME_LENGTH);
    const email = cleanText(payload.email, MAX_EMAIL_LENGTH);
    const message = cleanMultilineText(payload.message, MAX_MESSAGE_LENGTH);
    const subject = cleanHeader(payload.subject || "Website Contact", MAX_SUBJECT_LENGTH);
    const pageUrl = cleanUrl(payload.pageUrl);

    if (!name) {
        return { error: "Name is required." };
    }
    if (!isValidEmail(email)) {
        return { error: "A valid email address is required." };
    }
    if (!message) {
        return { error: "Message is required." };
    }

    return {
        value: {
            name,
            email,
            message,
            subject,
            pageUrl,
        },
    };
}

function buildTextEmail(payload, submittedAt) {
    return [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Submitted: ${submittedAt}`,
        payload.pageUrl ? `Page: ${payload.pageUrl}` : "",
        "",
        payload.message,
    ].filter(Boolean).join("\n");
}

function buildHtmlEmail(payload, submittedAt) {
    return [
        "<h2>AstroIndexer Website Contact</h2>",
        "<p><strong>Name:</strong> ", escapeHtml(payload.name), "</p>",
        "<p><strong>Email:</strong> ", escapeHtml(payload.email), "</p>",
        "<p><strong>Submitted:</strong> ", escapeHtml(submittedAt), "</p>",
        payload.pageUrl ? "<p><strong>Page:</strong> " + escapeHtml(payload.pageUrl) + "</p>" : "",
        "<hr>",
        "<p style=\"white-space:pre-wrap;\">", escapeHtml(payload.message), "</p>",
    ].join("");
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

function cleanText(value, maxLength) {
    if (typeof value !== "string") {
        return "";
    }
    return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function cleanMultilineText(value, maxLength) {
    if (typeof value !== "string") {
        return "";
    }
    return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim().slice(0, maxLength);
}

function cleanHeader(value, maxLength) {
    if (typeof value !== "string") {
        return "";
    }
    return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function cleanUrl(value) {
    if (typeof value !== "string" || !value) {
        return "";
    }
    try {
        const url = new URL(value);
        if (url.protocol !== "https:" && url.protocol !== "http:") {
            return "";
        }
        return url.toString().slice(0, 300);
    } catch (error) {
        return "";
    }
}

function isValidEmail(value) {
    return typeof value === "string" &&
        value.length <= MAX_EMAIL_LENGTH &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
