document.addEventListener('DOMContentLoaded', () => {
    const categoryList = document.querySelector('.category-list');
    
    // Initialize categories
    blogData.initializeCategories();
    
    // Check if there are any categories
    if (Object.keys(blogData.categories).length === 0) {
        categoryList.innerHTML = `
            <li class="no-categories">
                <p>No categories yet</p>
                <span class="empty-state-message">Categories will appear here as blog posts are added.</span>
            </li>
        `;
        return;
    }

    // Render categories with post counts
    categoryList.innerHTML = Object.entries(blogData.categories)
        .sort(([a], [b]) => a.localeCompare(b)) // Sort alphabetically
        .map(([category, data]) => `
            <li>
                <a href="#" class="category-link" data-category="${category}">
                    <span>${category}</span>
                    <span class="post-count">${data.count}</span>
                </a>
            </li>
        `)
        .join('');

    // Add click handlers for category links
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            const posts = blogData.getPostsByCategory(category);
            // You can implement showing posts by category here
            console.log(`Posts in ${category}:`, posts);
        });
    });
}); 