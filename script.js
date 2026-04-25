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

    // Nav links
    document.querySelectorAll('nav ul li a').forEach((tab) => {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            loadContent(this.getAttribute('data-tab') || this.id);
        });
    });

    // Logo — home link
    document.querySelector('a.logo').addEventListener('click', function (e) {
        e.preventDefault();
        loadContent('homepage');
    });

    loadContent('homepage');
});