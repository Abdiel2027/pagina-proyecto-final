// Configuración principal de la aplicación
class WebApp {
    constructor() {
        this.currentPage = 'home';
        this.pages = ['home', 'procedimientos', 'videos', 'vulnerabilidades', 'soluciones', 'contactos'];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createParticles();
        this.showLoadingScreen();
        this.initializeAnimations();
        this.setupProfileImage();
    }

    setupProfileImage() {
        const profileImages = document.querySelectorAll('.profile-photo');
        console.log('Configurando imágenes de perfil...');
        console.log('Número de imágenes encontradas:', profileImages.length);
        
        profileImages.forEach((profileImage, index) => {
            console.log(`Configurando imagen ${index + 1}:`, profileImage.src);
            
            // Verificar si la imagen existe
            this.checkImageExists(profileImage.src, (exists) => {
                if (exists) {
                    console.log(`La imagen ${index + 1} existe, configurando carga...`);
                    this.setupImageLoad(profileImage, index + 1);
                } else {
                    console.error(`La imagen ${index + 1} no existe en la ruta:`, profileImage.src);
                    this.showDefaultIcon(profileImage, index + 1);
                }
            });
        });
    }

    checkImageExists(url, callback) {
        const img = new Image();
        img.onload = () => callback(true);
        img.onerror = () => callback(false);
        img.src = url;
    }

    setupImageLoad(profileImage, index) {
        // Agregar efecto de carga
        profileImage.style.opacity = '0';
        profileImage.style.transform = 'scale(0.8)';
        
        profileImage.addEventListener('load', () => {
            console.log(`Imagen ${index} cargada exitosamente`);
            profileImage.style.transition = 'all 0.5s ease';
            profileImage.style.opacity = '1';
            profileImage.style.transform = 'scale(1)';
        });
        
        profileImage.addEventListener('error', (e) => {
            console.error(`Error al cargar la imagen ${index}:`, e);
            this.showDefaultIcon(profileImage, index);
        });

        // Verificar si la imagen ya está cargada
        if (profileImage.complete) {
            console.log(`Imagen ${index} ya estaba cargada`);
            profileImage.style.transition = 'all 0.5s ease';
            profileImage.style.opacity = '1';
            profileImage.style.transform = 'scale(1)';
        }
    }

    showDefaultIcon(profileImage, index) {
        console.log(`Mostrando ícono por defecto para imagen ${index}...`);
        const profileContainer = profileImage.parentElement;
        profileContainer.innerHTML = '<i class="fas fa-user-circle"></i>';
        console.log(`Ícono por defecto mostrado para imagen ${index}`);
    }

