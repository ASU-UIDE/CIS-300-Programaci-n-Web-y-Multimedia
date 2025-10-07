// Course data structure from manifest
const courseStructure = {
    modules: [
        {
            id: "g8ada65237181b343b6c9c4127d690dc7",
            title: "Welcome and Start Here",
            items: [
                { id: "g7c71194d42565de6c3e96474fefb0f39", title: "Welcome and Start Here", type: "page" },
                { id: "ga86174892dbc5faf2c066d3cc7875656", title: "Step 1: Understand Academic Integrity in CIS 300 & W. P. Carey Honor Code", type: "page" },
                { id: "g848831e9ab07581e008906cc93310ee2", title: "CIS 300 Academic Integrity", type: "page" },
                { id: "gfec9f4a78234b3689c307429dc29f59c", title: "W. P. Carey Honor Code", type: "page" },
                { id: "ge59c5b87dfa2bdc8a84fad5b76b45cb7", title: "ASU Academic Integrity Information", type: "page" },
                { id: "g139376865bc524e6415d8af5dff1635a", title: "Step 2: Get the Textbook & Setup Your Development Environment", type: "page" },
                { id: "gf71c455d58a02f12d518f3c55070c44e", title: "Step 3: Software Requirements", type: "page" },
                { id: "g81cc8ef7679ab6c2f8211b07af2308ff", title: "Step 4: Understand Course Case Study and Project Assignments", type: "page" },
                { id: "gddcbbb4a6843123b9f4ae2d638f0ec", title: "Step 5: Understand Course Layout & Read Course Syllabus, Schedule, and FAQ", type: "page" },
                { id: "ga42099ed23c9c4846cff6db170cbd256", title: "Getting Started Quiz", type: "quiz" }
            ]
        },
        {
            id: "g7b35d8f8905c0898a2e3617eadd722af",
            title: "Week 1",
            items: [
                { id: "g0516e79851bfc12875c86bc78d676f3a", title: "Week 1 - Web & HTML Basics", type: "page" },
                { id: "ga120eca643097a51f4d38c3d1830a538", title: "Chapter 1 Internet Web Basics", type: "page" },
                { id: "ge0bca31c25d0749121d1f4d2bbf9e6fd", title: "How the Internet Works in 5 Minutes", type: "page" },
                { id: "gb1ce17d42b3731b4f980e236b2e8b26a", title: "DNS Explained", type: "page" },
                { id: "ge73ad47f84ff1a8b638f7ceaa22aad91", title: "A Packet's Tale. How Does the Internet Work?", type: "page" },
                { id: "ge3c6c3dba7a086b913b8c1afdfbab4e6", title: "Chapter 2 HTML Basics", type: "page" },
                { id: "g684698638b4107e3080be10184144004", title: "HTML Basics", type: "page" },
                { id: "g0df3f1c6b1369715ad2953be1bb894e6", title: "Case Study | Ch2 - Week 1", type: "assignment" },
                { id: "g963d98fe8ae4305cdc4441aa11eb466a", title: "Quiz | Week 1", type: "quiz" }
            ]
        },
        {
            id: "g1c05e00da2a2c51ee3ff6ece32fdebca",
            title: "Case Study Solution - release week 2",
            items: [
                { id: "g359ad8f8d8f88e24656724ff9e8f6470", title: "Week 1 Case Study Solution", type: "page" }
            ]
        },
        {
            id: "g7ab8801ae9fc790ce0d4ea7dec6065f1",
            title: "Week 2",
            items: [
                { id: "g5120f0ae2e7ba7a71a79e9b52f6e204a", title: "Week 2 - Cascading Style Sheets", type: "page" },
                { id: "gbe8cc5eaa152782b880031203408c1ff", title: "Chapter 3 Web Design Basics", type: "page" },
                { id: "g6c80cbc9c4cb4444d19138e04ecbae9b", title: "Chapter 4 Cascading Style Sheets Basics", type: "page" },
                { id: "gc98ed1d4df2eb8c51a7bd7eeed948d0b", title: "CSS Basic Tips", type: "page" },
                { id: "g4287e17410716fd8d3f17e2b5c69d50a", title: "Case Study | Ch4 - Week 2", type: "assignment" },
                { id: "g9b9edf9cae8a0c907a944d8952f870cb", title: "Project | Week 2 - Topic Approval", type: "assignment" },
                { id: "g3be8d83d7ec94b8630746d0bac142e91", title: "Quiz | Week 2", type: "quiz" }
            ]
        }
    ]
};

