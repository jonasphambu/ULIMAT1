        // Animation on scroll for sections
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Animate cards inside sections with delay
                    if (entry.target.id === 'faculties' || entry.target.id === 'teachers') {
                        const cards = entry.target.querySelectorAll('.faculty-card, .teacher-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animated');
                            }, index * 200);
                        });
                    }
                    
                    // Animate about image
                    if (entry.target.id === 'about') {
                        const aboutImage = entry.target.querySelector('.about-image');
                        setTimeout(() => {
                            aboutImage.classList.add('animated');
                        }, 300);
                    }
                }
            });
        }, observerOptions);
        
        // Observe sections for animation
        document.querySelectorAll('.faculties, .teachers, .about, footer').forEach(section => {
            sectionObserver.observe(section);
        });
        
        // Animate social icons on hover
        document.querySelectorAll('.social-icons a, .teacher-social a').forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.querySelector('i').style.transform = 'rotate(360deg)';
                this.querySelector('i').style.transition = 'transform 0.5s ease';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.querySelector('i').style.transform = 'rotate(0deg)';
            });
        });
        
        // Logo animation on page load
        window.addEventListener('load', function() {
            const logoIcon = document.querySelector('.logo i');
            logoIcon.style.animation = 'pulse 2s infinite';
        });
        
        // Text rotation in hero section
        const textCarousels = document.querySelectorAll('.text-carousel');
        
        textCarousels.forEach(carousel => {
            const textItems = carousel.querySelectorAll('.text-item');
            let currentIndex = 0;
            
            function rotateText() {
                // Hide current text
                textItems[currentIndex].classList.remove('active');
                
                // Move to next text
                currentIndex = (currentIndex + 1) % textItems.length;
                
                // Show next text
                textItems[currentIndex].classList.add('active');
            }
            
            // Start text rotation every 5 seconds
            setInterval(rotateText, 5000);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
        
        // Hide header on scroll down, show on scroll up
        let lastScrollY = window.scrollY;
        const header = document.getElementById('header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            lastScrollY = window.scrollY;
        });
        
        // Animation on button click
        document.querySelectorAll('.btn, .nav-link').forEach(button => {
            button.addEventListener('click', function(e) {
                // Simple animation effect on click
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });

  // Menu Hamburger - Code à ajouter dans tous les fichiers
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    const body = document.body;
    
    if (mobileMenu && nav) {
        // Fonction pour ouvrir/fermer le menu
        function toggleMenu() {
            nav.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Animation de l'icône hamburger
            const icon = mobileMenu.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        
        // Événement de clic sur le menu hamburger
        mobileMenu.addEventListener('click', toggleMenu);
        
        // Fermer le menu en cliquant sur un lien
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (nav.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
        
        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', function(event) {
            if (!nav.contains(event.target) && !mobileMenu.contains(event.target) && nav.classList.contains('active')) {
                toggleMenu();
            }
        });
        
        // Gestion du redimensionnement de la fenêtre
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992 && nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    }
});

