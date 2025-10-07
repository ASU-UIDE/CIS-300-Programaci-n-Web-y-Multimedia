// Course Configuration and Content Mapping
const courseConfig = {
    // Course metadata
    metadata: {
        title: "(Cintana) CIS 300: Web Design and Development",
        institution: "Arizona State University",
        school: "W. P. Carey School of Business",
        duration: "7.5 weeks",
        startDate: "2022-05-27T18:50:09",
        instructor: {
            name: "Dr. Elva Lin",
            email: "Elva.Lin@asu.edu",
            office: "BAC684"
        }
    },

    // Content mapping from manifest IDs to actual files
    contentMap: {
        // Welcome and Start Here module
        'g7c71194d42565de6c3e96474fefb0f39': 'welcome-and-start-here.html',
        'ga86174892dbc5faf2c066d3cc7875656': 'step-1-understand-academic-integrity-in-cis-300-and-w-p-carey-honor-code.html',
        'g848831e9ab07581e008906cc93310ee2': 'cis-300-academic-integrity.html',
        'gfec9f4a78234b3689c307429dc29f59c': 'w-p-carey-honor-code.html',
        'ge59c5b87dfa2bdc8a84fad5b76b45cb7': 'asu-academic-integrity-information.html',
        'g139376865bc524e6415d8af5dff1635a': 'step-2-get-the-textbook-and-setup-your-development-environment.html',
        'gf71c455d58a02f12d518f3c55070c44e': 'step-3-software-requirements.html',
        'g81cc8ef7679ab6c2f8211b07af2308ff': 'step-4-understand-course-case-study-and-project-assignments.html',
        'gddcbbb4a6843123b9f4ae2d638f0ec': 'step-5-understand-course-layout-and-read-course-syllabus-schedule-and-faq.html',

        // Week 1
        'g0516e79851bfc12875c86bc78d676f3a': 'week-1-web-and-html-basics.html',
        'ga120eca643097a51f4d38c3d1830a538': 'chapter-1-internet-web-basics.html',
        'ge0bca31c25d0749121d1f4d2bbf9e6fd': 'how-the-internet-works-in-5-minutes.html',
        'gb1ce17d42b3731b4f980e236b2e8b26a': 'dns-explained.html',
        'ge73ad47f84ff1a8b638f7ceaa22aad91': 'a-packets-tale-how-does-the-internet-work.html',
        'ge3c6c3dba7a086b913b8c1afdfbab4e6': 'chapter-2-html-basics.html',
        'g684698638b4107e3080be10184144004': 'html-basics.html',

        // Week 2
        'g5120f0ae2e7ba7a71a79e9b52f6e204a': 'week-2-cascading-style-sheets.html',
        'gbe8cc5eaa152782b880031203408c1ff': 'chapter-3-web-design-basics.html',
        'g6c80cbc9c4cb4444d19138e04ecbae9b': 'chapter-4-cascading-style-sheets-basics.html',
        'gc98ed1d4df2eb8c51a7bd7eeed948d0b': 'css-basic-tips.html',

        // Week 3
        'gd187d9603d811e0c0f9c93f9cd478e05': 'week-3-graphics-and-text-styling.html',
        'gc7a0c3ed089cdf552032c8d0b5a85960': 'chapter-5-graphics-and-text-styling-basics.html',
        'g28868bb2212edb0a92c4cda9e81646b3': 'chapter-6-more-css-basics.html',
        'g0435a29f9050f3eb78abdaf2f24ff370': 'add-images.html',
        'gfa03d0076c131641ae09f99ad57337fe': 'the-box-model.html',

        // Week 4
        'gcd91b728fed08f8d392a287f2bcf5aa8': 'week-4-links-layouts-and-mobile.html',
        'g463cc17de21533567b90db8b20f38766': 'chapter-7-page-layout-basics.html',
        'gc006f5c26dee08637d75465ae27f3b1a': 'chapter-8-more-on-links-layout-and-mobile.html',

        // Week 5
        'ga0f65af5e21aefc68000ace107340ba9': 'week-5-tables-and-forms.html',
        'gc59452330772a82eea5841a91a3a0193': 'chapter-9-table-basics.html',
        'g82a45a2d57cc9c99b47459712a1044a2': 'chapter-10-form-basics.html',

        // Week 6
        'g6cb645ab7cfb8bebb03dc6ffabae3d30': 'week-6-media-interactivity-and-web-publishing.html',
        'g639dadef04d1f77940133ceb4b78a6a1': 'chapter-11-media-and-interactivity-basics.html',
        'ge37e125710566fb5ae235e0fe9ffe2a2': 'chapter-12-web-publishing-basics.html',

        // Week 7
        'g883ec832376de2fdcdc19c72b08e89ad': 'week-7-final-project.html',

        // Case Study Solutions
        'g359ad8f8d8f88e24656724ff9e8f6470': 'week-1-case-study-solution.html',
        'g46c696a81a64abf2663565efc8ee7251': 'week-2-case-study-solution.html',
        'g3a81d887db51ea3b27870ab40f2c8fbb': 'week-3-case-study-solution.html',
        'ga8850ca5b50c0996d1749ecbc56dbd38': 'week-4-case-study-solution.html',
        'gdd402ff6a0ac412ac52f23c0e63d1d3b': 'week-5-case-study-solution.html'
    },

    // Resource files mapping
    resources: {
        documents: [
            {
                name: "Course Syllabus",
                file: "course_settings/syllabus.html",
                type: "HTML",
                icon: "fas fa-file-alt",
                description: "Complete course syllabus with policies and requirements"
            },
            {
                name: "CSS3 Cheat Sheet",
                file: "web_resources/css3-cheat-sheet.pdf",
                type: "PDF",
                icon: "fab fa-css3-alt",
                description: "Quick reference for CSS3 properties and selectors"
            },
            {
                name: "HTML5 Cheat Sheet",
                file: "web_resources/html5-cheat-sheet.pdf",
                type: "PDF",
                icon: "fab fa-html5",
                description: "Quick reference for HTML5 elements and attributes"
            },
            {
                name: "MAMP Installation Guide (Windows)",
                file: "web_resources/MAMP and MySQL Workbench installation guide for Windows.pdf",
                type: "PDF",
                icon: "fas fa-server",
                description: "Step-by-step installation guide for Windows users"
            },
            {
                name: "MAMP Installation Guide (Mac)",
                file: "web_resources/MAMP and MySQL Workbench installation guide for Mac.pdf",
                type: "PDF",
                icon: "fas fa-server",
                description: "Step-by-step installation guide for Mac users"
            },
            {
                name: "Introduction to CIS300",
                file: "web_resources/Introduction to CIS300.pdf",
                type: "PDF",
                icon: "fas fa-chalkboard-teacher",
                description: "Course introduction and overview presentation"
            }
        ],
        
        textbook: {
            title: "Basics of Web Design: HTML5 & CSS (5th edition)",
            author: "Terry Felke-Morris",
            isbn: "9780135225486",
            image: "web_resources/textbook.jpg",
            companionSite: "https://media.pearsoncmg.com/bc/abp/cs-resources/products/product.html#product,isbn=0135225485"
        },

        software: [
            {
                name: "Text Editor",
                options: ["Notepad++", "Sublime Text 3", "Visual Studio Code"],
                description: "For writing HTML and CSS code",
                icon: "fas fa-edit"
            },
            {
                name: "Microsoft Office 2013+",
                alternatives: ["Google Docs"],
                description: "For project documentation and assignments",
                icon: "fas fa-file-word"
            },
            {
                name: "Modern Web Browser",
                options: ["Chrome", "Firefox", "Safari", "Edge"],
                description: "For testing and viewing web pages",
                icon: "fas fa-window-maximize"
            }
        ]
    },

    // FAQ mapping
    faq: [
        { file: "do-i-need-the-textbook.html", title: "Do I need the textbook?" },
        { file: "windows-or-a-mac.html", title: "Windows or a Mac?" },
        { file: "how-to-create-a-html-file.html", title: "How to create a html file?" },
        { file: "how-to-submit-the-case-study-assignments.html", title: "How to submit the case study assignments?" },
        { file: "how-do-i-check-if-the-assignment-zipped-file-is-correct.html", title: "How do I check if the assignment zipped file is correct?" },
        { file: "what-format-is-accepted-for-submitting-case-study-assignments.html", title: "What format is accepted for submitting case study assignments?" },
        { file: "where-can-i-find-the-image-and-video-files-needed-for-the-case-study-assignments.html", title: "Where can I find the image and video files needed for the case study assignments?" },
        { file: "what-to-do-when-i-run-into-problems.html", title: "What to do when I run into problems?" },
        { file: "week-4-assignment-faq.html", title: "Week 4 Assignment FAQ" },
        { file: "can-i-include-a-youtube-video-in-the-project-assignment.html", title: "Can I include a YouTube video in the project assignment?" },
        { file: "do-i-need-to-zip-the-project-word-document.html", title: "Do I need to zip the project word document?" },
        { file: "canvas-has-no-responses-to-last-week-final-project-submission.html", title: "Canvas has no responses to Last Week Final Project Submission" }
    ],

    // Student orientation items
    orientation: [
        { file: "canvas-student-orientation.html", title: "Canvas Student Orientation" },
        { file: "access-canvas.html", title: "Access Canvas" },
        { file: "explore-the-canvas-interface.html", title: "Explore the Canvas Interface" },
        { file: "update-account-settings-and-notification-preferences.html", title: "Update Account Settings and Notification Preferences" },
        { file: "read-the-syllabus.html", title: "Read the Syllabus" },
        { file: "participate-in-your-group.html", title: "Participate in your Group" },
        { file: "check-the-calendar.html", title: "Check the Calendar" },
        { file: "navigate-modules.html", title: "Navigate Modules" },
        { file: "turn-in-an-assignment.html", title: "Turn in an Assignment" },
        { file: "take-a-quiz.html", title: "Take a Quiz" },
        { file: "get-help.html", title: "Get Help" }
    ],

    // Week schedule from course home
    schedule: [
        { week: 0, title: "Welcome and Start Here", dates: "Before Class!", topic: "Course Orientation" },
        { week: 1, title: "Web & HTML Basics", dates: "10/13 - 10/20", topic: "Internet basics and HTML fundamentals" },
        { week: 2, title: "Cascading Style Sheets", dates: "10/21 - 10/27", topic: "CSS styling and web design principles" },
        { week: 3, title: "Graphics & Text Styling", dates: "10/28 - 11/03", topic: "Images, fonts, and advanced CSS" },
        { week: 4, title: "Links, Layouts, and Mobile", dates: "11/04 - 11/10", topic: "Page layout and responsive design" },
        { week: 5, title: "Tables & Forms", dates: "11/11 - 11/18", topic: "Data tables and user input forms" },
        { week: 6, title: "Media, Interactivity & Web Publishing", dates: "11/19 - 11/28", topic: "Multimedia and publishing websites" },
        { week: 7, title: "Final Project", dates: "11/29 - 12/05", topic: "Project completion and submission" }
    ]
};

// Utility functions for course configuration
function getContentFile(id) {
    return courseConfig.contentMap[id] || null;
}

function getResourceByName(name) {
    return courseConfig.resources.documents.find(doc => doc.name === name);
}

function getFAQByTitle(title) {
    return courseConfig.faq.find(item => item.title === title);
}

// Export configuration
if (typeof window !== 'undefined') {
    window.courseConfig = courseConfig;
}