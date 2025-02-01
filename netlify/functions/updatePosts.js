const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    try {
        const postsDir = path.join(__dirname, '../../blogs/posts');
        const posts = [];

        // Read all markdown files
        const files = fs.readdirSync(postsDir);
        files.forEach(file => {
            if (file.endsWith('.md')) {
                const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
                const frontMatter = content.split('---')[1];
                const postData = {};
                
                frontMatter.split('\n').forEach(line => {
                    const [key, ...value] = line.split(':');
                    if (key && value) {
                        postData[key.trim()] = value.join(':').trim();
                    }
                });
                
                postData.slug = file.replace('.md', '');
                posts.push(postData);
            }
        });

        // Write to posts.json
        fs.writeFileSync(
            path.join(__dirname, '../../blogs/posts.json'),
            JSON.stringify({ posts }, null, 2)
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Posts updated successfully' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to update posts' })
        };
    }
};
