/**
 * BYCPAC JS
 * Handles mobile navigation, smooth scrolling, and scroll-reveal animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and times (close)
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.replace('fa-bars', 'fa-times');
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });

        // Close mobile menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    // --- Sticky Navbar Effect ---
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Active Link Switching on Scroll ---
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Adjust offset for fixed header if needed
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // --- Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealOptions = {
            threshold: 0.15, // Trigger when 15% of the element is visible
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('visible');
                    // Stop observing once it has been revealed
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        revealElements.forEach(el => {
            el.classList.add('visible');
        });
    }
});
