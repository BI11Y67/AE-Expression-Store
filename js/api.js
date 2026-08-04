// AE Expression Store - API Client
// Supabase data layer abstraction for better maintainability and error handling

const FALLBACK_EXPRESSIONS = [
  {
    id: 'maintain-shapes-stroke-width',
    name: 'Maintain Shape\'s Stroke Width',
    description: 'Keeps the stroke width of a shape layer consistent even when you scale the layer itself.',
    tags: 'animation, utility',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/Maintain%20Shape\'s%20Stroke%20Width.gif',
    code: 'value / length(toComp([0,0]), toComp([0.7071,0.7071])) || 0.001;',
    featured: true
  },
  {
    id: 'maintain-shapes-scale-parented',
    name: 'Maintain Shape\'s Scale (Parented)',
    description: 'Helps shape layers retain a stable scale when moved through parented transforms.',
    tags: 'animation, utility',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/Maintain%20Shape\'s%20Scale%20(Parented).gif',
    code: 'value / length(toComp([0,0]), toComp([1,0])) || 0.001;'
  },
  {
    id: 'in-bounce-animation-left-right',
    name: 'In Bounce Animation (Left - Right)',
    description: 'Adds a bounce-in effect that feels natural for movement across a horizontal axis.',
    tags: 'animation, bounce',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/In%20Bounce%20Animation%20(Left%20-%20Right).gif',
    code: 'amp = 20;\nfreq = 4;\nvalue + [wiggle(freq, amp)[0], 0, 0];'
  },
  {
    id: 'in-bounce-animation-top-bottom',
    name: 'In Bounce Animation (Top - Bottom)',
    description: 'Creates a bounce effect that works well for vertical motion and dropdown transitions.',
    tags: 'animation, bounce',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/In%20Bounce%20Animation%20(Top%20-%20Bottom).gif',
    code: 'amp = 20;\nfreq = 4;\nvalue + [0, wiggle(freq, amp)[1], 0];'
  },
  {
    id: 'reverse-keyframe-animation',
    name: 'Reverse Keyframe Animation',
    description: 'Reverses a keyframed animation in a clean, reusable way.',
    tags: 'animation, reverse',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/Reverse%20Keyframe%20or%20Animation.gif',
    code: 'linear(time, inPoint, outPoint, 1, 0);'
  },
  {
    id: 'floating-ball-animation',
    name: 'Floating Ball Animation',
    description: 'Use this on a shape when you need a floating ball animation. Link the property to a null so its position starts at 0 before applying the expression.',
    tags: 'animation, math',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif',
    code: 'x = value[0];\na = 240;\nf = 0.5;\nt = time - inPoint;\ny = Math.sin(t * 2 * Math.PI * f) * a;\n[x, y];'
  },
  {
    id: 'math-cos-smooth-rotation',
    name: 'Math.cos() /Smooth Rotation',
    description: 'Apply this to a shape layer’s rotation property for a smoother in-and-out rotation animation.',
    tags: 'animation, rotation',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif',
    code: 'a = 45;\nf = 0.5;\nt = time - inPoint;\ny = Math.cos(t * 2 * Math.PI * f) * a;\ny;'
  },
  {
    id: 'auto-center-text',
    name: 'Auto-Center Text',
    description: 'Automatically realigns the anchor and text as you type to maintain symmetry.',
    tags: 'text, utility',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif',
    code: '// Auto-center the anchor point\nvar rect = sourceRectAtTime(time, false);\n[rect.left + rect.width / 2, rect.top + rect.height / 2, 0];'
  },
  {
    id: 'dynamic-text-box',
    name: 'Dynamic Text Box',
    description: 'Automatically resizes the background shape to fit your text length and follow the text layer position.',
    tags: 'text, utility',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/Dynamic%20Text%20Box.gif',
    code: '// Get the text layer dimensions\nvar textLayer = thisComp.layer("text");\nvar textRect = textLayer.sourceRectAtTime(time, false);\nvar marginX = 20;\nvar marginY = 10;\n[textRect.width + marginX * 2, textRect.height + marginY * 2];'
  },
  {
    id: 'font-switcher',
    name: 'Font Switcher',
    description: 'Changes the layer’s font style based on a slider value, keeping the text setup flexible without extra layers.',
    tags: 'text, utility',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif',
    code: 'var fontArray = ["OPTIBodoni-Antiqua", "Poppins-Italic", "Platypi-Light", "Montserrat-SemiBold"];\nv = Math.round(effect("Slider Control")("Slider"));\nstyle.setFont(fontArray[v]);'
  },
  {
    id: 'remote-text-control',
    name: 'Remote Text Control',
    description: 'Links this text to a master controller so edits in another comp update instantly here.',
    tags: 'text, workflow',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif',
    code: '// Change the comp and layer names as needed\ncomp("Comp2").layer("text").text.sourceText;'
  },
  {
    id: 'path-flow-distributor-shape-layer',
    name: 'Path Flow Distributor(Shape Layer)',
    description: 'Distributes layers along a path while keeping them aligned to the flow and optionally offset by controls.',
    tags: 'animation, utility',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif',
    code: 'let pathLayer = thisComp.layer("MAIN PATH");\nlet thePath = pathLayer.content("Shape 1").content("Path 1").path;\nlet sliderOffset = thisComp.layer("MAIN PATH").effect("OFFSET CONTROL")("Slider");\nlet offsetRepeat = sliderOffset % 100;\nlet offsetToAdd = linear(offsetRepeat, 0, 100, 1, 0);\nlet pathOffset = linear(index, 0, thisComp.numLayers - 1, 0, 1);\nlet myPos = thePath.pointOnPath((pathOffset + offsetToAdd) % 1, time);\nseedRandom(index, true);\nlet posSlider = thisComp.layer("MAIN PATH").effect("RANDOM POSITION")("Slider");\nlet randomPos = random([-posSlider, -posSlider], [posSlider, posSlider]);\ntoComp(myPos) - thisComp.layer("MAIN PATH").transform.position + randomPos;'
  },
  {
    id: '3d-lookat-target-constraint',
    name: '3D LookAt Target Constraint',
    description: 'Uses a target layer to orient a 3D layer smoothly towards a point.',
    tags: '3d, animation',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/3D%20LookAt%20Target%20Constraint.gif',
    code: 'toComp([0,0,0]);'
  },
  {
    id: 'relative-position-tracker',
    name: 'Relative Position Tracker',
    description: 'Tracks position relative to a second layer to create linked motion.',
    tags: 'animation, utility',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/Relative%20Position%20Tracker.gif',
    code: 'thisComp.layer("TARGET").transform.position - position;'
  },
  {
    id: 'keyframe-friendly-scripting',
    name: 'Keyframe-Friendly Scripting',
    description: 'A scripting pattern that stays friendly to keyframes and iterative edits.',
    tags: 'animation, utility',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/Keyframe-Friendly%20Scripting.gif',
    code: 'linear(time, inPoint, outPoint, 0, 100);'
  },
  {
    id: 'value-inversion-mirroring',
    name: 'Value Inversion (Mirroring)',
    description: 'Mirrors a property value around a center line for reverse motion setups.',
    tags: 'animation, utility',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/Value%20Inversion%20(Mirroring).gif',
    code: 'value * -1;'
  },
  {
    id: '2d-auto-orient-look-at',
    name: '2D Auto-Orient Look-At',
    description: 'Turns a 2D layer so it faces another layer naturally.',
    tags: 'animation, 2d',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/2D%20Auto-Orient%20%20Look-At.gif',
    code: 'lookAt(thisComp.layer("TARGET").position);'
  },
  {
    id: 'luma-scale-driver',
    name: 'Luma Scale Driver',
    description: 'Drives a scale value from luminance so the visual result feels procedural.',
    tags: 'animation, utility',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/Luma%20Scale%20Driver.gif',
    code: 'value * (1 + sampleImage(position, [0,0], true).luma);'
  },
  {
    id: 'auto-distribute',
    name: 'Auto-Distribute',
    description: 'Automatically calculates a layer’s position based on the layer directly above it in the stack and a fixed offset.',
    tags: 'animation, utility',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif',
    code: 'var xOffset = -571.6;\nif (index < thisComp.numLayers && index > 1) {\n  var prevPos = thisComp.layer(index - 1).transform.position;\n  var newX = prevPos[0] + xOffset + value[0];\n  var newY = prevPos[1];\n  [newX, newY];\n} else {\n  value;\n}'
  },
  {
    id: 'dynamic-line-connector-between-two-shapes',
    name: 'Dynamic Line Connector Between Two Shapes',
    description: 'Creates a responsive line that automatically connects two layers and stays attached as they move.',
    tags: 'animation, utility',
    preview_url: './NEW%20GIFS_aees.socrazymedia.com/Coming%20Soon.gif',
    code: 'var p1 = thisComp.layer("Shape 1").toComp([0, 0]);\nvar p2 = thisComp.layer("Shape 2").toComp([0, 0]);\ncreatePath([p1, p2], [], [], false);'
  }
];

