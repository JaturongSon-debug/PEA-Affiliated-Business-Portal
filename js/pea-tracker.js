/**
 * PEA Affiliated Business Portal - Unified Real-Time Usage & Estimate Tracker
 * Tracks live visitors, clicks, and genuine estimate calculations from 0.
 */
(function(window) {
    'use strict';

    const STORAGE_KEY_VISITORS = 'pea_portal_visitor_count';
    const STORAGE_KEY_LOGS = 'pea_portal_estimates_log';
    const STORAGE_KEY_CLICKS = 'pea_portal_system_clicks';

    const PEATracker = {
        // Clean out legacy mock data (> 2000 from previous demo seeds) to start fresh from 0
        init() {
            try {
                const rawVis = localStorage.getItem(STORAGE_KEY_VISITORS);
                if (rawVis && parseInt(rawVis, 10) >= 2000) {
                    // Wipe legacy mock baseline
                    localStorage.removeItem(STORAGE_KEY_VISITORS);
                }
            } catch (e) {
                console.warn('PEATracker init error', e);
            }
        },

        getVisitorCount() {
            try {
                const val = parseInt(localStorage.getItem(STORAGE_KEY_VISITORS), 10);
                return isNaN(val) ? 0 : val;
            } catch (e) {
                return 0;
            }
        },

        incrementVisitor() {
            try {
                let count = this.getVisitorCount();
                count += 1;
                localStorage.setItem(STORAGE_KEY_VISITORS, count.toString());
                window.dispatchEvent(new CustomEvent('pea_tracker_updated', { detail: { type: 'visitor', count } }));
                return count;
            } catch (e) {
                return 1;
            }
        },

        recordSystemClick(systemKey) {
            try {
                let clicks = JSON.parse(localStorage.getItem(STORAGE_KEY_CLICKS) || '{}');
                clicks[systemKey] = (clicks[systemKey] || 0) + 1;
                localStorage.setItem(STORAGE_KEY_CLICKS, JSON.stringify(clicks));
                this.incrementVisitor();
                window.dispatchEvent(new CustomEvent('pea_tracker_updated', { detail: { type: 'click', systemKey, clicks } }));
            } catch (e) {
                console.warn('recordSystemClick error', e);
            }
        },

        getSystemClicks() {
            try {
                return JSON.parse(localStorage.getItem(STORAGE_KEY_CLICKS) || '{}');
            } catch (e) {
                return {};
            }
        },

        recordEstimate({ systemKey, systemName, amount, details }) {
            try {
                let logs = JSON.parse(localStorage.getItem(STORAGE_KEY_LOGS) || '[]');
                const parsedAmount = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
                
                const now = new Date();
                const thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
                const thaiDateStr = `${now.getDate()} ${thaiMonths[now.getMonth()]} ${now.getFullYear() + 543} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} น.`;

                const record = {
                    id: 'EST-' + Date.now(),
                    timestamp: now.toISOString(),
                    dateStr: thaiDateStr,
                    systemKey: systemKey || 'general',
                    systemName: systemName || 'ระบบประมาณการ กฟภ.',
                    amount: parsedAmount,
                    details: details || ''
                };

                logs.unshift(record); // Prepend so newest is first
                localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));
                
                window.dispatchEvent(new CustomEvent('pea_tracker_updated', { detail: { type: 'estimate', record } }));
                return record;
            } catch (e) {
                console.error('recordEstimate error', e);
                return null;
            }
        },

        getEstimates() {
            try {
                return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGS) || '[]');
            } catch (e) {
                return [];
            }
        },

        getMetrics() {
            const logs = this.getEstimates();
            const clicks = this.getSystemClicks();
            
            let totalAmount = 0;
            const systemCounts = {
                solar: 0,
                transformer: 0,
                generator: 0,
                lineguard: 0
            };
            const systemAmounts = {
                solar: 0,
                transformer: 0,
                generator: 0,
                lineguard: 0
            };

            logs.forEach(log => {
                const amt = parseFloat(log.amount) || 0;
                totalAmount += amt;
                const k = log.systemKey;
                if (systemCounts[k] !== undefined) {
                    systemCounts[k] += 1;
                    systemAmounts[k] += amt;
                }
            });

            // Calculate most demanded system: based on estimate documents issued first, fallback to clicks
            const systemLabels = {
                solar: 'Solar Rooftop',
                transformer: 'บำรุงรักษาหม้อแปลง',
                generator: 'บริการเครื่องกำเนิดไฟฟ้า',
                lineguard: 'ฉนวนครอบสาย Line Guard'
            };

            let topKey = null;
            let topScore = 0;
            const keys = ['solar', 'transformer', 'generator', 'lineguard'];

            keys.forEach(k => {
                // Documents count weight 10, Clicks weight 1
                const score = (systemCounts[k] * 10) + (clicks[k] || 0);
                if (score > topScore) {
                    topScore = score;
                    topKey = k;
                }
            });

            return {
                totalDocs: logs.length,
                totalAmount: totalAmount,
                topSystemKey: topKey,
                topSystemName: topKey ? systemLabels[topKey] : '-',
                timeSavedMinutes: logs.length * 26.5,
                systemCounts,
                systemAmounts,
                clicks,
                visitorCount: this.getVisitorCount(),
                recentLogs: logs.slice(0, 10)
            };
        }
    };

    PEATracker.init();
    window.PEATracker = PEATracker;
})(window);
