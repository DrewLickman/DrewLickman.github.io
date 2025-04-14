// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    initThemeToggle();
    initScrollReveal();
    initTypingEffect();
    initParticles();
    initProjectFilter();
    initTimeline();
    initBackToTop();
    initContactForm();
    initProjectModals();
});

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
        'Tech Support 🩹',
        'Python 🐍',
        'JavaScript 💻',
        'C# 🎮',
        'Machine Learning 🤖',
        'NLP 💬',
        'Game Development 🎲'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    const typeEffect = () => {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Removing characters
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Adding characters
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Blinking cursor
        cursor.style.display = 'inline-block';
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Finished typing current phrase
            isWaiting = true;
            setTimeout(() => {
                isDeleting = true;
                isWaiting = false;
                typeEffect();
            }, 1500);
            return;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting current phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
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
            timelineTabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
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
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('#name').value;
        const email = contactForm.querySelector('#email').value;
        const subject = contactForm.querySelector('#subject').value;
        const message = contactForm.querySelector('#message').value;
        
        // You would normally send this data to a server
        // For now, we'll just log it to the console
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show a success message (in a real app, you'd wait for server response)
        // alert('Thanks for your message! I\'ll get back to you soon.');
        alert('This is not implemented yet. Please manually email me at contact.drew.business@gmail.com.');
        
        // Reset the form
        contactForm.reset();
    });
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
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Open modal when clicking a project card
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open modal if clicking a link
            if (e.target.closest('a')) return;
            
            const title = card.querySelector('.project-title').textContent;
            const description = card.querySelector('.project-description').textContent;
            const image = card.querySelector('.project-image img').src;
            const tags = card.querySelector('.project-tags').innerHTML;
            
            // Get links if available
            let links = '';
            const projectLinks = card.querySelectorAll('.project-link');
            projectLinks.forEach(link => {
                links += link.outerHTML;
            });
            
            // Set modal content
            modalContent.innerHTML = `
                <div class="modal-project">
                    <div class="modal-project-image">
                        <img src="${image}" alt="${title}">
                    </div>
                    <div class="modal-project-info">
                        <h2>${title}</h2>
                        <div class="modal-project-tags">${tags}</div>
                        <div class="modal-project-description">
                            <h3>Description</h3>
                            <p>${description}</p>
                        </div>
                        <div class="modal-project-links">
                            ${links}
                        </div>
                    </div>
                </div>
            `;
            
            // Show modal
            modal.classList.add('active');
        });
    });
} 