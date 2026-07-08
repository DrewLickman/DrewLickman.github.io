// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initAnalytics();
    initNavbar();
    initThemeToggle();
    initScrollReveal();
    initTypingEffect();
    initParticles();
    initProjectFilter();
    initTimelineModals();
    initBackToTop();
    initContactForm();
    initProjectModals();
});

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Lightweight click analytics (privacy-friendly, no network requests)
// Stores counts in localStorage and logs to console for manual review.
function initAnalytics() {
    const STORAGE_KEY = 'dl_site_metrics_v1';

    function readMetrics() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
        } catch {
            return {};
        }
    }

    function writeMetrics(metrics) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(metrics));
        } catch {
            // Ignore storage failures (private mode / disabled storage)
        }
    }

    function increment(eventName, extras = {}) {
        const metrics = readMetrics();
        metrics[eventName] = (metrics[eventName] || 0) + 1;
        metrics._last = { eventName, ...extras, at: new Date().toISOString() };
        writeMetrics(metrics);
        console.info('[metrics]', eventName, { count: metrics[eventName], ...extras });
    }

    // Expose for manual inspection in DevTools:
    // window.DL_metrics()
    window.DL_metrics = () => readMetrics();

    document.addEventListener('click', (e) => {
        const el = e.target.closest('[data-metric]');
        if (!el) return;

        const metric = el.getAttribute('data-metric');
        if (!metric) return;

        const extras = {};
        if (el.tagName === 'A') {
            extras.href = el.getAttribute('href') || '';
        }

        increment(metric, extras);
    });
}

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksList = document.querySelectorAll('.nav-link');
    
    // Add scrolled class to navbar when scrolling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        const isOpen = navLinks.classList.contains('active');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });
    
    // Close mobile menu when clicking a link
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Open navigation menu');
        });
    });
    
    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (prefersReducedMotion()) {
        revealElements.forEach((element) => element.classList.add('active'));
        return;
    }
    
    const revealHandler = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 0;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    // Initial check
    revealHandler();
    
    // Check on scroll
    window.addEventListener('scroll', revealHandler);
}

// Typing effect for the hero section
function initTypingEffect() {
    const typingText = document.getElementById('typingText');
    const cursor = document.querySelector('.cursor');
    
    if (!typingText) return;
    if (prefersReducedMotion()) {
        typingText.textContent = 'Tech Support';
        if (cursor) cursor.style.display = 'none';
        return;
    }
    
    const phrases = [
        'Tech Support',
        'Python',
        'JavaScript',
        'C#',
        'Machine Learning',
        'NLP',
        'Game Development'
    ];
    
    // Split text into grapheme clusters (handles emojis properly)
    // Using spread operator which respects Unicode grapheme clusters
    function splitIntoGraphemes(text) {
        return [...text];
    }
    
    // Check if a character is likely an emoji (simple heuristic)
    function isEmoji(char) {
        const code = char.codePointAt(0);
        return (
            (code >= 0x1F300 && code <= 0x1F9FF) || // Misc Symbols and Pictographs
            (code >= 0x2600 && code <= 0x26FF) ||   // Misc symbols
            (code >= 0x2700 && code <= 0x27BF) ||   // Dingbats
            (code >= 0x1F600 && code <= 0x1F64F) || // Emoticons
            (code >= 0x1F680 && code <= 0x1F6FF) || // Transport and Map
            (code >= 0x1F1E0 && code <= 0x1F1FF) || // Regional indicators
            (code >= 0x1F900 && code <= 0x1F9FF) || // Supplemental Symbols and Pictographs
            (code >= 0x1FA00 && code <= 0x1FAFF)    // Symbols and Pictographs Extended-A
        );
    }
    
    let phraseIndex = 0;
    let graphemeIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    let currentGraphemes = [];
    
    const typeEffect = () => {
        const currentPhrase = phrases[phraseIndex];
        
        // Initialize graphemes if needed
        if (currentGraphemes.length === 0) {
            currentGraphemes = splitIntoGraphemes(currentPhrase);
        }
        
        if (isDeleting) {
            // Removing characters
            if (graphemeIndex > 0) {
                graphemeIndex--;
            }
            typingText.textContent = currentGraphemes.slice(0, graphemeIndex).join('');
        } else {
            // Adding characters
            if (graphemeIndex < currentGraphemes.length) {
                const nextChar = currentGraphemes[graphemeIndex];
                
                // Add the next grapheme (emoji or character)
                // Using grapheme-aware splitting ensures emojis are added as complete units
                graphemeIndex++;
                typingText.textContent = currentGraphemes.slice(0, graphemeIndex).join('');
            }
        }
        
        // Blinking cursor
        cursor.style.display = 'inline-block';
        
        // Use faster speed for emojis to make them appear instantly
        let typeSpeed = isDeleting ? 50 : 100;
        if (!isDeleting && graphemeIndex > 0 && graphemeIndex <= currentGraphemes.length) {
            const lastChar = currentGraphemes[graphemeIndex - 1];
            if (isEmoji(lastChar)) {
                typeSpeed = 0; // Instant for emojis
            }
        }
        
        // Check if finished typing
        if (!isDeleting && graphemeIndex >= currentGraphemes.length) {
            // Finished typing current phrase
            isWaiting = true;
            setTimeout(() => {
                isDeleting = true;
                isWaiting = false;
                typeEffect();
            }, 1500);
            return;
        } else if (isDeleting && graphemeIndex === 0) {
            // Finished deleting current phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            graphemeIndex = 0;
            currentGraphemes = [];
        }
        
        if (!isWaiting) {
            setTimeout(typeEffect, typeSpeed);
        }
    };
    
    // Start the typing effect
    setTimeout(typeEffect, 1000);
}