    setupEventListeners() {
        // Event listeners para las tarjetas principales
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.handleCardClick(e);
            });
        });

        // Event listeners para la navegación
        document.querySelectorAll('.nav-card').forEach(navCard => {
            navCard.addEventListener('click', (e) => {
                this.handleNavClick(e);
            });
        });

        // Event listeners para videos
        document.querySelectorAll('.video-placeholder').forEach(video => {
            video.addEventListener('click', (e) => {
                this.handleVideoClick(e);
            });
        });

        // Event listeners para enlaces sociales
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleSocialClick(e);
            });
        });

        // Event listeners para enlaces de contacto
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('contact-link')) {
                this.handleContactClick(e);
            }
        });

        // Event listener para el botón de regreso
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('back-button') || e.target.closest('.back-button')) {
                this.goToHome();
            }
        });

        // Event listener para teclas
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });

        // Event listener para scroll
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Event listener para resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handleCardClick(e) {
        const card = e.currentTarget;
        const page = card.dataset.page;
        
        // Efecto de explosión
        this.createExplosionEffect(card);
        
        // Navegar a la página
        setTimeout(() => {
            this.navigateToPage(page);
        }, 300);
    }

    handleNavClick(e) {
        const navCard = e.currentTarget;
        const page = navCard.dataset.page;
        
        // Actualizar navegación activa
        this.updateActiveNav(page);
        
        // Navegar a la página
        this.navigateToPage(page);
    }

    handleVideoClick(e) {
        const video = e.currentTarget;
        const videoTitle = video.querySelector('h3').textContent;
        
        // Mostrar modal de video
        this.showVideoModal(videoTitle);
    }

    handleSocialClick(e) {
        const link = e.currentTarget;
        const href = link.getAttribute('href');
        
        // Efecto de ripple
        this.createRippleEffect(e);
        
        // Abrir en nueva pestaña
        setTimeout(() => {
            window.open(href, '_blank');
        }, 200);
    }

    handleContactClick(e) {
        const link = e.currentTarget;
        const href = link.getAttribute('href');
        
        // Efecto de ripple
        this.createRippleEffect(e);
        
        // Mostrar notificación
        this.showContactNotification(link.textContent.trim());
        
        // Abrir enlace (tel: o mailto:)
        setTimeout(() => {
            window.location.href = href;
        }, 300);
    }

    showContactNotification(contactInfo) {
        const notification = document.createElement('div');
        notification.className = 'contact-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Abriendo: ${contactInfo}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Remover después de 2 segundos
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    handleKeyPress(e) {
        switch(e.key) {
            case 'Escape':
                if (this.currentPage !== 'home') {
                    this.goToHome();
                }
                break;
            case '1':
                this.navigateToPage('procedimientos');
                break;
            case '2':
                this.navigateToPage('videos');
                break;
            case '3':
                this.navigateToPage('vulnerabilidades');
                break;
            case '4':
                this.navigateToPage('soluciones');
                break;
            case '5':
                this.navigateToPage('contactos');
                break;
        }
    }

    handleScroll() {
        // Efecto parallax para las estrellas
        const scrolled = window.pageYOffset;
        const stars = document.querySelector('.stars');
        if (stars) {
            stars.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }

    handleResize() {
        // Reajustar partículas
        this.createParticles();
    }

    createExplosionEffect(card) {
        card.classList.add('exploding');
        
        setTimeout(() => {
            card.classList.remove('exploding');
        }, 600);
    }

    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    navigateToPage(page) {
        if (this.currentPage === page) return;
        
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
        this.updateActiveNav(page);
        
        // Actualizar URL
        this.updateURL(page);
    }

    hideCurrentPage() {
        const currentPageElement = document.querySelector('.page.active');
        if (currentPageElement) {
            currentPageElement.classList.remove('active');
        }
        
        // Ocultar navegación si estamos en home
        if (this.currentPage === 'home') {
            document.querySelector('.page-navigation').style.display = 'none';
        }
    }

    showPage(page) {
        const pageElement = document.getElementById(`${page}-page`);
        if (pageElement) {
            pageElement.classList.add('active');
            
            // Asegurar que las estrellas estén visibles
            this.ensureStarsVisibility();
            
            // Mostrar navegación
            document.querySelector('.page-navigation').style.display = 'block';
            
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
            starsContainer.style.zIndex = '1';
        }
        
        // Asegurar que las partículas estén visibles
        const particlesContainer = document.querySelector('.particles');
        if (particlesContainer) {
            particlesContainer.style.display = 'block';
            particlesContainer.style.opacity = '1';
            particlesContainer.style.zIndex = '2';
        }
    }

    goToHome() {
        console.log('Navegando a la página principal...');
        
        // Ocultar todas las páginas
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Ocultar navegación
        document.querySelector('.page-navigation').style.display = 'none';
        
        // Remover botón de regreso
        this.removeBackButton();
        
        // Mostrar página principal
        this.showMainPage();
        
        // Actualizar estado
        this.currentPage = 'home';
        
        // Actualizar URL
        this.updateURL('home');
        
        console.log('Navegación a página principal completada');
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

    updateActiveNav(page) {
        document.querySelectorAll('.nav-card').forEach(navCard => {
            navCard.classList.remove('active');
        });
        
        const activeNavCard = document.querySelector(`[data-page="${page}"]`);
        if (activeNavCard) {
            activeNavCard.classList.add('active');
        }
    }

    addBackButton() {
        if (!document.querySelector('.back-button')) {
            const backButton = document.createElement('button');
            backButton.className = 'back-button';
            backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Inicio';
            document.body.appendChild(backButton);
        }
    }

    removeBackButton() {
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.remove();
        }
    }

    updateURL(page) {
        const url = page === 'home' ? '/' : `/${page}`;
        window.history.pushState({ page }, '', url);
    }

    showVideoModal(title) {
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="video-placeholder-large">
                        <i class="fas fa-play-circle"></i>
                        <p>Video: ${title}</p>
                        <p>Este es un placeholder para el video. Aquí puedes integrar tu reproductor de video preferido.</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners para el modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.closest('.modal-close')) {
                modal.remove();
            }
        });
        
        // Cerrar con Escape
        const closeModal = () => {
            modal.remove();
            document.removeEventListener('keydown', closeModal);
        };
        document.addEventListener('keydown', closeModal);
    }

    createParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;
        
        // Limpiar partículas existentes
        particlesContainer.innerHTML = '';
        
        // Crear nuevas partículas
        const particleCount = Math.floor(window.innerWidth / 50);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    showLoadingScreen() {
        const loading = document.createElement('div');
        loading.className = 'loading-animation';
        loading.innerHTML = `
            <div class="loading-spinner"></div>
            <p style="margin-top: 1rem; color: var(--text-secondary);">Cargando...</p>
        `;
        
        document.body.appendChild(loading);
        
        // Remover después de 2 segundos
        setTimeout(() => {
            loading.remove();
        }, 2000);
    }

    initializeAnimations() {
        // Inicializar animaciones de entrada
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        
        // Observar elementos animables
        document.querySelectorAll('.card, .procedure-card, .video-card, .vulnerability-card, .solution-card').forEach(el => {
            observer.observe(el);
        });
    }

    animatePageElements(pageElement) {
        const elements = pageElement.querySelectorAll('.procedure-card, .video-card, .vulnerability-card, .solution-card');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// Estilos adicionales para el modal
const modalStyles = `
    .video-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(5px);
    }
    
    .modal-content {
        background: var(--card-bg);
        border-radius: 20px;
        max-width: 90%;
        max-height: 90%;
        overflow: hidden;
        border: 2px solid var(--primary-color);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid var(--border-color);
    }
    
    .modal-header h3 {
        color: var(--primary-color);
        margin: 0;
    }
    
    .modal-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .modal-close:hover {
        background: var(--primary-color);
        color: white;
    }
    
    .modal-body {
        padding: 1.5rem;
    }
    
    .video-placeholder-large {
        text-align: center;
        padding: 3rem;
        border: 2px dashed var(--border-color);
        border-radius: 15px;
    }
    
    .video-placeholder-large i {
        font-size: 4rem;
        color: var(--primary-color);
        margin-bottom: 1rem;
    }
    
    .video-placeholder-large p {
        color: var(--text-secondary);
        margin: 0.5rem 0;
    }
`;

// Agregar estilos al head
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.webApp = new WebApp();
});

// Manejar navegación del navegador
window.addEventListener('popstate', (e) => {
    const page = e.state?.page || 'home';
    window.webApp.navigateToPage(page);
}); 