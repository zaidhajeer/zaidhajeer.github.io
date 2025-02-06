// Create audio element for category click sound
const categoryClickSound = new Audio();
categoryClickSound.src = './sounds/click.mp3';
categoryClickSound.volume = 0.7;

// Single function to play sound
function playClickSound() {
    categoryClickSound.currentTime = 0; // Reset sound to start
    categoryClickSound.play().catch(err => {
        console.error('Sound play failed:', err);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // First, let's test if the sound loads correctly
    categoryClickSound.addEventListener('canplaythrough', () => {
        console.log('Sound loaded successfully');
    });

    categoryClickSound.addEventListener('error', (e) => {
        console.error('Sound failed to load:', e);
    });

    const postsContainer = document.getElementById('blogPostsContainer');
    const categoryLists = document.querySelectorAll('.category-list');
    const categoriesToggle = document.querySelector('.categories-toggle');
    const categoriesSidebar = document.querySelector('.mobile-categories-sidebar');
    const overlay = document.querySelector('.mobile-overlay');
    const closeSidebarBtn = document.querySelector('.mobile-sidebar-close');
    const menuToggle = document.querySelector('.menu-toggle');
    
    // Get unique categories from posts
    const uniqueCategories = [...new Set(posts.flatMap(post => post.categories))];
    
    // Create category list items
    function createCategoryList() {
        const categoryHTML = uniqueCategories.map(category => {
            const count = posts.filter(post => post.categories.includes(category)).length;
            return `
                <li>
                    <a href="#" data-category="${category}">
                        <span class="category-name">${category}</span>
                        <span class="post-count">${count}</span>
                    </a>
                </li>
            `;
        }).join('');

        // Update both desktop and mobile category lists
        categoryLists.forEach(list => {
            list.innerHTML = categoryHTML;
        });
    }

    // Initialize categories
    createCategoryList();

    // Add click handlers for categories
    categoryLists.forEach(list => {
        list.addEventListener('click', (e) => {
            if (e.target.closest('a')) {
                e.preventDefault();
                playClickSound(); // Single sound play
                
                const category = e.target.closest('a').dataset.category;
                filterPosts(category);
                
                document.querySelectorAll('.category-list a').forEach(a => {
                    a.classList.remove('active');
                });
                document.querySelectorAll(`[data-category="${category}"]`).forEach(a => {
                    a.classList.add('active');
                });
            }
        });
    });

    function toggleCategoriesSidebar() {
        playClickSound(); // Play sound when toggling sidebar
        categoriesSidebar.classList.toggle('active');
        document.body.style.overflow = categoriesSidebar.classList.contains('active') ? 'hidden' : '';
        
        if (categoriesSidebar.classList.contains('active')) {
            overlay.style.display = 'block';
            setTimeout(() => {
                overlay.classList.add('active');
            }, 10);
        } else {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        }
    }

    // Mobile menu toggle sound
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            playClickSound();
        });
    }

    // Categories toggle sound
    if (categoriesToggle) {
        categoriesToggle.addEventListener('click', (e) => {
            e.preventDefault();
            playClickSound();
            toggleCategoriesSidebar();
        });
    }

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            playClickSound();
            toggleCategoriesSidebar();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            e.preventDefault();
            playClickSound();
            toggleCategoriesSidebar();
        });
    }

    // Filter posts by category
    function filterPosts(category) {
        const filteredPosts = posts.filter(post => 
            post.categories.includes(category)
        );
        renderPosts(filteredPosts);
    }

    // Render posts
    function renderPosts(postsToRender = posts) {
        if (!postsContainer) return;

        const postsHTML = postsToRender.map(post => `
            <article class="blog-card">
                <a href="posts/${post.id}/index.html" class="blog-link">
                    <div class="blog-card-content">
                        <div class="blog-meta">
                            <time datetime="${post.date}">${formatDate(post.date)}</time>
                            <div class="blog-categories">
                                ${post.categories.map(category => 
                                    `<span class="blog-category">${category}</span>`
                                ).join('')}
                            </div>
                        </div>
                        <h2 class="blog-title">${post.title}</h2>
                        <p class="blog-excerpt">${post.description}</p>
                        <div class="blog-tags">
                            ${post.tags.map(tag => 
                                `<span class="tag">${tag}</span>`
                            ).join('')}
                        </div>
                    </div>
                </a>
            </article>
        `).join('');

        postsContainer.innerHTML = postsHTML;
    }

    // Helper function to format dates
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Initial render
    renderPosts();
});