// Sistema de animaciones avanzadas
class AnimationSystem {
    constructor() {
        this.animations = new Map();
        this.particles = [];
        this.stars = [];
        this.init();
    }

    init() {
        this.createStarField();
        this.createShootingStars();
        this.setupParticleSystem();
        this.initializeCardAnimations();
        this.setupScrollAnimations();
        this.ensureStarsVisibility();
    }

    ensureStarsVisibility() {
        // Asegurar que las estrellas estén siempre visibles
        const starsContainer = document.querySelector('#stars-container');
        if (starsContainer) {
            starsContainer.style.position = 'fixed';
            starsContainer.style.top = '0';
            starsContainer.style.left = '0';
            starsContainer.style.width = '100%';
            starsContainer.style.height = '100%';
            starsContainer.style.zIndex = '1';
            starsContainer.style.pointerEvents = 'none';
        }
    }

    createStarField() {
        const starField = document.querySelector('#stars-container');
        if (!starField) return;

        // Limpiar estrellas existentes
        starField.innerHTML = `
            <div class="stars"></div>
            <div class="twinkling"></div>
            <div class="shooting-stars"></div>
        `;

        // Crear estrellas estáticas
        for (let i = 0; i < 100; i++) {
            this.createStar(starField);
        }

        // Crear estrellas con movimiento
        for (let i = 0; i < 50; i++) {
            this.createMovingStar(starField);
        }
    }

    createStar(container) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const opacity = Math.random() * 0.8 + 0.2;
        const animationDelay = Math.random() * 5;
        
        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: white;
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            opacity: ${opacity};
            animation: star-twinkle 3s ease-in-out infinite;
            animation-delay: ${animationDelay}s;
            z-index: 1;
        `;
        
        container.appendChild(star);
        this.stars.push(star);
    }

    createMovingStar(container) {
        const star = document.createElement('div');
        star.className = 'moving-star';
        
        const size = Math.random() * 2 + 1;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const endX = Math.random() * 100;
        const endY = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        
        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, var(--primary-color), white);
            border-radius: 50%;
            left: ${startX}%;
            top: ${startY}%;
            opacity: 0.7;
            animation: star-move ${duration}s linear infinite;
            z-index: 2;
        `;
        
        // Definir keyframes dinámicamente
        const keyframes = `
            @keyframes star-move {
                0% {
                    left: ${startX}%;
                    top: ${startY}%;
                    opacity: 0;
                }
                10% {
                    opacity: 0.7;
                }
                90% {
                    opacity: 0.7;
                }
                100% {
                    left: ${endX}%;
                    top: ${endY}%;
                    opacity: 0;
                }
            }
        `;
        
