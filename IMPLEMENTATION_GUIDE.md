# AE Expression Store Implementation Guide

## Overview
This guide provides detailed implementation instructions for refactoring the AE Expression Store website. It covers the technical implementation of each phase in the refactoring plan.

## Phase 1: Code Structure Overhaul

### 1.1 Directory Structure Setup

#### Step-by-Step Implementation

1. **Create Directory Structure**
```bash
mkdir -p AE-Expression-Store/css
mkdir -p AE-Expression-Store/js
mkdir -p AE-Expression-Store/js/components
mkdir -p AE-Expression-Store/features
mkdir -p AE-Expression-Store/assets
mkdir -p AE-Expression-Store/assets/images
mkdir -p AE-Expression-Store/assets/gifs
mkdir -p AE-Expression-Store/docs
```

2. **Create CSS Files**

**main.css - Critical CSS**
```css
/* Critical CSS for above-the-fold content */
/* Reset and base styles */
*, *::before, *::after {
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: "Inter", system-ui, sans-serif;
    background-color: var(--bg-page);
    color: var(--text-main);
    margin: 0;
    padding: 0;
    line-height: 1.6;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-size: 16px;
}

/* Navigation */
.site-nav {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 12px 0;
}

.nav-inner {
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 0 28px;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
}

/* Hero Section */
.hero {
    padding: 80px 0 96px;
    background: linear-gradient(180deg, #ffffff 0%, var(--bg-page) 100%);
}

.hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
}

@media (max-width: 900px) {
    .hero-grid {
        grid-template-columns: 1fr;
    }
}
```

**components.css - UI Components**
```css
/* Card Components */
.card {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: fit-content;
    margin: 0 0 var(--grid-gap) 0;
    width: 100%;
    min-height: 0;
    break-inside: avoid;
    page-break-inside: avoid;
    transform: translateY(0) scale(1);
    transition: border-color 0.25s ease, box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.card:hover {
    border-color: var(--border-strong);
    box-shadow: var(--shadow-card-float);
    transform: translateY(-3px) scale(1.018);
}

/* Button Components */
.btn-dashboard {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
    text-decoration: none;
    border-radius: var(--radius-btn);
    border: 1px solid transparent;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

/* Feature Cards */
.feature-card {
    padding: 28px;
    background: var(--bg-white);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.feature-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-card-hover);
}
```

**utilities.css - Utility Classes**
```css
/* Spacing Utilities */
.u-mt-0 { margin-top: 0; }
.u-mt-1 { margin-top: 8px; }
.u-mt-2 { margin-top: 16px; }
.u-mt-3 { margin-top: 24px; }
.u-mt-4 { margin-top: 32px; }
.u-mb-0 { margin-bottom: 0; }
.u-mb-1 { margin-bottom: 8px; }
.u-mb-2 { margin-bottom: 16px; }
.u-mb-3 { margin-bottom: 24px; }
.u-mb-4 { margin-bottom: 32px; }

/* Text Utilities */
.u-text-center { text-align: center; }
.u-text-left { text-align: left; }
.u-text-right { text-align: right; }
.u-text-justify { text-align: justify; }

/* Display Utilities */
.u-d-none { display: none; }
.u-d-block { display: block; }
.u-d-inline { display: inline; }
.u-d-inline-block { display: inline-block; }
.u-d-flex { display: flex; }
.u-d-grid { display: grid; }

/* Flex Utilities */
.u-flex-wrap { flex-wrap: wrap; }
.u-justify-center { justify-content: center; }
.u-align-center { align-items: center; }
.u-gap-1 { gap: 8px; }
.u-gap-2 { gap: 16px; }
.u-gap-3 { gap: 24px; }
.u-gap-4 { gap: 32px; }
```

3. **Update index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A curated collection of time-saving After Effects expressions. Copy-paste ready code for animation, text, 3D, and workflow.">
    
    <!-- Critical CSS -->
    <link rel="stylesheet" href="css/main.css">
    
    <!-- Component CSS -->
    <link rel="stylesheet" href="css/components.css">
    
    <!-- Utility CSS -->
    <link rel="stylesheet" href="css/utilities.css">
    
    <!-- Preconnect for external resources -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <title>AE Expression Store</title>
</head>
<body>
    <!-- HTML content will be updated in Phase 2 -->
</body>
</html>
```

### 1.2 JavaScript Refactoring

#### Step-by-Step Implementation

1. **Create JavaScript Module Structure**
```bash
# Create JavaScript files
touch AE-Expression-Store/js/app.js
# touch AE-Expression-Store/js/api.js
# touch AE-Expression-Store/js/utils.js
mkdir -p AE-Expression-Store/js/components
# touch AE-Expression-Store/js/components/copy-button.js
# touch AE-Expression-Store/js/components/expression-card.js
```

2. **Create app.js - Main Application**
```javascript
// AE-Expression-Store/js/app.js
class AEExpressionStore {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.initComponents();
    this.setupSearch();
    this.setupCopyButtons();
  }
  
  setupEventListeners() {
    // Global event listeners
    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }
  
  initComponents() {
    // Initialize all components
    this.copyButtons = new CopyButtonManager();
    this.search = new SearchManager();
    this.expressions = new ExpressionManager();
  }
  
  setupSearch() {
    // Setup search functionality
  }
  
  setupCopyButtons() {
    // Setup copy button functionality
  }
}

