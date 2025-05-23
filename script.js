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

// Intersection Observer for Sections and Scroll Animations
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const animatedElements = document.querySelectorAll('.animate-on-scroll'); // Generic class for scroll animations

const sectionObserver = new IntersectionObserver((entries) => {
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
            
            // Add 'is-visible' class to the section itself for potential direct section animations
            entry.target.classList.add('is-visible');

        } else {
            // Optional: Remove 'is-visible' when section scrolls out of view
            // entry.target.classList.remove('is-visible');
        }
    });
}, { threshold: 0.2 }); // Lowered threshold for earlier animation trigger

sections.forEach(section => sectionObserver.observe(section));

// Separate IntersectionObserver for individual animated elements
const elementObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Optional: Stop observing once animated
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of the element is visible

animatedElements.forEach(el => elementObserver.observe(el));


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

// Create audio element for click sound
const clickSound = new Audio();
clickSound.src = './blog/sounds/click.mp3';
clickSound.volume = 0.7;

// Single function to play sound with error handling
function playClickSound() {
    const sound = new Audio('./blog/sounds/click.mp3');
    sound.volume = 0.7;
    sound.play().catch(err => {
        console.error('Sound play failed:', err);
    });
}

// Blog and navigation handling
const blogLink = document.querySelector('.blog-link');
if (blogLink) {
    blogLink.addEventListener('click', (e) => {
        e.preventDefault();
        playClickSound();
        setTimeout(() => {
            window.location.href = '/blog/index.html';
        }, 100);
    });
}

// Enhanced Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const hireButton = document.querySelector('.hire-me-btn');
    const backToTopButton = document.querySelector('.back-to-top');
    const blogLink = document.querySelector('.blog-link');

    // Mobile menu toggle
    if (menuToggle && navLinksContainer) {
        // Toggle menu when clicking the hamburger
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinksContainer.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
            });
        });
    }

    // Back to top button
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Blog link
    if (blogLink) {
        blogLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/blog/index.html';
        });
    }
});

// Set active state based on current page
function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (currentPath.includes('blog') && link.classList.contains('blog-link')) {
            link.classList.add('active');
        } else if (currentPath === '/' || currentPath.endsWith('index.html')) {
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        }
    });
}

// Initialize active state
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    
    // Initialize particle system if it exists
    if (typeof initParticleSystem === 'function') {
        initParticleSystem();
    }
    
    // Initialize dynamic navigation if it exists
    if (typeof initDynamicNavigation === 'function') {
        initDynamicNavigation();
    }

    // Add animation classes to elements after DOM is loaded
    // Example: Add 'animate-on-scroll fade-in-up' to section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.classList.add('animate-on-scroll', 'fade-in-up');
        elementObserver.observe(title); // Make sure observer watches these newly classed elements
    });
    // Example: Add to about text and skill bars container
    const aboutText = document.querySelector('.about-text');
    const skillBarsContainer = document.querySelector('.skill-bars');
    if(aboutText) {
        aboutText.classList.add('animate-on-scroll', 'slide-in-left');
        elementObserver.observe(aboutText);
    }
    if(skillBarsContainer) {
        skillBarsContainer.classList.add('animate-on-scroll', 'slide-in-right');
        elementObserver.observe(skillBarsContainer);
    }
    // Add to portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.classList.add('animate-on-scroll', 'fade-in-up');
        elementObserver.observe(item);
    });
    // Add to contact form
    const contactFormEl = document.querySelector('.contact-form');
    if(contactFormEl){
        contactFormEl.classList.add('animate-on-scroll', 'fade-in-up');
        elementObserver.observe(contactFormEl);
    }


});

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(skillBar => {
        const progressBar = skillBar.querySelector('.progress-bar');
        if (progressBar) {
            const skillName = skillBar.dataset.skill;
            const skills = {
                'Process Engineering': 90,
                'Chemical Plant Design': 85,
                'Process Safety Management': 95,
                'Heat & Mass Transfer': 88,
                'Process Simulation': 82,
                'Unit Operations': 87
            };
            
            if (skillName in skills) {
                progressBar.style.width = `${skills[skillName]}%`;
            }
        }
    });
}

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // console.log('Form submitted'); // REMOVED Debug log

    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    const formStatus = document.getElementById('formStatus');
    formStatus.innerHTML = '';

    // Collect form data
    const formData = new FormData(contactForm);

    // console.log('Form data:', formData); // REMOVED Debug log

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxPysHPqauIRGihEblZwDbl-fVFe4z5BohHKLR2NsXDAfwS3ZybYQaf-ptTHPcFAGI7/exec', {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Note: 'no-cors' limits ability to get actual success/failure from server
        });

        // console.log('Response:', response); // REMOVED Debug log

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

