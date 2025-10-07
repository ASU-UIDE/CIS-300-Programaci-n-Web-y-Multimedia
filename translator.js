// Translator API Integration for Chrome Built-in AI
class AITranslator {
    constructor() {
        this.translator = null;
        this.currentLanguage = 'en';
        this.targetLanguage = 'es';
        this.isTranslating = false;
        this.originalContent = new Map();
        this.supportedLanguages = {
            'es': 'Español',
            'fr': 'Français', 
            'de': 'Deutsch',
            'it': 'Italiano',
            'pt': 'Português',
            'zh': '中文',
            'ja': '日本語',
            'ko': '한국어',
            'ru': 'Русский',
            'ar': 'العربية'
        };
        
        this.init();
    }

    async init() {
        // Check if Translator API is supported
        if (!('Translator' in self)) {
            this.showBrowserWarning();
            return;
        }

        // Set up event listeners
        this.setupEventListeners();
        this.updateStatus('Listo para traducir', 'info');
    }

    setupEventListeners() {
        const targetLanguageSelect = document.getElementById('targetLanguage');
        if (targetLanguageSelect) {
            targetLanguageSelect.addEventListener('change', (e) => {
                this.targetLanguage = e.target.value;
                this.updateStatus(`Idioma seleccionado: ${this.supportedLanguages[this.targetLanguage]}`, 'info');
            });
        }
    }

    showBrowserWarning() {
        const statusElement = document.getElementById('translatorStatus');
        if (statusElement) {
            statusElement.innerHTML = `
                <div class="browser-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>La API de Translator requiere Chrome 138+ con funciones experimentales habilitadas.</span>
                </div>
            `;
        }
    }

    async checkAvailability() {
        try {
            const capabilities = await Translator.availability({
                sourceLanguage: this.currentLanguage,
                targetLanguage: this.targetLanguage
            });
            
            return capabilities === 'available' || capabilities === 'downloadable';
        } catch (error) {
            console.error('Error checking translator availability:', error);
            return false;
        }
    }

    async createTranslator() {
        try {
            this.updateStatus('Preparando traductor...', 'loading');
            
            const isAvailable = await this.checkAvailability();
            if (!isAvailable) {
                throw new Error('Combinación de idiomas no disponible');
            }

            // Store reference to this for use in monitor callback
            const self = this;

            this.translator = await Translator.create({
                sourceLanguage: this.currentLanguage,
                targetLanguage: this.targetLanguage,
                monitor(monitor) {
                    monitor.addEventListener('downloadprogress', (e) => {
                        const progress = Math.round(e.loaded * 100);
                        self.updateStatus(`Descargando modelo: ${progress}%`, 'loading');
                        self.updateProgress(progress);
                    });
                }
            });

            this.updateStatus('Traductor listo', 'success');
            return true;
        } catch (error) {
            console.error('Error creating translator:', error);
            this.updateStatus(`Error: ${error.message}`, 'error');
            return false;
        }
    }

    async translateText(text) {
        if (!this.translator) {
            const created = await this.createTranslator();
            if (!created) return text;
        }

        try {
            const translatedText = await this.translator.translate(text);
            return translatedText;
        } catch (error) {
            console.error('Error translating text:', error);
            return text;
        }
    }

    async translateElement(element) {
        const textNodes = this.getTextNodes(element);
        const translations = [];

        for (const node of textNodes) {
            const originalText = node.textContent.trim();
            if (originalText && originalText.length > 1) {
                // Store original content
                const nodeId = this.generateNodeId();
                this.originalContent.set(nodeId, originalText);
                
                // Check if node.parentElement exists before setting attribute
                if (node.parentElement) {
                    node.parentElement.setAttribute('data-translation-id', nodeId);
                }

                // Translate text
                const translatedText = await this.translateText(originalText);
                translations.push({
                    node: node,
                    original: originalText,
                    translated: translatedText
                });
            }
        }

        // Apply translations
        translations.forEach(({ node, translated }) => {
            node.textContent = translated;
        });

        return translations.length;
    }