// Initialize application
const app = new AEExpressionStore();
```

3. **Create api.js - Data Layer**
```javascript
// AE-Expression-Store/js/api.js
class APIClient {
  constructor() {
    this.supabaseUrl = 'https://cmqdmcxpdactcbvltqwz.supabase.co';
    this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtcWRtY3hwZGFjdGNidmx0cXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5OTM5MTcsImV4cCI6MjA4NjU2OTkxN30.jR5SmkG_AKDHFbBjvdUFrHHotOu4J3jcJdZsBJnJm2A';
    this.client = null;
  }
  
  async init() {
    if (typeof supabase !== 'undefined') {
      this.client = supabase.createClient(this.supabaseUrl, this.supabaseKey);
    }
  }
  
  async getExpressions() {
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await this.client
      .from('expressions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  }
  
  async getComments() {
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await this.client
      .from('comments')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  }
  
  async addComment(comment) {
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await this.client
      .from('comments')
      .insert([comment])
      .select();
    
    if (error) {
      throw error;
    }
    
    return data[0];
  }
}

// Initialize API client
const api = new APIClient();
api.init();
```

4. **Create utils.js - Shared Utilities**
```javascript
// AE-Expression-Store/js/utils.js
class Utils {
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  static copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      return this.fallbackCopy(text);
    }
  }
  
  static fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    } finally {
      document.body.removeChild(textArea);
    }
  }
  
  static formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  static generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
  
  static isMobile() {
    return window.innerWidth < 768;
  }
  
  static scrollToElement(element, behavior = 'smooth') {
    if (element && element.scrollIntoView) {
      element.scrollIntoView({ behavior, block: 'center' });
    }
  }
}
```

5. **Create Component Files**

**CopyButtonManager**
```javascript
// AE-Expression-Store/js/components/copy-button.js
class CopyButtonManager {
  constructor() {
    this.buttons = [];
    this.init();
  }
  
  init() {
    this.setupCopyButtons();
  }
  
  setupCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(button => {
      this.buttons.push(new CopyButton(button));
    });
  }
}

class CopyButton {
  constructor(button) {
    this.button = button;
    this.textToCopy = null;
    this.init();
  }
  
  init() {
    this.extractTextToCopy();
    this.setupEventListeners();
  }
  
  extractTextToCopy() {
    const codeBlock = this.button.nextElementSibling;
    if (codeBlock && codeBlock.tagName === 'CODE') {
      this.textToCopy = codeBlock.innerText;
    }
  }
  
  setupEventListeners() {
    this.button.addEventListener('click', () => this.copyCode());
  }
  
  async copyCode() {
    if (!this.textToCopy) return;
    
    try {
      await Utils.copyToClipboard(this.textToCopy);
      this.showCopiedState();
    } catch (error) {
      this.showCopyError();
    }
  }
  
  showCopiedState() {
    this.button.classList.add('copy-btn--copied');
    this.button.textContent = 'Copied';
    
    setTimeout(() => {
      this.button.classList.remove('copy-btn--copied');
      this.button.textContent = 'Copy';
    }, 2000);
  }
  
  showCopyError() {
    this.button.textContent = 'Error';
    
    setTimeout(() => {
      this.button.textContent = 'Copy';
    }, 2000);
  }
}
```

6. **Update index.html with JavaScript**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- CSS links from Phase 1 -->
</head>
<body>
    <!-- HTML content from original index.html -->
    
    <!-- JavaScript modules -->
    <script type="module" src="js/app.js"></script>
</body>
</html>
```

## Phase 2: Performance Optimization

### 2.1 Code Splitting

#### Step-by-Step Implementation

1. **Create Features Directory**
```bash
mkdir -p AE-Expression-Store/features
```

2. **Create Advanced Search Feature**
```javascript
// AE-Expression-Store/features/advanced-search.js
class AdvancedSearch {
  constructor() {
    this.suggestions = [];
    this.init();
  }
  
  async init() {
    this.suggestions = await this.loadSuggestions();
    this.setupSearchInput();
  }
  
  async loadSuggestions() {
    // Load search suggestions from API or static file
    return [
      'wiggle', 'loopOut', 'ease', 'bounce', 'animation',
      'text', 'position', 'scale', 'rotation', 'opacity'
    ];
  }
  
  setupSearchInput() {
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', Utils.debounce((e) => {
      this.handleSearchInput(e.target.value);
    }, 300));
  }
  
  handleSearchInput(query) {
    const suggestions = this.getSuggestions(query);
    this.showSuggestions(suggestions);
  }
  
  getSuggestions(query) {
    return this.suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }
  
  showSuggestions(suggestions) {
    // Display search suggestions
  }
}
```