// Portfolio hover effects - slightly modified to ensure compatibility with scroll animations
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    // Mouse enter/leave for overlay is handled by CSS :hover now for simplicity
    // item.addEventListener('mouseenter', () => {
    //     item.querySelector('.portfolio-overlay').style.opacity = '1';
    // });
    // item.addEventListener('mouseleave', () => {
    //     item.querySelector('.portfolio-overlay').style.opacity = '0';
    // });

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
    let mouse = { x: null, y: null, radius: 100 }; // Added mouse object

    // Mouse move listener
    window.addEventListener('mousemove', event => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });
    
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
            
            // Color based on theme - updated to use CSS variables
            const particleColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#00C9A7';
            this.color = `rgba(${parseInt(particleColor.slice(1,3), 16)}, ${parseInt(particleColor.slice(3,5), 16)}, ${parseInt(particleColor.slice(5,7), 16)}, ${this.alpha})`;
        }
        
        update() {
            // Mouse interaction
            if (mouse.x !== null && mouse.y !== null) {
                const dxMouse = this.x - mouse.x;
                const dyMouse = this.y - mouse.y;
                const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distanceMouse < mouse.radius) {
                    const forceDirectionX = dxMouse / distanceMouse;
                    const forceDirectionY = dyMouse / distanceMouse;
                    const force = (mouse.radius - distanceMouse) / mouse.radius;
                    const directionX = forceDirectionX * force * 0.5; // Adjust strength of push
                    const directionY = forceDirectionY * force * 0.5;
                    this.x += directionX;
                    this.y += directionY;
                }
            }

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
                    // Updated to use CSS variables for line color
                    const lineColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#00C9A7';
                    ctx.strokeStyle = `rgba(${parseInt(lineColor.slice(1,3), 16)}, ${parseInt(lineColor.slice(3,5), 16)}, ${parseInt(lineColor.slice(5,7), 16)}, ${alpha})`;
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

// Simple blog navigation
document.addEventListener('DOMContentLoaded', () => {
    // Handle blog navigation
    const blogLink = document.querySelector('.blog-link');
    if (blogLink) {
        blogLink.addEventListener('click', (e) => {
            e.preventDefault();
            // playClickSound(); // Consider if sound is needed here
            setTimeout(() => {
                window.location.href = blogLink.href; // Use href attribute for flexibility
            }, 100); // Short delay for sound or other effects
        });
    }

    initProjectCarousel(); // Initialize the project carousel
});

