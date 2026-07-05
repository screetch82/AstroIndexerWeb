#!/usr/bin/env python3
"""Localized RC1 announcement generator. For each language it renders the
narration with that language's AstroIndexer brand voice (edge-tts) and writes a
self-contained ann.<lang>.json holding both the on-screen strings and the VO
timings the Remotion composition reads.

Voices (from the app's shipped voice-over pipeline):
  en -> en-GB-LibbyNeural   de -> de-DE-KatjaNeural   es -> es-ES-ElviraNeural
"""
import asyncio, json, os, subprocess
import edge_tts

HERE = os.path.dirname(os.path.abspath(__file__))
FPS = 30
ORDER = ["intro", "platesolver", "loupe", "stacking", "detector", "backfocus", "mobile", "outro"]
PAD = {  # (head, tail) seconds per segment
    "intro": (0.4, 0.55), "outro": (0.35, 1.0),
    "_default": (0.35, 0.55),
}

LANGS = {
    "en": {
        "voice": "en-GB-LibbyNeural", "flag": "🇬🇧", "label": "EN",
        "eyebrow": "Release Candidate 1 · v1.0.0", "rcChip": "1.0 RC1",
        "intro": {"pre": "AstroIndexer 1.0 is ", "accent": "almost here", "post": ".",
                  "subtitle": "The biggest step yet toward the full 1.0 launch."},
        "outro": {"title": "Update to 1.0 RC1", "cta": "astroindexer.com",
                  "platforms": "macOS · Windows · Linux  •  iOS live on the App Store · Android in final review"},
        "beats": {
            "platesolver": {"kicker": "Headline feature", "title": "A plate solver, built in",
                "body": "Native WCS solving with a full SIP distortion model, stored per frame — no external ASTAP or astrometry.net to install.",
                "chipBig": "18.6%", "chipSmall": "lower median solve\ntime than ASTAP"},
            "loupe": {"kicker": "New", "title": "The Inspect Loupe",
                "body": "Pixel-peep any sub at 1:1 with live FWHM, HFR and PixInsight-parity metrics — without ever leaving the gallery."},
            "stacking": {"kicker": "New", "title": "One-click stacking",
                "body": "QA-sorted frames handed straight to PixInsight AutoIntegrate or Siril — ready-made for OSC, broadband and narrowband."},
            "detector": {"kicker": "New", "title": "Object Detector",
                "body": "Every catalogued object annotated on a solved frame, cross-matched against LEDA, SDSS, MCG and 2MASX."},
            "backfocus": {"kicker": "Expanded", "title": "Backfocus Manager",
                "body": "Your imaging train drawn to scale, with the exact spacer combination to hit each sensor's required backfocus."},
            "mobile": {"kicker": "New platform", "title": "Your library, in your pocket",
                "body": "Browse your catalogue and see Scan, QA and ML status on any target — from the field or the couch.",
                "pills": ["iOS — live on the App Store", "Android — in final review"]},
        },
        "vo": {
            "intro": "AstroIndexer 1.0, Release Candidate 1, is here — the biggest step yet toward the full release.",
            "platesolver": "AstroIndexer now includes its own plate solver — native solving with full distortion data, and no external tools to install. Eighteen point six percent faster than ASTAP.",
            "loupe": "The new Inspect Loupe examines any sub at full resolution, with live quality metrics that match PixInsight — right in your gallery.",
            "stacking": "Stacking is now a single click. AstroIndexer sorts your frames by quality, and hands the best of them to PixInsight or Siril, automatically.",
            "detector": "The new Object Detector identifies every catalogued object in a solved frame, and cross-matches them against professional sky surveys.",
            "backfocus": "And the expanded Backfocus Manager draws your imaging train to scale, and finds the exact spacer for every sensor.",
            "mobile": "Your library travels with you, too, with new companion apps for iOS and Android — catalogue and pipeline status always in reach.",
            "outro": "AstroIndexer 1.0, Release Candidate 1. It runs locally, with no subscription. Update at astroindexer.com.",
        },
    },
    "de": {
        "voice": "de-DE-KatjaNeural", "flag": "🇩🇪", "label": "DE",
        "eyebrow": "Release Candidate 1 · v1.0.0", "rcChip": "1.0 RC1",
        "intro": {"pre": "AstroIndexer 1.0 ist ", "accent": "fast da", "post": ".",
                  "subtitle": "Der bisher größte Schritt zur fertigen Version 1.0."},
        "outro": {"title": "Jetzt auf 1.0 RC1 updaten", "cta": "astroindexer.com",
                  "platforms": "macOS · Windows · Linux  •  iOS live im App Store · Android in finaler Prüfung"},
        "beats": {
            "platesolver": {"kicker": "Highlight", "title": "Ein Plate Solver, integriert",
                "body": "Natives WCS-Lösen mit vollständigem SIP-Verzeichnungsmodell, pro Frame gespeichert — ohne externes ASTAP oder astrometry.net.",
                "chipBig": "18,6 %", "chipSmall": "niedrigere mediane\nLösungszeit als ASTAP"},
            "loupe": {"kicker": "Neu", "title": "Die Inspect-Lupe",
                "body": "Jedes Sub bei 1:1 begutachten — mit Live-FWHM, HFR und PixInsight-konformen Metriken, ohne die Galerie zu verlassen."},
            "stacking": {"kicker": "Neu", "title": "Ein-Klick-Stacking",
                "body": "QA-sortierte Frames direkt an PixInsight AutoIntegrate oder Siril — fertig für OSC, Breitband und Schmalband."},
            "detector": {"kicker": "Neu", "title": "Objekt-Detektor",
                "body": "Jedes katalogisierte Objekt in einem gelösten Frame annotiert, abgeglichen mit LEDA, SDSS, MCG und 2MASX."},
            "backfocus": {"kicker": "Erweitert", "title": "Backfocus Manager",
                "body": "Ihr Abbildungszug maßstabsgetreu gezeichnet, mit der exakten Spacer-Kombination für den Backfocus jedes Sensors."},
            "mobile": {"kicker": "Neue Plattform", "title": "Ihre Bibliothek in der Tasche",
                "body": "Katalog durchsuchen und Scan-, QA- und ML-Status auf jedem Ziel sehen — vom Feld oder vom Sofa.",
                "pills": ["iOS — live im App Store", "Android — in finaler Prüfung"]},
        },
        "vo": {
            "intro": "AstroIndexer 1.0, Release Candidate 1, ist da — der bisher größte Schritt zur fertigen Version.",
            "platesolver": "AstroIndexer hat jetzt einen eigenen Plate Solver — natives Lösen mit vollständigen Verzeichnungsdaten, ganz ohne externe Tools. 18,6 Prozent schneller als ASTAP.",
            "loupe": "Die neue Inspect-Lupe zeigt jedes Sub in voller Auflösung, mit Live-Qualitätsmetriken auf PixInsight-Niveau — direkt in Ihrer Galerie.",
            "stacking": "Stacking ist jetzt ein einziger Klick. AstroIndexer sortiert Ihre Frames nach Qualität und übergibt die besten automatisch an PixInsight oder Siril.",
            "detector": "Der neue Objekt-Detektor erkennt jedes katalogisierte Objekt in einem gelösten Frame und gleicht es mit professionellen Himmelsdurchmusterungen ab.",
            "backfocus": "Und der erweiterte Backfocus Manager zeichnet Ihren Abbildungszug maßstabsgetreu und findet den exakten Spacer für jeden Sensor.",
            "mobile": "Ihre Bibliothek ist jetzt auch mobil — mit neuen Companion-Apps für iOS und Android. Katalog- und Pipeline-Status immer griffbereit.",
            "outro": "AstroIndexer 1.0, Release Candidate 1. Läuft lokal, ohne Abo. Jetzt aktualisieren, auf astroindexer.com.",
        },
    },
    "es": {
        "voice": "es-ES-ElviraNeural", "flag": "🇪🇸", "label": "ES",
        "eyebrow": "Release Candidate 1 · v1.0.0", "rcChip": "1.0 RC1",
        "intro": {"pre": "AstroIndexer 1.0 ", "accent": "ya casi está", "post": ".",
                  "subtitle": "El mayor paso hasta ahora hacia la versión 1.0 final."},
        "outro": {"title": "Actualiza a 1.0 RC1", "cta": "astroindexer.com",
                  "platforms": "macOS · Windows · Linux  •  iOS en la App Store · Android en revisión final"},
        "beats": {
            "platesolver": {"kicker": "Función estrella", "title": "Un plate solver, integrado",
                "body": "Resolución WCS nativa con un modelo de distorsión SIP completo, guardado por frame — sin ASTAP ni astrometry.net externos.",
                "chipBig": "18,6 %", "chipSmall": "menor tiempo mediano\nde resolución que ASTAP"},
            "loupe": {"kicker": "Nuevo", "title": "La lupa de inspección",
                "body": "Examina cualquier sub a 1:1 con FWHM, HFR y métricas equivalentes a PixInsight en vivo, sin salir de la galería."},
            "stacking": {"kicker": "Nuevo", "title": "Apilado con un clic",
                "body": "Frames ordenados por QA directos a PixInsight AutoIntegrate o Siril — listos para OSC, banda ancha y banda estrecha."},
            "detector": {"kicker": "Nuevo", "title": "Detector de Objetos",
                "body": "Cada objeto catalogado anotado en un frame resuelto, contrastado con LEDA, SDSS, MCG y 2MASX."},
            "backfocus": {"kicker": "Ampliado", "title": "Gestor de Backfocus",
                "body": "Tu tren de imagen dibujado a escala, con la combinación exacta de espaciadores para el backfocus de cada sensor."},
            "mobile": {"kicker": "Nueva plataforma", "title": "Tu biblioteca en el bolsillo",
                "body": "Explora tu catálogo y consulta el estado de Escaneo, QA y ML en cualquier objetivo — desde el campo o el sofá.",
                "pills": ["iOS — ya en la App Store", "Android — en revisión final"]},
        },
        "vo": {
            "intro": "AstroIndexer 1.0, Release Candidate 1, ya está aquí: el mayor paso hasta ahora hacia la versión final.",
            "platesolver": "AstroIndexer ahora incluye su propio plate solver: resolución nativa con datos de distorsión completos y sin herramientas externas que instalar. Un 18,6 por ciento más rápido que ASTAP.",
            "loupe": "La nueva lupa de inspección examina cualquier sub a plena resolución, con métricas de calidad en vivo equivalentes a PixInsight, dentro de tu galería.",
            "stacking": "El apilado es ahora un solo clic. AstroIndexer ordena tus frames por calidad y entrega los mejores a PixInsight o Siril, automáticamente.",
            "detector": "El nuevo Detector de Objetos identifica cada objeto catalogado en un frame resuelto y lo contrasta con catálogos astronómicos profesionales.",
            "backfocus": "Y el Gestor de Backfocus ampliado dibuja tu tren de imagen a escala y encuentra el espaciador exacto para cada sensor.",
            "mobile": "Tu biblioteca ahora te acompaña, con nuevas apps para iOS y Android. El estado de catálogo y pipeline, siempre a mano.",
            "outro": "AstroIndexer 1.0, Release Candidate 1. Funciona localmente, sin suscripción. Actualiza hoy en astroindexer.com.",
        },
    },
}


