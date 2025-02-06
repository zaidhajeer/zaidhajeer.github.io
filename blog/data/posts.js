const posts = [
    {
        id: "Aluminum-corrosion",
        title: "Aluminum Corrosion: Causes, Prevention, and Maintenance Made Easy",
        description: "Unlock expert tips and practical strategies to protect your aluminum assets from corrosion, ensuring lasting durability and performance.",
        date: "2025-02-06",
        categories: ["Corrosion", "Corrosion Prevention"],
        tags: ["aluminum alloys", "metal-corrosion-treatment", "corrosion-resistant-coatings"],
        featured: false
    }
    // Add more posts here
];

// Helper function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

const blogData = {
    categories: {},
    posts: posts,

    // Updated function to handle multiple categories
    initializeCategories: function() {
        this.categories = {};
        
        // Count posts in each category
        this.posts.forEach(post => {
            post.categories.forEach(category => {
                if (!this.categories[category]) {
                    this.categories[category] = {
                        count: 1,
                        posts: [post.id]
                    };
                } else {
                    this.categories[category].count++;
                    this.categories[category].posts.push(post.id);
                }
            });
        });
    },

    // Function to get featured post
    getFeaturedPost: function() {
        return this.posts.find(post => post.featured);
    },

    // Function to get posts by category
    getPostsByCategory: function(category) {
        return this.posts.filter(post => post.categories.includes(category));
    },

    // Function to get recent posts
    getRecentPosts: function(limit = 5) {
        return this.posts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    },

    // Function to get post by ID
    getPostById: function(id) {
        return this.posts.find(post => post.id === id);
    },

    // Function to format date
    formatDate: function(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
};

// Initialize categories when the file loads
blogData.initializeCategories(); 