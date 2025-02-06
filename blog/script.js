// Create audio element for category click sound
const categoryClickSound = new Audio();

// Support multiple audio formats for cross-browser compatibility
const audioFiles = {
    mp3: './sounds/click.mp3',
    ogg: './sounds/click.ogg',
    wav: './sounds/click.wav'
};

// Check which audio format is supported
function setAudioSource() {
    if (categoryClickSound.canPlayType('audio/mpeg')) {
        categoryClickSound.src = audioFiles.mp3;
    } else if (categoryClickSound.canPlayType('audio/ogg')) {
        categoryClickSound.src = audioFiles.ogg;
    } else if (categoryClickSound.canPlayType('audio/wav')) {
        categoryClickSound.src = audioFiles.wav;
    }
}

// Preload the sound
function preloadSound() {
    setAudioSource();
    categoryClickSound.load();
    categoryClickSound.volume = 1;
}

// Play sound function with user interaction handling
function playSound() {
    // Reset the sound to start
    categoryClickSound.currentTime = 0;
    
    // Create a promise to play the sound
    const playPromise = categoryClickSound.play();

    // Handle the promise
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Sound played successfully
        }).catch(error => {
            console.log("Sound play failed:", error);
        });
    }
}

// Initialize sound when document is ready
document.addEventListener('DOMContentLoaded', () => {
    // Preload the sound
    preloadSound();
    
    // Add click handlers to all category elements
    const categories = document.querySelectorAll('.blog-category');
    const menuToggle = document.querySelector('.menu-toggle');
    const categoriesToggle = document.querySelector('.categories-toggle');
    
    // Handle category clicks
    categories.forEach(category => {
        category.addEventListener('click', (e) => {
            playSound();
            if (category.tagName === 'A') {
                e.preventDefault();
            }
        });
    });

    // Handle mobile menu toggle click
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            playSound();
        });
    }

    // Handle categories sidebar toggle click
    if (categoriesToggle) {
        categoriesToggle.addEventListener('click', () => {
            playSound();
        });
    }
}); 