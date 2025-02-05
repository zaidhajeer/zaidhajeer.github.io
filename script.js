// Typing Animation
const typedTextSpan = document.querySelector(".typed-text");
const texts = ["Chemical engineer", "Designer", "Freelancer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    // Add blinking cursor effect
    typedTextSpan.style.borderRight = "0.1em solid";

    let typeSpeed = isDeleting ? 80 : 120;

    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end of typing
        isPaused = true;
        setTimeout(() => {
            isPaused = false;
            isDeleting = true;
            typeSpeed = 50;
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        // Pause before typing next
        isPaused = true;
        setTimeout(() => {
            isPaused = false;
        }, 500);
    }

    if (!isPaused) {
        setTimeout(type, typeSpeed);
    } else {
        setTimeout(type, 2000);
    }
}

type();

// Skill Bars Animation
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Intersection Observer for Sections
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });

            // Animate skill bars when About section is visible
            if (id === 'about') {
                animateSkillBars();
            }
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));

// Mobile Navigation
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Debug log

    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    const formStatus = document.getElementById('formStatus');
    formStatus.innerHTML = '';

    // Collect form data
    const formData = new FormData(contactForm);

    console.log('Form data:', formData); // Debug log

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxPysHPqauIRGihEblZwDbl-fVFe4z5BohHKLR2NsXDAfwS3ZybYQaf-ptTHPcFAGI7/exec', {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        });

        console.log('Response:', response); // Debug log

        // Since no-cors doesn't return response data, we'll assume success if no error
        formStatus.innerHTML = `
            <div class="success-message">
                <svg viewBox="0 0 24 24" class="success-icon">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <p>Message sent successfully!</p>
            </div>
        `;
        contactForm.reset();
    } catch (error) {
        console.error('Error:', error);
        
        formStatus.innerHTML = `
            <div class="error-message">
                <svg viewBox="0 0 24 24" class="error-icon">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <p>Failed to send message. Please try again.</p>
            </div>
        `;
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
    }
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Portfolio hover effects
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.portfolio-overlay').style.opacity = '1';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('.portfolio-overlay').style.opacity = '0';
    });

    // Add read full functionality
    const description = item.querySelector('.portfolio-description');
    const fullText = description.textContent;
    
    // Create read more button
    const readMoreBtn = document.createElement('button');
    readMoreBtn.className = 'read-more-btn';
    readMoreBtn.textContent = 'Read Full';
    description.after(readMoreBtn);

    readMoreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = item.getBoundingClientRect();
        showPopup(fullText, rect);
    });
});

// Updated popup function
function showPopup(text, targetRect) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    
    // Create popup
    const popup = document.createElement('div');
    popup.className = 'description-popup';
    popup.style.position = 'fixed';
    popup.style.top = `${targetRect.top + (targetRect.height / 2)}px`;
    popup.style.left = `${targetRect.left + (targetRect.width / 2)}px`;
    
    // Create content
    const content = document.createElement('div');
    content.className = 'popup-content';
    content.textContent = text;
    
    // Create decoration element
    const decoration = document.createElement('div');
    decoration.className = 'popup-decoration';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-popup';
    closeBtn.innerHTML = '×';
    
    // Assemble popup
    popup.appendChild(decoration);
    popup.appendChild(content);
    popup.appendChild(closeBtn);
    
    // Add to DOM
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
    
    // Activate with slight delay for animation
    requestAnimationFrame(() => {
        overlay.classList.add('active');
        popup.classList.add('active');
    });
    
    // Handle closing
    const closePopup = () => {
        overlay.classList.remove('active');
        popup.classList.remove('active');
        setTimeout(() => {
            overlay.remove();
            popup.remove();
        }, 300);
    };
    
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopup();
    });
}

// 3D Model Viewer
function initModelViewer() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const canvas = document.getElementById('modelViewer');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    
    function updateRendererSize() {
        const container = canvas.parentElement;
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
    }
    updateRendererSize();
    window.addEventListener('resize', updateRendererSize);

    // Enhanced lighting for better material visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, -5, -5);
    scene.add(fillLight);

    // Add point light for better reflections
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    const flaskGroup = new THREE.Group();

    // Updated glass material with less transparency
    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xdddddd,  // Slightly grey tint
        transparent: true,
        opacity: 0.7,     // More opaque
        roughness: 0.2,   // More surface detail
        metalness: 0.1,
        transmission: 0.6, // Less transmission
        thickness: 0.5,   // Thicker glass
        clearcoat: 0.5,   // Less clearcoat
        clearcoatRoughness: 0.2,
        envMapIntensity: 0.8
    });

    // Create flask body (conical shape)
    const bodyGeometry = new THREE.CylinderGeometry(0.8, 2, 4, 32);
    const flaskBody = new THREE.Mesh(bodyGeometry, glassMaterial);

    // Updated liquid material for better visibility
    const liquidGeometry = new THREE.CylinderGeometry(0.75, 1.9, 2.5, 32);
    const liquidMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x00c8ff,  // Brighter blue
        transparent: true,
        opacity: 0.9,     // More opaque liquid
        roughness: 0.1,
        metalness: 0.2,   // Slightly more metallic for better reflections
        transmission: 0.2  // Less transmission
    });

    const liquid = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquid.position.y = -0.75;

    // Create neck with same updated material
    const neckGeometry = new THREE.CylinderGeometry(0.4, 0.8, 1, 32);
    const neck = new THREE.Mesh(neckGeometry, glassMaterial);
    neck.position.y = 2.5;

    // Create rim with same updated material
    const rimGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 32);
    const rim = new THREE.Mesh(rimGeometry, glassMaterial);
    rim.position.y = 3;
    rim.rotation.x = Math.PI / 2;

    // Add subtle inner surface for more depth
    const innerBodyGeometry = new THREE.CylinderGeometry(0.79, 1.98, 4, 32);
    const innerGlassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xcccccc,
        transparent: true,
        opacity: 0.3,
        roughness: 0.1,
        metalness: 0.2,
        side: THREE.BackSide
    });
    const innerBody = new THREE.Mesh(innerBodyGeometry, innerGlassMaterial);
    
    // Add all parts to group
    flaskGroup.add(flaskBody);
    flaskGroup.add(innerBody);
    flaskGroup.add(liquid);
    flaskGroup.add(neck);
    flaskGroup.add(rim);

    scene.add(flaskGroup);

    // Position camera
    camera.position.z = 8;
    camera.position.y = 1;

    // Add controls
    const controls = new THREE.OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;

    // Enhanced animation with subtle movements
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Subtle liquid movement
        liquid.position.y = -0.75 + Math.sin(time) * 0.02;
        
        // Very subtle flask movement for more realism
        flaskGroup.rotation.y += 0.002;
        flaskGroup.rotation.x = Math.sin(time * 0.5) * 0.02;

        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}

