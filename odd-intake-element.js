// odd-intake-element.js
class OddIntakeElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Config
    const minHAttr = Number(this.getAttribute('min-height')) || 320;

    // Create iframe to load your hosted form
    const iframe = document.createElement('iframe');
    iframe.src = this.getAttribute('src') || '';
    iframe.style.width = '100%';
    iframe.style.border = '0';
    iframe.style.display = 'block';
    iframe.setAttribute('scrolling', 'no');
    iframe.style.minHeight = `${minHAttr}px`; // sensible minimum so it never collapses
    shadow.appendChild(iframe);

    // Height management - FIXED to allow reductions
    let lastApplied = minHAttr;
    let applyTimer = null;
    
    const applyHeight = (newHeight) => {
      const px = Math.max(minHAttr, Math.round(Number(newHeight) || 0));
      
      // REMOVED the 3px difference check - this was preventing height reductions!
      // Apply ALL height changes to ensure both increases and decreases work
      
      lastApplied = px;
      
      // Clear any pending timer
      clearTimeout(applyTimer);
      
      // Apply the height change immediately
      requestAnimationFrame(() => {
        iframe.style.height = `${px}px`;
        
        // Small delayed follow-up to ensure the change sticks
        applyTimer = setTimeout(() => {
          iframe.style.height = `${px}px`;
        }, 50);
      });
    };

    // Receive height from the form and resize the element
    window.addEventListener('message', (e) => {
      const data = e?.data || {};

      // Accept both new and legacy height message formats
      let h = null;
      if (data && typeof data === 'object') {
        if (data.type === 'ODD_FORM_HEIGHT' && typeof data.height === 'number') {
          h = data.height;
        } else if (typeof data.oddIntakeHeight === 'number') {
          h = data.oddIntakeHeight;
        } else if (data.type === 'ODD_FORM_SUCCESS' && typeof data.height === 'number') {
          // Success screen often has a different height
          h = data.height;
        }
      }

      if (h != null && h > 0) {
        applyHeight(h);
      }
    });

    // Initial height setup
    iframe.addEventListener('load', () => {
      // Give the form a moment to render, then request initial height
      setTimeout(() => {
        applyHeight(minHAttr + 50); // Small buffer for initial render
      }, 200);
    });
  }

  static get observedAttributes() { return ['src', 'min-height']; }
  
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'src' && this.shadowRoot) {
      const iframe = this.shadowRoot.querySelector('iframe');
      if (iframe && newVal && newVal !== oldVal) {
        iframe.src = newVal;
      }
    } else if (name === 'min-height' && this.shadowRoot) {
      const iframe = this.shadowRoot.querySelector('iframe');
      const minH = Math.max(320, Number(newVal) || 320);
      if (iframe) {
        iframe.style.minHeight = `${minH}px`;
      }
    }
  }
}

customElements.define('odd-intake', OddIntakeElement);