// Initialize particles for hero section
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    
    if (!particlesContainer) return;
    if (prefersReducedMotion()) {
        particlesContainer.setAttribute('aria-hidden', 'true');
        particlesContainer.style.display = 'none';
        return;
    }
    
    // Configuration for the particles
    const particlesConfig = {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: document.body.classList.contains('dark-mode') ? '#4da8ff' : '#3498db'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: document.body.classList.contains('dark-mode') ? '#4da8ff' : '#3498db',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    };
    
    // Initialize particles.js with config
    if (window.particlesJS) {
        window.particlesJS('particles', particlesConfig);
        
        // Update particle colors when theme changes
        document.getElementById('themeToggle').addEventListener('click', () => {
            const isDarkMode = document.body.classList.contains('dark-mode');
            const color = isDarkMode ? '#4da8ff' : '#3498db';
            
            if (window.pJSDom && window.pJSDom[0]) {
                window.pJSDom[0].pJS.particles.color.value = color;
                window.pJSDom[0].pJS.particles.line_linked.color = color;
                window.pJSDom[0].pJS.fn.particlesRefresh();
            }
        });
    } else {
        // Fallback if particles.js is not loaded
        console.warn('particles.js not loaded, using fallback');
        
        // Create some basic CSS particles as fallback
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = `${Math.random() * 5 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = document.body.classList.contains('dark-mode') ? '#4da8ff' : '#3498db';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particlesContainer.appendChild(particle);
            
            // Animate particles
            animateParticle(particle);
        }
    }
}

// Animate a single particle for the fallback
function animateParticle(particle) {
    const duration = Math.random() * 15 + 5;
    const xMove = Math.random() * 40 - 20;
    const yMove = Math.random() * 40 - 20;
    
    particle.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;
    particle.style.transform = `translate(${xMove}vw, ${yMove}vh)`;
    
    setTimeout(() => {
        particle.style.opacity = '0';
        
        setTimeout(() => {
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.transform = 'translate(0, 0)';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            
            // Recursively animate
            animateParticle(particle);
        }, duration * 1000);
    }, duration * 500);
}

// Project filtering functionality
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length === 0 || projectCards.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get the filter value
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter projects instantly (no delayed animation)
            projectCards.forEach(card => {
                const shouldShow = filterValue === 'all' || card.getAttribute('data-category') === filterValue;
                card.style.display = shouldShow ? 'block' : 'none';
                card.style.opacity = '';
                card.style.transform = '';
                card.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
            });
        });
    });
}

// Timeline item modal functionality (similar to project modals)
function initTimelineModals() {
    const timelineBoxes = document.querySelectorAll('.timeline-content-box[role="button"]');
    const modal = document.getElementById('timelineModal');
    if (!modal || timelineBoxes.length === 0) return;

    const modalContent = modal.querySelector('.modal-body');
    const modalClose = modal.querySelector('.modal-close');
    let lastFocusedElement = null;

    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');

    function getFocusableElements() {
        return Array.from(
            modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
    }

    function onModalKeydown(e) {
        if (e.key !== 'Tab' || !modal.classList.contains('active')) return;
        const focusable = getFocusableElements();
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        modal.removeEventListener('keydown', onModalKeydown);
        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    };

    modalClose?.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    function openTimelineModal(box) {
        lastFocusedElement = document.activeElement;
        const item = box.closest('.timeline-item');
        const date = item?.querySelector('.timeline-date')?.textContent?.trim() || '';

        const title = box.querySelector('h3')?.textContent?.trim() || '';
        const org = box.querySelector('h4')?.textContent?.trim() || '';
        const fullHtml = box.querySelector('.timeline-full')?.innerHTML || box.querySelector('.timeline-details')?.outerHTML || '';

        modalContent.innerHTML = `
            <div class="modal-timeline">
                <h2>${title}</h2>
                <div class="modal-timeline-meta">${org}${org && date ? ' • ' : ''}${date}</div>
                <div class="modal-timeline-body">
                    ${fullHtml}
                </div>
            </div>
        `;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        modal.addEventListener('keydown', onModalKeydown);
        modalClose?.focus();
    }

    timelineBoxes.forEach((box) => {
        box.addEventListener('click', (e) => {
            // Don't open modal if clicking a link
            if (e.target.closest('a')) return;
            openTimelineModal(box);
        });

        box.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openTimelineModal(box);
            }
        });
    });
}

// Back to top button functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion() ? 'auto' : 'smooth'
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    const statusEl = document.getElementById('contactFormStatus');
    const copyBtn = document.getElementById('contactCopyBtn');
    const gmailBtn = document.getElementById('contactGmailBtn');
    const outlookBtn = document.getElementById('contactOutlookBtn');
    const mailtoBtn = document.getElementById('contactMailtoBtn');

    function setStatus(text) {
        if (!statusEl) return;
        statusEl.textContent = text;
    }

    function composeMessage() {
        const name = (contactForm.querySelector('#name')?.value || '').trim();
        const email = (contactForm.querySelector('#email')?.value || '').trim();
        const subject = (contactForm.querySelector('#subject')?.value || '').trim();
        const message = (contactForm.querySelector('#message')?.value || '').trim();

        if (!name || !email || !subject || !message) {
            alert('Please fill out all fields before sending.');
            return null;
        }

        const to = 'contact.drew.business@gmail.com';
        const mailSubject = `[Website] ${subject}`;
        const body =
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `${message}\n`;

        const encodedTo = encodeURIComponent(to);
        const encodedSubject = encodeURIComponent(mailSubject);
        const encodedBody = encodeURIComponent(body);

        return {
            to,
            subject: mailSubject,
            body,
            mailto: `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`,
            gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`,
            outlook: `https://outlook.office.com/mail/deeplink/compose?to=${encodedTo}&subject=${encodedSubject}&body=${encodedBody}`
        };
    }

    async function copyToClipboard(payload) {
        if (!navigator.clipboard?.writeText) {
            setStatus('Copy not supported in this browser. Use Gmail/Outlook or email me directly.');
            return false;
        }

        try {
            await navigator.clipboard.writeText(payload);
            return true;
        } catch {
            return false;
        }
    }

    contactForm.addEventListener('submit', async (e) => {
        // If the user hits Enter, default to Copy (most reliable).
        e.preventDefault();
        const composed = composeMessage();
        if (!composed) return;

        const payload = `To: ${composed.to}\nSubject: ${composed.subject}\n\n${composed.body}`;
        const ok = await copyToClipboard(payload);
        setStatus(ok ? 'Copied to clipboard.' : 'Copy failed. Try Gmail/Outlook or email me directly.');
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const composed = composeMessage();
            if (!composed) return;
            const payload = `To: ${composed.to}\nSubject: ${composed.subject}\n\n${composed.body}`;
            const ok = await copyToClipboard(payload);
            setStatus(ok ? 'Copied to clipboard.' : 'Copy failed. Try Gmail/Outlook or email me directly.');
        });
    }

    if (gmailBtn) {
        gmailBtn.addEventListener('click', async () => {
            const composed = composeMessage();
            if (!composed) return;
            const payload = `To: ${composed.to}\nSubject: ${composed.subject}\n\n${composed.body}`;
            await copyToClipboard(payload);
            window.open(composed.gmail, '_blank', 'noopener');
            setStatus('Opened Gmail (and copied the message).');
        });
    }

    if (outlookBtn) {
        outlookBtn.addEventListener('click', async () => {
            const composed = composeMessage();
            if (!composed) return;
            const payload = `To: ${composed.to}\nSubject: ${composed.subject}\n\n${composed.body}`;
            await copyToClipboard(payload);
            window.open(composed.outlook, '_blank', 'noopener');
            setStatus('Opened Outlook (and copied the message).');
        });
    }

    if (mailtoBtn) {
        mailtoBtn.addEventListener('click', async () => {
            const composed = composeMessage();
            if (!composed) return;
            const payload = `To: ${composed.to}\nSubject: ${composed.subject}\n\n${composed.body}`;
            await copyToClipboard(payload);
            window.location.href = composed.mailto;
            setStatus('Tried to open your mail app (and copied the message).');
        });
    }
}

