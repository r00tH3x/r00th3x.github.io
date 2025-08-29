// ====================================
// r00tH3x Website - Enhanced JavaScript
// ====================================

// Global Variables
let currentLang = 'id';
let particleCount = 0;
const maxParticles = 50;

// ====================================
// Loading Screen
// ====================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        // Initialize everything after loading
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            initializeWebsite();
        }, 500);
    }, 1500);
});

// ====================================
// Website Initialization
// ====================================
function initializeWebsite() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });
    
    // Initialize all features
    initializeLanguage();
    initializeTheme();
    initializeNavigation();
    initializeAnimations();
    initializeParticles();
    initializeTypingEffect();
    initializeScrollEffects();
    initializeToolCards();
}

// ====================================
// Language System
// ====================================
function initializeLanguage() {
    const languageToggle = document.getElementById('languageToggle');
    
    // Load saved language
    const savedLang = localStorage.getItem('language') || 'id';
    switchLanguage(savedLang);
    
    // Language toggle event
    languageToggle.addEventListener('change', (e) => {
        switchLanguage(e.target.value);
        
        // Add smooth transition effect
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '0.8';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 300);
    });
}

function switchLanguage(lang) {
    currentLang = lang;
    const elements = document.querySelectorAll('[data-lang-en][data-lang-id]');
    
    elements.forEach(element => {
        if (lang === 'en') {
            element.textContent = element.getAttribute('data-lang-en');
        } else {
            element.textContent = element.getAttribute('data-lang-id');
        }
    });

    // Update language selector
    document.getElementById('languageToggle').value = lang;
    
    // Save language preference
    localStorage.setItem('language', lang);
    
    // Update document language
    document.documentElement.lang = lang === 'en' ? 'en' : 'id';
}

// ====================================
// Theme System
// ====================================
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-sun';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        
        // Add rotation animation
        themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
        
        if (currentTheme === 'light') {
            body.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
            
            // Dark theme particles
            updateParticleColors('#00ff88');
        } else {
            body.setAttribute('data-theme', 'light');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
            
            // Light theme particles
            updateParticleColors('#00b569');
        }
    });
}

// ====================================
// Navigation System
// ====================================
function initializeNavigation() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Add smooth scroll with offset for navbar
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Add click ripple effect
                createRippleEffect(this, e);
            }
        });
    });

    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        const navbar = document.querySelector('.navbar');
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.transform = 'translateY(0)';
            
            if (document.body.getAttribute('data-theme') === 'light') {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            
            if (document.body.getAttribute('data-theme') === 'light') {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
        
        // Auto-hide navbar on scroll down
        if (scrollY > lastScrollY && scrollY > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
}

// ====================================
// Advanced Animations
// ====================================
function initializeAnimations() {
    // Intersection Observer for advanced animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger animation for tool cards
                if (entry.target.classList.contains('tool-card')) {
                    animateToolCard(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.tool-card, .hero-content').forEach(el => {
        observer.observe(el);
    });
}

function animateToolCard(card) {
    const elements = card.querySelectorAll('.tool-icon, .tool-title, .tool-description, .tool-features li, .tool-links a');
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ====================================
// Particle System
// ====================================
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    
    function createParticle() {
        if (particleCount >= maxParticles) return;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position and properties
        const size = Math.random() * 4 + 2;
        const left = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 6 + 4;
        const delay = Math.random() * 2;
        
        particle.style.left = left + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = animationDuration + 's';
        particle.style.animationDelay = delay + 's';
        
        // Random color variation
        const colors = ['#00ff88', '#00aaff', '#ff0066'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        particlesContainer.appendChild(particle);
        particleCount++;
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                particleCount--;
            }
        }, (animationDuration + delay) * 1000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 500);
    
    // Create initial burst
    for (let i = 0; i < 10; i++) {
        setTimeout(createParticle, i * 100);
    }
}

function updateParticleColors(newColor) {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.background = newColor;
        particle.style.boxShadow = `0 0 10px ${newColor}`;
    });
}

// ====================================
// Typing Effect
// ====================================
function initializeTypingEffect() {
    const heroTitle = document.getElementById('heroTitle');
    
    setTimeout(() => {
        typeWriter(heroTitle, 'r00tH3x', 150, () => {
            // Add glow effect after typing
            heroTitle.style.animation = 'titleGlow 3s ease-in-out infinite alternate';
        });
    }, 2000);
}

function typeWriter(element, text, speed = 100, callback) {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '3px solid #00ff88';
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else {
            // Remove cursor
            element.style.borderRight = 'none';
            if (callback) callback();
        }
    }
    
    typing();
}

// ====================================
// Scroll Effects
// ====================================
function initializeScrollEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
        
        // Parallax effect for background shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrollY * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
        
        // Update floating shapes rotation based on scroll
        const floatingShapes = document.querySelector('.floating-shapes');
        if (floatingShapes) {
            floatingShapes.style.transform = `rotate(${scrollY * 0.1}deg)`;
        }
        
        lastScrollY = scrollY;
    }, { passive: true });
}

// ====================================
// Tool Cards Interactions
// ====================================
function initializeToolCards() {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        // Mouse move effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
        
        // Click animation
        card.addEventListener('click', (e) => {
            createRippleEffect(card, e);
        });
    });
}

// ====================================
// Utility Functions
// ====================================
function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(0, 255, 136, 0.3)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 0.6s ease-out';
    
    // Add ripple keyframes if not exists
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ====================================
// Documentation Modal
// ====================================
function showDocs(toolName) {
    const message = currentLang === 'en' 
        ? `Documentation for ${toolName} coming soon! Check the GitHub repository for detailed README and usage instructions.`
        : `Dokumentasi untuk ${toolName} segera hadir! Cek repository GitHub untuk README dan instruksi penggunaan yang lengkap.`;
    
    // Create custom modal instead of alert
    createCustomModal(toolName, message);
}

function createCustomModal(title, message) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 20px;
        padding: 2rem;
        max-width: 400px;
        text-align: center;
        position: relative;
        animation: modalSlideIn 0.3s ease-out;
    `;
    
    modalContent.innerHTML = `
        <h3 style="color: var(--accent-primary); margin-bottom: 1rem; font-size: 1.5rem;">${title}</h3>
        <p style="color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.6;">${message}</p>
        <button onclick="this.closest('.modal').remove()" style="
            background: var(--gradient);
            border: none;
            border-radius: 25px;
            padding: 0.8rem 2rem;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        ">OK</button>
    `;
    
    // Add modal animation
    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            @keyframes modalSlideIn {
                0% {
                    transform: scale(0.5) translateY(-50px);
                    opacity: 0;
                }
                100% {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    modal.className = 'modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close on escape key
    const closeOnEscape = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    };
    document.addEventListener('keydown', closeOnEscape);
}

// ====================================
// Performance Optimization
// ====================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ====================================
// Error Handling
// ====================================
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

// ====================================
// Resize Handling
// ====================================
window.addEventListener('resize', debounce(() => {
    // Reinitialize particles on resize
    particleCount = 0;
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
    }
}, 250));

// ====================================
// Console Easter Egg
// ====================================
console.log(`
🔥 r00tH3x Security Tools Website 🔥
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Built with ❤️ by r00tH3x
Advanced animations and effects powered by vanilla JS

Looking for security tools? Check out our GitHub:
https://github.com/r00tH3x

Stay safe and hack responsibly! 🛡️
`);

// ====================================
// Export functions for global access
// ====================================
window.showDocs = showDocs;