class APIClient {
  constructor() {
    this.supabaseUrl = 'https://cmqdmcxpdactcbvltqwz.supabase.co';
    this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtcWRtY3hwZGFjdGNidmx0cXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5OTM5MTcsImV4cCI6MjA4NjU2OTkxN30.jR5SmkG_AKDHFbBjvdUFrHHotOu4J3jcJdZsBJnJm2A';
    this.client = null;
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }
  
  init() {
    if (typeof supabase !== 'undefined') {
      this.client = supabase.createClient(this.supabaseUrl, this.supabaseKey);
      console.log('Supabase client initialized successfully');
    } else {
      console.warn('Supabase not available, running in offline mode');
    }
  }
  
  getFallbackExpressions() {
    this.setCache('expressions', FALLBACK_EXPRESSIONS);
    return FALLBACK_EXPRESSIONS;
  }

  
  async getExpressions() {
    const cacheKey = 'expressions';
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached;
    }
    
    if (!this.client) {
      console.warn('No Supabase client available; live expressions are unavailable.');
      return [];
    }
    
    try {
      const { data, error } = await this.client
        .from('expressions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      const expressions = data || [];
      if (expressions.length === 0) {
        console.warn('Supabase returned no expressions.');
        return [];
      }
      
      this.setCache(cacheKey, expressions);
      
      console.log(`Loaded ${expressions.length} expressions`);
      return expressions;
    } catch (error) {
      console.error('Failed to fetch expressions:', error);
      return [];
    }
  }
  