// Project modal functionality
function initProjectModals() {
    const projectsGrid = document.querySelector('.projects-grid');
    const modal = document.getElementById('projectModal');
    const PROJECTS = window.PROJECTS || {};
    
    if (!modal || !projectsGrid) return;
    
    const modalContent = modal.querySelector('.modal-body');
    const modalClose = modal.querySelector('.modal-close');
    let lastFocusedElement = null;

    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');

    function getFocusableElements() {
        return Array.from(
            modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
    }

    function onModalKeydown(e) {
        if (e.key !== 'Tab' || !modal.classList.contains('active')) return;
        const focusable = getFocusableElements();
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        modal.removeEventListener('keydown', onModalKeydown);
        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    };
    
    // Close modal when clicking the close button
    modalClose.addEventListener('click', closeModal);

    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function buildProjectFromCard(card) {
        const links = {};
        card.querySelectorAll('.project-link').forEach((link) => {
            const href = link.getAttribute('href') || '';
            const label = link.textContent.toLowerCase();
            if (label.includes('demo')) links.demo = href;
            if (label.includes('code')) links.code = href;
        });

        return {
            title: card.querySelector('.project-title')?.textContent?.trim() || 'Project',
            subtitle: card.querySelector('.project-description')?.textContent?.trim() || '',
            problem: '',
            solution: '',
            impact: [],
            stack: Array.from(card.querySelectorAll('.project-tags .tag')).map((tag) => tag.textContent.trim()),
            role: '',
            links
        };
    }

    function renderProjectModal(project, imageSrc, tagsHtml, linksHtmlFallback) {
        const stackHtml = (project.stack || [])
            .map((t) => `<span class="tag">${t}</span>`)
            .join('');

        const impactHtml = (project.impact || [])
            .map((item) => `<li>${item}</li>`)
            .join('');

        const links = project.links || {};
        const linksHtml =
            links.demo || links.code
                ? `
                    ${links.demo ? `<a href="${links.demo}" target="_blank" rel="noopener noreferrer" class="project-link" data-metric="project_demo_click"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                    ${links.code ? `<a href="${links.code}" target="_blank" rel="noopener noreferrer" class="project-link" data-metric="project_code_click"><i class="fab fa-github"></i> View Code</a>` : ''}
                  `
                : linksHtmlFallback || '';

        modalContent.innerHTML = `
            <div class="modal-project">
                <div class="modal-project-image">
                    <img src="${imageSrc}" alt="${project.title}">
                </div>
                <div class="modal-project-info">
                    <h2>${project.title}</h2>
                    ${project.subtitle ? `<p class="modal-project-subtitle">${project.subtitle}</p>` : ''}
                    <div class="modal-project-tags">${stackHtml || tagsHtml || ''}</div>

                    <div class="modal-project-section">
                        <h3>Problem</h3>
                        <p>${project.problem || ''}</p>
                    </div>
                    <div class="modal-project-section">
                        <h3>Solution</h3>
                        <p>${project.solution || ''}</p>
                    </div>
                    <div class="modal-project-section">
                        <h3>Impact</h3>
                        <ul>${impactHtml}</ul>
                    </div>
                    <div class="modal-project-section">
                        <h3>My Role</h3>
                        <p>${project.role || ''}</p>
                    </div>

                    <div class="modal-project-links">
                        ${linksHtml}
                    </div>
                </div>
            </div>
        `;
    }

    function openProjectModal(card) {
        const projectId = card.getAttribute('data-project-id');
        const project = PROJECTS[projectId] || buildProjectFromCard(card);

        const title = card.querySelector('.project-title')?.textContent || project.title;
        const image = card.querySelector('.project-image img')?.src || '';
        const tags = card.querySelector('.project-tags')?.innerHTML || '';

        // Get links if available (fallback if data missing)
        let links = '';
        const projectLinks = card.querySelectorAll('.project-link');
        projectLinks.forEach(link => {
            links += link.outerHTML;
        });

        renderProjectModal({ ...project, title }, image, tags, links);
        lastFocusedElement = document.activeElement;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        modal.addEventListener('keydown', onModalKeydown);
        modalClose.focus();
    }

    const openFromCardEvent = (e) => {
        if (e.target.closest('a')) return;

        const card = e.target.closest('.project-card');
        if (!card) return;

        openProjectModal(card);
    };

    projectsGrid.addEventListener('click', openFromCardEvent);
    projectsGrid.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;

        const card = e.target.closest('.project-card');
        if (!card || e.target.closest('a')) return;

        e.preventDefault();
        openProjectModal(card);
    });
}