3. **Create Expression Preview Feature**
```javascript
// AE-Expression-Store/features/expression-preview.js
class ExpressionPreview {
  constructor(element) {
    this.element = element;
    this.video = element.querySelector('video');
    this.playbackRate = 1;
    this.isPlaying = false;
    this.init();
  }
  
  init() {
    this.setupControls();
    this.setupPlaybackSpeed();
  }
  
  setupControls() {
    const playPauseBtn = this.element.querySelector('.play-pause');
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => this.togglePlayPause());
    }
  }
  
  setupPlaybackSpeed() {
    const speedControl = this.element.querySelector('.gif-speed');
    if (speedControl) {
      speedControl.addEventListener('input', (e) => {
        this.playbackRate = parseFloat(e.target.value);
        if (this.video) {
          this.video.playbackRate = this.playbackRate;
        }
      });
    }
  }
  
  togglePlayPause() {
    if (this.isPlaying) {
      this.video.pause();
      this.isPlaying = false;
    } else {
      this.video.play();
      this.isPlaying = true;
    }
  }
}
```

4. **Update app.js to Use Dynamic Imports**
```javascript
// AE-Expression-Store/js/app.js
class AEExpressionStore {
  constructor() {
    this.init();
  }
  
  async init() {
    this.setupEventListeners();
    this.initComponents();
    
    // Load advanced features
    await this.loadAdvancedFeatures();
    
    this.setupSearch();
    this.setupCopyButtons();
  }
  
  async loadAdvancedFeatures() {
    try {
      const { AdvancedSearch } = await import('./features/advanced-search.js');
      this.advancedSearch = new AdvancedSearch();
    } catch (error) {
      console.error('Failed to load advanced search:', error);
    }
    
    try {
      const { ExpressionPreview } = await import('./features/expression-preview.js');
      this.setupExpressionPreviews();
    } catch (error) {
      console.error('Failed to load expression preview:', error);
    }
  }
  
  setupExpressionPreviews() {
    document.querySelectorAll('.expression-preview-wrap').forEach(element => {
      new ExpressionPreview(element);
    });
  }
}
```

### 2.2 Lazy Loading

#### Step-by-Step Implementation

1. **Add data-src Attributes**
```html
<!-- Update expression preview images -->
<div class="expression-preview-wrap">
    <img src="data:image/svg+xml;base64,..." 
         data-src="https://example.com/preview.gif" 
         alt="Expression preview" 
         class="expression-preview" 
         loading="lazy">
</div>
```

2. **Create Image Loader**
```javascript
// AE-Expression-Store/js/utils.js
class ImageLoader {
  static loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  }
  
  static setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src) {
              ImageLoader.loadImage(src)
                .then(loadedImg => {
                  img.src = loadedImg.src;
                  img.removeAttribute('data-src');
                })
                .catch(error => {
                  console.error('Failed to load image:', error);
                });
            }
            imageObserver.unobserve(img);
          }
        });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
}
```

3. **Update app.js to Use Lazy Loading**
```javascript
// AE-Expression-Store/js/app.js
class AEExpressionStore {
  async init() {
    this.setupEventListeners();
    this.initComponents();
    await this.loadAdvancedFeatures();
    this.setupSearch();
    this.setupCopyButtons();
    
    // Setup lazy loading
    ImageLoader.setupLazyLoading();
  }
}
```

### 2.3 Caching Strategies

#### Step-by-Step Implementation

1. **Create Cache Middleware**
```javascript
// AE-Expression-Store/js/api.js
class APICache {
  constructor() {
    this.cache = new Map();
    this.ttl = 5 * 60 * 1000; // 5 minutes
  }
  
  async get(key, fetchFn) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      return cached.data;
    }
    
    const data = await fetchFn();
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  }
  
  clear() {
    this.cache.clear();
  }
}
```

2. **Update API Client to Use Cache**
```javascript
// AE-Expression-Store/js/api.js
class APIClient {
  constructor() {
    this.cache = new APICache();
    // ... other initialization
  }
  
  async getExpressions() {
    return this.cache.get('expressions', () => super.getExpressions());
  }
  
  async getComments() {
    return this.cache.get('comments', () => super.getComments());
  }
}
```

3. **Set Up Service Worker**
```javascript
// AE-Expression-Store/sw.js
const CACHE_NAME = 'ae-expression-store-v1';
const STATIC_CACHE = 'ae-expression-store-static-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/main.css',
        '/css/components.css',
        '/css/utilities.css',
        '/js/app.js',
        '/assets/logo.png',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
```

## Phase 3: Accessibility Improvements

### 3.1 ARIA and Semantic HTML

#### Step-by-Step Implementation

1. **Add Skip Navigation Links**
```html
<body>
    <a href="#main" class="skip-link">Skip to main content</a>
    
    <!-- Main content -->
    <main id="main" tabindex="-1">
        <!-- Content -->
    </main>
</body>
```

