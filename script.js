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
                // First tap: open menu
                menu.classList.add('open');
            } else {
                // Second tap: navigate to Services page
                loadContent(this.getAttribute('data-tab') || this.id);
            }
        });
    });

    // ── Dropdown child items ─────────────────────────────────────────────────
    // stopPropagation so the document click handler below doesn't interfere
    document.querySelectorAll('.dropdown-menu a').forEach((item) => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            loadContent(this.getAttribute('data-tab') || this.id);
        });
    });

    // ── Outside tap closes menu ──────────────────────────────────────────────
    document.addEventListener('click', closeAllDropdowns);

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
