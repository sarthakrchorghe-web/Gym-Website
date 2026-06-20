/**
 * FitZone Fitness Studio - Website Interaction Script
 * Beginner-friendly, well-commented, pure JavaScript (ES6)
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Sticky Navigation Bar Scroll Effect
    // ==========================================
    const navbar = document.querySelector('.navbar-container');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // ==========================================
    // 2. Mobile Menu Toggle Logic
    // ==========================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileCta = document.querySelector('.mobile-cta');

    // Open mobile menu
    function openMenu() {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden'; // Disable background scrolling
    }

    // Close mobile menu
    function closeMenu() {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = ''; // Re-enable background scrolling
    }

    mobileToggle.addEventListener('click', openMenu);
    mobileClose.addEventListener('click', closeMenu);

    // Close menu when clicking any mobile nav link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking the mobile CTA button
    if (mobileCta) {
        mobileCta.addEventListener('click', closeMenu);
    }


    // ==========================================
    // 3. Smooth Section Scrolling (Fallback & Offset)
    // ==========================================
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Ignore bare hash links
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate navbar height offset dynamically
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = targetPosition - navHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ==========================================
    // 4. Highlight Active Navigation Links on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        let scrollPosition = window.scrollY + 120; // offset to match active focus area

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);


    // ==========================================
    // 5. Scroll Reveal Fade-in Animations
    // ==========================================
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    // Add additional targets for general scroll revealing
    const revealTargets = [
        ...fadeElements,
        ...document.querySelectorAll('.about-card'),
        ...document.querySelectorAll('.service-card'),
        ...document.querySelectorAll('.plan-card'),
        ...document.querySelectorAll('.trainer-card'),
        ...document.querySelectorAll('.testimonial-card'),
        ...document.querySelectorAll('.contact-info-container'),
        ...document.querySelectorAll('.contact-form-container')
    ];

    // Initialize styling for dynamic elements
    revealTargets.forEach(el => {
        if (!el.classList.contains('fade-in-up')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(25px)';
            el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        }
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // For pre-coded CSS classes
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target); // Animate once
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before it rolls up
    });

    revealTargets.forEach(el => {
        revealObserver.observe(el);
    });


    // ==========================================
    // 6. Select Plan CTA → Contact Dropdown Sync
    // ==========================================
    const selectPlanBtns = document.querySelectorAll('.select-plan-btn');
    const planDropdown = document.getElementById('selectedPlan');

    selectPlanBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const planName = this.getAttribute('data-plan');
            if (planDropdown && planName) {
                // Find matching option and select it
                for (let option of planDropdown.options) {
                    if (option.value === planName) {
                        planDropdown.value = planName;
                        break;
                    }
                }
            }
        });
    });


    // ==========================================
    // 7. Form Submission & Custom Success Toast
    // ==========================================
    const enquiryForm = document.getElementById('enquiryForm');
    const successToast = document.getElementById('successToast');
    const toastClose = document.querySelector('.toast-close');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            // Prevent actual browser submit/page reload
            e.preventDefault();

            // Fetch input values
            const name = document.getElementById('fullName').value.trim();
            const phone = document.getElementById('phoneNumber').value.trim();
            const goal = document.getElementById('fitnessGoal').value;
            const plan = document.getElementById('selectedPlan').value;

            // Simple client console check (simulating backend capture)
            console.log('Enquiry Received:', { name, phone, goal, plan });

            // Show Toast Notification
            showToast();

            // Reset form fields
            enquiryForm.reset();
        });
    }

    function showToast() {
        if (successToast) {
            successToast.classList.add('show');

            // Auto-hide toast after 5 seconds
            setTimeout(() => {
                hideToast();
            }, 5000);
        }
    }

    function hideToast() {
        if (successToast) {
            successToast.classList.remove('show');
        }
    }

    if (toastClose) {
        toastClose.addEventListener('click', hideToast);
    }
});
