/**
 * KATHAN PARIKH - PORTFOLIO INTERACTION ENGINE
 * Accessible, lightweight, zero dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. DYNAMIC COPYRIGHT YEAR
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. STICKY NAVBAR SCROLL STATE
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 3. MOBILE MENU TOGGLE (ACCESSIBLE)
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        const toggleMenu = () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('open');
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        };

        const closeMenu = () => {
            mobileToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        };

        mobileToggle.addEventListener('click', toggleMenu);

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    closeMenu();
                }
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                closeMenu();
                mobileToggle.focus();
            }
        });
    }

    // 4. ACTIVE NAV LINK TRACKING (INTERSECTION OBSERVER)
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    if ('IntersectionObserver' in window && sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navItems.forEach(item => {
                        const href = item.getAttribute('href');
                        if (href === `#${id}`) {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(sec => observer.observe(sec));
    }

    // 5. HERO TERMINAL INTERACTIVE TABS
    const tabButtons = document.querySelectorAll('.tab-btn');
    const terminalBody = document.querySelector('.terminal-body');

    const tabData = {
        'crm': {
            title: 'kathan@automation-engine:~/crm-modules',
            pipeline: [
                { num: '01', name: 'CRM Platform Webhook Triggered', desc: 'Custom module intercepts student enrollment & administrative event', status: 'OK' },
                { num: '02', name: 'Python Automation Pipeline', desc: 'Validation script cleans input payload, handles edge cases, checks schema', status: 'ACTIVE' },
                { num: '03', name: 'Google Apps Script Synchronization', desc: 'Syncs student metadata across college databases & internal sheets', status: 'SYNCED' },
                { num: '04', name: 'Operational State Verification', desc: 'Automated notification dispatched; zero manual data entry required', status: 'COMPLETE' }
            ],
            metrics: [
                { val: '100%', lbl: 'Data Accuracy' },
                { val: '0 manual', lbl: 'Repetitive Steps' },
                { val: '< 150ms', lbl: 'Script Runtime' }
            ]
        },
        'support': {
            title: 'kathan@support-desk:~/incident-triage',
            pipeline: [
                { num: '01', name: 'User Access & Login Issue Reported', desc: 'Student encounters authentication deadlock or portal permission glitch', status: 'TRIAGED' },
                { num: '02', name: 'Diagnostic Root Cause Analysis', desc: 'Inspect session tokens, credential validity & access group permissions', status: 'RESOLVED' },
                { num: '03', name: 'Bug Patch & Platform Fix', desc: 'Reproduce edge condition, apply bug fix, and update system documentation', status: 'PATCHED' },
                { num: '04', name: 'Empathetic User Communication', desc: 'Provide step-by-step resolution guidance with verified login confirmation', status: 'CLOSED' }
            ],
            metrics: [
                { val: '< 2 hrs', lbl: 'Issue Resolution' },
                { val: '99.8%', lbl: 'Student Satisfaction' },
                { val: 'Root Cause', lbl: 'Documentation' }
            ]
        },
        'fullstack': {
            title: 'kathan@dev-env:~/fullstack-projects',
            pipeline: [
                { num: '01', name: 'SoccerConnect Capstone Architecture', desc: 'Next.js + TypeScript frontend connected to Node.js backend on Vercel', status: 'LIVE' },
                { num: '02', name: 'RESTful API Engineering', desc: 'Food Management API with Express.js routing, token auth & CRUD endpoints', status: 'HEALTHY' },
                { num: '03', name: 'Real-Time WebSocket Engine', desc: 'Socket.IO event bus for bi-directional client-server messaging', status: 'CONNECTED' },
                { num: '04', name: 'Continuous Integration / DevOps', desc: 'GitHub Actions workflow testing pull requests and deploying builds', status: 'PASSING' }
            ],
            metrics: [
                { val: 'Next.js/TS', lbl: 'Modern Stack' },
                { val: 'REST & WS', lbl: 'Protocol Fluency' },
                { val: 'CI/CD', lbl: 'Automated Testing' }
            ]
        }
    };

    if (tabButtons.length > 0 && terminalBody) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetKey = btn.getAttribute('data-tab');
                if (!tabData[targetKey]) return;

                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const data = tabData[targetKey];
                const titleElem = document.querySelector('.terminal-title');
                if (titleElem) titleElem.textContent = data.title;

                let pipelineHtml = '<div class="workflow-pipeline">';
                data.pipeline.forEach(p => {
                    pipelineHtml += `
                        <div class="pipe-step">
                            <span class="pipe-num">${p.num}</span>
                            <div class="pipe-content">
                                <div class="pipe-name">
                                    <span>${p.name}</span>
                                    <span class="pipe-status">● ${p.status}</span>
                                </div>
                                <div class="pipe-desc">${p.desc}</div>
                            </div>
                        </div>
                    `;
                });
                pipelineHtml += '</div>';

                let metricsHtml = '<div class="terminal-footer-metrics">';
                data.metrics.forEach(m => {
                    metricsHtml += `
                        <div class="metric-box">
                            <div class="metric-val">${m.val}</div>
                            <div class="metric-lbl">${m.lbl}</div>
                        </div>
                    `;
                });
                metricsHtml += '</div>';

                terminalBody.innerHTML = pipelineHtml + metricsHtml;
            });
        });
    }

    // 6. CLIPBOARD COPY UTILITY WITH ACCESSIBLE TOAST
    const copyButtons = document.querySelectorAll('.copy-btn');
    const toast = document.getElementById('toast');

    const showToast = (message) => {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    };

    copyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            try {
                await navigator.clipboard.writeText(textToCopy);
                showToast(`✓ Copied: ${textToCopy}`);
            } catch (err) {
                // Fallback
                const tempInput = document.createElement('input');
                tempInput.value = textToCopy;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                showToast(`✓ Copied: ${textToCopy}`);
            }
        });
    });
});
