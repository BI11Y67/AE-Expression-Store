import { Utils } from '../utils.js';

// AE Expression Store - Copy Button Component
// Handles copy functionality for expression code

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
    const card = this.button.closest('.card');
    const codeBlock = card ? card.querySelector('code') : null;
    if (codeBlock) {
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
      this.trackCopyAction();
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
  
  trackCopyAction() {
    if (typeof AnalyticsManager !== 'undefined') {
      const card = this.button.closest('.card');
      const expressionId = card?.getAttribute('data-expression-id');
      if (expressionId) {
        AnalyticsManager.trackCopyAction(expressionId);
      }
    }
  }
}

class CopyButtonManager {
  constructor() {
    this.buttons = [];
    this.init();
  }
  
  init() {
    this.setupCopyButtons();
  }
  
  setupCopyButtons() {
    this.buttons = [];
    document.querySelectorAll('.copy-btn').forEach(button => {
      this.buttons.push(new CopyButton(button));
    });
  }
}

// Export for testing
export { CopyButton, CopyButtonManager };