2. **Add ARIA Labels**
```html
<!-- Add ARIA labels to interactive elements -->
<button class="copy-btn" aria-label="Copy expression code to clipboard">
    Copy
</button>

<input type="search" id="search-input" 
       placeholder="Search expressions…" 
       aria-label="Search expressions" 
       autocomplete="off">

<div class="menu-wrapper">
    <button id="menu-button" 
            aria-label="Open menu" 
            aria-expanded="false">
        Menu
    </button>
</div>
```

3. **Add Screen Reader Support**
```javascript
// AE-Expression-Store/js/utils.js
class ScreenReader {
  static announce(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }
  
  static addLiveRegion(id, type = 'polite') {
    const region = document.createElement('div');
    region.setAttribute('aria-live', type);
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';
    region.id = id;
    
    document.body.appendChild(region);
    return region;
  }
}
```

### 3.2 Focus Management

#### Step-by-Step Implementation

1. **Implement Focus Trap**
```javascript
// AE-Expression-Store/js/utils.js
class FocusManager {
  static trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }
  
  static restoreFocus(previousElement) {
    if (previousElement) {
      previousElement.focus();
    }
  }
}
```

2. **Add Focus Visible Styles**
```css
/* utilities.css */
.focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

/* Hide focus for mouse users */
*:focus:not(.focus-visible) {
  outline: none;
}
```

### 3.3 High Contrast and Reduced Motion

#### Step-by-Step Implementation

1. **Implement High Contrast Mode**
```css
/* utilities.css */
@media (prefers-contrast: high) {
  :root {
    --primary: #0056b3;
    --bg-page: #ffffff;
    --text-main: #000000;
    --border: #000000;
  }

  .card, .feature-card, .dashboard-card {
    border-width: 2px;
  }
}
```

2. **Support Reduced Motion**
```css
/* utilities.css */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Phase 4: User Experience Enhancements

### 4.1 Advanced Search

#### Step-by-Step Implementation

1. **Create Search Manager**
```javascript
// AE-Expression-Store/js/search.js
class SearchManager {
  constructor() {
    this.searchInput = document.getElementById('search-input');
    this.searchResults = null;
    this.init();
  }
  
  init() {
    this.setupSearchInput();
    this.setupCategoryFilters();
  }
  
  setupSearchInput() {
    this.searchInput.addEventListener('input', Utils.debounce((e) => {
      this.performSearch(e.target.value);
    }, 300));
  }
  
  setupCategoryFilters() {
    document.querySelectorAll('.menu-category-option').forEach(button => {
      button.addEventListener('click', (e) => {
        const category = e.target.getAttribute('data-category');
        this.performSearch(this.searchInput.value, category);
      });
    });
  }
  
  performSearch(query, category = 'all') {
    const cards = document.querySelectorAll('.card');
    const term = query.toLowerCase().trim();
    
    cards.forEach(card => {
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      const text = card.innerText.toLowerCase();
      const matchesSearch = !term || tags.includes(term) || text.includes(term);
      const matchesCategory = this.matchesCategory(card, category);
      
      card.style.display = (matchesSearch && matchesCategory) ? '' : 'none';
    });
  }
  
  matchesCategory(card, category) {
    if (category === 'all') return true;
    
    const cardCategory = this.getCategoryFromCard(card);
    return cardCategory === category;
  }
  
  getCategoryFromCard(card) {
    const tags = card.getAttribute('data-tags') || '';
    const title = card.querySelector('h2')?.textContent || '';
    
    if (tags.includes('3d') || title.includes('3d') || 
        title.includes('look at') || title.includes('orientation') ||
        title.includes('auto-orient')) {
      return '3d';
    }
    
    if (tags.includes('text') || title.includes('text') ||
        title.includes('typewriter') || title.includes('font') ||
        title.includes('source text')) {
      return 'text';
    }
    
    if (tags.includes('animation') || tags.includes('bounce') ||
        tags.includes('wiggle') || tags.includes('loop') ||
        title.includes('bounce') || title.includes('wiggle') ||
        title.includes('loop') || title.includes('pingpong')) {
      return 'animation';
    }
    
    return 'utility';
  }
}
```

2. **Update app.js**
```javascript
// AE-Expression-Store/js/app.js
class AEExpressionStore {
  init() {
    this.setupEventListeners();
    this.initComponents();
    await this.loadAdvancedFeatures();
    this.setupSearch();
    this.setupCopyButtons();
    ImageLoader.setupLazyLoading();
  }
  
