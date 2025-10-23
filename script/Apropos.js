 
        // Menu Hamburger
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenu = document.querySelector('.mobile-menu');
            const nav = document.querySelector('nav ul');
            const body = document.body;
            
            if (mobileMenu && nav) {
                function toggleMenu() {
                    nav.classList.toggle('active');
                    mobileMenu.classList.toggle('active');
                    body.classList.toggle('menu-open');
                    
                    const icon = mobileMenu.querySelector('i');
                    if (nav.classList.contains('active')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                
                mobileMenu.addEventListener('click', toggleMenu);
                
                const navLinks = document.querySelectorAll('nav a');
                navLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        if (nav.classList.contains('active')) {
                            toggleMenu();
                        }
                    });
                });
                
                document.addEventListener('click', function(event) {
                    if (!nav.contains(event.target) && !mobileMenu.contains(event.target) && nav.classList.contains('active')) {
                        toggleMenu();
                    }
                });
                
                window.addEventListener('resize', function() {
                    if (window.innerWidth > 992 && nav.classList.contains('active')) {
                        toggleMenu();
                    }
                });
            }

            // Animation des chiffres
            const chiffreNumbers = document.querySelectorAll('.chiffre-number');
            chiffreNumbers.forEach(chiffre => {
                const target = parseInt(chiffre.getAttribute('data-count'));
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 50);
                
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    chiffre.textContent = Math.floor(count);
                }, 50);
            });

            // Animation au défilement
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            // Observer les cartes de valeurs
            document.querySelectorAll('.valeur-card').forEach(card => {
                observer.observe(card);
            });
            
            // Observer les cartes de membres
            document.querySelectorAll('.membre-card').forEach(card => {
                observer.observe(card);
            });
            
            // Observer les logos de partenaires
            document.querySelectorAll('.partenaire-logo').forEach(logo => {
                observer.observe(logo);
            });
        });
    