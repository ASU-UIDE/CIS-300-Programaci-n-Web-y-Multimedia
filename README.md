# CIS 300: Web Design and Development - Course Content Viewer

## Overview

This is an intuitive web interface that organizes and displays all the original course content from CIS 300 (Web Design and Development) at Arizona State University. The interface serves as a comprehensive content viewer that preserves the original course materials exactly as they are, while providing modern navigation and viewing capabilities.

## Key Features

### 🎯 **Content Preservation**
- Displays original course content without translation or modification
- Maintains exact text, structure, and formatting from source materials
- Preserves all HTML content, images, and media references
- Respects original Canvas LMS structure and organization

### 📚 **Comprehensive Content Access**
- **Course Home**: Original course homepage with schedule and navigation
- **Learning Modules**: All 8 course modules with original content structure
- **Resources**: Textbook info, software requirements, and course documents
- **FAQ**: Complete FAQ section with original questions and answers
- **Student Orientation**: Canvas orientation materials and guides

### 🎨 **Modern Interface Design**
- Clean, professional layout using ASU brand colors
- Responsive design for all devices
- Intuitive navigation with sticky menu
- Modal viewers for content display
- Smooth animations and transitions

### 🌐 **AI-Powered Translation**
- Built-in Chrome Translator API integration
- Real-time translation of course content
- Support for 10+ languages including Spanish, French, German, Chinese, Japanese
- Preserves original content with easy restore functionality
- No external services required - runs entirely in browser

### 📱 **Advanced Viewers**
- **HTML Content Viewer**: Displays wiki content in modal windows
- **PDF Viewer**: Opens course documents in new tabs
- **Media Player**: Handles ASU MediaPlus and YouTube embeds
- **Image Viewer**: Full-screen image viewing capability

## Project Structure

```
├── index.html              # Main interface
├── styles.css              # Complete styling
├── script.js               # Core functionality
├── content-loader.js       # Content loading system
├── course-config.js        # Course structure mapping
├── README.md              # Documentation
├── course_settings/       # Course configuration files
├── wiki_content/          # All course HTML content
├── web_resources/         # Images, PDFs, and media files
└── imsmanifest.xml       # Course manifest
```

## Original Course Content

### Learning Modules (Preserved Exactly)
- **Welcome and Start Here**: Course orientation and setup
- **Week 1**: Web & HTML Basics
- **Week 2**: Cascading Style Sheets  
- **Week 3**: Graphics & Text Styling
- **Week 4**: Links, Layouts, and Mobile
- **Week 5**: Tables & Forms
- **Week 6**: Media, Interactivity & Web Publishing
- **Week 7**: Final Project
- **Case Study Solutions**: Weekly solution releases
- **FAQ**: Complete frequently asked questions
- **Student Canvas Orientation**: Platform guidance

### Course Resources (Original)
- **Textbook**: "Basics of Web Design: HTML5 & CSS (5th edition)" by Terry Felke-Morris
- **Software Requirements**: Notepad++, Sublime Text, Microsoft Office
- **Course Documents**: Syllabus, cheat sheets, installation guides
- **Media Files**: Course videos, presentations, and images

## Technical Implementation

### Content Loading System
- **Asynchronous Loading**: Fetches content on-demand
- **Content Processing**: Handles Canvas-specific references and paths
- **Caching System**: Improves performance with content caching
- **Error Handling**: Graceful fallbacks for missing content

### Media Handling
- **ASU MediaPlus Integration**: Proper iframe embedding
- **YouTube Support**: Video ID extraction and embedding
- **Image Processing**: Clickable images with full-screen viewing
- **PDF Integration**: Direct browser viewing

### Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Large tap targets and smooth scrolling
- **Adaptive Layout**: Grid systems that adjust to content
- **Cross-Browser**: Compatible with all modern browsers

## Usage Instructions

1. **Open** `index.html` in a modern web browser
2. **Navigate** using the top menu to access different sections
3. **Click** on any content item to view in the modal viewer
4. **Use** the media viewer for videos and interactive content
5. **Access** PDFs and documents through the resources section

### Translation Feature

6. **Click** the "Traducir" button in the navigation bar to open the translation panel
7. **Select** your target language from the dropdown menu
8. **Click** "Traducir Página" to translate all visible content
9. **Use** "Restaurar Original" to return to the original English content

**Translation Requirements:**
- Chrome 138+ with experimental AI features enabled
- First-time use may require model download (automatic)
- Works entirely offline after initial setup

### Requirements
- Modern web browser (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- Internet connection for Font Awesome icons
- Local file access for course materials
- **For Translation Feature**: Chrome 138+ with experimental AI features enabled

## Content Mapping

The interface uses a sophisticated mapping system to connect Canvas LMS identifiers to actual content files:

```javascript
// Example content mapping
contentMap: {
    'g7c71194d42565de6c3e96474fefb0f39': 'welcome-and-start-here.html',
    'g0516e79851bfc12875c86bc78d676f3a': 'week-1-web-and-html-basics.html',
    // ... complete mapping for all course content
}
```

## Features

### ✅ **Implemented**
- Complete course content display
- Modal content viewer
- Media embedding system
- Responsive navigation
- FAQ with expandable answers
- Resource file access
- Student orientation materials
- AI-powered translation system
- Multi-language support with Chrome's built-in Translator API

### 🔄 **Content Processing**
- Canvas reference resolution
- Image path correction
- Media embed conversion
- Link functionality preservation

### 📊 **Performance**
- Content caching
- Lazy loading
- Optimized images
- Minimal HTTP requests

## Browser Compatibility

- ✅ **Chrome 80+**: Full functionality
- ✅ **Firefox 75+**: Full functionality  
- ✅ **Safari 13+**: Full functionality
- ✅ **Edge 80+**: Full functionality
- ✅ **Mobile Browsers**: Responsive design

## Course Information

- **Course**: (Cintana) CIS 300: Web Design and Development
- **Institution**: Arizona State University
- **School**: W. P. Carey School of Business
- **Instructor**: Dr. Elva Lin (Elva.Lin@asu.edu)
- **Duration**: 7.5 weeks intensive format

## Development Notes

This interface was built specifically to:
- Preserve original course content integrity
- Provide modern viewing experience
- Maintain educational context
- Support various media types
- Enable easy navigation

The system respects the original Canvas LMS structure while providing enhanced usability through modern web technologies.

---

**Built for CIS 300: Web Design and Development**  
*Arizona State University - W. P. Carey School of Business*