  setupSearch() {
    this.search = new SearchManager();
  }
}
```

### 4.2 Loading States

#### Step-by-Step Implementation

1. **Create Skeleton Components**
```javascript
// AE-Expression-Store/js/components/skeleton.js
class SkeletonLoader {
  static createExpressionCardSkeleton() {
    return `
      <div class="card">
        <div class="card-badges">
          <span class="card-badge skeleton"></span>
        </div>
        <div class="skeleton" style="height: 24px; width: 80%; margin-bottom: 12px;"></div>
        <div class="skeleton" style="height: 16px; width: 100%; margin-bottom: 8px;"></div>
        <div class="skeleton" style="height: 16px; width: 60%; margin-bottom: 16px;"></div>
        <div class="expression-preview-wrap skeleton">
          <div class="skeleton" style="height: 100%; width: 100%;"></div>
        </div>
        <div class="code-container">
          <div class="skeleton" style="height: 32px; width: 80px;"></div>
          <div class="skeleton" style="height: 16px; width: 100%;"></div>
        </div>
      </div>
    `;
  }
  
  static showSkeletons() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.classList.add('skeleton');
    });
  }
  
  static hideSkeletons() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.classList.remove('skeleton');
    });
  }
}
```

2. **Update app.js**
```javascript
// AE-Expression-Store/js/app.js
class AEExpressionStore {
  async init() {
    // Show skeletons while loading
    SkeletonLoader.showSkeletons();
    
    try {
      this.setupEventListeners();
      this.initComponents();
      await this.loadAdvancedFeatures();
      this.setupSearch();
      this.setupCopyButtons();
      ImageLoader.setupLazyLoading();
      
      // Hide skeletons after loading
      SkeletonLoader.hideSkeletons();
    } catch (error) {
      console.error('Failed to initialize app:', error);
      SkeletonLoader.hideSkeletons();
    }
  }
}
```

## Phase 5: Feature Enhancements

### 5.1 Expression Management

#### Step-by-Step Implementation

1. **Create Expression Filter**
```javascript
// AE-Expression-Store/js/expression-filter.js
class ExpressionFilter {
  constructor() {
    this.categories = ['all', 'animation', 'text', '3d', 'utility'];
    this.popularityLevels = ['all', 'popular', 'trending', 'new'];
  }
  
  filterExpressions(cards, filters) {
    return cards.filter(card => {
      return this.matchesCategory(card, filters.category) &&
             this.matchesPopularity(card, filters.popularity) &&
             this.matchesTags(card, filters.tags);
    });
  }
  
  matchesCategory(card, category) {
    if (category === 'all') return true;
    
    const cardCategory = this.getCategoryFromCard(card);
    return cardCategory === category;
  }
  
  getCategoryFromCard(card) {
    const tags = card.getAttribute('data-tags') || '';
    const title = card.querySelector('h2')?.textContent || '';
    
    if (tags.includes('3d') || title.includes('3d') ||
        title.includes('look at') || title.includes('orientation') ||
        title.includes('auto-orient')) {
      return '3d';
    }
    
    if (tags.includes('text') || title.includes('text') ||
        title.includes('typewriter') || title.includes('font') ||
        title.includes('source text')) {
      return 'text';
    }
    
    if (tags.includes('animation') || tags.includes('bounce') ||
        tags.includes('wiggle') || tags.includes('loop') ||
        title.includes('bounce') || title.includes('wiggle') ||
        title.includes('loop') || title.includes('pingpong')) {
      return 'animation';
    }
    
    return 'utility';
  }
}
```

2. **Update app.js**
```javascript
// AE-Expression-Store/js/app.js
class AEExpressionStore {
  init() {
    this.setupEventListeners();
    this.initComponents();
    await this.loadAdvancedFeatures();
    this.setupSearch();
    this.setupCopyButtons();
    ImageLoader.setupLazyLoading();
    
    // Initialize expression filter
    this.expressionFilter = new ExpressionFilter();
  }
  
  setupExpressionFiltering() {
    document.querySelectorAll('.menu-category-option').forEach(button => {
      button.addEventListener('click', (e) => {
        const category = e.target.getAttribute('data-category');
        this.filterExpressions(category);
      });
    });
  }
  
  filterExpressions(category) {
    const cards = document.querySelectorAll('.card');
    const filteredCards = this.expressionFilter.filterExpressions(cards, {
      category: category
    });
    
    // Show filtered cards
    cards.forEach(card => {
      card.style.display = 'none';
    });
    
    filteredCards.forEach(card => {
      card.style.display = '';
    });
  }
}
```

### 5.2 User Authentication

#### Step-by-Step Implementation

1. **Create Auth Manager**
```javascript
// AE-Expression-Store/js/auth.js
class AuthManager {
  constructor() {
    this.currentUser = null;
    this.providers = {
      google: this.handleGoogleAuth.bind(this),
      github: this.handleGitHubAuth.bind(this)
    };
  }
  
