// AE Expression Store - Utility Functions
// Shared utilities for better code organization and maintainability

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
  
  static setupImageLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src) {
              this.loadImage(src, img);
              imageObserver.unobserve(img);
            }
          }
        });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
  
  static async loadImage(src, imgElement) {
    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      
      imgElement.src = objectUrl;
      imgElement.removeAttribute('data-src');
      
      // Clean up object URL when image is unloaded
      imgElement.addEventListener('load', () => {
        URL.revokeObjectURL(objectUrl);
      });
    } catch (error) {
      console.error('Failed to load image:', error);
      // Use fallback image
      imgElement.src = '/assets/images/placeholder.gif';
      imgElement.removeAttribute('data-src');
    }
  }
  
  static showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 16px;
      border-radius: 8px;
      color: white;
      font-family: inherit;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: slideIn 0.3s ease;
    `;
    
    switch (type) {
      case 'success':
        notification.style.background = '#10b981';
        break;
      case 'error':
        notification.style.background = '#ef4444';
        break;
      case 'warning':
        notification.style.background = '#f59e0b';
        break;
      default:
        notification.style.background = '#3b82f6';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, duration);
  }
  
  static addCSS(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
  
  static removeCSS(selector) {
    const styles = document.querySelectorAll(`style[${selector}]`);
    styles.forEach(style => style.remove());
  }
}

// Add CSS animations
Utils.addCSS(`
@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
}
`);

// Export for testing
export { Utils };