        this.addKeyframes(keyframes);
        container.appendChild(star);
        this.stars.push(star);
    }

    createShootingStars() {
        const container = document.querySelector('#stars-container');
        if (!container) return;

        setInterval(() => {
            this.createShootingStar(container);
        }, 3000);
    }

    createShootingStar(container) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        const startX = Math.random() * 100;
        const startY = Math.random() * 50;
        const angle = Math.random() * 45 + 45;
        const distance = 100 + Math.random() * 50;
        const endX = startX + Math.cos(angle * Math.PI / 180) * distance;
        const endY = startY + Math.sin(angle * Math.PI / 180) * distance;
        
        shootingStar.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: linear-gradient(45deg, white, var(--primary-color));
            border-radius: 50%;
            left: ${startX}%;
            top: ${startY}%;
            box-shadow: 0 0 20px var(--primary-color);
            animation: shooting-star-move 2s linear forwards;
            z-index: 3;
        `;
        
        const keyframes = `
            @keyframes shooting-star-move {
                0% {
                    left: ${startX}%;
                    top: ${startY}%;
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    left: ${endX}%;
                    top: ${endY}%;
                    opacity: 0;
                }
            }
        `;
        
        this.addKeyframes(keyframes);
        container.appendChild(shootingStar);
        
        // Remover después de la animación
        setTimeout(() => {
            shootingStar.remove();
        }, 2000);
    }

    setupParticleSystem() {
        const container = document.querySelector('#stars-container');
        if (!container) return;

        // Crear partículas flotantes
        for (let i = 0; i < 30; i++) {
            this.createParticle(container);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, var(--primary-color), transparent);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            opacity: 0.3;
            animation: particle-float ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
            z-index: 1;
        `;
        
        container.appendChild(particle);
        this.particles.push(particle);
    }

    initializeCardAnimations() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach((card, index) => {
            // Animación de entrada
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.8)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 200);

            // Efecto de hover 3D
            card.addEventListener('mousemove', (e) => {
                this.handleCard3DEffect(e, card);
            });

            card.addEventListener('mouseleave', () => {
                this.resetCard3DEffect(card);
            });
        });
    }

    handleCard3DEffect(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateZ(20px)
        `;
        
        // Efecto de brillo
        const brightness = Math.max(0, 1 - Math.sqrt(x * x + y * y) / (rect.width * rect.height));
        card.style.filter = `brightness(${1 + brightness * 0.2})`;
    }

    resetCard3DEffect(card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        card.style.filter = 'brightness(1)';
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateOnScroll(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observar elementos para animación al hacer scroll
        document.querySelectorAll('.procedure-card, .video-card, .vulnerability-card, .solution-card').forEach(el => {
            observer.observe(el);
        });
    }

    animateOnScroll(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }

    addKeyframes(keyframes) {
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
    }

    // Efectos especiales
    createExplosionEffect(x, y, color = 'var(--primary-color)') {
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        
        explosion.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            background: radial-gradient(circle, ${color}, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: explosion-grow 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(explosion);
        
        setTimeout(() => {
            explosion.remove();
        }, 600);
    }

    createRippleEffect(x, y, color = 'rgba(255, 255, 255, 0.3)') {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 999;
            animation: ripple-expand 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Animación de texto
    typewriterEffect(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }

    // Efecto de partículas para clics
    createClickParticles(x, y) {
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-particle';
            
            const angle = (i / 8) * Math.PI * 2;
            const velocity = 50 + Math.random() * 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: click-particle-move 1s ease-out forwards;
            `;
            
            const keyframes = `
                @keyframes click-particle-move {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(${vx}px, ${vy}px) scale(0);
                        opacity: 0;
                    }
                }
            `;
            
            this.addKeyframes(keyframes);
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    // Efecto de ondas
    createWaveEffect(x, y) {
        const wave = document.createElement('div');
        wave.className = 'wave-effect';
        
        wave.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 998;
            animation: wave-expand 1s ease-out forwards;
        `;
        
        document.body.appendChild(wave);
        
        setTimeout(() => {
            wave.remove();
        }, 1000);
    }
}

// Agregar estilos adicionales para las animaciones
const animationStyles = `
    @keyframes star-twinkle {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
    }
    
    @keyframes explosion-grow {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
    
    @keyframes ripple-expand {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
    @keyframes click-particle-move {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--vx), var(--vy)) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes wave-expand {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
    
    .floating-particle {
        filter: blur(0.5px);
    }
    
    .moving-star {
        filter: blur(0.3px);
    }
    
    .shooting-star {
        filter: blur(0.2px);
    }
`;

// Agregar estilos al head
const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = animationStyles;
document.head.appendChild(animationStyleSheet);

// Inicializar sistema de animaciones
document.addEventListener('DOMContentLoaded', () => {
    window.animationSystem = new AnimationSystem();
    
    // Event listeners para efectos de clic
    document.addEventListener('click', (e) => {
        window.animationSystem.createClickParticles(e.clientX, e.clientY);
        window.animationSystem.createWaveEffect(e.clientX, e.clientY);
    });
}); 