// Sistema de navegación avanzada
class NavigationSystem {
    constructor() {
        this.currentPage = 'home';
        this.pageHistory = [];
        this.transitionDuration = 500;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupKeyboardNavigation();
        this.setupTouchNavigation();
        this.setupSwipeNavigation();
        this.initializePageTransitions();
    }

    setupNavigation() {
        // Navegación principal
        document.querySelectorAll('[data-page]').forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                const page = element.dataset.page;
                this.navigateToPage(page);
            });
        });

        // Botón de regreso
        document.addEventListener('click', (e) => {
            if (e.target.closest('.back-button')) {
                this.goToHome();
            }
        });

        // Navegación con el historial del navegador
        window.addEventListener('popstate', (e) => {
            const page = e.state?.page || 'home';
            this.navigateToPage(page, false);
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Navegación con números
            if (e.key >= '1' && e.key <= '5') {
                const pages = ['procedimientos', 'videos', 'vulnerabilidades', 'soluciones', 'contactos'];
                const pageIndex = parseInt(e.key) - 1;
                if (pages[pageIndex]) {
                    this.navigateToPage(pages[pageIndex]);
                }
            }

            // Navegación con flechas
            switch(e.key) {
                case 'ArrowLeft':
                    this.navigatePrevious();
                    break;
                case 'ArrowRight':
                    this.navigateNext();
                    break;
                case 'Home':
                    this.navigateToPage('home');
                    break;
                case 'Escape':
                    this.goToHome();
                    break;
            }
        });
    }

    setupTouchNavigation() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        });

        function handleSwipe() {
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            const minSwipeDistance = 50;

            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
                if (diffX > 0) {
                    // Swipe izquierda
                    this.navigateNext();
                } else {
                    // Swipe derecha
                    this.navigatePrevious();
                }
            }
        }

        // Bind the function to the class
        this.handleSwipe = handleSwipe.bind(this);
    }

    setupSwipeNavigation() {
        let isDragging = false;
        let startX = 0;
        let currentX = 0;

        document.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            currentX = e.clientX;
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            
            const diffX = startX - currentX;
            const minSwipeDistance = 100;

            if (Math.abs(diffX) > minSwipeDistance) {
                if (diffX > 0) {
                    this.navigateNext();
                } else {
                    this.navigatePrevious();
                }
            }

            isDragging = false;
        });
    }

    navigateToPage(page, updateHistory = true) {
        if (this.currentPage === page) return;

        // Guardar en historial
        if (updateHistory) {
            this.pageHistory.push(this.currentPage);
        }

        // Ocultar página actual
        this.hideCurrentPage();

        // Ocultar página principal si estamos navegando a otra página
        if (page !== 'home') {
            this.hideMainPage();
        }

        // Mostrar nueva página
        this.showPage(page);

        // Actualizar estado
        this.currentPage = page;

        // Actualizar navegación
        this.updateNavigationState(page);

        // Actualizar URL
        if (updateHistory) {
            this.updateURL(page);
        }

        // Efectos de transición
        this.playTransitionEffects(page);
    }

    hideCurrentPage() {
        const currentPageElement = document.querySelector('.page.active');
        if (currentPageElement) {
            currentPageElement.classList.remove('active');
            currentPageElement.style.transform = 'translateX(-100%)';
        }

        // Ocultar navegación si estamos en home
        if (this.currentPage === 'home') {
            this.hideNavigation();
        }
    }

    showPage(page) {
        const pageElement = document.getElementById(`${page}-page`);
        if (pageElement) {
            pageElement.classList.add('active');
            pageElement.style.transform = 'translateX(0)';
            
            // Asegurar que las estrellas estén visibles
            this.ensureStarsVisibility();
            
            // Mostrar navegación
            this.showNavigation();
            
            // Agregar botón de regreso
            this.addBackButton();
            
            // Animar elementos de la página
            this.animatePageElements(pageElement);
        }
    }

    ensureStarsVisibility() {
        // Asegurar que las estrellas estén siempre visibles
        const starsContainer = document.querySelector('#stars-container');
        if (starsContainer) {
            starsContainer.style.display = 'block';
            starsContainer.style.opacity = '1';
        }
    }

    goBack() {
        if (this.pageHistory.length > 0) {
            const previousPage = this.pageHistory.pop();
            this.navigateToPage(previousPage, false);
        } else {
            this.navigateToPage('home', false);
        }
    }

    navigateNext() {
        const pages = ['home', 'procedimientos', 'videos', 'vulnerabilidades', 'soluciones', 'contactos'];
        const currentIndex = pages.indexOf(this.currentPage);
        const nextIndex = (currentIndex + 1) % pages.length;
        this.navigateToPage(pages[nextIndex]);
    }

    navigatePrevious() {
        const pages = ['home', 'procedimientos', 'videos', 'vulnerabilidades', 'soluciones', 'contactos'];
        const currentIndex = pages.indexOf(this.currentPage);
        const previousIndex = currentIndex === 0 ? pages.length - 1 : currentIndex - 1;
        this.navigateToPage(pages[previousIndex]);
    }

    updateNavigationState(page) {
        // Actualizar navegación principal
        document.querySelectorAll('.nav-card').forEach(navCard => {
            navCard.classList.remove('active');
        });
        
        const activeNavCard = document.querySelector(`[data-page="${page}"]`);
        if (activeNavCard) {
            activeNavCard.classList.add('active');
        }

        // Actualizar indicador de página
        this.updatePageIndicator(page);
    }

    updatePageIndicator(page) {
        const pages = ['home', 'procedimientos', 'videos', 'vulnerabilidades', 'soluciones', 'contactos'];
        const currentIndex = pages.indexOf(page);
        
        // Crear o actualizar indicador de página
        let indicator = document.querySelector('.page-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'page-indicator';
            document.body.appendChild(indicator);
        }

        indicator.innerHTML = `
            <div class="indicator-dots">
                ${pages.map((p, index) => `
                    <div class="indicator-dot ${index === currentIndex ? 'active' : ''}" 
                         data-page="${p}"></div>
                `).join('')}
            </div>
        `;

        // Event listeners para los dots
        indicator.querySelectorAll('.indicator-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                const page = dot.dataset.page;
                this.navigateToPage(page);
            });
        });
    }

    showNavigation() {
        const navigation = document.querySelector('.page-navigation');
        if (navigation) {
            navigation.style.display = 'block';
            navigation.style.opacity = '0';
            navigation.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                navigation.style.transition = 'all 0.3s ease';
                navigation.style.opacity = '1';
                navigation.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    hideNavigation() {
        const navigation = document.querySelector('.page-navigation');
        if (navigation) {
            navigation.style.transition = 'all 0.3s ease';
            navigation.style.opacity = '0';
            navigation.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                navigation.style.display = 'none';
            }, 300);
        }
    }

    addBackButton() {
        if (!document.querySelector('.back-button')) {
            const backButton = document.createElement('button');
            backButton.className = 'back-button';
            backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Inicio';
            backButton.style.opacity = '0';
            backButton.style.transform = 'translateX(-20px)';
            
            document.body.appendChild(backButton);
            
            setTimeout(() => {
                backButton.style.transition = 'all 0.3s ease';
                backButton.style.opacity = '1';
                backButton.style.transform = 'translateX(0)';
            }, 100);
        }
    }

    removeBackButton() {
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.style.transition = 'all 0.3s ease';
            backButton.style.opacity = '0';
            backButton.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                backButton.remove();
            }, 300);
        }
    }

    updateURL(page) {
        const url = page === 'home' ? '/' : `/${page}`;
        const title = this.getPageTitle(page);
        
        window.history.pushState({ page }, title, url);
        document.title = `Proyecto Final - ${title}`;
    }

    getPageTitle(page) {
        const titles = {
            'home': 'Inicio',
            'procedimientos': 'Procedimientos',
            'videos': 'Videos',
            'vulnerabilidades': 'Vulnerabilidades',
            'soluciones': 'Soluciones',
            'contactos': 'Contactos'
        };
        return titles[page] || 'Página';
    }

    initializePageTransitions() {
        // Configurar transiciones CSS
        const style = document.createElement('style');
        style.textContent = `
            .page {
                transition: all ${this.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .page-indicator {
                position: fixed;
                top: 2rem;
                right: 2rem;
                z-index: 100;
                background: rgba(26, 26, 26, 0.9);
                backdrop-filter: blur(10px);
                border-radius: 25px;
                padding: 0.5rem;
                border: 1px solid var(--border-color);
            }
            
            .indicator-dots {
                display: flex;
                gap: 0.5rem;
            }
            
            .indicator-dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: var(--border-color);
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .indicator-dot.active {
                background: var(--primary-color);
                transform: scale(1.2);
            }
            
            .indicator-dot:hover {
                background: var(--secondary-color);
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(style);
    }

    playTransitionEffects(page) {
        // Efecto de partículas en la transición
        if (window.animationSystem) {
            window.animationSystem.createTransitionParticles();
        }

        // Efecto de sonido (opcional)
        this.playTransitionSound();

        // Efecto de vibración en móviles
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }

    createTransitionParticles() {
        // Crear partículas de transición
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'transition-particle';
            
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const size = Math.random() * 4 + 2;
            
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 999;
                animation: transition-particle-fade 1s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    playTransitionSound() {
        // Crear un tono de transición usando Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Silenciar errores de audio
        }
    }

    animatePageElements(pageElement) {
        const elements = pageElement.querySelectorAll('.procedure-card, .video-card, .vulnerability-card, .solution-card');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Métodos de utilidad
    getCurrentPage() {
        return this.currentPage;
    }

    getPageHistory() {
        return [...this.pageHistory];
    }

    clearHistory() {
        this.pageHistory = [];
    }

    // Navegación programática
    goToHome() {
        // Ocultar todas las páginas
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Ocultar navegación
        this.hideNavigation();
        
        // Remover botón de regreso
        this.removeBackButton();
        
        // Mostrar página principal
        this.showMainPage();
        
        // Actualizar estado
        this.currentPage = 'home';
        
        // Actualizar URL
        this.updateURL('home');
    }

    hideMainPage() {
        // Ocultar el contenedor principal
        const mainContainer = document.querySelector('.main-container');
        if (mainContainer) {
            mainContainer.style.transition = 'all 0.3s ease';
            mainContainer.style.opacity = '0';
            mainContainer.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                mainContainer.style.display = 'none';
            }, 300);
        }
    }

    showMainPage() {
        // Mostrar el contenedor principal
        const mainContainer = document.querySelector('.main-container');
        if (mainContainer) {
            mainContainer.style.display = 'flex';
            mainContainer.style.opacity = '0';
            mainContainer.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                mainContainer.style.transition = 'all 0.5s ease';
                mainContainer.style.opacity = '1';
                mainContainer.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    goToProcedures() {
        this.navigateToPage('procedimientos');
    }

    goToVideos() {
        this.navigateToPage('videos');
    }

    goToVulnerabilities() {
        this.navigateToPage('vulnerabilidades');
    }

    goToSolutions() {
        this.navigateToPage('soluciones');
    }

    goToContacts() {
        this.navigateToPage('contactos');
    }
}

// Inicializar sistema de navegación
document.addEventListener('DOMContentLoaded', () => {
    window.navigationSystem = new NavigationSystem();
});

// Agregar estilos adicionales para las transiciones
const transitionStyles = `
    @keyframes transition-particle-fade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
    
    .transition-particle {
        filter: blur(0.5px);
    }
`;

const transitionStyleSheet = document.createElement('style');
transitionStyleSheet.textContent = transitionStyles;
document.head.appendChild(transitionStyleSheet); 