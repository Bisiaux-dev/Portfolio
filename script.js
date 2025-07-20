
// Configuration des animations

const ANIMATION_CONFIG = {
    fadeInDelay: 100,
    scrollOffset: 100,
    skillBarDelay: 200
};

// État de l'application

let isMenuOpen = false;
let skillAnimationsTriggered = false;

// Initialisation de l'application

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Fonction principale d'initialisation

function initializeApp() {
    setupNavigation();
    setupScrollAnimations();
    setupSmoothScrolling();
    setupSkillBars();
    setupTypingAnimation();
}

// Configuration de la navigation mobile

function setupNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        window.addEventListener('scroll', closeMobileMenu);
    }
}

// Basculer le menu mobile

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Fermer le menu mobile

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    

    if (isMenuOpen) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
        isMenuOpen = false;
    }
}

// Configuration du scroll fluide

function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Configuration des animations au scroll

function setupScrollAnimations() {
    const observerOptions = {
        root: null
    };
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    const elementsToAnimate = document.querySelectorAll(
        '.skill-card, .project-card, .contact-content, .hero-content, .hero-image'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

}

// Gestionnaire d'intersection pour les animations

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            if (element.classList.contains('skill-card')) {
                animateSkillCard(element);
            } else if (element.classList.contains('contact-content')) {
                animateContactContent(element);
            }
        }
    });
}

//Animation des cartes de compétences

function animateSkillCard(card) {
    card.classList.add('fade-in');
    
    // Animer la barre de progression
    const progressBar = card.querySelector('.skill-progress');
    if (progressBar) {
        const level = progressBar.getAttribute('data-level');
        setTimeout(() => {
            progressBar.style.width = level + '%';
        }, ANIMATION_CONFIG.skillBarDelay);
    }
}

//Animation du contenu de contact

function animateContactContent(content) {
    content.classList.add('fade-in');
}

//Configuration des barres de compétences

function setupSkillBars() {
    const skillsSection = document.querySelector('#competences');
    if (!skillsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillAnimationsTriggered) {
                animateSkillBars();
                skillAnimationsTriggered = true;
            }
        });
    }, {
        threshold: 0.5
    });
    
    observer.observe(skillsSection);
}

//Animation des barres de compétences

function animateSkillBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    progressBars.forEach((bar, index) => {
        const level = bar.getAttribute('data-level');
        setTimeout(() => {
            bar.style.width = level + '%';
        }, index * 200);
    });
}

//Animation de frappe pour le titre

function setupTypingAnimation() {
    const nameElement = document.querySelector('.hero-title .name');
    if (!nameElement) return;
    
    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    
    let index = 0;
    const typingSpeed = 100;
    
    function typeWriter() {
        if (index < originalText.length) {
            nameElement.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeWriter, typingSpeed);
        } else {

            nameElement.textContent += '|';
            setTimeout(() => {
                nameElement.textContent = originalText;
            }, 1000);
        }
    }
    

    setTimeout(typeWriter, 1000);
}

//Gestionnaire de redimensionnement de fenêtre

window.addEventListener('resize', function() {

    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

//Gestionnaire de scroll pour le header

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

//Préchargement des images

function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove('lazy');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        imageObserver.observe(img);
    });
}

//Utilitaire pour déboguer les animations

function debugAnimations() {
    console.log('Animations configurées:', {
        skillAnimationsTriggered,
        isMenuOpen,
        animationConfig: ANIMATION_CONFIG
    });
}

// Exposer les fonctions utiles pour le débogage

window.portfolioDebug = {
    debugAnimations,
    skillAnimationsTriggered,
    isMenuOpen
};