/* ═══════════════════════════════════════════════
   ROCKSTAR AUTO REPAIR - script.js
   Handles: services dropdown UX, contact form submission
   (Pages now navigate normally - this no longer does any
   client-side routing/content-swapping.)
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

    // ── Services dropdown ────────────────────────────────────────────────────
    //
    // Strategy:
    //   Touch devices  — first tap opens the menu; second tap follows the link.
    //   Pointer devices — CSS :hover opens the menu; a click follows the link.

    const closeAllDropdowns = () => {
        document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('open'));
    };

    document.querySelectorAll('.dropdown > a').forEach((trigger) => {
        trigger.addEventListener('touchend', function (e) {
            const menu = this.parentElement.querySelector('.dropdown-menu');
            const isOpen = menu.classList.contains('open');

            if (!isOpen) {
                // First tap — open the menu, suppress the ghost click so it
                // doesn't also navigate on this same tap.
                e.preventDefault();
                e.stopPropagation();
                closeAllDropdowns();
                menu.classList.add('open');
            }
            // Second tap — menu already open, let the browser follow the
            // link's href normally.
        });
    });

    // Stop taps/clicks on the dropdown itself from bubbling to the
    // document-level "click outside closes it" handler below.
    document.querySelectorAll('.dropdown-menu a').forEach((item) => {
        item.addEventListener('click', (e) => e.stopPropagation());
        item.addEventListener('touchend', (e) => e.stopPropagation());
    });

    ['touchstart', 'click'].forEach(eventType => {
        document.addEventListener(eventType, function (e) {
            if (!e.target.closest('.dropdown')) closeAllDropdowns();
        }, { passive: eventType === 'touchstart' });
    });

    // ── Contact forms (Request Service / Free Estimate) ─────────────────────
    //
    // Same technical pattern as icestreams.io's contact form: a plain fetch
    // POST of JSON to a Worker endpoint, a hidden honeypot field, basic
    // client-side validation, and an inline status message - no page reload,
    // no third-party form service.

    function wireForm(formId, statusId, formType) {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const btn    = form.querySelector('.submit-btn');
            const status = document.getElementById(statusId);

            // Honeypot check
            const hp = (form.querySelector('[name="hp"]')?.value || '').trim();
            if (hp) return; // silently drop bots

            // Collect
            const name    = form.querySelector('[name="name"]')?.value.trim()    || '';
            const phone   = form.querySelector('[name="phone"]')?.value.trim()   || '';
            const email   = form.querySelector('[name="email"]')?.value.trim()   || '';
            const year    = form.querySelector('[name="year"]')?.value.trim()    || '';
            const make    = form.querySelector('[name="make"]')?.value.trim()    || '';
            const model   = form.querySelector('[name="model"]')?.value.trim()   || '';
            const service = form.querySelector('[name="service"]')?.value.trim() || '';

            // Client-side validation - mirrors the "required" attributes already on these fields
            if (!name || !phone || !email || !year || !make || !model) {
                showStatus(status, 'error', '[ ERROR ] Name, phone, email, year, make, and model are required.');
                return;
            }

            const originalLabel = btn.textContent;
            btn.disabled        = true;
            btn.textContent     = 'SENDING…';
            status.className    = 'form-status';
            status.textContent  = '';

            const endpoint = window.RSA_FORM_ENDPOINT || 'https://api.rockstarautorepair.com';

            try {
                const res = await fetch(endpoint, {
                    method:  'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:    JSON.stringify({ formType, name, phone, email, year, make, model, service, hp: '' }),
                });

                const data = await res.json();

                if (data.ok) {
                    showStatus(status, 'success', '[ OK ] Request sent. We’ll be in touch shortly.');
                    form.reset();
                } else {
                    console.error('Worker error:', data);
                    showStatus(status, 'error', `[ ERROR ] Message failed to send (${data.error || res.status}). Please try again or call us.`);
                }

            } catch (err) {
                console.error('Submit error:', err);
                showStatus(status, 'error', '[ ERROR ] Network issue. Check your connection and try again, or call us directly.');
            } finally {
                btn.disabled    = false;
                btn.textContent = originalLabel;
            }
        });
    }

    wireForm('request-form',  'request-form-status',  'Request Service');
    wireForm('estimate-form', 'estimate-form-status', 'Free Estimate');

    function showStatus(el, type, msg) {
        el.className   = `form-status ${type}`;
        el.textContent = msg;
    }
});
