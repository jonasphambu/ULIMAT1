
        // ===== CONFIGURATION DE LA PÉRIODE D'INSCRIPTION =====
        // Vous pouvez modifier ces dates selon vos besoins
        const inscriptionConfig = {
            startDate: new Date('2025-01-01'), // Date de début des inscriptions
            endDate: new Date('2025-12-31'),   // Date de fin des inscriptions
            academicYearEnd: '30 juin 2024',   // Fin de l'année académique
            isActive: true                      // Activer/désactiver manuellement
        };

        // ===== GESTION DE LA PÉRIODE D'INSCRIPTION =====
        function checkInscriptionPeriod() {
            const now = new Date();
            const startDate = new Date(inscriptionConfig.startDate);
            const endDate = new Date(inscriptionConfig.endDate);
            
            // Vérifier si nous sommes dans la période d'inscription
            if (now >= startDate && now <= endDate && inscriptionConfig.isActive) {
                // Période active - afficher le formulaire
                document.getElementById('inscription').style.display = 'block';
                document.getElementById('closed-period').classList.remove('active');
                
                // Afficher l'alerte si on est dans les 7 derniers jours
                const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
                if (daysLeft <= 7) {
                    document.getElementById('period-control').classList.add('active');
                }
            } else {
                // Période inactive - afficher le message de fermeture
                document.getElementById('inscription').style.display = 'none';
                document.getElementById('closed-period').classList.add('active');
                document.getElementById('academic-year-end').textContent = inscriptionConfig.academicYearEnd;
            }
        }

        // ===== FONCTIONS ADMIN =====
        document.getElementById('extend-period').addEventListener('click', function() {
            // Prolonger d'un mois
            inscriptionConfig.endDate = new Date(inscriptionConfig.endDate.setMonth(inscriptionConfig.endDate.getMonth() + 1));
            alert('Période prolongée jusqu\'au ' + inscriptionConfig.endDate.toLocaleDateString());
            document.getElementById('period-control').classList.remove('active');
            location.reload();
        });

        document.getElementById('close-period').addEventListener('click', function() {
            if (confirm('Êtes-vous sûr de vouloir fermer les inscriptions maintenant ?')) {
                inscriptionConfig.isActive = false;
                alert('Inscriptions fermées.');
                location.reload();
            }
        });

        document.getElementById('open-period').addEventListener('click', function() {
            if (confirm('Ouvrir les inscriptions ?')) {
                inscriptionConfig.isActive = true;
                alert('Inscriptions ouvertes.');
                location.reload();
            }
        });

        // ===== ANIMATIONS ET FONCTIONNALITÉS EXISTANTES =====
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    if (entry.target.id === 'organization' || entry.target.id === 'info') {
                        const cards = entry.target.querySelectorAll('.org-card, .info-item');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animated');
                            }, index * 200);
                        });
                    }
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.inscription, footer').forEach(section => {
            sectionObserver.observe(section);
        });
        
        document.querySelectorAll('.social-icons a').forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.querySelector('i').style.transform = 'rotate(360deg)';
                this.querySelector('i').style.transition = 'transform 0.5s ease';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.querySelector('i').style.transform = 'rotate(0deg)';
            });
        });
        
        window.addEventListener('load', function() {
            const logoIcon = document.querySelector('.logo i');
            logoIcon.style.animation = 'pulse 2s infinite';
            checkInscriptionPeriod();
        });

        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
        
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

        // ===== LOGIQUE DU FORMULAIRE =====
        const progressBar = document.getElementById('progress-bar');
        const progressSteps = document.querySelectorAll('.progress-step');
        const formSteps = document.querySelectorAll('.form-step');
        const nextButtons = document.querySelectorAll('.btn-next');
        const prevButtons = document.querySelectorAll('.btn-prev');
        const submitButton = document.getElementById('btn-submit');
        const confirmation = document.getElementById('confirmation');
        
        let currentStep = 1;
        const totalSteps = 4;
        
        function updateProgressBar() {
            const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
            progressBar.style.width = `${progressPercentage}%`;
            
            progressSteps.forEach((step, index) => {
                if (index < currentStep) {
                    step.classList.add('completed');
                    step.classList.remove('active');
                } else if (index === currentStep) {
                    step.classList.add('active');
                    step.classList.remove('completed');
                } else {
                    step.classList.remove('active', 'completed');
                }
            });
        }
        
        function validateStep(step) {
            let isValid = true;
            const inputs = formSteps[step - 1].querySelectorAll('input[required], select[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                    
                    if (input.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value)) {
                            input.classList.add('error');
                            isValid = false;
                        }
                    }
                    
                    if (input.type === 'tel') {
                        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
                        if (!phoneRegex.test(input.value)) {
                            input.classList.add('error');
                            isValid = false;
                        }
                    }
                }
            });
            
            return isValid;
        }
        
        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                const nextStepId = this.getAttribute('data-next');
                
                if (validateStep(currentStep)) {
                    document.getElementById(`step${currentStep}-form`).classList.remove('active');
                    document.getElementById(nextStepId).classList.add('active');
                    currentStep = parseInt(nextStepId.replace('step', '').replace('-form', ''));
                    updateProgressBar();
                    document.getElementById('inscription').scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                const prevStepId = this.getAttribute('data-prev');
                
                document.getElementById(`step${currentStep}-form`).classList.remove('active');
                document.getElementById(prevStepId).classList.add('active');
                currentStep = parseInt(prevStepId.replace('step', '').replace('-form', ''));
                updateProgressBar();
                document.getElementById('inscription').scrollIntoView({ behavior: 'smooth' });
            });
        });
        
        submitButton.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                this.textContent = 'Traitement en cours...';
                this.disabled = true;
                
                setTimeout(() => {
                    document.getElementById(`step${currentStep}-form`).classList.remove('active');
                    confirmation.classList.add('active');
                    currentStep = totalSteps;
                    updateProgressBar();
                }, 2000);
            }
        });
        
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('error');
                }
            });
            
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                }
            });
        });

        // ===== GÉNÉRATION PDF =====
        document.getElementById('download-pdf').addEventListener('click', function() {
            generatePDF('download');
        });

        document.getElementById('print-pdf').addEventListener('click', function() {
            generatePDF('print');
        });

        function generatePDF(action = 'download') {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // En-tête du PDF
            doc.setFillColor(26, 35, 126);
            doc.rect(0, 0, 210, 40, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(20);
            doc.text('UNIVERSITÉ LIBRE DE MATADI', 105, 15, { align: 'center' });
            doc.setFontSize(16);
            doc.text('FICHE D\'INSCRIPTION', 105, 25, { align: 'center' });
            
            // Informations personnelles
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(14);
            doc.text('INFORMATIONS PERSONNELLES', 20, 50);
            doc.setFontSize(10);
            doc.text(`Nom: ${document.getElementById('nom').value}`, 20, 60);
            doc.text(`post-Nom: ${document.getElementById('nom').value}`, 20, 67);
            doc.text(`Prénom: ${document.getElementById('prenom').value}`, 20, 74);
            doc.text(`Email: ${document.getElementById('email').value}`, 20, 81);
            doc.text(`Téléphone: ${document.getElementById('telephone').value}`, 20, 88);
            doc.text(`Date de naissance: ${document.getElementById('date-naissance').value}`, 20, 95);
            doc.text(`Nationalité: ${document.getElementById('nationalite').value}`, 20, 102);
            
            // Formation
            doc.setFontSize(14);
            doc.text('FORMATION CHOISIE', 20, 110);
            doc.setFontSize(10);
            doc.text(`Faculté: ${document.getElementById('faculte').options[document.getElementById('faculte').selectedIndex].text}`, 20, 120);
            doc.text(`Niveau: ${document.getElementById('niveau').options[document.getElementById('niveau').selectedIndex].text}`, 20, 127);
            doc.text(`Année académique: ${document.getElementById('annee').options[document.getElementById('annee').selectedIndex].text}`, 20, 134);
            
            // Date de soumission
            const now = new Date();
            doc.setFontSize(14);
            doc.text('INFORMATIONS DE SOUMISSION', 20, 150);
            doc.setFontSize(10);
            doc.text(`Date de soumission: ${now.toLocaleDateString()}`, 20, 160);
            doc.text(`Heure de soumission: ${now.toLocaleTimeString()}`, 20, 167);
            
            // Numéro de référence
            const refNumber = 'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            doc.text(`Numéro de référence: ${refNumber}`, 20, 174);
            
            // Pied de page
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text('Ce document a été généré automatiquement par le système d\'inscription en ligne.', 105, 280, { align: 'center' });
            doc.text('Université Libre de Matadi - Matadi, Kongo Central, RDC', 105, 285, { align: 'center' });
            
            if (action === 'download') {
                doc.save(`inscription_${document.getElementById('nom').value}_${document.getElementById('prenom').value}.pdf`);
            } else if (action === 'print') {
                doc.autoPrint();
                window.open(doc.output('bloburl'), '_blank');
            }
        }

        updateProgressBar();
    