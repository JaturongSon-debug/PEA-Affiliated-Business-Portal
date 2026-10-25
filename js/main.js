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
       6. Dynamic Smart Active Visitor & Usage Counter (Starts fresh from 0)
       ========================================================================== */
    const navVisitorCountEl = document.getElementById('nav-visitor-count');
    const footerVisitorCountEl = document.getElementById('visitor-count');
    
    // Increment visitor count via PEATracker
    let currentVisitorCount = 0;
    if (window.PEATracker) {
        currentVisitorCount = window.PEATracker.incrementVisitor();
    } else {
        currentVisitorCount = parseInt(localStorage.getItem('pea_portal_visitor_count'), 10) || 1;
    }

    // Animate counter smoothly
    function updateCounterDisplays(targetNumber, animate = true) {
        const formatted = targetNumber.toLocaleString('th-TH');
        if (!animate) {
            if (navVisitorCountEl) navVisitorCountEl.textContent = formatted;
            if (footerVisitorCountEl) footerVisitorCountEl.textContent = formatted;
            return;
        }

        let start = Math.max(0, targetNumber - 10);
        const duration = 800;
        const startTime = performance.now();

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
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

    updateCounterDisplays(currentVisitorCount, true);

    // Track usage click on each system card button
    const enterButtons = document.querySelectorAll('.system-card a.btn, .biz-quick-link');
    enterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const href = btn.getAttribute('href') || '';
            let key = 'general';
            if (href.includes('Gen Estiment')) key = 'generator';
            else if (href.includes('Line Guard')) key = 'lineguard';
            else if (href.includes('Solar Estimate')) key = 'solar';
            else if (href.includes('Tranformer Estimate')) key = 'transformer';

            if (window.PEATracker) {
                window.PEATracker.recordSystemClick(key);
                updateCounterDisplays(window.PEATracker.getVisitorCount(), false);
                renderExecutiveDashboard();
            }
        });
    });

    /* ==========================================================================
       7. Executive Dashboard Dynamic Real-Time Metrics (Starting from 0)
       ========================================================================== */
    function renderExecutiveDashboard() {
        if (!window.PEATracker) return;
        const metrics = window.PEATracker.getMetrics();
        
        // 1. Total Estimated Value
        const totalValEl = document.getElementById('exec-total-value');
        const trendValEl = document.getElementById('exec-trend-value');
        if (totalValEl) {
            if (metrics.totalAmount >= 1000000) {
                const millions = (metrics.totalAmount / 1000000).toFixed(2);
                totalValEl.innerHTML = `${millions} <span class="exec-unit">ล้านบาท</span>`;
            } else {
                totalValEl.innerHTML = `${metrics.totalAmount.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span class="exec-unit">บาท</span>`;
            }
        }
        if (trendValEl) {
            if (metrics.totalDocs > 0) {
                trendValEl.className = 'exec-trend positive';
                trendValEl.innerHTML = `<i class="fa-solid fa-arrow-trend-up"></i> ยอดสะสมจริงจาก ${metrics.totalDocs} ฉบับ`;
            } else {
                trendValEl.className = 'exec-trend';
                trendValEl.innerHTML = `<i class="fa-solid fa-clock"></i> รอการเริ่มบันทึกจากระบบคำนวณ`;
            }
        }

        // 2. Total Docs Issued
        const totalDocsEl = document.getElementById('exec-total-docs');
        const trendDocsEl = document.getElementById('exec-trend-docs');
        if (totalDocsEl) {
            totalDocsEl.innerHTML = `${metrics.totalDocs.toLocaleString('th-TH')} <span class="exec-unit">ฉบับ</span>`;
        }
        if (trendDocsEl) {
            if (metrics.totalDocs > 0) {
                trendDocsEl.className = 'exec-trend positive';
                trendDocsEl.innerHTML = `<i class="fa-solid fa-bolt"></i> ออกเอกสารแล้ว ${metrics.totalDocs} ฉบับ`;
            } else {
                trendDocsEl.className = 'exec-trend';
                trendDocsEl.innerHTML = `<i class="fa-solid fa-clock"></i> รอการออกเอกสารใบแรก`;
            }
        }

        // 3. Top Demanded System
        const topSysEl = document.getElementById('exec-top-system');
        const trendSysEl = document.getElementById('exec-trend-system');
        if (topSysEl) {
            topSysEl.textContent = metrics.topSystemName;
        }
        if (trendSysEl) {
            if (metrics.totalDocs > 0 || metrics.topSystemKey) {
                const cnt = metrics.systemCounts[metrics.topSystemKey] || 0;
                trendSysEl.className = 'exec-trend highlight';
                trendSysEl.innerHTML = `<i class="fa-solid fa-chart-pie"></i> คำขอประเมิน ${cnt} ฉบับ`;
            } else {
                trendSysEl.className = 'exec-trend';
                trendSysEl.innerHTML = `<i class="fa-solid fa-chart-pie"></i> รอข้อมูลการใช้งานจริง`;
            }
        }

        // 4. Time Saved
        const timeSavedEl = document.getElementById('exec-time-saved');
        const trendTimeEl = document.getElementById('exec-trend-time');
        if (timeSavedEl) {
            if (metrics.timeSavedMinutes >= 60) {
                const hrs = (metrics.timeSavedMinutes / 60).toFixed(1);
                timeSavedEl.innerHTML = `~${hrs} <span class="exec-unit">ชั่วโมง</span>`;
            } else {
                timeSavedEl.innerHTML = `~${Math.round(metrics.timeSavedMinutes)} <span class="exec-unit">นาที</span>`;
            }
        }
        if (trendTimeEl) {
            if (metrics.totalDocs > 0) {
                trendTimeEl.className = 'exec-trend positive';
                trendTimeEl.innerHTML = `<i class="fa-solid fa-check-double"></i> เร็วขึ้นเฉลี่ย 88% (~26.5 นาที/เคส)`;
            } else {
                trendTimeEl.className = 'exec-trend';
                trendTimeEl.innerHTML = `<i class="fa-solid fa-check-double"></i> ประหยัดเฉลี่ย ~26.5 นาที/เคส`;
            }
        }

        // 5. Individual Business Cards
        const bSolar = document.getElementById('biz-stat-solar-docs');
        if (bSolar) {
            bSolar.textContent = `${metrics.systemCounts.solar} ฉบับ (${metrics.systemAmounts.solar.toLocaleString('th-TH', { minimumFractionDigits: 2 })} บาท)`;
        }
        const bTf = document.getElementById('biz-stat-transformer-docs');
        if (bTf) {
            bTf.textContent = `${metrics.systemCounts.transformer} ฉบับ (${metrics.systemAmounts.transformer.toLocaleString('th-TH', { minimumFractionDigits: 2 })} บาท)`;
        }
        const bGen = document.getElementById('biz-stat-generator-docs');
        if (bGen) {
            bGen.textContent = `${metrics.systemCounts.generator} ฉบับ (${metrics.systemAmounts.generator.toLocaleString('th-TH', { minimumFractionDigits: 2 })} บาท)`;
        }
        const bLg = document.getElementById('biz-stat-lineguard-docs');
        if (bLg) {
            bLg.textContent = `${metrics.systemCounts.lineguard} ฉบับ (${metrics.systemAmounts.lineguard.toLocaleString('th-TH', { minimumFractionDigits: 2 })} บาท)`;
        }
    }

    renderExecutiveDashboard();

    // Listen to real-time events from sub-systems
    window.addEventListener('pea_tracker_updated', () => {
        renderExecutiveDashboard();
        if (window.PEATracker) {
            updateCounterDisplays(window.PEATracker.getVisitorCount(), false);
        }
    });

    window.addEventListener('storage', (e) => {
        if (e.key === 'pea_portal_estimates_log' || e.key === 'pea_portal_visitor_count' || e.key === 'pea_portal_system_clicks') {
            renderExecutiveDashboard();
            if (window.PEATracker) {
                updateCounterDisplays(window.PEATracker.getVisitorCount(), false);
            }
        }
    });

    /* ==========================================================================
       8. Executive Dashboard View Switcher
       ========================================================================== */
    const btnViewSystems = document.getElementById('btnViewSystems');
    const btnViewExecutive = document.getElementById('btnViewExecutive');
    const systemsViewContainer = document.getElementById('systems-view-container');
    const systemsSection = document.querySelector('.systems-section');
    const execDashboardSection = document.getElementById('executive-dashboard-section');
    const printExecSummaryBtn = document.getElementById('printExecSummaryBtn');

    function switchPortalView(mode) {
        if (mode === 'executive') {
            if (btnViewSystems) btnViewSystems.classList.remove('active');
            if (btnViewExecutive) btnViewExecutive.classList.add('active');
            if (systemsViewContainer) systemsViewContainer.classList.add('hidden');
            if (systemsSection) systemsSection.classList.add('hidden');
            if (execDashboardSection) execDashboardSection.classList.remove('hidden');
            localStorage.setItem('pea_portal_view_mode', 'executive');
            renderExecutiveDashboard();
        } else {
            if (btnViewExecutive) btnViewExecutive.classList.remove('active');
            if (btnViewSystems) btnViewSystems.classList.add('active');
            if (systemsViewContainer) systemsViewContainer.classList.remove('hidden');
            if (systemsSection) systemsSection.classList.remove('hidden');
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