// Router for GitHub Pages compatibility
class Router {
    constructor() {
        this.routes = {
            'home': () => this.showSection('home'),
            'modules': () => this.showSection('modules'),
            'resources': () => this.showSection('resources'),
            'faq': () => this.showSection('faq'),
            'orientation': () => this.showSection('orientation')
        };
        
        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }
    
    handleRoute() {
        const hash = window.location.hash.slice(1) || 'home';
        const [routeName, ...params] = hash.split('/');
        const route = this.routes[routeName];
        
        if (route) {
            route(params);
        } else {
            // Default to home if route not found
            this.navigate('home');
        }
    }
    
    navigate(sectionId) {
        window.location.hash = sectionId;
    }
    
    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Load content based on section
        loadSectionContent(sectionId);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update page title
        this.updatePageTitle(sectionId);
    }
    
    updatePageTitle(sectionId) {
        const titles = {
            'home': 'Course Home',
            'modules': 'Learning Modules',
            'resources': 'Resources',
            'faq': 'FAQ',
            'orientation': 'Student Orientation'
        };
        
        const baseTitle = '(Cintana) CIS 300: Web Design and Development';
        const sectionTitle = titles[sectionId];
        document.title = sectionTitle ? `${sectionTitle} - ${baseTitle}` : baseTitle;
    }
}

// Initialize router
const router = new Router();

// Navigation functions (kept for compatibility)
function showSection(sectionId) {
    router.navigate(sectionId);
}

async function loadSectionContent(sectionId) {
    switch(sectionId) {
        case 'home':
            await loadCourseHome();
            break;
        case 'modules':
            await loadModules();
            break;
        case 'resources':
            await loadResources();
            break;
        case 'faq':
            await loadFAQ();
            break;
        case 'orientation':
            await loadOrientation();
            break;
    }
}

async function loadCourseHome() {
    const content = await contentLoader.loadContent('wiki_content/course-home.html');
    document.getElementById('courseHomeContent').innerHTML = content;
}

