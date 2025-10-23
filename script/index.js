
        // Hero Slider - Style ISTA Matadi
        document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelectorAll('.hero-slide');
            const indicators = document.querySelectorAll('.hero-indicator');
            let currentSlide = 0;
            const slideInterval = 5000; // 5 secondes
            
            // Fonction pour changer de slide
            function showSlide(index) {
                // Retirer la classe active de tous les slides et indicateurs
                slides.forEach(slide => slide.classList.remove('active'));
                indicators.forEach(indicator => indicator.classList.remove('active'));
                
                // Ajouter la classe active au slide et indicateur courant
                slides[index].classList.add('active');
                indicators[index].classList.add('active');
                
                currentSlide = index;
            }
            
            // Fonction pour passer au slide suivant
            function nextSlide() {
                let nextIndex = (currentSlide + 1) % slides.length;
                showSlide(nextIndex);
            }
            
            // Démarrer le slider automatique
            let slideTimer = setInterval(nextSlide, slideInterval);
            
            // Gestion des clics sur les indicateurs
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', function() {
                    clearInterval(slideTimer);
                    showSlide(index);
                    slideTimer = setInterval(nextSlide, slideInterval);
                });
            });
            
            // Animation des statistiques
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                let count = 0;
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 50);
                
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(count);
                }, 50);
            });
            
            // Animation des éléments au défilement
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = `fadeInUp 1s ease forwards`;
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            // Observer les cartes de programmes
            document.querySelectorAll('.program-card').forEach(card => {
                observer.observe(card);
            });
            
            // Observer les cartes d'actualités
            document.querySelectorAll('.news-card').forEach(card => {
                observer.observe(card);
            });
            
            // Observer les éléments de fonctionnalités
            document.querySelectorAll('.feature').forEach(feature => {
                observer.observe(feature);
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