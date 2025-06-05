// Modified app.js using hash-based routing
document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');

    async function loadPage(page, isInitialLoad = false) {
        try {
            const response = await fetch(`partials/${page}.html`);
            if (!response.ok) throw new Error('Page not found');

            contentDiv.innerHTML = await response.text();

            if (!isInitialLoad) {
                window.location.hash = page;
            }
        } catch (err) {
            contentDiv.innerHTML = `<h2>Error loading page</h2>`;
            console.error(err);
        }
    }

    // Handle navigation clicks
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.closest('[data-page]').dataset.page;
            loadPage(page);
        });
    });

    // Handle hash change
    window.addEventListener('hashchange', () => {
        const page = window.location.hash.substring(1) || 'home';
        loadPage(page, true);
    });

    // Initial load
    const page = window.location.hash.substring(1) || 'home';
    loadPage(page, true);
});