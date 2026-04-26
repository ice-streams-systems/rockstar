document.addEventListener('DOMContentLoaded', function () {
    const dynamicContent = document.getElementById('dynamic-content');

    const loadContent = (tabName) => {
        const html = contentMap[tabName] || '<h2>Page not found!</h2>';
        dynamicContent.innerHTML = html;

        // Replay fade-up animation
        dynamicContent.style.animation = 'none';
        dynamicContent.offsetHeight; // reflow
        dynamicContent.style.animation = '';

        if (tabName === 'homepage') {
            dynamicContent.classList.add('no-scroll');
        } else {
            dynamicContent.classList.remove('no-scroll');
        }

        // Scroll reset — after content is in DOM
        dynamicContent.scrollTop = 0;

        // Second reset after images may have loaded and shifted layout
        setTimeout(() => { dynamicContent.scrollTop = 0; }, 120);

        // Active nav state
        document.querySelectorAll('nav ul li a').forEach(t => t.classList.remove('active'));
        const active = document.querySelector(`nav ul li a[data-tab="${tabName}"], nav ul li a#${tabName}`);
        if (active) active.classList.add('active');
    };

    // ── Mobile dropdown toggle ──────────────────────────────────────────────
    // On touch devices, :hover doesn't fire reliably. We intercept taps on
    // dropdown parent links, toggle the menu open/closed, and prevent the
    // nav to services page from firing until the user taps a child item.

    const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

    const closeAllDropdowns = () => {
        document.querySelectorAll('.dropdown-menu.open').forEach(menu => {
            menu.classList.remove('open');
        });
    };

    document.querySelectorAll('.dropdown > a').forEach((trigger) => {
        trigger.addEventListener('click', function (e) {
            if (!isTouchDevice()) return; // desktop: let CSS :hover handle it

            const menu = this.parentElement.querySelector('.dropdown-menu');
            if (!menu) return;

            const isOpen = menu.classList.contains('open');

            // Close any other open menus first
            closeAllDropdowns();

            if (isOpen) {
                // Second tap on already-open trigger: close and navigate
                loadContent(this.getAttribute('data-tab') || this.id);
            } else {
                // First tap: open menu, don't navigate
                e.preventDefault();
                menu.classList.add('open');
            }
        });
    });

    // Tap anywhere outside an open dropdown closes it
    document.addEventListener('click', function (e) {
        if (!isTouchDevice()) return;
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });
    // ───────────────────────────────────────────────────────────────────────

    // Nav links (non-dropdown)
    document.querySelectorAll('nav ul li a').forEach((tab) => {
        tab.addEventListener('click', function (e) {
            // Dropdown triggers are handled above
            if (this.closest('.dropdown') && !this.closest('.dropdown-menu')) return;

            e.preventDefault();
            closeAllDropdowns();
            loadContent(this.getAttribute('data-tab') || this.id);
        });
    });

    // Logo — home link
    document.querySelector('a.logo').addEventListener('click', function (e) {
        e.preventDefault();
        closeAllDropdowns();
        loadContent('homepage');
    });

    loadContent('homepage');
});