// Enhanced Navigation
function initDynamicNavigation() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Add scroll progress bar
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    navbar.appendChild(scrollProgress);
    
    // Add section indicators
    const indicatorContainer = document.createElement('div');
    indicatorContainer.className = 'section-indicator';
    
    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'indicator-dot';
        
        const label = document.createElement('span');
        label.className = 'indicator-label';
        label.textContent = section.getAttribute('id');
        
        dot.appendChild(label);
        indicatorContainer.appendChild(dot);
        
        // Scroll to section on click
        dot.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    document.body.appendChild(indicatorContainer);
    
    // Update navigation on scroll
    function updateNavigation() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Update scroll progress
        const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
        scrollProgress.style.width = `${scrollPercentage}%`;
        
        // Update navbar style
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active section
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const offset = windowHeight * 0.3;
            
            if (rect.top < offset && rect.bottom > offset) {
                // Update nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
                
                // Update indicators
                const dots = document.querySelectorAll('.indicator-dot');
                dots.forEach((dot, dotIndex) => {
                    dot.classList.toggle('active', dotIndex === index);
                });
            }
        });
    }
    
    // Throttle scroll event
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavigation();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial update
    updateNavigation();
}

// Particle Animation System
function initParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.classList.add('particle-canvas');
    document.body.insertBefore(canvas, document.body.firstChild);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    // Responsive canvas sizing
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            // Random starting position
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            
            // Random size between 2 and 4
            this.size = Math.random() * 2 + 2;
            
            // Random velocity
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            
            // Base opacity
            this.alpha = Math.random() * 0.5 + 0.2;
            
            // Color based on theme
            this.color = `rgba(37, 99, 235, ${this.alpha})`;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Wrap around screen
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    // Create particles
    function initParticles() {
        const particleCount = Math.min(window.innerWidth * 0.1, 100);
        particles = Array.from({ length: particleCount }, () => new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
        });
        
        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    
                    const alpha = (1 - distance / 100) * 0.2;
                    ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    // Initialize
    initParticles();
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// Add text reveal animation for sections
function initScrollReveal() {
    const observerOptions = {
        root: null,
        threshold: 0.2,
        rootMargin: "0px"
    };

    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-text');
                textObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select text elements to animate
    const animatedTexts = document.querySelectorAll('.section-title, .about-description, .portfolio-title');
    animatedTexts.forEach(text => {
        text.classList.add('animate-text');
        textObserver.observe(text);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initParticleSystem();
    initDynamicNavigation();
    const heroModel = document.querySelector('.hero-model');
    heroModel.innerHTML = `
        <div class="flask-container">
            <div class="flask-wrapper">
                <img src="images/flask.png" alt="Laboratory Flask" class="flask-image" loading="lazy">
                <div class="glow-effect"></div>
            </div>
            <div class="popup-message">
                <div class="popup-content">
                    <p>Hello! 👋</p>
                    <p>I'm Zaid Hajeer, a Chemical Engineer passionate about process innovation and sustainable solutions.</p>
                </div>
                <div class="popup-blur"></div>
            </div>
        </div>
    `;

    const flask = document.querySelector('.flask-image');
    const popup = document.querySelector('.popup-message');

    flask.addEventListener('click', (e) => {
        e.stopPropagation();
        if (popup.classList.contains('show-popup')) return;
        
        flask.classList.add('active');
        popup.classList.add('show-popup');
    });

    document.addEventListener('click', (e) => {
        if (popup.classList.contains('show-popup')) {
            popup.classList.remove('show-popup');
            flask.classList.remove('active');
        }
    });

    popup.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const progressBar = skillBar.querySelector('.progress-bar');
                const skillName = skillBar.dataset.skill;
                const skills = {
                    'Process Engineering': 90,
                    'Chemical Plant Design': 85,
                    'Process Safety Management': 95,
                    'Heat & Mass Transfer': 88,
                    'Process Simulation': 82,
                    'Unit Operations': 87
                };
                
                if (progressBar && skillName in skills) {
                    progressBar.style.width = `${skills[skillName]}%`;
                }
                
                progressBar.classList.add('animate');
                skillObserver.unobserve(skillBar);
            }
        });
    }, observerOptions);

    skillBars.forEach(skillBar => {
        const progressBar = skillBar.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        skillObserver.observe(skillBar);
    });

    initTextAnimations();
    initScrollReveal();
});