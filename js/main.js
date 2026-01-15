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
    initTimeline();
    initTimelineModals();
    initBackToTop();
    initContactForm();
    initProjectModals();
});

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
    });
    
    // Close mobile menu when clicking a link
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
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
            
            // Filter projects
            projectCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
}

// Timeline tabs functionality
function initTimeline() {
    const timelineTabs = document.querySelectorAll('.timeline-tab');
    const timelineContents = document.querySelectorAll('.timeline-content');
    
    if (timelineTabs.length === 0 || timelineContents.length === 0) return;
    
    timelineTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            timelineTabs.forEach(tab => {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
            });
            
            // Add active class to clicked tab
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            
            // Get the target content
            const targetId = tab.getAttribute('data-target');
            
            // Hide all contents
            timelineContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Show the target content
            document.getElementById(`${targetId}-timeline`).style.display = 'block';
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

    const closeModal = () => modal.classList.remove('active');

    modalClose?.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    function openTimelineModal(box) {
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
            behavior: 'smooth'
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
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    
    if (!modal || projectCards.length === 0) return;
    
    const modalContent = modal.querySelector('.modal-body');
    const modalClose = modal.querySelector('.modal-close');
    
    // Close modal when clicking the close button
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Project data for richer case-study modals
    const PROJECTS = {
        speed_reader_app: {
            title: 'Speed Reader App',
            subtitle: 'Distraction-free speed reading in the browser.',
            problem:
                'Reading long content can be slow and distracting. I wanted a simple tool that helps users focus and control pacing.',
            solution:
                'Built a fast, responsive web app that displays text in a focused reader view, with adjustable settings and a clean UX.',
            impact: [
                'Shipped a polished live demo suitable for recruiters to try immediately.',
                'Prioritized UX clarity and performance for a smooth reading experience.'
            ],
            stack: ['TypeScript', 'Vite', 'Web'],
            role: 'Solo developer',
            links: {
                demo: 'https://speed-reader-app-magicalmongoose.vercel.app/',
                code: 'https://github.com/DrewLickman/Speed-Reader-App'
            }
        },
        random_generator_app: {
            title: 'Random Generator App',
            subtitle: 'Coins, dice, cards, and wheels in one tool.',
            problem:
                'I wanted a single, convenient utility for common randomization tasks (games, decisions, quick testing).',
            solution:
                'Implemented multiple random generators with a consistent UI and straightforward controls for quick use.',
            impact: [
                'Created a practical tool with multiple randomization modes.',
                'Built and deployed a working demo for immediate evaluation.'
            ],
            stack: ['JavaScript', 'HTML/CSS', 'Web'],
            role: 'Solo developer',
            links: {
                demo: 'https://random-generator-app-magicalmongoose.vercel.app/',
                code: 'https://github.com/DrewLickman/Random-Generator-App'
            }
        },
        financial_data_filtering_app: {
            title: 'Financial Data Filtering App',
            subtitle: 'View, sort, and filter stock income statements.',
            problem:
                'Raw financial datasets are hard to explore without fast filtering, sorting, and clean presentation.',
            solution:
                'Built a React web app that pulls public financial data and provides UI controls to sort and filter statements.',
            impact: [
                'Demonstrates API integration + real-world data handling.',
                'Focus on usability: filtering/sorting to answer questions quickly.'
            ],
            stack: ['JavaScript', 'React', 'API'],
            role: 'Solo developer',
            links: {
                demo: 'https://financial-data-filtering-app-magicalmongoose.vercel.app/',
                code: 'https://github.com/DrewLickman/Financial-Data-Filtering-App'
            }
        },
        nlp_pipelines: {
            title: 'NLP Pipeline Project',
            subtitle: 'Text preprocessing and analysis pipeline.',
            problem:
                'Text data needs consistent preprocessing to be useful for downstream NLP tasks and analysis.',
            solution:
                'Created an NLP pipeline that standardizes preprocessing steps and supports analysis workflows.',
            impact: [
                'Shows practical NLP foundations and pipeline thinking.',
                'Highlights ability to structure reusable processing steps.'
            ],
            stack: ['Python', 'NLP', 'AI'],
            role: 'Solo developer',
            links: {
                code: 'https://github.com/DrewLickman/NLP/tree/main/Projects/Project_7_Pipelines'
            }
        },
        ngram_language_model: {
            title: 'N-Gram Language Model',
            subtitle: 'Shakespearean text generation using NLTK.',
            problem:
                'I wanted hands-on experience building probabilistic language models and tuning them for better output quality.',
            solution:
                'Implemented an n-gram model with NLTK and optimized for performance and accuracy on the dataset.',
            impact: [
                'Demonstrates ML/NLP fundamentals (probabilistic modeling).',
                'Focus on both correctness and runtime performance.'
            ],
            stack: ['Python', 'NLTK', 'NLP'],
            role: 'Solo developer',
            links: {
                code: 'https://github.com/DrewLickman/NLP/tree/main/Projects/Project_2_N-gram_Text_Generator'
            }
        },
        code_runner: {
            title: 'Code Runner',
            subtitle: 'Unity 2D platformer built with a 5-person team.',
            problem:
                'Deliver a complete game project with teamwork, scoped features, and solid core mechanics.',
            solution:
                'Led a 5-person team and implemented core gameplay mechanics in Unity, coordinating work and delivery.',
            impact: [
                'Team leadership experience on a shipped game project.',
                'Built core mechanics and contributed to overall delivery.'
            ],
            stack: ['Unity', 'C#', 'Game Dev'],
            role: 'Team lead / programmer',
            links: {
                code: 'https://github.com/DrewLickman/Code-Runner'
            }
        }
    };

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
        const project = PROJECTS[projectId];
        if (!project) return;

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
        modal.classList.add('active');
    }

    // Open modal when clicking a project card
    projectCards.forEach(card => {
        const openFromEvent = (e) => {
            // Don't open modal if clicking a link
            if (e.target.closest('a')) return;

            openProjectModal(card);
        };

        card.addEventListener('click', openFromEvent);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openFromEvent(e);
            }
        });
    });
} 