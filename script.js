document.addEventListener('DOMContentLoaded', function () {
    const dynamicContent = document.getElementById('dynamic-content');

    const closeAllDropdowns = () => {
        document.querySelectorAll('.dropdown-menu.open').forEach(menu => {
            menu.classList.remove('open');
        });
    };

    const loadContent = (tabName) => {
        const html = contentMap[tabName] || '<h2>Page not found!</h2>';
        dynamicContent.innerHTML = html;

        dynamicContent.style.animation = 'none';
        dynamicContent.offsetHeight;
        dynamicContent.style.animation = '';

        if (tabName === 'homepage') {
            dynamicContent.classList.add('no-scroll');
        } else {
            dynamicContent.classList.remove('no-scroll');
        }

        dynamicContent.scrollTop = 0;
        setTimeout(() => { dynamicContent.scrollTop = 0; }, 120);

        // Close menu AFTER content is in the DOM
        closeAllDropdowns();

        document.querySelectorAll('nav ul li a').forEach(t => t.classList.remove('active'));
        const active = document.querySelector(`nav ul li a[data-tab="${tabName}"], nav ul li a#${tabName}`);
        if (active) active.classList.add('active');
    };

    // ── Dropdown (touch-aware) ───────────────────────────────────────────────
    const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

    document.querySelectorAll('.dropdown > a').forEach((trigger) => {
        trigger.addEventListener('click', function (e) {
            if (!isTouchDevice()) return;

            e.preventDefault();
            const menu = this.parentElement.querySelector('.dropdown-menu');
            if (!menu) return;

            if (menu.classList.contains('open')) {
                // Second tap on trigger: close menu AND navigate to its page
                closeAllDropdowns();
                loadContent(this.getAttribute('data-tab') || this.id);
            } else {
                // First tap: just open the menu
                closeAllDropdowns();
                menu.classList.add('open');
            }
        });
    });

    // Child items: navigate, loadContent() closes the menu
    document.querySelectorAll('.dropdown-menu a').forEach((item) => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            loadContent(this.getAttribute('data-tab') || this.id);
        });
    });

    // Outside tap: safety net
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });
    // ────────────────────────────────────────────────────────────────────────

    // Non-dropdown nav links
    document.querySelectorAll('nav ul li a').forEach((tab) => {
        if (tab.closest('.dropdown')) return;
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            loadContent(this.getAttribute('data-tab') || this.id);
        });
    });

    // Logo
    document.querySelector('a.logo').addEventListener('click', function (e) {
        e.preventDefault();
        loadContent('homepage');
    });

    loadContent('homepage');
});