  async getComments() {
    const cacheKey = 'comments';
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached;
    }
    
    if (!this.client) {
      console.warn('No Supabase client available; using fallback expressions.');
      return this.getFallbackExpressions();
    }
    
    try {
      const { data, error } = await this.client
        .from('comments')
        .select('id, parent_id, name, message, created_at, expression_id')
        .order('created_at', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      const comments = (data || []).map(row => this.mapCommentRow(row, true));
      this.setCache(cacheKey, comments);
      
      console.log(`Loaded ${comments.length} comments`);
      return comments;
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      throw new Error('Failed to load comments. Please try again later.');
    }
  }
  
  async addComment(comment) {
    if (!this.client) {
      console.warn('No Supabase client available; using fallback expressions.');
      return this.getFallbackExpressions();
    }
    
    try {
      const row = {
        name: comment.name || 'Guest',
        message: comment.message,
        created_at: new Date().toISOString(),
        parent_id: comment.parentId || null,
        expression_id: comment.expressionId || null
      };
      
      const { data, error } = await this.client
        .from('comments')
        .insert([row])
        .select();
      
      if (error) {
        // Try alternative insert format
        const { data: altData, error: altError } = await this.client
          .from('comments')
          .insert([{
            name: comment.name || 'Guest',
            message: comment.message,
            created_at: new Date().toISOString(),
            parent_id: comment.parentId || null
          }])
          .select();
        
        if (altError) {
          throw altError;
        }
        
        this.invalidateCache('comments');
        return this.mapCommentRow(altData[0], false);
      }
      
      this.invalidateCache('comments');
      return this.mapCommentRow(data[0], true);
    } catch (error) {
      console.error('Failed to add comment:', error);
      throw new Error('Failed to post comment. Please try again later.');
    }
  }
  
  async getLikes(expressionId) {
    const cacheKey = `likes_${expressionId}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached;
    }
    
    if (!this.client) {
      return [];
    }
    
    try {
      const { data, error } = await this.client
        .from('expression_likes')
        .select('visitor_id')
        .eq('expression_id', expressionId);
      
      if (error) {
        throw error;
      }
      
      const likes = data || [];
      this.setCache(cacheKey, likes);
      
      return likes;
    } catch (error) {
      console.error('Failed to fetch likes:', error);
      return [];
    }
  }
  
  async addLike(expressionId, visitorId) {
    if (!this.client) {
      return false;
    }
    
    try {
      const { error } = await this.client
        .from('expression_likes')
        .insert([{
          expression_id: expressionId,
          visitor_id: visitorId
        }]);
      
      if (error) {
        // Check if like already exists
        if (error.code === '23505') { // Unique constraint violation
          return false;
        }
        throw error;
      }
      
      this.invalidateCache(`likes_${expressionId}`);
      return true;
    } catch (error) {
      console.error('Failed to add like:', error);
      return false;
    }
  }
  
  async getViews(expressionId) {
    const cacheKey = `views_${expressionId}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached;
    }
    
    if (!this.client) {
      return 0;
    }
    
    try {
      const { data, error } = await this.client
        .from('expression_views')
        .select('visitor_id')
        .eq('expression_id', expressionId);
      
      if (error) {
        throw error;
      }
      
      const views = data || [];
      this.setCache(cacheKey, views.length);
      
      return views.length;
    } catch (error) {
      console.error('Failed to fetch views:', error);
      return 0;
    }
  }
  
  async recordView(expressionId, visitorId) {
    if (!this.client) {
      return;
    }
    
    try {
      const { error } = await this.client
        .from('expression_views')
        .insert([{
          expression_id: expressionId,
          visitor_id: visitorId
        }]);
      
      if (error) {
        console.error('Failed to record view:', error);
      } else {
        this.invalidateCache(`views_${expressionId}`);
      }
    } catch (error) {
      console.error('Failed to record view:', error);
    }
  }
  
  mapCommentRow(row, hasExpressionId) {
    const rawExpr = hasExpressionId ? row.expression_id : null;
    const expressionId = rawExpr != null && String(rawExpr).trim() !== '' ? String(rawExpr) : null;
    
    return {
      id: row.id,
      parentId: row.parent_id ?? null,
      expressionId: expressionId,
      name: row.name || 'Guest',
      text: row.message || '',
      createdAt: this.formatCommentTime(row.created_at),
      rawCreatedAt: row.created_at
    };
  }
  
  formatCommentTime(iso) {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch (e) {
      return iso;
    }
  }
  
  getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }
  
  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
  
  invalidateCache(key) {
    this.cache.delete(key);
  }
  
  clearCache() {
    this.cache.clear();
  }
}

// Initialize API client
const api = new APIClient();
api.init();

// Export for testing and use in app
export { APIClient, api };