  async login(provider) {
    try {
      const providerHandler = this.providers[provider];
      if (!providerHandler) {
        throw new Error(`Provider ${provider} not supported`);
      }
      
      this.currentUser = await providerHandler();
      this.updateUI();
      return this.currentUser;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }
  
  handleGoogleAuth() {
    // Implement Google OAuth
    return new Promise((resolve, reject) => {
      // Google OAuth implementation
    });
  }
  
  handleGitHubAuth() {
    // Implement GitHub OAuth
    return new Promise((resolve, reject) => {
      // GitHub OAuth implementation
    });
  }
  
  updateUI() {
    if (this.currentUser) {
      // Update UI for logged-in user
      document.querySelectorAll('.auth-required').forEach(element => {
        element.style.display = 'block';
      });
      document.querySelectorAll('.not-auth-required').forEach(element => {
        element.style.display = 'none';
      });
    } else {
      // Update UI for logged-out user
      document.querySelectorAll('.auth-required').forEach(element => {
        element.style.display = 'none';
      });
      document.querySelectorAll('.not-auth-required').forEach(element => {
        element.style.display = 'block';
      });
    }
  }
}
```

2. **Update app.js**
```javascript
// AE-Expression-Store/js/app.js
class AEExpressionStore {
  init() {
    this.setupEventListeners();
    this.initComponents();
    await this.loadAdvancedFeatures();
    this.setupSearch();
    this.setupCopyButtons();
    ImageLoader.setupLazyLoading();
    
    // Initialize auth manager
    this.auth = new AuthManager();
    this.setupAuth();
  }
  
  setupAuth() {
    // Setup authentication buttons
    document.querySelectorAll('.auth-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const provider = e.target.getAttribute('data-provider');
        this.auth.login(provider);
      });
    });
  }
}
```

## Phase 6: Code Quality Fixes

### 6.1 Duplicate Expression Removal

#### Step-by-Step Implementation

1. **Create Duplicate Detection**
```javascript
// AE-Expression-Store/js/duplicate-detector.js
class DuplicateDetector {
  static findDuplicates(cards) {
    const expressionMap = new Map();
    const duplicates = [];
    
    cards.forEach(card => {
      const expressionId = card.getAttribute('data-expression-id');
      const expressionTitle = card.querySelector('h2')?.textContent;
      
      if (expressionMap.has(expressionTitle)) {
        duplicates.push({
          original: expressionMap.get(expressionTitle),
          duplicate: card,
          title: expressionTitle,
          id: expressionId
        });
      } else {
        expressionMap.set(expressionTitle, card);
      }
    });
    
    return duplicates;
  }
  
  static removeDuplicates(duplicates) {
    duplicates.forEach(duplicate => {
      const { original, duplicate: card, title, id } = duplicate;
      
      console.log(`Removing duplicate expression: ${title} (ID: ${id})`);
      
      // Remove duplicate card
      card.remove();
      
      // Update references
      this.updateReferences(title, original);
    });
  }
  
  static updateReferences(title, originalCard) {
    // Update any references to the duplicate
    const expressionId = originalCard.getAttribute('data-expression-id');
    
    // Update comment references
    document.querySelectorAll(`[data-expression-id="${title}"]`).forEach(element => {
      element.setAttribute('data-expression-id', expressionId);
    });
  }
}
```

2. **Update app.js**
```javascript
// AE-Expression-Store/js/app.js
class AEExpressionStore {
  init() {
    this.setupEventListeners();
    this.initComponents();
    await this.loadAdvancedFeatures();
    this.setupSearch();
    this.setupCopyButtons();
    ImageLoader.setupLazyLoading();
    
    // Detect and remove duplicates
    this.detectAndRemoveDuplicates();
  }
  
  detectAndRemoveDuplicates() {
    const cards = document.querySelectorAll('.card');
    const duplicates = DuplicateDetector.findDuplicates(cards);
    
    if (duplicates.length > 0) {
      DuplicateDetector.removeDuplicates(duplicates);
    }
  }
}
```

### 6.2 Error Handling

#### Step-by-Step Implementation

1. **Create Error Handler**
```javascript
// AE-Expression-Store/js/error-handler.js
class ErrorHandler {
  static handleError(error, context = '') {
    console.error(`Error in ${context}:`, error);
    
    // Show user-friendly error message
    this.showErrorMessage(error.message || 'An error occurred');
    
    // Log error for debugging
    this.logError(error, context);
  }
  
  static showErrorMessage(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ef4444;
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(errorElement);
    
    setTimeout(() => {
      if (document.body.contains(errorElement)) {
        document.body.removeChild(errorElement);
      }
    }, 5000);
  }
  
  static logError(error, context) {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    // Send to error tracking service
    this.sendToErrorTracking(errorInfo);
  }
  
  static sendToErrorTracking(errorInfo) {
    // Implementation depends on error tracking service
    // Example: Sentry, Bugsnag, etc.
    console.log('Error tracking:', errorInfo);
  }
}
```

2. **Update app.js**
```javascript
// AE-Expression-Store/js/app.js
class AEExpressionStore {
  init() {
    this.setupEventListeners();
    this.initComponents();
    await this.loadAdvancedFeatures();
    this.setupSearch();
    this.setupCopyButtons();
    ImageLoader.setupLazyLoading();
    
    // Setup error handling
    this.setupErrorHandling();
  }
  
