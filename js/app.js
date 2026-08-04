// AE Expression Store - Main Application
// Simplified version focusing on expression library with built-in fallback expressions

import { api } from './api.js';
import { REFERENCE_EXPRESSIONS } from './reference-expressions.js';

class AEExpressionStore {
  constructor() {
    this.activeCategory = 'all';
    this.activeView = 'gallery';
    this.copyButtonManager = null;
    this.galleryExpressions = [];
    this.liveExpressions = [];
  }
  
  async init() {
    try {
      this.setupEventListeners();
      this.setupViewToggle();
      await this.loadExpressions();
      this.setupSearch();
      this.setupCategoryFiltering();
      this.setupCopyButtons();
      
      console.log('AE Expression Store initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AE Expression Store:', error);
      this.renderErrorState();
    }
  }
  
  setupEventListeners() {
    // Menu button handling
    const menuButton = document.getElementById('menu-button');
    if (menuButton) {
      menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMenu();
      });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', () => {
      this.closeMenu();
    });
  }

  setupViewToggle() {
    const viewButtons = document.querySelectorAll('.view-switch__btn');
    viewButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.activeView = button.dataset.view || 'gallery';
        this.updateViewToggle();
        this.renderCurrentView();
      });
    });

    this.updateViewToggle();
  }

  updateViewToggle() {
    document.querySelectorAll('.view-switch__btn').forEach(button => {
      const isActive = button.dataset.view === this.activeView;
      button.classList.toggle('view-switch__btn--active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  renderCurrentView() {
    const isLiveView = this.activeView === 'live';
    const source = isLiveView ? this.liveExpressions : this.galleryExpressions;
    const expressions = isLiveView
      ? (source && source.length > 0 ? source : [])
      : (source && source.length > 0 ? source : this.getFallbackExpressions());

    this.expressions = expressions;
    this.renderExpressions(expressions);
  }
  
  async loadExpressions() {
    try {
      const expressions = await api.getExpressions();
      this.liveExpressions = Array.isArray(expressions) ? expressions : [];
      this.galleryExpressions = this.getGalleryExpressions();
      this.expressions = this.activeView === 'live' ? this.liveExpressions : this.galleryExpressions;
      this.renderCurrentView();
      this.updateLibraryStats(this.getVisibleCount(), this.expressions?.length || 0);
    } catch (error) {
      console.warn('Failed to load expressions:', error);
      this.liveExpressions = [];
      this.galleryExpressions = this.getGalleryExpressions();
      this.expressions = this.activeView === 'live' ? this.liveExpressions : this.galleryExpressions;
      this.renderCurrentView();
      this.updateLibraryStats(this.getVisibleCount(), this.expressions?.length || 0);
    }
  }
  
  getPreviewUrl(fileName) {
    return `./NEW%20GIFS_aees.socrazymedia.com/${encodeURIComponent(fileName)}`;
  }

  getGalleryExpressions() {
    return (REFERENCE_EXPRESSIONS || []).map((expr, index) => ({
      ...expr,
      featured: index === 0,
      tags: this.buildTags(expr)
    }));
  }

  buildTags(expr) {
    const baseTags = [expr.tags, this.inferExpressionCategory(expr)]
      .filter(Boolean)
      .join(', ')
      .trim();

    return baseTags;
  }

  inferExpressionCategory(expr) {
    const haystack = `${expr.name || ''} ${expr.description || ''} ${expr.tags || ''}`.toLowerCase();

    if (/(text|font|title|sourcetext|anchor|typewriter)/.test(haystack)) {
      return 'text';
    }

    if (/(3d|lookat|target|world|orient|position|rotation)/.test(haystack)) {
      return '3d';
    }

    if (/(animation|bounce|wiggle|loop|ease|scale|transform|motion|stutter|spring|force|path|velocity|grid|proximity|distribute)/.test(haystack)) {
      return 'animation';
    }

    return 'utility';
  }

  getFallbackExpressions() {
    const comingSoon = this.getPreviewUrl('Coming Soon.gif');

    return [
      {
        id: 'maintain-shapes-stroke-width',
        name: 'Maintain Shape\'s Stroke Width',
        description: 'Keeps the stroke width of a shape layer consistent even when you scale the layer itself.',
        tags: 'animation,utility',
        preview_url: this.getPreviewUrl("Maintain Shape's Stroke Width.gif"),
        code: 'value / length(toComp([0,0]), toComp([0.7071,0.7071])) || 0.001;',
        featured: true
      },
      {
        id: 'maintain-shapes-scale-parented',
        name: 'Maintain Shape\'s Scale (Parented)',
        description: 'Helps shape layers retain a stable scale when moved through parented transforms.',
        tags: 'animation,utility',
        preview_url: this.getPreviewUrl("Maintain Shape's Scale (Parented).gif"),
        code: 'value / length(toComp([0,0]), toComp([1,0])) || 0.001;'
      },
      {
        id: 'in-bounce-animation-left-right',
        name: 'In Bounce Animation (Left - Right)',
        description: 'Adds a bounce-in effect that feels natural for movement across a horizontal axis.',
        tags: 'animation,bounce',
        preview_url: this.getPreviewUrl('In Bounce Animation (Left - Right).gif'),
        code: 'amp = 20;\nfreq = 4;\nvalue + [wiggle(freq, amp)[0], 0, 0];'
      },
      {
        id: 'in-bounce-animation-top-bottom',
        name: 'In Bounce Animation (Top - Bottom)',
        description: 'Creates a bounce effect that works well for vertical motion and dropdown transitions.',
        tags: 'animation,bounce',
        preview_url: this.getPreviewUrl('In Bounce Animation (Top - Bottom).gif'),
        code: 'amp = 20;\nfreq = 4;\nvalue + [0, wiggle(freq, amp)[1], 0];'
      },
      {
        id: 'reverse-keyframe-animation',
        name: 'Reverse Keyframe Animation',
        description: 'Reverses a keyframed animation in a clean, reusable way.',
        tags: 'animation,reverse',
        preview_url: this.getPreviewUrl('Reverse Keyframe or Animation.gif'),
        code: 'linear(time, inPoint, outPoint, 1, 0);'
      },
      {
        id: 'floating-ball-animation',
        name: 'Floating Ball Animation',
        description: 'Use this on a shape when you need a floating ball animation. Link the property to a null so its position starts at 0 before applying the expression.',
        tags: 'animation,math',
        preview_url: comingSoon,
        code: 'x = value[0];\na = 240;\nf = 0.5;\nt = time - inPoint;\ny = Math.sin(t * 2 * Math.PI * f) * a;\n[x, y];'
      },
      {
        id: 'math-cos-smooth-rotation',
        name: 'Math.cos() /Smooth Rotation',
        description: 'Apply this to a shape layer’s rotation property for a smoother in-and-out rotation animation.',
        tags: 'animation,rotation',
        preview_url: comingSoon,
        code: 'a = 45;\nf = 0.5;\nt = time - inPoint;\ny = Math.cos(t * 2 * Math.PI * f) * a;\ny;'
      },
      {
        id: 'auto-center-text',
        name: 'Auto-Center Text',
        description: 'Automatically realigns the anchor and text as you type to maintain symmetry.',
        tags: 'text,utility',
        preview_url: comingSoon,
        code: '// Auto-center the anchor point\nvar rect = sourceRectAtTime(time, false);\n[rect.left + rect.width / 2, rect.top + rect.height / 2, 0];'
      },
      {
        id: 'dynamic-text-box',
        name: 'Dynamic Text Box',
        description: 'Automatically resizes the background shape to fit your text length and follow the text layer position.',
        tags: 'text,utility',
        preview_url: this.getPreviewUrl('Dynamic Text Box.gif'),
        code: '// Get the text layer dimensions\nvar textLayer = thisComp.layer("text");\nvar textRect = textLayer.sourceRectAtTime(time, false);\nvar marginX = 20;\nvar marginY = 10;\n[textRect.width + marginX * 2, textRect.height + marginY * 2];'
      },
      {
        id: 'font-switcher',
        name: 'Font Switcher',
        description: 'Changes the layer’s font style based on a slider value, keeping the text setup flexible without extra layers.',
        tags: 'text,utility',
        preview_url: comingSoon,
        code: 'var fontArray = ["OPTIBodoni-Antiqua", "Poppins-Italic", "Platypi-Light", "Montserrat-SemiBold"];\nv = Math.round(effect("Slider Control")("Slider"));\nstyle.setFont(fontArray[v]);'
      },
      {
        id: 'remote-text-control',
        name: 'Remote Text Control',
        description: 'Links this text to a master controller so edits in another comp update instantly here.',
        tags: 'text,workflow',
        preview_url: comingSoon,
        code: '// Change the comp and layer names as needed\ncomp("Comp2").layer("text").text.sourceText;'
      },
      {
        id: 'local-posterize-time',
        name: 'Local Posterize Time',
        description: 'Restricts the frame rate of this property to create a more organic, jittery motion.',
        tags: 'animation,utility',
        preview_url: comingSoon,
        code: 'posterizeTime(4);\nvalue;'
      },
      {
        id: 'single-segment-pingpong',
        name: 'Single Segment PingPong',
        description: 'Creates a smooth ping-pong loop inside a single segment.',
        tags: 'animation,loop',
        preview_url: comingSoon,
        code: 'loopOut(type = "pingpong", numKeyframes = 1);'
      },
      {
        id: 'continuous-offset-loop',
        name: 'Continuous Offset Loop',
        description: 'Keeps a looping animation moving continuously without visible snapping.',
        tags: 'animation,loop',
        preview_url: comingSoon,
        code: 'loopOut(type = "cycle");'
      },
      {
        id: 'local-wiggle-controller',
        name: 'Local Wiggle Controller',
        description: 'Uses a local wiggle controller to make motion feel more intentional.',
        tags: 'animation,wiggle',
        preview_url: comingSoon,
        code: 'wiggle(3, 20);'
      },
      {
        id: 'value-lock',
        name: 'Value Lock',
        description: 'Locks a property to a target value while still allowing manual adjustment.',
        tags: 'utility,animation',
        preview_url: comingSoon,
        code: 'clamp(value, 0, 100);'
      },
      {
        id: 'constant-time-offset',
        name: 'Constant Time Offset',
        description: 'Adds a constant delay to an animated property without reworking keyframes.',
        tags: 'animation,utility',
        preview_url: comingSoon,
        code: 'valueAtTime(time - 0.2);'
      },
      {
        id: 'seeded-low-fi-random',
        name: 'Seeded Low-Fi Random',
        description: 'Creates controlled, low-fi randomness with a stable seed.',
        tags: 'utility,random',
        preview_url: comingSoon,
        code: 'seedRandom(5, true);\nrandom();'
      },
      {
        id: 'dynamic-ease-mapping',
        name: 'Dynamic Ease Mapping',
        description: 'Maps easing values dynamically between keyframes for more fluid motion.',
        tags: 'animation,ease',
        preview_url: comingSoon,
        code: 'ease(time, 0, 1, 0, 1);'
      },
      {
        id: 'dynamic-3x5-auto-scaling-shape-grid',
        name: 'Dynamic 3x5 Auto-Scaling Shape Grid',
        description: 'Automates the layout of a 3x5 shape grid with responsive scaling.',
        tags: 'animation,utility',
        preview_url: comingSoon,
        code: '[index % 3 * 50, Math.floor(index / 3) * 50];'
      },
      {
        id: 'dynamic-multi-layer-index-rotation',
        name: 'Dynamic Multi-Layer Index Rotation',
        description: 'Rotates each layer based on its index to create a layered animation system.',
        tags: 'animation,3d',
        preview_url: comingSoon,
        code: 'rotation + index * 12;'
      },
      {
        id: 'live-transform-hud',
        name: 'Live Transform HUD',
        description: 'Outputs transform values in a lightweight HUD pattern for debugging.',
        tags: 'utility,debug',
        preview_url: comingSoon,
        code: '[transform.position[0], transform.position[1]];'
      },
      {
        id: '3d-lookat-target-constraint',
        name: '3D LookAt Target Constraint',
        description: 'Uses a target layer to orient a 3D layer smoothly towards a point.',
        tags: '3d,animation',
        preview_url: this.getPreviewUrl('3D LookAt Target Constraint.gif'),
        code: 'toComp([0,0,0]);'
      },
      {
        id: 'relative-position-tracker',
        name: 'Relative Position Tracker',
        description: 'Tracks position relative to a second layer to create linked motion.',
        tags: 'animation,utility',
        preview_url: this.getPreviewUrl('Relative Position Tracker.gif'),
        code: 'thisComp.layer("TARGET").transform.position - position;'
      },
      {
        id: 'keyframe-friendly-scripting',
        name: 'Keyframe-Friendly Scripting',
        description: 'A scripting pattern that stays friendly to keyframes and iterative edits.',
        tags: 'animation,utility',
        preview_url: this.getPreviewUrl('Keyframe-Friendly Scripting.gif'),
        code: 'linear(time, inPoint, outPoint, 0, 100);'
      },
      {
        id: 'value-inversion-mirroring',
        name: 'Value Inversion (Mirroring)',
        description: 'Mirrors a property value around a center line for reverse motion setups.',
        tags: 'animation,utility',
        preview_url: this.getPreviewUrl('Value Inversion (Mirroring).gif'),
        code: 'value * -1;'
      },
      {
        id: '2d-auto-orient-look-at',
        name: '2D Auto-Orient Look-At',
        description: 'Turns a 2D layer so it faces another layer naturally.',
        tags: 'animation,2d',
        preview_url: this.getPreviewUrl('2D Auto-Orient  Look-At.gif'),
        code: 'lookAt(thisComp.layer("TARGET").position);'
      },
      {
        id: 'luma-scale-driver',
        name: 'Luma Scale Driver',
        description: 'Drives a scale value from luminance so the visual result feels procedural.',
        tags: 'animation,utility',
        preview_url: this.getPreviewUrl('Luma Scale Driver.gif'),
        code: 'value * (1 + sampleImage(position, [0,0], true).luma);'
      },
      {
        id: 'absolute-world-position-tracker',
        name: 'Absolute World Position Tracker',
        description: 'Tracks an absolute world-space position for scene-wide motion workflows.',
        tags: 'animation,utility',
        preview_url: comingSoon,
        code: 'toWorld(position);'
      },
      {
        id: 'auto-grid-layout',
        name: 'Auto Grid Layout',
        description: 'Creates a simple automatic grid layout from repeated layer instances.',
        tags: 'utility,workflow',
        preview_url: comingSoon,
        code: '[index % 3 * 100, Math.floor(index / 3) * 100];'
      },
      {
        id: 'seamless-looping-wiggle',
        name: 'Seamless Looping Wiggle',
        description: 'Makes wiggle motion loop seamlessly without getting stuck on the start/end.',
        tags: 'animation,wiggle',
        preview_url: comingSoon,
        code: 'loopOut(type = "pingpong") + wiggle(2, 10);'
      },
      {
        id: 'half-frame-stutter',
        name: 'Half Frame Stutter',
        description: 'Adds a subtle half-frame stutter for a more analog motion look.',
        tags: 'animation,utility',
        preview_url: comingSoon,
        code: 'time * 2 % 1 > 0.5 ? value : value * 0.98;'
      },
      {
        id: 'proportional-y-scaler',
        name: 'Proportional Y-Scaler',
        description: 'Scales the Y value proportionally to the X value for responsive layouts.',
        tags: 'animation,utility',
        preview_url: comingSoon,
        code: '(xValue * thisComp.height) / thisComp.width;'
      },
      {
        id: 'constant-auto-scale',
        name: 'Constant Auto-Scale',
        description: 'Scales layers steadily from the In-Point for a simple auto-scale motion.',
        tags: 'animation,utility',
        preview_url: comingSoon,
        code: 'var scaleSpeed = 10;\nvar scaleFactor = (time - inPoint) * scaleSpeed;\nvalue - [scaleFactor, scaleFactor];'
      },
      {
        id: 'constant-auto-scale-alt',
        name: 'Constant Auto-Scale Alt',
        description: 'An alternate version of the constant auto-scale expression with a reversed direction.',
        tags: 'animation,utility',
        preview_url: comingSoon,
        code: 'var scaleSpeed = 8;\nvar scaleFactor = (time - inPoint) * scaleSpeed;\nvalue + [scaleFactor, scaleFactor];'
      },
      {
        id: 'typewriter-with-cursor',
        name: 'Typewriter with Cursor',
        description: 'Builds a typewriter effect with a blinking cursor and reveal timing.',
        tags: 'text,animation',
        preview_url: comingSoon,
        code: 'var txt = value;\nvar charCount = Math.floor(time * 12);\n(txt.slice(0, charCount) + "|");'
      },
      {
        id: 'proportional-y-scale-sync',
        name: 'Proportional Y-Scale Sync',
        description: 'Synchronizes vertical movement to an external slider in a proportional way.',
        tags: 'animation,utility',
        preview_url: comingSoon,
        code: 'var slider = thisComp.layer("CONTROL").effect("Slider")("Slider");\n[value[0], -181.5 * (slider / 100)];'
      },
      {
        id: 'path-flow-distributor-shape-layer',
        name: 'Path Flow Distributor(Shape Layer)',
        description: 'Distributes layers along a path while keeping them aligned to the flow and optionally offset by controls.',
        tags: 'animation,utility',
        preview_url: comingSoon,
        code: 'let pathLayer = thisComp.layer("MAIN PATH");\nlet thePath = pathLayer.content("Shape 1").content("Path 1").path;\nlet sliderOffset = thisComp.layer("MAIN PATH").effect("OFFSET CONTROL")("Slider");\nlet offsetRepeat = sliderOffset % 100;\nlet offsetToAdd = linear(offsetRepeat, 0, 100, 1, 0);\nlet pathOffset = linear(index, 0, thisComp.numLayers - 1, 0, 1);\nlet myPos = thePath.pointOnPath((pathOffset + offsetToAdd) % 1, time);\nseedRandom(index, true);\nlet posSlider = thisComp.layer("MAIN PATH").effect("RANDOM POSITION")("Slider");\nlet randomPos = random([-posSlider, -posSlider], [posSlider, posSlider]);\ntoComp(myPos) - thisComp.layer("MAIN PATH").transform.position + randomPos;'
      },
      {
        id: 'dynamic-velocity-spring',
        name: 'Dynamic Velocity Spring',
        description: 'Adds a springy rotation response driven by movement speed, ideal for energetic UI motion.',
        tags: 'animation,utility',
        preview_url: comingSoon,
        code: 'let amp = 2.0;\nlet freq = 2.0;\nlet decay = 4.0;\nlet rotateOnMovement = 42;\nlet useAxis = 0;\nlet refValue = position;\nif (refValue.velocity[useAxis] != 0) {\n  linear(refValue.velocity[useAxis], -3000, 3000, -rotateOnMovement, rotateOnMovement);\n} else {\n  value;\n}'
      },
      {
        id: 'proximity-force-field',
        name: 'Proximity Force Field',
        description: 'Creates a force-field effect where layers respond to nearby motion.',
        tags: 'animation,utility',
        preview_url: this.getPreviewUrl('Proximity Force Field.gif'),
        code: 'var d = length(position, thisComp.layer("SOURCE").position);\nvalue + (d < 200 ? 10 : 0);'
      },
      {
        id: 'auto-distribute',
        name: 'Auto-Distribute',
        description: 'Automatically calculates a layer’s position based on the layer directly above it in the stack and a fixed offset.',
        tags: 'animation,utility',
        preview_url: comingSoon,
        code: 'var xOffset = -571.6;\nif (index < thisComp.numLayers && index > 1) {\n  var prevPos = thisComp.layer(index - 1).transform.position;\n  var newX = prevPos[0] + xOffset + value[0];\n  var newY = prevPos[1];\n  [newX, newY];\n} else {\n  value;\n}'
      },
      {
        id: 'dynamic-line-connector-between-two-shapes',
        name: 'Dynamic Line Connector Between Two Shapes',
        description: 'Creates a responsive line that automatically connects two layers and stays attached as they move.',
        tags: 'animation,utility',
        preview_url: comingSoon,
        code: 'var p1 = thisComp.layer("Shape 1").toComp([0, 0]);\nvar p2 = thisComp.layer("Shape 2").toComp([0, 0]);\ncreatePath([p1, p2], [], [], false);'
      }
    ];
  }
  
  extractExpressionsFromCards(cards) {
    return cards.map(card => {
      const title = card.querySelector('h3, .card-title')?.textContent?.trim() || 'Untitled';
      const description = card.querySelector('.card-desc')?.textContent?.trim() || '';
      const code = card.querySelector('code')?.textContent?.trim() || '';
      const previewUrl = card.querySelector('.expression-preview')?.getAttribute('src') || '';
      const tags = card.getAttribute('data-tags') || '';
      const id = card.getAttribute('data-expression-id') || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      card.setAttribute('data-tags', tags || '');
      card.setAttribute('data-expression-id', id);

      return {
        id,
        name: title,
        description,
        tags,
        preview_url: previewUrl,
        code
      };
    });
  }

  renderExpressions(expressions) {
    const container = document.querySelector('.library-surface .container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!expressions || expressions.length === 0) {
      const emptyMessage = this.activeView === 'live'
        ? 'No live-fetched expressions are available right now.'
        : 'No expressions found. Check back soon!';

      container.innerHTML = `<p class="library-hint">${emptyMessage}</p>`;
      this.updateLibraryStats(0, 0);
      return;
    }
    
    expressions.forEach(expr => {
      const card = this.createExpressionCard(expr);
      container.appendChild(card);
    });

    this.updateLibraryStats(expressions.length, expressions.length);
  }
  
  createExpressionCard(expr) {
    const card = document.createElement('div');
    card.className = expr.featured ? 'card card--featured animate-fade-in' : 'card animate-fade-in';
    card.setAttribute('data-tags', expr.tags || '');
    card.setAttribute('data-expression-id', expr.id || '');
    card.setAttribute('role', 'group');
    card.setAttribute('aria-label', expr.name || 'Expression card');

    const badgebar = document.createElement('div');
    badgebar.className = 'card-badges';
    (expr.tags || '').split(',').map(tag => tag.trim()).filter(Boolean).forEach(tag => {
      const badge = document.createElement('span');
      badge.className = 'card-badge';
      badge.textContent = tag;
      badgebar.appendChild(badge);
    });

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = expr.name || 'Untitled';

    const description = document.createElement('p');
    description.className = 'card-desc';
    description.textContent = expr.description || '';

    const previewWrap = document.createElement('div');
    previewWrap.className = 'expression-preview-wrap';
    const previewImage = document.createElement('img');
    previewImage.className = 'expression-preview';
    previewImage.loading = 'lazy';
    previewImage.src = expr.preview_url || '';
    previewImage.alt = expr.name ? `${expr.name} preview` : 'Expression preview';
    previewWrap.appendChild(previewImage);

    const codeBlock = document.createElement('pre');
    codeBlock.className = 'card-code';
    const codeElement = document.createElement('code');
    codeElement.textContent = expr.code || '';
    codeBlock.appendChild(codeElement);

    const copyButton = document.createElement('button');
    copyButton.className = 'copy-btn';
    copyButton.setAttribute('aria-label', 'Copy expression code');
    copyButton.textContent = 'Copy';
    copyButton.addEventListener('click', (event) => this.copyCode(event));

    card.appendChild(badgebar);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(previewWrap);
    card.appendChild(codeBlock);
    card.appendChild(copyButton);

    return card;
  }
  
  renderPlaceholderExpressions() {
    const container = document.querySelector('.library-surface .container');
    if (!container) return;
    
    container.innerHTML = `
      <div class="card">
        <h3>No expressions loaded</h3>
        <p>Check your Supabase connection and try again.</p>
      </div>
    `;
  }
  
  renderErrorState() {
    const container = document.querySelector('.library-surface .container');
    if (!container) return;
    
    container.innerHTML = `
      <div class="card">
        <h3>Error loading expressions</h3>
        <p>Something went wrong. Please refresh the page.</p>
      </div>
    `;
  }
  
  setupCategoryFiltering() {
    const categoryButtons = document.querySelectorAll('.menu-category-option');
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.toggle('menu-category-option--active', btn === button));
        this.activeCategory = button.dataset.category || 'all';
        const searchInput = document.getElementById('search-input');
        const query = searchInput ? searchInput.value : '';
        this.filterExpressions(query, this.activeCategory);
      });
    });
  }

  setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterExpressions(e.target.value, this.activeCategory);
      });
    }
  }
  
  setupCopyButtons() {
    // Initialize copy buttons after DOM is ready
    const initCopyButtons = () => {
      const copyButtons = document.querySelectorAll('.copy-btn');
      copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          this.copyCode(e);
        });
      });
    };
    
    // Initialize immediately if DOM is ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      initCopyButtons();
    } else {
      document.addEventListener('DOMContentLoaded', initCopyButtons);
    }
  }
  
  copyCode(event) {
    const button = event?.currentTarget || event;
    if (!button) return;

    const card = button.closest('.card');
    const codeBlock = card ? card.querySelector('code') : null;
    
    if (!codeBlock) return;
    
    const textToCopy = codeBlock.innerText;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          this.showCopiedState(button);
        })
        .catch(err => {
          console.error('Failed to copy:', err);
          this.showCopyError(button);
        });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        this.showCopiedState(button);
      } catch (err) {
        this.showCopyError(button);
      }
      
      document.body.removeChild(textArea);
    }
  }
  
  showCopiedState(button) {
    const originalText = button.textContent;
    button.textContent = 'Copied';
    button.classList.add('copy-btn--copied');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copy-btn--copied');
    }, 2000);
  }
  
  showCopyError(button) {
    const originalText = button.textContent;
    button.textContent = 'Error';
    
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  }
  
  filterExpressions(query, category = this.activeCategory) {
    const term = (query || '').toLowerCase().trim();
    const cards = document.querySelectorAll('.card');
    let visibleCount = 0;
    
    cards.forEach(card => {
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      const content = card.innerText.toLowerCase();
      const matchesTerm = !term || tags.includes(term) || content.includes(term);
      const matchesCategory = category === 'all' || tags.includes(category.toLowerCase());
      const visible = matchesTerm && matchesCategory;
      card.style.display = visible ? '' : 'none';
      if (visible) visibleCount += 1;
    });

    this.updateLibraryStats(visibleCount, this.expressions?.length || 0);
  }

  getVisibleCount() {
    return document.querySelectorAll('.card').length;
  }

  updateLibraryStats(visibleCount, totalCount) {
    const countEl = document.getElementById('library-count');
    if (countEl) {
      countEl.textContent = `${visibleCount}`;
    }

    const snippetsEl = document.getElementById('library-snippets-count');
    if (snippetsEl) {
      snippetsEl.textContent = `${totalCount}`;
    }

    const categoriesEl = document.getElementById('library-categories-count');
    if (categoriesEl) {
      const categoryCount = this.getCategoryCount(this.expressions || []);
      categoriesEl.textContent = `${categoryCount}`;
    }

    const summaryEl = document.getElementById('library-summary');
    if (summaryEl) {
      summaryEl.textContent = visibleCount === totalCount
        ? `Showing all ${totalCount} expressions`
        : `Showing ${visibleCount} of ${totalCount} expressions`;
    }
  }

  getCategoryCount(expressions) {
    const categories = new Set();
    (expressions || []).forEach(expr => {
      const category = this.inferExpressionCategory(expr);
      if (category) {
        categories.add(category);
      }
    });
    return categories.size;
  }
  
  toggleMenu() {
    const menuWrapper = document.querySelector('.menu-wrapper');
    const menuDropdown = document.getElementById('menu-dropdown');
    const menuButton = document.getElementById('menu-button');
    
    if (menuWrapper && menuDropdown && menuButton) {
      menuWrapper.classList.toggle('menu-open');
      menuDropdown.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', 
        menuButton.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      );
    }
  }
  
  closeMenu() {
    const menuWrapper = document.querySelector('.menu-wrapper');
    const menuDropdown = document.getElementById('menu-dropdown');
    const menuButton = document.getElementById('menu-button');
    
    if (menuWrapper && menuDropdown && menuButton) {
      menuWrapper.classList.remove('menu-open');
      menuDropdown.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  }
}

// Initialize application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new AEExpressionStore();
    app.init();
    window.aeApp = app;
    window.copyCode = (event) => app.copyCode(event);
  });
} else {
  const app = new AEExpressionStore();
  app.init();
  window.aeApp = app;
  window.copyCode = (event) => app.copyCode(event);
}

// Export for testing
export { AEExpressionStore };