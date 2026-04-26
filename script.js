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

        dynamicContent.scrollTop = 0;
        setTimeout(() => { dynamicContent.scrollTop = 0; }, 120);

        // Active nav state
        document.querySelectorAll('nav ul li a').forEach(t => t.classList.remove('active'));
        const active = document.querySelector(`nav ul li a[data-tab="${tabName}"], nav ul li a#${tabName}`);
        if (active) active.classList.add('active');
    };

    // ── Dropdown toggle (touch-aware) ───────────────────────────────────────
    const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

    const closeAllDropdowns = () => {
        document.querySelectorAll('.dropdown-menu.open').forEach(menu => {
            menu.classList.remove('open');
        });
    };

    // Trigger ("Services") — first tap opens, second tap closes (toggle)
    document.querySelectorAll('.dropdown > a').forEach((trigger) => {
        trigger.addEventListener('click', function (e) {
            if (!isTouchDevice()) return;

            e.preventDefault();
            const menu = this.parentElement.querySelector('.dropdown-menu');
            if (!menu) return;

            const isOpen = menu.classList.contains('open');
            closeAllDropdowns();
            if (!isOpen) menu.classList.add('open');
        });
    });

    // Child items — close menu the instant one is tapped, then navigate
    document.querySelectorAll('.dropdown-menu a').forEach((item) => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            closeAllDropdowns();
            loadContent(this.getAttribute('data-tab') || this.id);
        });
    });

    // Outside tap — safety net
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });
    // ────────────────────────────────────────────────────────────────────────

    // All other nav links (non-dropdown)
    document.querySelectorAll('nav ul li a').forEach((tab) => {
        if (tab.closest('.dropdown')) return; // handled above
        tab.addEventListener('click', function (e) {
            e.preventDefault();
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
