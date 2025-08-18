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
    iframe.style.minHeight = `${minHAttr}px`;
    shadow.appendChild(iframe);

    // Height management - COMPLETELY REWRITTEN for proper shrinking
    let currentHeight = minHAttr;
    let heightAnimationFrame = null;
    
    const applyHeight = (newHeight) => {
      const px = Math.max(minHAttr, Math.round(Number(newHeight) || 0));
      
      // Cancel any pending height update
      if (heightAnimationFrame) {
        cancelAnimationFrame(heightAnimationFrame);
      }
      
      // Apply height change immediately - no restrictions on reduction
      heightAnimationFrame = requestAnimationFrame(() => {
        iframe.style.height = `${px}px`;
        currentHeight = px;
        heightAnimationFrame = null;
        
        // Force layout recalculation
        iframe.offsetHeight;
      });
    };

    // Receive height from the form and resize the element
    window.addEventListener('message', (e) => {
      // Verify the message is from our iframe
      if (e.source !== iframe.contentWindow) return;
      
      const data = e?.data || {};

      // Accept both new and legacy height message formats
      let h = null;
      if (data && typeof data === 'object') {
        if (data.type === 'ODD_FORM_HEIGHT' && typeof data.height === 'number') {
          h = data.height;
        } else if (typeof data.oddIntakeHeight === 'number') {
          h = data.oddIntakeHeight;
        } else if (data.type === 'ODD_FORM_SUCCESS' && typeof data.height === 'number') {
          // Success screen height should be applied immediately
          h = data.height;
        }
      }

      // Apply ANY valid height change - no minimum difference required
      if (h != null && h > 0) {
        applyHeight(h);
      }
    });

    // Initial height setup
    iframe.addEventListener('load', () => {
      // Start with minimum height and let the form tell us its actual size
      applyHeight(minHAttr);
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
        // If current height is below new minimum, adjust it
        const currentPx = parseInt(iframe.style.height) || minH;
        if (currentPx < minH) {
          iframe.style.height = `${minH}px`;
        }
      }
    }
  }
}

customElements.define('odd-intake', OddIntakeElement);
