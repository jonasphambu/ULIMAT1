
        // DONNÉES DES PHOTOS LOCALES - MODIFIEZ ICI
        const galerieData = [
            {
                src: "photos/campus1.jpg",
                title: "Bâtiment Principal ULIMAT",
                category: "campus"
            },
            {
                src: "photos/campus2.jpg", 
                title: "Bibliothèque Universitaire",
                category: "campus"
            },
            {
                src: "photos/ceremonie.jpg",
                title: "Cérémonie de Remise de Diplômes",
                category: "evenements"
            },
            {
                src: "/img/IMG2.Jgp",
                title: "Cérémonie de Remise de Diplômes",
                category: "Activité"
            },
            {
                src: "img/IMG1.PNG",
                title: "Conférence Internationale",
                category: "evenements"
            },
            {
                src: "photos/etudiants1.jpg",
                title: "Étudiants en Groupe de Travail",
                category: "etudiants"
            },
            {
                src: "/img/IMG.PNG",
                title: "La remuse des Diplomes",
                category: "evenements"
            },
            {
                src: "/img/IMG2.png",
                title: "Laboratoire Informatique",
                category: "campus"
            },
            {
                src: "photos/sport.jpg",
                title: "Tournoi Sportif Universitaire",
                category: "evenements"
            }
        ];

        // Variables globales
        let currentFilter = 'all';
        let currentIndex = 0;
        let filteredData = [];

        // Initialisation
        document.addEventListener('DOMContentLoaded', function() {
            renderGalerie();
            setupEventListeners();
        });

        // Rendre la galerie
        function renderGalerie() {
            const grid = document.getElementById('galerieGrid');
            grid.innerHTML = '';

            // Filtrer les données
            if (currentFilter === 'all') {
                filteredData = galerieData;
            } else {
                filteredData = galerieData.filter(item => item.category === currentFilter);
            }

            // Ajouter les photos
            filteredData.forEach((item, index) => {
                const photoElement = createPhotoElement(item, index);
                grid.appendChild(photoElement);
            });
        }

        // Créer un élément photo
        function createPhotoElement(item, index) {
            const div = document.createElement('div');
            div.className = 'galerie-item';
            div.innerHTML = `
                <img src="${item.src}" alt="${item.title}" class="galerie-img" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZjNzU3ZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg=='">
                <div class="galerie-info">
                    <div class="galerie-title">${item.title}</div>
                    <div class="galerie-category">${getCategoryLabel(item.category)}</div>
                </div>
            `;

            div.addEventListener('click', () => {
                openLightbox(index);
            });

            return div;
        }

        // Obtenir le libellé de la catégorie
        function getCategoryLabel(category) {
            const labels = {
                'Université': 'Université',
                'événements': 'Événements',
                'etudiants': 'Vie etudiants',
                'Activité' : 'Activité'
            };
            return labels[category] || category;
        }

        // Configurer les événements
        function setupEventListeners() {
            // Filtres
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    currentFilter = this.dataset.filter;
                    renderGalerie();
                });
            });

            // Lightbox
            document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
            document.getElementById('lightboxPrev').addEventListener('click', () => navigateLightbox(-1));
            document.getElementById('lightboxNext').addEventListener('click', () => navigateLightbox(1));

            // Fermer avec ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') navigateLightbox(-1);
                if (e.key === 'ArrowRight') navigateLightbox(1);
            });
        }

        // Ouvrir lightbox
        function openLightbox(index) {
            currentIndex = index;
            const item = filteredData[currentIndex];
            
            document.getElementById('lightboxImg').src = item.src;
            document.getElementById('lightbox').classList.add('active');
        }

        // Fermer lightbox
        function closeLightbox() {
            document.getElementById('lightbox').classList.remove('active');
        }

        // Navigation lightbox
        function navigateLightbox(direction) {
            currentIndex += direction;
            
            if (currentIndex < 0) {
                currentIndex = filteredData.length - 1;
            } else if (currentIndex >= filteredData.length) {
                currentIndex = 0;
            }
            
            const item = filteredData[currentIndex];
            document.getElementById('lightboxImg').src = item.src;
        }

        // Menu mobile simple
        document.querySelector('.mobile-menu').addEventListener('click', function() {
            const nav = document.querySelector('nav ul');
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
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