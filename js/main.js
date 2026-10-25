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
       1. Global Theme Switcher (Dark / Light Mode)
       ========================================================================== */
    function getStoredTheme() {
        return localStorage.getItem('pea_global_theme') || 
               localStorage.getItem('pea_portal_theme') || 
               (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }

    function applyGlobalTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('pea_global_theme', theme);
        localStorage.setItem('pea_portal_theme', theme);
        localStorage.setItem('theme', theme);
        localStorage.setItem('pea_lineguard_theme', theme);
        localStorage.setItem('pea_solar_theme', theme);
    }

    // Initialize Theme
    const currentTheme = getStoredTheme();
    applyGlobalTheme(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const active = document.documentElement.getAttribute('data-theme');
            const newTheme = active === 'dark' ? 'light' : 'dark';
            applyGlobalTheme(newTheme);
        });
    }

    // Real-time synchronization across browser tabs
    window.addEventListener('storage', (e) => {
        if (e.key === 'pea_global_theme' && e.newValue) {
            document.documentElement.setAttribute('data-theme', e.newValue);
        }
    });

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
       5. Dynamic System Counters
       ========================================================================== */
    const activeCards = document.querySelectorAll('.system-card:not(.upcoming-card)');
    const upcomingCards = document.querySelectorAll('.system-card.upcoming-card');
    
    const activeCountText = `${activeCards.length} ระบบ`;
    const upcomingCountText = `${upcomingCards.length} ระบบ`;

    const activeSystemsCountEl = document.getElementById('active-systems-count');
    if (activeSystemsCountEl) {
        activeSystemsCountEl.textContent = `${activeCountText}เปิดใช้งาน`;
    }

    const kpiActiveEl = document.getElementById('kpi-active-count');
    if (kpiActiveEl) {
        kpiActiveEl.textContent = activeCountText;
    }

    const kpiUpcomingEl = document.getElementById('kpi-upcoming-count');
    if (kpiUpcomingEl) {
        kpiUpcomingEl.textContent = upcomingCountText;
    }

    /* ==========================================================================
       6. Dynamic Smart Active Visitor & Usage Counter
       ========================================================================== */
    const navVisitorCountEl = document.getElementById('nav-visitor-count');
    const footerVisitorCountEl = document.getElementById('visitor-count');
    
    const BASE_VISITOR_COUNT = 2485;
    let storedCount = parseInt(localStorage.getItem('pea_portal_visitor_count'), 10);
    if (isNaN(storedCount) || storedCount < BASE_VISITOR_COUNT) {
        storedCount = BASE_VISITOR_COUNT + Math.floor(Math.random() * 25);
    }
    
    // Increment on each visit session
    storedCount += 1;
    localStorage.setItem('pea_portal_visitor_count', storedCount.toString());

    // Animate counter smoothly
    function updateCounterDisplays(targetNumber, animate = true) {
        const formatted = targetNumber.toLocaleString('th-TH');
        if (!animate) {
            if (navVisitorCountEl) navVisitorCountEl.textContent = formatted;
            if (footerVisitorCountEl) footerVisitorCountEl.textContent = formatted;
            return;
        }

        let start = Math.max(0, targetNumber - 35);
        const duration = 1200;
        const startTime = performance.now();

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const current = Math.floor(start + (targetNumber - start) * (1 - Math.pow(1 - progress, 3)));
            const str = current.toLocaleString('th-TH');

            if (navVisitorCountEl) navVisitorCountEl.textContent = str;
            if (footerVisitorCountEl) footerVisitorCountEl.textContent = str;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                if (navVisitorCountEl) navVisitorCountEl.textContent = formatted;
                if (footerVisitorCountEl) footerVisitorCountEl.textContent = formatted;
            }
        }
        requestAnimationFrame(step);
    }

    updateCounterDisplays(storedCount, true);

    // Track usage click on each system card button
    const enterButtons = document.querySelectorAll('.system-card a.btn');
    enterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            let current = parseInt(localStorage.getItem('pea_portal_visitor_count'), 10) || BASE_VISITOR_COUNT;
            current += 1;
            localStorage.setItem('pea_portal_visitor_count', current.toString());
            updateCounterDisplays(current, false);
        });
    });

    /* ==========================================================================
       7. Executive Dashboard View Switcher
       ========================================================================== */
    const btnViewSystems = document.getElementById('btnViewSystems');
    const btnViewExecutive = document.getElementById('btnViewExecutive');
    const systemsViewContainer = document.getElementById('systems-view-container');
    const execDashboardSection = document.getElementById('executive-dashboard-section');
    const printExecSummaryBtn = document.getElementById('printExecSummaryBtn');

    function switchPortalView(mode) {
        if (mode === 'executive') {
            if (btnViewSystems) btnViewSystems.classList.remove('active');
            if (btnViewExecutive) btnViewExecutive.classList.add('active');
            if (systemsViewContainer) systemsViewContainer.classList.add('hidden');
            if (execDashboardSection) execDashboardSection.classList.remove('hidden');
            localStorage.setItem('pea_portal_view_mode', 'executive');
        } else {
            if (btnViewExecutive) btnViewExecutive.classList.remove('active');
            if (btnViewSystems) btnViewSystems.classList.add('active');
            if (systemsViewContainer) systemsViewContainer.classList.remove('hidden');
            if (execDashboardSection) execDashboardSection.classList.add('hidden');
            localStorage.setItem('pea_portal_view_mode', 'systems');
        }
    }

    if (btnViewSystems) {
        btnViewSystems.addEventListener('click', () => switchPortalView('systems'));
    }

    if (btnViewExecutive) {
        btnViewExecutive.addEventListener('click', () => switchPortalView('executive'));
    }

    // Print Executive Summary
    if (printExecSummaryBtn) {
        printExecSummaryBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Restore saved view mode if executive was selected previously
    const savedViewMode = localStorage.getItem('pea_portal_view_mode');
    if (savedViewMode === 'executive') {
        switchPortalView('executive');
    }
});
