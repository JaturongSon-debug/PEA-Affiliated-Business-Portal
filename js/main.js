/* ==========================================================================
   PEA Affiliated Business Estimate - Main JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search');
    const filterChips = document.querySelectorAll('.filter-chip');
    const systemCards = document.querySelectorAll('.system-card');
    const resultsCountEl = document.getElementById('results-count');
    const noResultsEl = document.getElementById('no-results');
    const resetSearchBtn = document.getElementById('reset-search-btn');

    let currentCategory = 'all';

    /* ==========================================================================
       1. Theme Switcher (Dark / Light Mode)
       ========================================================================== */
    // Initialize Theme from localStorage or system preference
    const savedTheme = localStorage.getItem('pea_portal_theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('pea_portal_theme', newTheme);
        });
    }

    /* ==========================================================================
       2. Real-time Search & Category Filtering
       ========================================================================== */
    function filterSystems() {
        const query = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;
        const totalCards = systemCards.length;

        systemCards.forEach(card => {
            const nameData = card.getAttribute('data-name').toLowerCase();
            const categoryData = card.getAttribute('data-category');
            
            // Check text query match
            const matchesSearch = query === '' || nameData.includes(query);
            
            // Check category chip match
            const matchesCategory = currentCategory === 'all' || categoryData.includes(currentCategory);

            if (matchesSearch && matchesCategory) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Update Results Count Indicator
        if (resultsCountEl) {
            resultsCountEl.textContent = `กำลังแสดง ${visibleCount} จาก ${totalCards} ระบบ`;
        }

        // Toggle No Results Message
        if (visibleCount === 0) {
            noResultsEl.classList.remove('hidden');
        } else {
            noResultsEl.classList.add('hidden');
        }

        // Toggle Clear Search Button
        if (query.length > 0) {
            clearSearchBtn.classList.remove('hidden');
        } else {
            clearSearchBtn.classList.add('hidden');
        }
    }

    // Event Listeners for Search Input
    if (searchInput) {
        searchInput.addEventListener('input', filterSystems);
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            filterSystems();
            searchInput.focus();
        });
    }

    // Event Listeners for Category Filter Chips
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            currentCategory = chip.getAttribute('data-category');
            filterSystems();
        });
    });

    // Reset Search Button Click Handler
    if (resetSearchBtn) {
        resetSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentCategory = 'all';
            
            filterChips.forEach(c => c.classList.remove('active'));
            const allChip = document.querySelector('.filter-chip[data-category="all"]');
            if (allChip) allChip.classList.add('active');

            filterSystems();
        });
    }

    /* ==========================================================================
       3. Card Hover & Interactive Effects
       ========================================================================== */
    systemCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-6px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    /* ==========================================================================
       4. Visitor Counter (Mock implementation using localStorage)
       ========================================================================== */
    const visitorCountEl = document.getElementById('visitor-count');
    if (visitorCountEl) {
        let count = localStorage.getItem('pea_portal_visitor_count');
        // Initialize a baseline if it doesn't exist
        if (!count) {
            count = Math.floor(Math.random() * 50) + 100;
        }
        count = parseInt(count) + 1;
        localStorage.setItem('pea_portal_visitor_count', count);
        visitorCountEl.textContent = count.toLocaleString('th-TH');
    }
});
