// Typing Animation
const typedTextSpan = document.querySelector(".typed-text");
const texts = ["Chemical engineer", "Designer", "Freelancer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
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
});

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

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroModel = document.querySelector('.hero-model');
    heroModel.innerHTML = `
        <div class="flask-container">
            <img src="images/flask.png" alt="Laboratory Flask" class="flask-image">
            <div class="glow-effect"></div>
            <div class="popup-message">
                <div class="popup-content">
                    <p>Hello! 👋</p>
                    <p>I'm a Chemical Engineer passionate about process innovation and sustainable solutions.</p>
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
        threshold: 0.3 // Trigger when 30% of the element is visible
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
                
                // Set the width based on the skill level
                if (progressBar && skillName in skills) {
                    progressBar.style.width = `${skills[skillName]}%`;
                }
                
                // Add animation class
                progressBar.classList.add('animate');
                
                // Stop observing after animation
                skillObserver.unobserve(skillBar);
            }
        });
    }, observerOptions);

    // Start observing each skill bar
    skillBars.forEach(skillBar => {
        // Reset initial width
        const progressBar = skillBar.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        skillObserver.observe(skillBar);
    });

    // Create messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.className = 'messages-container';
    document.body.appendChild(messagesContainer);

    // Modern message content
    const messages = [
        {
            title: "Welcome! ✨",
            text: "Thanks for visiting my Chemical Engineering portfolio.",
            emoji: "🧪"
        },
        {
            title: "About Me",
            text: "I specialize in process innovation and sustainable solutions.",
            emoji: "🔬"
        },
        {
            title: "Let's Connect!",
            text: "Feel free to explore my projects and reach out.",
            emoji: "🤝"
        }
    ];

    function showMessage(message, index) {
        const messageElement = document.createElement('div');
        messageElement.className = 'toast-message';
        messageElement.innerHTML = `
            <div class="toast-content">
                <div class="toast-emoji">${message.emoji}</div>
                <div class="toast-text-content">
                    <div class="toast-title">${message.title}</div>
                    <div class="toast-text">${message.text}</div>
                </div>
            </div>
            <div class="toast-blur"></div>
            <div class="toast-glow"></div>
        `;
        messagesContainer.appendChild(messageElement);

        // Trigger entrance animation
        requestAnimationFrame(() => {
            messageElement.classList.add('show');
        });

        // Remove message with smooth exit
        setTimeout(() => {
            messageElement.classList.add('hide');
            setTimeout(() => messageElement.remove(), 500);
        }, 5000);
    }

    // Show messages with delays
    messages.forEach((message, index) => {
        setTimeout(() => {
            showMessage(message, index);
        }, 5000 + (index * 2500)); // First after 5s, then 2.5s intervals
    });
});