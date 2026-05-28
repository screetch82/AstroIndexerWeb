/*
 * contact-form.js
 * Shared contact / trial-request modal for the AstroIndexer marketing site.
 *
 * Why this exists: the modal markup + submit logic used to live inline in
 * index.html only. Every page now loads this single file so the "Contact Us"
 * footer link (and the "Request Free Trial" CTA) opens the SAME form everywhere
 * instead of falling back to a mailto: link. One source of truth, no per-page
 * copies to drift out of sync.
 *
 * Usage on a page:
 *   1. <script src="js/contact-form.js"></script>  (before </body>)
 *   2. A trigger: <a href="#contact"
 *                    onclick="openContactForm('Contact Us'); return false;">Contact Us</a>
 *
 * The endpoint can be overridden by setting window.ASTROINDEXER_CONTACT_ENDPOINTS
 * before this script loads.
 */
(function () {
    "use strict";

    var CONTACT_FORM_ENDPOINTS = window.ASTROINDEXER_CONTACT_ENDPOINTS || [
        "https://api.astroindexer.com/api/contact",
        "https://astro-indexer-web.vercel.app/api/contact"
    ];

    // Modal markup, injected once into <body> on load. Kept identical to the
    // original inline version from index.html so styling/behavior is unchanged.
    var MODAL_HTML = [
        '<div id="contactModal" style="',
        '    display: none; position: fixed; inset: 0; z-index: 10000;',
        '    background: rgba(0,0,0,0.75); backdrop-filter: blur(8px);',
        '    align-items: center; justify-content: center; padding: 24px;',
        '">',
        '    <div style="',
        '        max-width: 480px; width: 100%;',
        '        background: linear-gradient(180deg, #121c28, #0f1620);',
        '        border: 1px solid rgba(255,255,255,0.08);',
        '        border-radius: 16px; padding: 40px 36px;',
        '        position: relative;',
        '    ">',
        '        <button onclick="closeContactForm()" style="',
        '            position: absolute; top: 16px; right: 16px;',
        '            background: none; border: none; color: rgba(231,238,248,0.4);',
        '            font-size: 22px; cursor: pointer; line-height: 1;',
        '        ">&times;</button>',
        '        <h2 id="contactTitle" style="',
        '            font-size: 22px; font-weight: 800; color: #e7eef8;',
        '            margin-bottom: 6px;',
        '        ">Get in Touch</h2>',
        '        <p style="font-size: 13px; color: rgba(231,238,248,0.5); margin-bottom: 28px;">',
        "            We'll get back to you as soon as possible.",
        '        </p>',
        '        <form id="contactForm" onsubmit="submitContactForm(event)">',
        '            <input id="cfWebsite" name="website" type="text" autocomplete="off" tabindex="-1" aria-hidden="true" style="',
        '                position: absolute; left: -10000px; width: 1px; height: 1px;',
        '                opacity: 0; pointer-events: none;',
        '            ">',
        '            <label style="display: block; font-size: 13px; font-weight: 600; color: rgba(231,238,248,0.7); margin-bottom: 6px;">Name</label>',
        '            <input id="cfName" type="text" required placeholder="Your name" style="',
        '                width: 100%; padding: 11px 14px; margin-bottom: 16px;',
        '                background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.10);',
        '                border-radius: 8px; color: #e7eef8; font-size: 14px; outline: none;',
        '            " onfocus="this.style.borderColor=\'rgba(73,198,191,0.5)\'" onblur="this.style.borderColor=\'rgba(255,255,255,0.10)\'">',
        '            <label style="display: block; font-size: 13px; font-weight: 600; color: rgba(231,238,248,0.7); margin-bottom: 6px;">Email</label>',
        '            <input id="cfEmail" type="email" required placeholder="your@email.com" style="',
        '                width: 100%; padding: 11px 14px; margin-bottom: 16px;',
        '                background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.10);',
        '                border-radius: 8px; color: #e7eef8; font-size: 14px; outline: none;',
        '            " onfocus="this.style.borderColor=\'rgba(73,198,191,0.5)\'" onblur="this.style.borderColor=\'rgba(255,255,255,0.10)\'">',
        '            <label style="display: block; font-size: 13px; font-weight: 600; color: rgba(231,238,248,0.7); margin-bottom: 6px;">What are you interested in?</label>',
        '            <textarea id="cfMessage" required rows="4" placeholder="e.g. I\'d like to try AstroIndexer for my astrophotography workflow..." style="',
        '                width: 100%; padding: 11px 14px; margin-bottom: 24px;',
        '                background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.10);',
        '                border-radius: 8px; color: #e7eef8; font-size: 14px; outline: none;',
        '                resize: vertical; font-family: inherit;',
        '            " onfocus="this.style.borderColor=\'rgba(73,198,191,0.5)\'" onblur="this.style.borderColor=\'rgba(255,255,255,0.10)\'"></textarea>',
        '            <p id="contactStatus" aria-live="polite" style="',
        '                min-height: 20px; margin: -8px 0 14px;',
        '                font-size: 13px; line-height: 1.45; color: rgba(231,238,248,0.65);',
        '            "></p>',
        '            <button id="contactSubmitButton" type="submit" style="',
        '                width: 100%; padding: 14px;',
        '                background: linear-gradient(135deg, #49c6bf, #2aa39d);',
        '                color: #0b0f14; border: none; border-radius: 10px;',
        '                font-size: 15px; font-weight: 700; cursor: pointer;',
        '                transition: transform 0.15s ease, box-shadow 0.15s ease;',
        '            " onmouseover="this.style.transform=\'translateY(-1px)\';this.style.boxShadow=\'0 8px 24px rgba(73,198,191,0.25)\'"',
        '               onmouseout="this.style.transform=\'\';this.style.boxShadow=\'\'">Send Message</button>',
        '        </form>',
        '    </div>',
        '</div>'
    ].join("\n");

    function injectModal() {
        if (document.getElementById("contactModal")) {
            return;
        }
        var wrapper = document.createElement("div");
        wrapper.innerHTML = MODAL_HTML;
        while (wrapper.firstChild) {
            document.body.appendChild(wrapper.firstChild);
        }
        // Close on backdrop click (must attach after the modal exists in the DOM).
        var modal = document.getElementById("contactModal");
        if (modal) {
            modal.addEventListener("click", function (e) {
                if (e.target === this) {
                    closeContactForm();
                }
            });
        }
    }

    function setContactStatus(message, isError) {
        var status = document.getElementById("contactStatus");
        if (!status) {
            return;
        }
        status.innerHTML = message;
        status.style.color = isError ? "#ff9d8d" : "rgba(231,238,248,0.65)";
    }

    function openContactForm(subject) {
        injectModal();
        var modal = document.getElementById("contactModal");
        var title = document.getElementById("contactTitle");
        if (!modal || !title) {
            return;
        }
        modal.style.display = "flex";
        title.textContent = subject || "Get in Touch";
        setContactStatus("");
        // Pre-fill the message placeholder with the subject context.
        var msg = document.getElementById("cfMessage");
        if (subject && msg && !msg.value) {
            msg.placeholder = "I'd like to request a " + subject.toLowerCase() + "...";
        }
    }

    function closeContactForm() {
        var modal = document.getElementById("contactModal");
        if (modal) {
            modal.style.display = "none";
        }
    }

    async function submitContactForm(e) {
        e.preventDefault();
        var form = document.getElementById("contactForm");
        var button = document.getElementById("contactSubmitButton");
        var name = document.getElementById("cfName").value.trim();
        var email = document.getElementById("cfEmail").value.trim();
        var message = document.getElementById("cfMessage").value.trim();
        var title = document.getElementById("contactTitle").textContent;
        var website = document.getElementById("cfWebsite").value;

        button.disabled = true;
        button.textContent = "Sending...";
        button.style.opacity = "0.75";
        setContactStatus("Sending your message...");

        try {
            var payload = {
                name: name,
                email: email,
                message: message,
                subject: title,
                website: website,
                pageUrl: window.location.href
            };
            var response = null;
            var result = {};

            for (var i = 0; i < CONTACT_FORM_ENDPOINTS.length; i++) {
                try {
                    response = await fetch(CONTACT_FORM_ENDPOINTS[i], {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    });

                    try {
                        result = await response.json();
                    } catch (parseError) {
                        result = {};
                    }

                    if (response.ok && result.ok === true) {
                        break;
                    }
                } catch (endpointError) {
                    if (i === CONTACT_FORM_ENDPOINTS.length - 1) {
                        throw endpointError;
                    }
                }
            }

            if (!response.ok || result.ok !== true) {
                throw new Error(result.error || "Message delivery failed.");
            }

            form.reset();
            setContactStatus("Thank you. Your message was sent and we will get back to you soon.");
        } catch (error) {
            setContactStatus(
                'We could not send the message right now. Please try again, or email <a href="mailto:support@astroindexer.com" style="color:#49c6bf;">support@astroindexer.com</a>.',
                true
            );
        } finally {
            button.disabled = false;
            button.textContent = "Send Message";
            button.style.opacity = "";
        }
    }

    // Close on Escape from anywhere.
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeContactForm();
        }
    });

    // Inject as soon as the DOM is ready (script lives at end of <body>, but
    // guard for the case it is loaded in <head> on some future page).
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectModal);
    } else {
        injectModal();
    }

    // Inline on* handlers in the markup + footer links call these as globals.
    window.openContactForm = openContactForm;
    window.closeContactForm = closeContactForm;
    window.submitContactForm = submitContactForm;
})();
