/**
 * Princ Sam Portfolio - Main JavaScript
 * Enhanced for performance, modularity, and error prevention.
 */

// =========================================
// 1. INITIALIZATION
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    // Core Layout
    initNavbar();
    initCurrentYear();
    initScrollToTop();
    initPageTransitions();

    // Components (Run only if elements exist)
    if (document.getElementById('contactForm')) initContactForm();
    if (document.querySelector('.faq-item')) initFAQ();
    if (document.querySelector('.hero')) initParallax();
    if (document.querySelector('.hero-quote')) initTypewriter();

    // Animations
    initScrollAnimations(); // Handles Fade-in, Skill Bars, and Stat Counters
    initHoverEffects();
});

// =========================================
// 2. NAVIGATION & LAYOUT
// =========================================

/**
 * Handles Mobile Menu and Active Link Highlighting
 */
function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Toggle Mobile Menu
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Staggered animation for menu items
            const menuItems = navLinks.querySelectorAll('li');
            menuItems.forEach((item, index) => {
                if (navLinks.classList.contains('active')) {
                    item.style.animation = `fadeInUp 0.5s ${index * 0.1}s ease-out both`;
                } else {
                    item.style.animation = '';
                }
            });
        });
    }

    // Close menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    // Sticky Navbar & Active Section Highlight
    window.addEventListener('scroll', () => {
        // Sticky effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150; // Offset for navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    // Check if link href matches section ID or is Home link for 'about' section
                    if (link.getAttribute('href') === `#${sectionId}` || 
                       (sectionId === 'about' && link.getAttribute('href') === 'index.html')) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/**
 * Updates the Copyright Year in Footer
 */
function initCurrentYear() {
    const yearElements = document.querySelectorAll('#currentYear');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => el.textContent = currentYear);
}

/**
 * Scroll to Top Button Logic
 */
function initScrollToTop() {
    // Create button dynamically
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    // Inline styles for basic positioning (moved mostly to CSS in production)
    scrollBtn.style.cssText = `
        position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px;
        background: linear-gradient(135deg, var(--primary, #2563eb) 0%, var(--secondary, #7c3aed) 100%);
        color: white; border: none; border-radius: 50%; cursor: pointer;
        display: none; align-items: center; justify-content: center;
        font-size: 1.2rem; z-index: 999; transition: all 0.3s ease;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(scrollBtn);

    // Show/Hide logic
    window.addEventListener('scroll', () => {
        scrollBtn.style.display = (window.pageYOffset > 300) ? 'flex' : 'none';
    });

    // Smooth scroll up
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =========================================
// 3. ANIMATIONS & EFFECTS
// =========================================

/**
 * Unified Intersection Observer for Scroll Animations
 * Handles: Fade-ins, Skill Bars, and Number Counters
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // 1. Add general animation class
                target.classList.add('animated');

                // 2. Handle Skill Bars (Width animation)
                if (target.classList.contains('animate-progress') || target.querySelector('.skill-fill')) {
                    const skillFill = target.querySelector('.skill-fill') || target;
                    // Only animate if it hasn't been animated yet
                    if (!skillFill.style.width) { 
                        const width = skillFill.getAttribute('data-width') || skillFill.parentElement.previousElementSibling.lastElementChild.innerText;
                        // Small delay for visual effect
                        setTimeout(() => {
                            skillFill.style.width = width.includes('%') ? width : width + '%';
                        }, 200);
                    }
                }

                // 3. Handle Stat Counters (Number counting)
                if (target.classList.contains('stat-number') && !target.classList.contains('counted')) {
                    const finalValue = parseInt(target.getAttribute('data-count') || '0');
                    animateCounter(target, finalValue);
                    target.classList.add('counted'); // Prevent re-animating
                }

                // Stop observing once animated (optional, for performance)
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // Select elements to observe
    const elementsToAnimate = document.querySelectorAll(
        '.animate-on-scroll, .skill-fill, .stat-number, .about-card, .skill-category-card, .soft-skill-card, .hobby-card, .contact-item, .goal-milestone, .education-stage'
    );

    elementsToAnimate.forEach(el => observer.observe(el));
}

/**
 * Logic for counting numbers up
 */
function animateCounter(element, finalValue) {
    let startTimestamp = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing function for smooth stop
        const easeOutQuad = progress * (2 - progress); 
        
        element.textContent = Math.floor(easeOutQuad * finalValue) + (finalValue >= 1000 ? '+' : ''); // Add + for large numbers if needed

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = finalValue + (element.getAttribute('data-count').includes('+') ? '+' : '');
        }
    };

    window.requestAnimationFrame(step);
}

/**
 * Typewriter effect for Hero Quote
 */
function initTypewriter() {
    const heroQuote = document.querySelector('.hero-quote');
    if (!heroQuote) return;

    const text = heroQuote.textContent.trim();
    heroQuote.textContent = '';
    heroQuote.style.opacity = '1'; // Ensure it's visible before typing

    let i = 0;
    function type() {
        if (i < text.length) {
            heroQuote.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50); // Speed of typing
        }
    }
    
    // Delay start slightly
    setTimeout(type, 800);
}

/**
 * Mouse Move / Parallax Effects
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (hero) hero.style.transform = `translateY(${scrolled * 0.3}px)`; // Slow parallax
    });
}

function initHoverEffects() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            // Optional: Complex hover logic can go here
        });
    });
}

// =========================================
// 4. INTERACTIVE COMPONENTS (FAQ & FORM)
// =========================================

/**
 * FAQ Accordion Logic
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others (Accordion style)
            faqItems.forEach(other => {
                other.classList.remove('active');
                const answer = other.querySelector('.faq-answer');
                const icon = other.querySelector('i');
                if(answer) answer.style.maxHeight = null;
                if(icon) icon.style.transform = 'rotate(0deg)';
            });

            // Toggle clicked
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                const icon = item.querySelector('i');
                if(answer) answer.style.maxHeight = answer.scrollHeight + "px";
                if(icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

/**
 * Contact Form Validation & Submission Simulation
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const submitBtn = form.querySelector('.submit-btn');
    const successMsg = document.getElementById('formSuccess');

    // 1. Character Counter
    if (messageInput && charCount) {
        messageInput.addEventListener('input', function() {
            charCount.textContent = this.value.length;
            if (this.value.length > 500) {
                charCount.style.color = 'red';
            } else {
                charCount.style.color = '#94a3b8';
            }
        });
    }

    // 2. Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic Validation
        let isValid = true;
        clearErrors();

        if (nameInput.value.length < 2) {
            showError('nameError', 'Name must be at least 2 characters.');
            isValid = false;
        }

        if (!isValidEmail(emailInput.value)) {
            showError('emailError', 'Please enter a valid email address.');
            isValid = false;
        }

        if (messageInput.value.length < 10) {
            showError('messageError', 'Message must be at least 10 characters.');
            isValid = false;
        }

        if (isValid) {
            // Simulate Sending
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                form.reset();
                if(charCount) charCount.textContent = '0';
                
                // Show Success
                successMsg.style.display = 'flex';
                successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Confetti Effect
                celebrateForm();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 5000);

            }, 2000);
        }
    });
}

// =========================================
// 5. HELPER FUNCTIONS
// =========================================

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(id, msg) {
    const el = document.getElementById(id);
    if(el) {
        el.textContent = msg;
        el.style.display = 'block';
    }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
}

function celebrateForm() {
    // Simple confetti effect using DOM elements
    const form = document.querySelector('.contact-form-container');
    if(!form) return;

    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute; width: 8px; height: 8px; 
            background: ${['#2563eb', '#f59e0b', '#10b981'][Math.floor(Math.random()*3)]};
            top: 50%; left: 50%; border-radius: 50%; z-index: 10;
            transition: all 1s ease-out;
        `;
        form.appendChild(confetti);

        // Animate out
        setTimeout(() => {
            const x = (Math.random() - 0.5) * 300;
            const y = (Math.random() - 0.5) * 300;
            confetti.style.transform = `translate(${x}px, ${y}px)`;
            confetti.style.opacity = 0;
        }, 10);

        setTimeout(() => confetti.remove(), 1000);
    }
}

function initPageTransitions() {
    // Basic fade in on load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => document.body.style.opacity = '1', 10);
}