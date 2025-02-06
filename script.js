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

// Blog and navigation handling
const blogLink = document.querySelector('.blog-link');
if (blogLink) {
    blogLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/blog/index.html';
    });
}

// Enhanced Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

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

        // Prevent menu from closing when clicking inside
        navLinksContainer.addEventListener('click', (e) => {
            e.stopPropagation();
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
// Simple blog navigation
document.addEventListener('DOMContentLoaded', () => {
    // Handle blog navigation
    const blogLink = document.querySelector('.blog-link');
    if (blogLink) {
        blogLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'blog/index.html';
        });
    }
});

// Flask interaction with enhanced animation
document.addEventListener('DOMContentLoaded', () => {
    const flaskImage = document.querySelector('.flask-image');
    const flaskMessage = document.querySelector('.flask-message');
    
    if (flaskImage && flaskMessage) {
        flaskImage.addEventListener('click', () => {
            flaskImage.classList.add('clicked');
            flaskMessage.classList.add('show');
            
            setTimeout(() => {
                flaskMessage.classList.remove('show');
            }, 4000); // Increased to 4 seconds
            
            setTimeout(() => {
                flaskImage.classList.remove('clicked');
            }, 1000);
        });
    }
});