    getTextNodes(element) {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    // Skip script, style, and other non-content elements
                    const parent = node.parentElement;
                    if (!parent) return NodeFilter.FILTER_REJECT;
                    
                    const tagName = parent.tagName.toLowerCase();
                    if (['script', 'style', 'noscript', 'code', 'pre'].includes(tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    
                    // Only include nodes with meaningful text
                    const text = node.textContent.trim();
                    if (text.length < 2) return NodeFilter.FILTER_REJECT;
                    
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }

        return textNodes;
    }

    generateNodeId() {
        return 'trans_' + Math.random().toString(36).substring(2, 11);
    }

    async translatePage() {
        if (this.isTranslating) return;
        
        this.isTranslating = true;
        this.updateStatus('Traduciendo página...', 'loading');
        
        try {
            // Get main content areas
            const contentAreas = [
                document.querySelector('.main-content'),
                document.querySelector('.modal-body'),
                document.querySelector('#courseHomeContent'),
                document.querySelector('#modulesContainer'),
                document.querySelector('#resourcesGrid'),
                document.querySelector('#faqContainer'),
                document.querySelector('#orientationContent')
            ].filter(el => el && el.style.display !== 'none');

            let totalTranslations = 0;
            
            for (const area of contentAreas) {
                if (area && this.isElementVisible(area)) {
                    const count = await this.translateElement(area);
                    totalTranslations += count;
                }
            }

            this.updateStatus(`Traducción completada (${totalTranslations} elementos)`, 'success');
            this.markAsTranslated();
            
        } catch (error) {
            console.error('Error translating page:', error);
            this.updateStatus('Error durante la traducción', 'error');
        } finally {
            this.isTranslating = false;
        }
    }

    isElementVisible(element) {
        const style = window.getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    }

    resetTranslation() {
        // Restore original content
        this.originalContent.forEach((originalText, nodeId) => {
            const node = document.querySelector(`[data-translation-id="${nodeId}"]`);
            if (node) {
                node.textContent = originalText;
                node.removeAttribute('data-translation-id');
            }
        });

        this.originalContent.clear();
        this.removeTranslatedMarkers();
        this.updateStatus('Contenido original restaurado', 'success');
    }

    markAsTranslated() {
        const contentAreas = document.querySelectorAll('.section.active, .modal-body');
        contentAreas.forEach(area => {
            area.classList.add('translated-content');
        });
    }

    removeTranslatedMarkers() {
        const translatedElements = document.querySelectorAll('.translated-content');
        translatedElements.forEach(el => {
            el.classList.remove('translated-content');
        });
    }

    updateStatus(message, type = 'info') {
        const statusElement = document.getElementById('translatorStatus');
        if (!statusElement) return;

        const icons = {
            info: 'fas fa-info-circle',
            loading: 'fas fa-spinner fa-spin',
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle'
        };

        statusElement.className = `translator-status ${type}`;
        statusElement.innerHTML = `
            <i class="${icons[type]}"></i>
            <span>${message}</span>
        `;
    }

    updateProgress(percentage) {
        let progressBar = document.querySelector('.translation-progress-bar');
        if (!progressBar) {
            const statusElement = document.getElementById('translatorStatus');
            const progressContainer = document.createElement('div');
            progressContainer.className = 'translation-progress';
            progressContainer.innerHTML = '<div class="translation-progress-bar"></div>';
            statusElement.appendChild(progressContainer);
            progressBar = progressContainer.querySelector('.translation-progress-bar');
        }
        
        progressBar.style.width = `${percentage}%`;
        
        if (percentage >= 100) {
            setTimeout(() => {
                const progressContainer = document.querySelector('.translation-progress');
                if (progressContainer) {
                    progressContainer.remove();
                }
            }, 1000);
        }
    }
}

// Global translator instance
let aiTranslator;

// Global functions for UI interaction
function toggleTranslator() {
    const panel = document.getElementById('translatorPanel');
    const button = document.getElementById('translateBtn');
    
    if (panel && button) {
        const isActive = panel.classList.contains('active');
        
        if (isActive) {
            closeTranslator();
        } else {
            panel.classList.add('active');
            button.classList.add('active');
            
            // Initialize translator if not already done
            if (!aiTranslator) {
                aiTranslator = new AITranslator();
            }
        }
    }
}

function closeTranslator() {
    const panel = document.getElementById('translatorPanel');
    const button = document.getElementById('translateBtn');
    
    if (panel && button) {
        panel.classList.remove('active');
        button.classList.remove('active');
    }
}

async function translatePage() {
    if (!aiTranslator) {
        aiTranslator = new AITranslator();
    }
    
    const translateBtn = document.getElementById('translatePageBtn');
    const resetBtn = document.getElementById('resetTranslationBtn');
    
    if (translateBtn) translateBtn.disabled = true;
    if (resetBtn) resetBtn.disabled = false;
    
    await aiTranslator.translatePage();
    
    if (translateBtn) translateBtn.disabled = false;
}

function resetTranslation() {
    if (aiTranslator) {
        aiTranslator.resetTranslation();
    }
    
    const resetBtn = document.getElementById('resetTranslationBtn');
    if (resetBtn) resetBtn.disabled = true;
}

// Close translator when clicking outside
document.addEventListener('click', function(event) {
    const translatorControls = document.querySelector('.translator-controls');
    const panel = document.getElementById('translatorPanel');
    
    if (translatorControls && panel && panel.classList.contains('active')) {
        if (!translatorControls.contains(event.target)) {
            closeTranslator();
        }
    }
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Check browser support on load
    if (!('Translator' in self)) {
        const translateBtn = document.getElementById('translateBtn');
        if (translateBtn) {
            translateBtn.style.opacity = '0.6';
            translateBtn.title = 'Requiere Chrome 138+ con funciones experimentales';
        }
    }
});