  setupErrorHandling() {
    window.addEventListener('error', (event) => {
      ErrorHandler.handleError(event.error, 'global');
    });
    
    window.addEventListener('unhandledrejection', (event) => {
      ErrorHandler.handleError(event.reason, 'promise');
    });
  }
}
```

## Phase 7: Responsive Design Improvements

### 7.1 Mobile-First Approach

#### Step-by-Step Implementation

1. **Update CSS for Mobile**
```css
/* utilities.css - Mobile-first */
.container {
    padding: 0 16px;
    max-width: 100%;
}

@media (min-width: 768px) {
    .container {
        padding: 0 28px;
        max-width: var(--container-max);
    }
}

/* Navigation */
.nav-inner {
    flex-wrap: wrap;
}

.top-bar {
    flex-direction: column;
    gap: 12px;
}

@media (min-width: 768px) {
    .top-bar {
        flex-direction: row;
    }
}

/* Cards */
.card {
    column-count: 1;
}

@media (min-width: 768px) {
    .card {
        column-count: 2;
    }
}

@media (min-width: 1200px) {
    .card {
        column-count: 2;
    }
}
```

2. **Update JavaScript for Mobile**
```javascript
// AE-Expression-Store/js/utils.js
class Utils {
  static isMobile() {
    return window.innerWidth < 768;
  }
  
  static setupMobileOptimizations() {
    if (this.isMobile()) {
      this.setupMobileTouchEvents();
      this.setupMobileViewport();
    }
  }
  
  static setupMobileTouchEvents() {
    // Add touch event listeners
    document.querySelectorAll('.copy-btn').forEach(button => {
      button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        button.click();
      });
    });
  }
  
  static setupMobileViewport() {
    // Adjust viewport for mobile
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0';
    }
  }
}
```

3. **Update app.js**
```javascript
// AE-Expression-Store/js/app.js
class AEExpressionStore {
  init() {
    this.setupEventListeners();
    this.initComponents();
    await this.loadAdvancedFeatures();
    this.setupSearch();
    this.setupCopyButtons();
    ImageLoader.setupLazyLoading();
    
    // Setup mobile optimizations
    Utils.setupMobileOptimizations();
  }
}
```

## Phase 8: Advanced Features

### 8.1 High Contrast Mode

#### Step-by-Step Implementation

1. **Implement High Contrast Mode**
```css
/* utilities.css */
@media (prefers-contrast: high) {
  :root {
    --primary: #0056b3;
    --primary-hover: #004494;
    --bg-page: #ffffff;
    --bg-white: #ffffff;
    --text-dark: #000000;
    --text-gray: #000000;
    --border: #000000;
    --bg-subtle: #f0f0f0;
    --surface: #ffffff;
    --card-bg: #ffffff;
    --text-main: #000000;
    --text-accent: #0056b3;
    --accent-hover: #004494;
    --text-muted: #666666;
    --border-color: #000000;
    --border-strong: #000000;
    --code-bg: #000000;
    --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.3);
    --shadow-card-hover: 0 12px 40px rgba(0, 0, 0, 0.5);
    --shadow-card-float: 0 20px 50px rgba(0, 0, 0, 0.4);
  }

  .card, .feature-card, .dashboard-card {
    border-width: 2px;
    border-color: var(--border-strong);
  }

  .nav-link, .footer-col a {
    color: var(--text-main);
  }

  .nav-link:hover, .footer-col a:hover {
    color: var(--primary);
  }
}
```

### 8.2 Analytics and Tracking

#### Step-by-Step Implementation

1. **Create Analytics Manager**
```javascript
// AE-Expression-Store/js/analytics.js
class AnalyticsManager {
  constructor() {
    this.trackingId = 'UA-XXXXXX-Y'; // Replace with actual tracking ID
    this.init();
  }
  
  init() {
    if (typeof gtag !== 'undefined') {
      this.setupGA4();
    }
  }
  
  setupGA4() {
    window.dataLayer = window.dataLayer || [];
    gtag('js', new Date());
    gtag('config', this.trackingId);
  }
  
  trackEvent(category, action, label, value) {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }
  
  trackPageView(path) {
    if (typeof gtag !== 'undefined') {
      gtag('config', this.trackingId, { page_path: path });
    }
  }
  
  trackExpressionInteraction(expressionId, action) {
    this.trackEvent('Expression', action, expressionId);
  }
  
  trackCopyAction(expressionId) {
    this.trackEvent('Copy', 'copy_expression', expressionId);
  }
}
```

2. **Update app.js**
```javascript
// AE-Expression-Store/js/app.js
class AEExpressionStore {
  init() {
    this.setupEventListeners();
    this.initComponents();
    await this.loadAdvancedFeatures();
    this.setupSearch();
    this.setupCopyButtons();
    ImageLoader.setupLazyLoading();
    
    // Initialize analytics
    this.analytics = new AnalyticsManager();
    this.setupAnalytics();
  }
  
