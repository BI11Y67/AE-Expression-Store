// AE Expression Store - Expression Preview Component
// Handles GIF/video preview controls and playback

class ExpressionPreview {
  constructor(element) {
    this.element = element;
    this.video = element.querySelector('.expression-preview');
    this.playbackRate = 1;
    this.isPlaying = false;
    this.init();
  }
  
  init() {
    this.setupControls();
    this.setupPlaybackSpeed();
    this.setupPreviewLoading();
  }
  
  setupControls() {
    // Create play/pause button
    const playPauseBtn = document.createElement('button');
    playPauseBtn.className = 'play-pause';
    playPauseBtn.innerHTML = '⏸️';
    playPauseBtn.setAttribute('aria-label', 'Pause preview');
    playPauseBtn.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid var(--border-color);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    this.element.appendChild(playPauseBtn);
    
    // Show controls on hover
    this.element.addEventListener('mouseenter', () => {
      playPauseBtn.style.opacity = '1';
    });
    
    this.element.addEventListener('mouseleave', () => {
      if (!this.isPlaying) {
        playPauseBtn.style.opacity = '0';
      }
    });
    
    playPauseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.togglePlayPause();
    });
  }
  
  setupPlaybackSpeed() {
    // Create playback speed control
    const speedControl = document.createElement('input');
    speedControl.type = 'range';
    speedControl.className = 'gif-speed';
    speedControl.min = '0.5';
    speedControl.max = '2';
    speedControl.step = '0.1';
    speedControl.value = '1';
    speedControl.title = 'Playback speed';
    speedControl.style.cssText = `
      position: absolute;
      bottom: 8px;
      right: 8px;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      padding: 4px 8px;
      font-size: 12px;
      z-index: 10;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    this.element.appendChild(speedControl);
    
    // Show controls on hover
    this.element.addEventListener('mouseenter', () => {
      speedControl.style.opacity = '1';
    });
    
    this.element.addEventListener('mouseleave', () => {
      if (!this.isPlaying) {
        speedControl.style.opacity = '0';
      }
    });
    
    speedControl.addEventListener('input', (e) => {
      this.playbackRate = parseFloat(e.target.value);
      if (this.video) {
        this.video.playbackRate = this.playbackRate;
      }
    });
  }
  
  setupPreviewLoading() {
    // Handle preview loading states
    const img = this.element.querySelector('.expression-preview');
    if (img) {
      if (img.complete) {
        this.hideLoadingState();
      } else {
        img.addEventListener('load', () => {
          this.hideLoadingState();
        });
        
        img.addEventListener('error', () => {
          this.showErrorState();
        });
      }
    }
  }
  
  hideLoadingState() {
    this.element.classList.remove('loading');
  }
  
  showErrorState() {
    this.element.classList.add('error');
    this.element.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-gray);">
        <p>Preview unavailable</p>
      </div>
    `;
  }
  
  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
  
  play() {
    if (this.video) {
      this.video.play();
      this.isPlaying = true;
      
      const playPauseBtn = this.element.querySelector('.play-pause');
      if (playPauseBtn) {
        playPauseBtn.innerHTML = '⏸️';
        playPauseBtn.setAttribute('aria-label', 'Pause preview');
      }
      
      // Hide controls after a delay
      setTimeout(() => {
        if (this.isPlaying) {
          const controls = this.element.querySelectorAll('.play-pause, .gif-speed');
          controls.forEach(control => {
            control.style.opacity = '0';
          });
        }
      }, 3000);
    }
  }
  
  pause() {
    if (this.video) {
      this.video.pause();
      this.isPlaying = false;
      
      const playPauseBtn = this.element.querySelector('.play-pause');
      if (playPauseBtn) {
        playPauseBtn.innerHTML = '▶️';
        playPauseBtn.setAttribute('aria-label', 'Play preview');
      }
      
      // Show controls on pause
      const controls = this.element.querySelectorAll('.play-pause, .gif-speed');
      controls.forEach(control => {
        control.style.opacity = '1';
      });
    }
  }
}

// Export for testing
export { ExpressionPreview };