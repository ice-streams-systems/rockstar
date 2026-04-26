document.addEventListener('DOMContentLoaded', function () {
    const dynamicContent = document.getElementById('dynamic-content');

    const closeAllDropdowns = () => {
        document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('open'));
    };

    const loadContent = (tabName) => {
        closeAllDropdowns();

        const html = contentMap[tabName] || '<h2>Page not found!</h2>';
        dynamicContent.innerHTML = html;

        dynamicContent.style.animation = 'none';
        dynamicContent.offsetHeight;
        dynamicContent.style.animation = '';

        dynamicContent.classList.toggle('no-scroll', tabName === 'homepage');
        dynamicContent.scrollTop = 0;
        setTimeout(() => { dynamicContent.scrollTop = 0; }, 120);

        document.querySelectorAll('nav ul li a').forEach(t => t.classList.remove('active'));
        const active = document.querySelector(`nav ul li a[data-tab="${tabName}"], nav ul li a#${tabName}`);
        if (active) active.classList.add('active');
    };

    // ── Dropdown trigger ("Services") ───────────────────────────────────────
    document.querySelectorAll('.dropdown > a').forEach((trigger) => {
        trigger.addEventListener('click', function (e) {
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
        // touchstart fires before click — close the menu at the earliest moment
        item.addEventListener('touchstart', function () {
            closeAllDropdowns();
        }, { passive: true });

        item.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            closeAllDropdowns(); // force close before anything else
            loadContent(this.getAttribute('data-tab') || this.id);
        });
    });

    // ── Outside tap: intentional, not global ─────────────────────────────────
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
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
