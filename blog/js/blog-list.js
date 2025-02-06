document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.querySelector('.posts-grid');
    
    if (!postsContainer) return;

    // Clear existing content
    postsContainer.innerHTML = '';
    
    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );

    // Create HTML for each post
    sortedPosts.forEach(post => {
        const postElement = `
            <article class="blog-card">
                <a href="posts/${post.id}/index.html" class="blog-link">
                    <div class="blog-card-content">
                        <div class="blog-meta">
                            <span class="blog-date">${formatDate(post.date)}</span>
                            <div class="blog-categories">
                                ${post.categories.map(category => 
                                    `<span class="blog-category">${category}</span>`
                                ).join('')}
                            </div>
                        </div>
                        <h2 class="blog-title">${post.title}</h2>
                        <p class="blog-excerpt">${post.description}</p>
                        <div class="blog-tags">
                            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </a>
            </article>
        `;
        postsContainer.insertAdjacentHTML('beforeend', postElement);
    });
});

// Helper function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}