def probe(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "csv=p=0", path], capture_output=True, text=True)
    return float(r.stdout.strip())


async def build(lang, cfg):
    vodir = os.path.join(HERE, "public", f"vo_{lang}")
    os.makedirs(vodir, exist_ok=True)
    segments = []
    for sid in ORDER:
        out = os.path.join(vodir, f"{sid}.mp3")
        c = edge_tts.Communicate(text=cfg["vo"][sid], voice=cfg["voice"], rate="+0%")
        with open(out, "wb") as f:
            async for ch in c.stream():
                if ch["type"] == "audio":
                    f.write(ch["data"])
        dur = probe(out)
        head, tail = PAD.get(sid, PAD["_default"])
        segments.append({"id": sid, "audio": f"vo_{lang}/{sid}.mp3",
                         "durSec": round(dur, 3),
                         "beatFrames": round((head + dur + tail) * FPS),
                         "audioStartFrame": round(head * FPS)})
    total = sum(s["beatFrames"] for s in segments)
    doc = {"fps": FPS, "lang": lang, "flag": cfg["flag"], "label": cfg["label"],
           "voice": cfg["voice"], "eyebrow": cfg["eyebrow"], "rcChip": cfg["rcChip"],
           "intro": cfg["intro"], "outro": cfg["outro"], "beats": cfg["beats"],
           "segments": segments}
    with open(os.path.join(HERE, "src", f"ann.{lang}.json"), "w") as f:
        json.dump(doc, f, ensure_ascii=False, indent=2)
    print(f"[{lang}] {cfg['voice']}  {total}f = {total/FPS:.1f}s -> src/ann.{lang}.json")


async def main():
    import sys
    langs = sys.argv[1:] or list(LANGS.keys())
    for lang in langs:
        await build(lang, LANGS[lang])


asyncio.run(main())
