// Content Loader for CIS 300 Course Materials
class ContentLoader {
    constructor() {
        this.contentCache = new Map();
        this.baseUrl = '';
    }

    // Load and cache HTML content
    async loadContent(path) {
        if (this.contentCache.has(path)) {
            return this.contentCache.get(path);
        }

        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const content = await response.text();
            const processedContent = this.processContent(content);
            
            this.contentCache.set(path, processedContent);
            return processedContent;
        } catch (error) {
            console.error(`Error loading content from ${path}:`, error);
            return this.getErrorContent(path);
        }
    }

    // Process content to fix paths and references
    processContent(content) {
        // Extract body content if it's a full HTML document
        if (content.includes('<html>')) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');
            content = doc.body ? doc.body.innerHTML : content;
        }

        // Fix file paths
        content = content.replace(/\$IMS-CC-FILEBASE\$/g, 'web_resources');
        content = content.replace(/\$CANVAS_OBJECT_REFERENCE\$/g, '#');
        content = content.replace(/\$WIKI_REFERENCE\$/g, '#');
        content = content.replace(/\$CANVAS_COURSE_REFERENCE\$/g, '#');

        // Convert Canvas-style links to functional ones
        content = content.replace(/href="([^"]*\.html)"/g, 'href="#" onclick="loadPageContent(\'$1\')"');
        
        // Handle media embeds
        content = this.processMediaEmbeds(content);
        
        // Handle images
        content = this.processImages(content);

        return content;
    }

    // Process media embeds (videos, iframes)
    processMediaEmbeds(content) {
        // Handle ASU MediaPlus embeds
        content = content.replace(
            /<iframe[^>]*src="([^"]*mediaplus\.asu\.edu[^"]*)"[^>]*><\/iframe>/g,
            '<div class="media-embed" onclick="openMediaViewer(\'$1\')">' +
            '<i class="fas fa-play-circle"></i>' +
            '<span>Click to view ASU Media</span>' +
            '</div>'
        );

        // Handle YouTube embeds
        content = content.replace(
            /<iframe[^>]*src="([^"]*youtube\.com[^"]*)"[^>]*><\/iframe>/g,
            '<div class="media-embed" onclick="openMediaViewer(\'$1\')">' +
            '<i class="fab fa-youtube"></i>' +
            '<span>Click to view YouTube video</span>' +
            '</div>'
        );

        // Handle generic iframes
        content = content.replace(
            /<iframe[^>]*src="([^"]*)"[^>]*><\/iframe>/g,
            '<div class="media-embed" onclick="openMediaViewer(\'$1\')">' +
            '<i class="fas fa-external-link-alt"></i>' +
            '<span>Click to view external content</span>' +
            '</div>'
        );

        return content;
    }

    // Process images
    processImages(content) {
        // Make images clickable for full view
        content = content.replace(
            /<img([^>]*src="([^"]*)"[^>]*)>/g,
            '<img$1 onclick="openImageViewer(\'$2\')" style="cursor: pointer;">'
        );

        return content;
    }

    // Get error content when loading fails
    getErrorContent(path) {
        return `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Content Not Available</h3>
                <p>Unable to load content from: <code>${path}</code></p>
                <p>This content may not be available in the current setup.</p>
            </div>
        `;
    }

    // Load course structure from manifest
    async loadCourseStructure() {
        try {
            const manifestContent = await this.loadContent('imsmanifest.xml');
            return this.parseCourseStructure(manifestContent);
        } catch (error) {
            console.error('Error loading course structure:', error);
            return this.getDefaultStructure();
        }
    }

    // Parse course structure from manifest XML
    parseCourseStructure(manifestXML) {
        // This would parse the actual XML structure
        // For now, return the predefined structure
        return courseStructure;
    }

    // Get default structure if manifest parsing fails
    getDefaultStructure() {
        return {
            modules: [
                {
                    id: "welcome",
                    title: "Welcome and Start Here",
                    items: [
                        { id: "welcome-start", title: "Welcome and Start Here", type: "page", file: "welcome-and-start-here.html" },
                        { id: "academic-integrity", title: "Academic Integrity", type: "page", file: "cis-300-academic-integrity.html" },
                        { id: "textbook-setup", title: "Textbook & Setup", type: "page", file: "step-2-get-the-textbook-and-setup-your-development-environment.html" }
                    ]
                }
            ]
        };
    }

    // Clear cache
    clearCache() {
        this.contentCache.clear();
    }

    // Get cache size
    getCacheSize() {
        return this.contentCache.size;
    }
}

// Global content loader instance
const contentLoader = new ContentLoader();

// Global functions for content loading
async function loadPageContent(filename) {
    const content = await contentLoader.loadContent(`wiki_content/${filename}`);
    const title = filename.replace('.html', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    openModal(title, content);
}

function openImageViewer(imageSrc) {
    const modal = document.getElementById('contentModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    
    title.textContent = 'Image Viewer';
    body.innerHTML = `
        <div class="image-viewer">
            <img src="${imageSrc}" alt="Course Image" style="max-width: 100%; height: auto; border-radius: 8px;">
        </div>
    `;
    
    modal.style.display = 'block';
}

function openMediaViewer(mediaSrc) {
    const viewer = document.getElementById('mediaViewer');
    const container = document.getElementById('mediaContainer');
    
    // Determine media type and create appropriate embed
    if (mediaSrc.includes('youtube.com') || mediaSrc.includes('youtu.be')) {
        const videoId = extractYouTubeId(mediaSrc);
        container.innerHTML = `
            <iframe width="800" height="450" 
                    src="https://www.youtube.com/embed/${videoId}" 
                    frameborder="0" allowfullscreen></iframe>
        `;
    } else if (mediaSrc.includes('mediaplus.asu.edu')) {
        container.innerHTML = `
            <iframe width="800" height="450" 
                    src="${mediaSrc}" 
                    frameborder="0" allowfullscreen 
                    allow="geolocation *; microphone *; camera *; midi *; encrypted-media *; autoplay *; clipboard-write *; display-capture *"></iframe>
        `;
    } else {
        container.innerHTML = `
            <iframe width="800" height="450" 
                    src="${mediaSrc}" 
                    frameborder="0"></iframe>
        `;
    }
    
    viewer.style.display = 'block';
}

function extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentLoader;
}