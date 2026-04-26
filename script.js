document.addEventListener('DOMContentLoaded', function () {
    const dynamicContent = document.getElementById('dynamic-content');

    // ── Helpers ──────────────────────────────────────────────────────────────

    const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

    const closeAllDropdowns = () => {
        document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('open'));
    };

    const loadContent = (tabName) => {
        closeAllDropdowns();

        const html = contentMap[tabName] || '<h2>Page not found!</h2>';
        dynamicContent.innerHTML = html;

        dynamicContent.style.animation = 'none';
        dynamicContent.offsetHeight; // force reflow
        dynamicContent.style.animation = '';

        dynamicContent.classList.toggle('no-scroll', tabName === 'homepage');
        dynamicContent.scrollTop = 0;
        setTimeout(() => { dynamicContent.scrollTop = 0; }, 120);

        document.querySelectorAll('nav ul li a').forEach(t => t.classList.remove('active'));
        const active = document.querySelector(
            `nav ul li a[data-tab="${tabName}"], nav ul li a#${tabName}`
        );
        if (active) active.classList.add('active');
    };

    // ── Dropdown trigger ("Services") ────────────────────────────────────────
    //
    // Strategy:
    //   Touch devices  — first tap opens the menu; second tap navigates.
    //   Pointer devices — CSS :hover opens the menu; a click navigates.
    //
    // We track state with a `data-dropdown-open` attribute so the second-tap
    // detection survives between event handlers without closure confusion.

    document.querySelectorAll('.dropdown > a').forEach((trigger) => {

        // ── Touch: use touchend for instant, no-delay response ───────────────
        trigger.addEventListener('touchend', function (e) {
            const menu = this.parentElement.querySelector('.dropdown-menu');
            const isOpen = menu.classList.contains('open');

            if (!isOpen) {
                // First tap — open the menu, suppress the ghost click
                e.preventDefault();
                e.stopPropagation();
                closeAllDropdowns();
                menu.classList.add('open');
            }
            // Second tap — do nothing; let the browser fire the natural click
            // which the click handler below will catch and navigate with.
        });

        // ── Click: handles pointer devices AND the second tap on touch ───────
        trigger.addEventListener('click', function (e) {
            if (isTouchDevice()) {
                // On touch, only reach here on the second tap (menu already open).
                // Close the menu and navigate.
                const menu = this.parentElement.querySelector('.dropdown-menu');
                if (menu.classList.contains('open')) {
                    e.preventDefault();
                    e.stopPropagation();
                    loadContent(this.getAttribute('data-tab') || this.id);
                    return;
                }
                // If somehow the menu is not open (edge case), open it.
                e.preventDefault();
                e.stopPropagation();
                closeAllDropdowns();
                menu.classList.add('open');
                return;
            }

            // Pointer device — toggle on click (CSS hover already shows it,
            // but a click should navigate to the top-level "Services" page).
            e.preventDefault();
            e.stopPropagation();
            const menu = this.parentElement.querySelector('.dropdown-menu');
            const isOpen = menu.classList.contains('open');
            closeAllDropdowns();
            if (!isOpen) {
                menu.classList.add('open');
            } else {
                loadContent(this.getAttribute('data-tab') || this.id);
            }
        });
    });

    // ── Dropdown child items ─────────────────────────────────────────────────

    document.querySelectorAll('.dropdown-menu a').forEach((item) => {

        // touchend gives instant response without the 300 ms click delay
        item.addEventListener('touchend', function (e) {
            e.preventDefault();
            e.stopPropagation();
            loadContent(this.getAttribute('data-tab') || this.id);
        });

        // click covers non-touch devices (and is a safe fallback)
        item.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            loadContent(this.getAttribute('data-tab') || this.id);
        });
    });

    // ── Close on outside tap / click ─────────────────────────────────────────

    // touchstart for immediate close on touch; click for pointer devices.
    ['touchstart', 'click'].forEach(eventType => {
        document.addEventListener(eventType, function (e) {
            if (!e.target.closest('.dropdown')) {
                closeAllDropdowns();
            }
        }, { passive: eventType === 'touchstart' });
    });

    // ── Non-dropdown nav links ───────────────────────────────────────────────

    document.querySelectorAll('nav ul li a').forEach((tab) => {
        if (tab.closest('.dropdown')) return;
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            loadContent(this.getAttribute('data-tab') || this.id);
        });
    });

    // ── Logo ─────────────────────────────────────────────────────────────────

    document.querySelector('a.logo').addEventListener('click', function (e) {
        e.preventDefault();
        loadContent('homepage');
    });

    loadContent('homepage');
});