function initProjectCarousel() {
    const carousel = document.querySelector('.project-carousel');
    const cards = Array.from(document.querySelectorAll('.carousel-card'));
    const prevBtn = document.querySelector('.carousel-nav.prev-btn');
    const nextBtn = document.querySelector('.carousel-nav.next-btn');

    if (!carousel || cards.length === 0 || !prevBtn || !nextBtn) {
        console.warn('Carousel elements not found. Skipping initialization.');
        return;
    }

    let currentIndex = 0;
    const totalCards = cards.length;
    // const cardWidth = cards[0].offsetWidth + 20; // REMOVED Unused variable
    // const visibleCards = 3; // REMOVED Unused variable

    // function updateCarousel() { // REMOVED This function body was an alternative/older implementation
    // }
    
    // Main function to arrange cards in 3D space
    function arrangeCards() {
        const radius = 350; // Adjust for spread
        const angleStep = (Math.PI * 2) / totalCards;

        cards.forEach((card, i) => {
            const cardAngle = (i - currentIndex) * angleStep;
            let x = Math.sin(cardAngle) * radius;
            let z = Math.cos(cardAngle) * radius - radius; // Pull current card forward
            let yRotation = Math.atan2(x, z) * (180 / Math.PI);

            let scale = 0.85;
            let opacity = 0.7;
            let zIndex = totalCards - Math.abs(i - currentIndex);


            if (i === currentIndex) {
                x = 0;
                z = 0; // Active card in the center
                yRotation = 0;
                scale = 1;
                opacity = 1;
                zIndex = totalCards + 1;
                card.classList.add('active');
            } else {
                card.classList.remove('active');
                // Adjust for cards not in the center
                if (Math.abs(i - currentIndex) === 1 || Math.abs(i - currentIndex) === totalCards -1) { // Immediate neighbors
                    scale = 0.9;
                    opacity = 0.85;
                    z = Math.cos(cardAngle) * (radius - 100) - (radius-100); // Bring neighbors slightly closer
                }
            }
            
            // Correct rotation: card should face center or slightly outwards
            let rotationAngleDeg = (i - currentIndex) * (360 / totalCards);
             if (i !== currentIndex) {
                // Cards should face towards the center of the view, but angled based on their position
                 rotationAngleDeg = (i - currentIndex) * 20; // Example: 20 deg step
            } else {
                rotationAngleDeg = 0;
            }


            card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotationAngleDeg}deg) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.zIndex = zIndex;

            if (card.classList.contains('is-flipped')) {
                card.classList.remove('is-flipped');
            }
        });
    }


    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        arrangeCards();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        arrangeCards();
    });

    cards.forEach(card => {
        // Flip on card click (if it's the active card)
        card.addEventListener('click', (e) => {
            if (card.classList.contains('active')) {
                 if (!e.target.classList.contains('details-btn')) { // Don't flip if details button is clicked
                    card.classList.toggle('is-flipped');
                }
            } else {
                // If a non-active card is clicked, bring it to front
                const cardIndex = cards.indexOf(card);
                if (cardIndex !== -1) {
                    currentIndex = cardIndex;
                    arrangeCards();
                }
            }
        });

        // Re-wire details button for popup
        const detailsBtn = card.querySelector('.details-btn');
        if (detailsBtn) {
            detailsBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card flip if button is on front/accessible
                const description = detailsBtn.dataset.description || "Details not available for this project.";
                // Assuming targetRect is not strictly needed or can be derived differently for the popup
                // For simplicity, let's try to show popup without precise targetRect from old grid.
                // This might need adjustment for popup positioning.
                const cardRect = card.getBoundingClientRect(); // Use card's rect
                showPopup(description, cardRect); 
            });
        }
    });

    arrangeCards(); // Initial arrangement
}


// Initialize 3D Hero Scene
function initHero3DScene() {
    const container = document.getElementById('hero-3d-container');
    if (!container) {
        console.log('3D container not found, skipping 3D scene initialization.');
        return;
    }
    const loaderElement = document.getElementById('loader');

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1, 5); // Adjusted for a typical model viewing distance

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Softer ambient light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7); // Stronger directional light
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    // controls.autoRotate = true; // Optional: auto-rotate model
    // controls.autoRotateSpeed = 0.5;

    // Create a 3D Primitive (Icosahedron)
    const geometry = new THREE.IcosahedronGeometry(1.5, 0); // Radius 1.5, detail 0 for a chiseled look
    const primaryColorCSS = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(primaryColorCSS || '#00C9A7'), // Fallback to default teal
        metalness: 0.4,
        roughness: 0.6,
        flatShading: true // Gives a more geometric, playful look
    });
    const icosahedron = new THREE.Mesh(geometry, material);
    icosahedron.position.set(0, 0.5, 0); // Slightly elevated
    scene.add(icosahedron);

    if (loaderElement) loaderElement.style.display = 'none'; // Hide loader

    // Adjust camera position for the primitive
    camera.position.set(0, 1, 4); // Closer to the primitive
    controls.target.set(0, 0.5, 0); // Ensure controls target the primitive

    // Animation Loop
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();

        // Animate the icosahedron
        if (icosahedron) {
            icosahedron.rotation.x += 0.003 * (1 + Math.sin(Date.now() * 0.0005)); // Varied speed rotation
            icosahedron.rotation.y += 0.005;
            // Add a slight bobbing motion
            icosahedron.position.y = 0.5 + Math.sin(Date.now() * 0.001) * 0.1;
        }

        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // Window Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}


// Flask interaction with enhanced animation
document.addEventListener('DOMContentLoaded', () => {
    initHero3DScene(); // Call the 3D scene initialization
    // REMOVED: flaskImage and flaskMessage related code as the flask element was removed from HTML.
});