async function loadModules() {
    const container = document.getElementById('modulesContainer');
    let html = '';
    
    for (const module of courseStructure.modules) {
        html += `
            <div class="module-card">
                <div class="module-header">
                    <h3>${module.title}</h3>
                </div>
                <div class="module-items">
        `;
        
        for (const item of module.items) {
            const icon = getItemIcon(item.type);
            html += `
                <div class="module-item" onclick="openContent('${item.id}', '${item.title}', '${item.type}')">
                    <i class="${icon}"></i>
                    <span>${item.title}</span>
                </div>
            `;
        }
        
        html += `
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

async function loadResources() {
    const container = document.getElementById('resourcesGrid');
    
    let html = `
        <div class="resource-category">
            <h3><i class="fas fa-file-alt"></i> Course Syllabus</h3>
            <div class="resource-item" onclick="openSyllabus()">
                <i class="fas fa-file-alt"></i>
                <div class="file-info">
                    <span class="file-name">Course Syllabus</span>
                    <small class="file-description">Complete course syllabus with policies and requirements</small>
                </div>
                <span class="file-type">HTML</span>
            </div>
        </div>
        
        <div class="resource-category">
            <h3><i class="fas fa-book"></i> Textbook Information</h3>
            <div class="resource-item">
                <img src="${courseConfig.resources.textbook.image}" alt="Textbook" class="textbook-cover">
                <div class="resource-info">
                    <h4>${courseConfig.resources.textbook.title}</h4>
                    <p>By: ${courseConfig.resources.textbook.author}</p>
                    <p>ISBN: ${courseConfig.resources.textbook.isbn}</p>
                    <a href="${courseConfig.resources.textbook.companionSite}" 
                       target="_blank" class="btn-secondary">Companion Website</a>
                </div>
            </div>
        </div>
        
        <div class="resource-category">
            <h3><i class="fas fa-tools"></i> Required Software</h3>
            <div class="software-grid">
    `;
    
    courseConfig.resources.software.forEach(software => {
        const options = software.options ? software.options.join(', ') : 
                       software.alternatives ? software.alternatives.join(', ') : '';
        html += `
            <div class="software-item">
                <i class="${software.icon}"></i>
                <div class="software-info">
                    <h4>${software.name}</h4>
                    <p>${software.description}</p>
                    ${options ? `<small>Options: ${options}</small>` : ''}
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
        
        <div class="resource-category">
            <h3><i class="fas fa-folder"></i> Course Documents</h3>
            <div class="files-list">
    `;
    
    courseConfig.resources.documents.forEach(doc => {
        html += `
            <div class="file-item" onclick="openFile('${doc.file}', '${doc.type}')">
                <i class="${doc.icon}"></i>
                <div class="file-info">
                    <span class="file-name">${doc.name}</span>
                    <small class="file-description">${doc.description}</small>
                </div>
                <span class="file-type">${doc.type}</span>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Separate function for syllabus to avoid template literal issues
async function openSyllabus() {
    try {
        const syllabusContent = await contentLoader.loadContent('course_settings/syllabus.html');
        openModal('Course Syllabus', syllabusContent);
    } catch (error) {
        openModal('Course Syllabus', '<p>Error loading syllabus content</p>');
    }
}

async function loadFAQ() {
    const container = document.getElementById('faqContainer');
    let html = '';
    
    for (const faq of courseConfig.faq) {
        const content = await contentLoader.loadContent(`wiki_content/${faq.file}`);
        const safeId = faq.file.replace(/[^a-zA-Z0-9]/g, '-');
        html += `
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ('faq-${safeId}')">
                    <span>${faq.title}</span>
                    <i class="fas fa-chevron-down" id="icon-faq-${safeId}"></i>
                </div>
                <div class="faq-answer" id="faq-${safeId}">
                    ${content}
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

async function loadOrientation() {
    const container = document.getElementById('orientationContent');
    let html = '<div class="orientation-grid">';
    
    for (const item of courseConfig.orientation) {
        html += `
            <div class="orientation-item" onclick="loadPageContent('${item.file}')">
                <i class="fas fa-play-circle"></i>
                <h4>${item.title}</h4>
            </div>
        `;
    }
    
    html += '</div>';
    container.innerHTML = html;
}

// Utility functions
function getItemIcon(type) {
    switch(type) {
        case 'page': return 'fas fa-file-alt';
        case 'quiz': return 'fas fa-question-circle';
        case 'assignment': return 'fas fa-tasks';
        case 'video': return 'fas fa-play-circle';
        default: return 'fas fa-file';
    }
}

// Modal functions
function openModal(title, content) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = content;
    document.getElementById('contentModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('contentModal').style.display = 'none';
}

async function openContent(id, title, type) {
    // Use courseConfig to map content IDs to filenames
    const filename = courseConfig.contentMap[id];
    
    if (filename) {
        try {
            const content = await contentLoader.loadContent(`wiki_content/${filename}`);
            openModal(title, content);
        } catch (error) {
            openModal(title, `<p>Error loading content: ${filename}</p>`);
        }
    } else {
        openModal(title, `<p>Content mapping not found for ID: ${id}</p>`);
    }
}

// Media functions
function openMedia(url) {
    const container = document.getElementById('mediaContainer');
    
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = extractYouTubeId(url);
        container.innerHTML = `
            <iframe width="800" height="450" 
                    src="https://www.youtube.com/embed/${videoId}" 
                    frameborder="0" allowfullscreen></iframe>
        `;
    } else if (url.includes('mediaplus.asu.edu')) {
        container.innerHTML = `
            <iframe width="800" height="450" 
                    src="${url}" 
                    frameborder="0" allowfullscreen></iframe>
        `;
    } else {
        container.innerHTML = `
            <iframe width="800" height="450" 
                    src="${url}" 
                    frameborder="0"></iframe>
        `;
    }
    
    document.getElementById('mediaViewer').style.display = 'block';
}

function closeMediaViewer() {
    document.getElementById('mediaViewer').style.display = 'none';
    document.getElementById('mediaContainer').innerHTML = '';
}

function extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// File viewer functions
function openFile(filepath, type) {
    if (type === 'PDF') {
        window.open(filepath, '_blank');
    } else if (type === 'IMAGE') {
        openModal('Image Viewer', `<img src="${filepath}" style="max-width: 100%; height: auto;">`);
    } else if (type === 'HTML') {
        contentLoader.loadContent(filepath).then(content => {
            openModal('Document Viewer', content);
        });
    } else {
        window.open(filepath, '_blank');
    }
}

// FAQ toggle function
function toggleFAQ(id) {
    const answer = document.getElementById(id);
    const icon = document.getElementById(`icon-${id}`);
    
    if (answer && icon) {
        answer.classList.toggle('active');
        
        if (answer.classList.contains('active')) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set up navigation event listeners
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            router.navigate(sectionId);
        });
    });
    
    // Router will handle initial route
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('contentModal');
        const mediaViewer = document.getElementById('mediaViewer');
        
        if (event.target === modal) {
            closeModal();
        }
        if (event.target === mediaViewer) {
            closeMediaViewer();
        }
    };
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        router.handleRoute();
    });
});