  setupAnalytics() {
    // Track page view
    this.analytics.trackPageView(window.location.pathname);
    
    // Track expression interactions
    document.querySelectorAll('.card').forEach(card => {
      const expressionId = card.getAttribute('data-expression-id');
      if (expressionId) {
        card.addEventListener('click', () => {
          this.analytics.trackExpressionInteraction(expressionId, 'view');
        });
      }
    });
    
    // Track copy actions
    document.querySelectorAll('.copy-btn').forEach(button => {
      button.addEventListener('click', () => {
        const card = button.closest('.card');
        const expressionId = card?.getAttribute('data-expression-id');
        if (expressionId) {
          this.analytics.trackCopyAction(expressionId);
        }
      });
    });
  }
}
```

## Phase 9: Testing and Validation

### 9.1 Automated Testing

#### Step-by-Step Implementation

1. **Create Test Structure**
```bash
mkdir -p AE-Expression-Store/tests
# touch AE-Expression-Store/tests/app.test.js
# touch AE-Expression-Store/tests/api.test.js
# touch AE-Expression-Store/tests/utils.test.js
# touch AE-Expression-Store/tests/components.test.js
```

2. **Create Jest Configuration**
```javascript
// AE-Expression-Store/jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/reportWebVitals.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

3. **Create Test Setup**
```javascript
// AE-Expression-Store/tests/setup.js
import '@testing-library/jest-dom';

// Mock Supabase
global.supabase = {
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn(() => ({
          then: jest.fn((callback) => callback({ data: [], error: null }))
        }))
      }))
    }))
  }))
};

// Mock window properties
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: jest.fn().mockImplementation((callback) => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
  }))
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});
```

4. **Create Basic Tests**
```javascript
// AE-Expression-Store/tests/app.test.js
import { AEExpressionStore } from '../js/app.js';

describe('AEExpressionStore', () => {
  let app;
  
  beforeEach(() => {
    app = new AEExpressionStore();
  });
  
  describe('initialization', () => {
    test('should initialize without errors', () => {
      expect(app).toBeDefined();
    });
  });
  
  describe('event handling', () => {
    test('should handle copy button clicks', () => {
      // Test copy button functionality
    });
  });
});
```

### 9.2 Performance Testing

#### Step-by-Step Implementation

1. **Create Performance Test**
```javascript
// AE-Expression-Store/tests/performance.test.js
const { performance } = require('perf_hooks');

class PerformanceTest {
  static async measurePageLoad() {
    const startTime = performance.now();
    
    // Navigate to page
    await page.goto('http://localhost:3000');
    
    // Wait for page to load
    await page.waitForLoad();
    
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    
    return loadTime;
  }
  
  static async measureBundleSize() {
    const response = await page.goto('http://localhost:3000');
    const headers = response.headers();
    const contentLength = headers['content-length'];
    
    return parseInt(contentLength) / 1024; // KB
  }
}
```

2. **Create Lighthouse Test**
```javascript
// AE-Expression-Store/tests/lighthouse.test.js
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

class LighthouseTest {
  static async runLighthouse(url) {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = { logLevel: 'info', output: 'json', port: chrome.port };
    const runnerResult = await lighthouse(url, options);
    
    await chrome.kill();
    
    return runnerResult.lhr;
  }
  
  static async validatePerformance() {
    const report = await this.runLighthouse('http://localhost:3000');
    
    expect(report.categories.performance.score).toBeGreaterThan(0.9);
    expect(report.categories.accessibility.score).toBeGreaterThan(0.9);
    expect(report.categories.best-practices.score).toBeGreaterThan(0.9);
  }
}
```

### 9.3 Accessibility Testing

#### Step-by-Step Implementation

1. **Create Accessibility Test**
```javascript
// AE-Expression-Store/tests/accessibility.test.js
const axe = require('axe-core');

class AccessibilityTest {
  static async runAccessibilityTest() {
    const options = {
      rules: [
        'color-contrast',
        'keyboard-navigation',
        'focus-management',
        'aria-labels'
      ]
    };
    
    const results = await axe.run(document, options);
    
    if (results.violations.length > 0) {
      console.error('Accessibility violations found:', results.violations);
      return false;
    }
    
    return true;
  }
}
```

## Conclusion

This implementation guide provides detailed step-by-step instructions for implementing each phase of the AE Expression Store refactoring. It includes:

1. **Phase-by-phase implementation** with specific tasks and technical specifications
2. **Code examples** for each implementation step
3. **Best practices** for development and testing
4. **Validation criteria** for each phase
5. **Risk management** strategies

By following this implementation guide, the AE Expression Store can be successfully refactored into a modern, performant, and accessible web application while maintaining high code quality and user experience standards.

The key to success will be:
1. **Following the implementation guide systematically**
2. **Testing each change thoroughly**
3. **Monitoring performance continuously**
4. **Gathering user feedback**
5. **Iterating and improving**

This guide serves as a living document that will evolve as we learn more about the codebase and user needs. Regular reviews and updates will be necessary to ensure the project stays on track and meets its objectives.