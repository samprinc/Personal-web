// Enhanced JavaScript with Modern Animations

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavbar();
    initContactForm();
    initScrollAnimations();
    initSkillLevels();
    initHoverEffects();
    initParallax();
    initStatsAnimation();
    initFAQ();
    initCurrentYear();
    initTypewriter();
    initScrollToTop();
    initPageTransitions();
});

// Enhanced Navbar functionality
function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Add animation to menu items
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
    
    // Close mobile menu when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Enhanced navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Add active class to current section in viewport
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}` || 
                        (sectionId === 'about' && link.getAttribute('href') === 'index.html')) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Enhanced Contact Form Validation with animations
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Character counter for message
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (messageInput && charCount) {
        messageInput.addEventListener('input', function() {
            charCount.textContent = this.value.length;
            
            // Add typing animation
            if (this.value.length > 0) {
                this.style.animation = 'none';
                setTimeout(() => {
                    this.style.animation = 'typeEffect 0.3s ease';
                }, 10);
            }
        });
    }
    
    // Add input focus animations
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        submitBtn.classList.add('loading');
        
        // Reset previous errors
        clearErrors();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Validate name with animation
        if (name === '') {
            showError('nameError', 'Please enter your name');
            shakeElement('name');
            isValid = false;
        } else if (name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters');
            shakeElement('name');
            isValid = false;
        }
        
        // Validate email with animation
        if (email === '') {
            showError('emailError', 'Please enter your email');
            shakeElement('email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            shakeElement('email');
            isValid = false;
        }
        
        // Validate message with animation
        if (message === '') {
            showError('messageError', 'Please enter your message');
            shakeElement('message');
            isValid = false;
        } else if (message.length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            shakeElement('message');
            isValid = false;
        }
        
        // If form is valid, show success message with celebration
        if (isValid) {
            // Simulate API call delay
            setTimeout(() => {
                celebrateForm();
                showSuccessMessage();
                submitBtn.classList.remove('loading');
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    document.getElementById('formSuccess').style.display = 'none';
                    if (charCount) charCount.textContent = '0';
                }, 5000);
            }, 1500);
        } else {
            submitBtn.classList.remove('loading');
        }
    });
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show error messages with animation
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    errorElement.style.animation = 'shake 0.5s ease';
}

// Helper function to shake element
function shakeElement(elementId) {
    const element = document.getElementById(elementId);
    element.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Helper function to clear all errors
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
        element.style.animation = '';
    });
}

// Celebration animation for form submission
function celebrateForm() {
    const form = document.getElementById('contactForm');
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.position = 'absolute';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '1000';
        confetti.style.animation = `confettiFall ${Math.random() * 1 + 1}s ease-out forwards`;
        
        form.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, 2000);
    }
}

function getRandomColor() {
    const colors = ['#2563eb', '#7c3aed', '#f59e0b', '#10b981', '#ef4444'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Helper function to show success message with animation
function showSuccessMessage() {
    const successElement = document.getElementById('formSuccess');
    successElement.style.display = 'flex';
    successElement.style.animation = 'fadeInUp 0.6s ease-out';
    
    // Scroll to success message
    successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Enhanced scroll animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animate skill bars
                if (entry.target.classList.contains('animate-progress')) {
                    const skillFill = entry.target.querySelector('.skill-fill');
                    if (skillFill) {
                        const width = skillFill.getAttribute('data-width') || '0';
                        setTimeout(() => {
                            skillFill.style.width = width + '%';
                        }, 300);
                    }
                }
                
                // Animate stats
                if (entry.target.classList.contains('stat-number')) {
                    const finalValue = parseInt(entry.target.getAttribute('data-count') || '0');
                    animateCounter(entry.target, finalValue);
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
        '.animate-on-scroll, .animate-progress, .stat-number, .about-card, .skill-category-card, .soft-skill-card, .hobby-card, .faq-item, .contact-item'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Animate counter for stats
function animateCounter(element, finalValue) {
    let current = 0;
    const increment = finalValue / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalValue) {
            current = finalValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// Enhanced skill level animations
function initSkillLevels() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(level => {
        const dots = level.querySelectorAll('.level-dot');
        
        dots.forEach((dot, index) => {
            // Add sequential animation
            setTimeout(() => {
                if (dot.classList.contains('active')) {
                    dot.style.animation = 'dotPulse 1.5s infinite';
                }
            }, index * 200);
        });
    });
}

// Enhanced hover effects
function initHoverEffects() {
    // Add hover effects to all cards
    const cards = document.querySelectorAll('.about-card, .skill-category-card, .hobby-card, .faq-item, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }
}

// Animate stats on homepage
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.getAttribute('data-count'));
        if (!isNaN(finalValue)) {
            animateCounter(stat, finalValue);
        }
    });
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
        });
    });
}

// Update current year in footer
function initCurrentYear() {
    const yearElements = document.querySelectorAll('#currentYear');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Typewriter effect for hero text
function initTypewriter() {
    const heroQuote = document.querySelector('.hero-quote');
    
    if (heroQuote && !heroQuote.classList.contains('animated')) {
        const text = heroQuote.textContent;
        heroQuote.textContent = '';
        heroQuote.classList.add('animated');
        
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroQuote.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 1000);
    }
}

// Scroll to top button
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Page transition animations
function initPageTransitions() {
    // Add fade-in animation to main content
    const mainContent = document.querySelector('main, .hero, .page-header');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.animation = 'fadeIn 0.8s ease-out forwards';
    }
    
    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes typeEffect {
            0% { transform: scale(1); }
            50% { transform: scale(1.01); }
            100% { transform: scale(1); }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes confettiFall {
            0% {
                transform: translateY(-100px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(500px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize animations on window load
window.addEventListener('load', function() {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Initialize any additional animations
    initAdditionalAnimations();
});

// Additional animations
function initAdditionalAnimations() {
    // Add animation to floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 2}s`;
    });
    
    // Add staggered animation to interest items
    const interestItems = document.querySelectorAll('.interest-item');
    interestItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item, .education-stage');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
}

// Export functions for global use (if needed)
window.PrincSamWebsite = {
    initNavbar,
    initContactForm,
    initScrollAnimations,
    initSkillLevels,
    initHoverEffects,
    initParallax,
    initStatsAnimation,
    initFAQ,
    initCurrentYear,
    initTypewriter,
    initScrollToTop,
    initPageTransitions
};