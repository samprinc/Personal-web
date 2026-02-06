document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Current Year in Footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 2. Mobile Nav Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = '#1e293b';
            navLinks.style.padding = '20px';
        });
    }

    // 3. Animate Skill Bars on Scroll
    const animateSkills = () => {
        const skillsSection = document.querySelector('.skills');
        const skillFills = document.querySelectorAll('.skill-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillFills.forEach(fill => {
                        const width = fill.getAttribute('data-width');
                        fill.style.width = width + '%';
                    });
                }
            });
        }, { threshold: 0.2 });

        if (skillsSection) observer.observe(skillsSection);
    };

    // 4. General Scroll Reveal
    const scrollReveal = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    };

    animateSkills();
    scrollReveal();
});