export function setupSearchScroll() {
    document.querySelector('.search-button').addEventListener('click', e => {
        e.preventDefault();
        const results = document.getElementById('search-results');
        results?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    });
}