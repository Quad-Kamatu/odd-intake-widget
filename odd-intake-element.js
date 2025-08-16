
// odd-intake-element.js
class OddIntakeElement extends HTMLElement {
  constructor() {
    // ensure host participates in layout
    this.style.display = 'block';
    this.style.width = '100%';
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Config
    const minHAttr = Number(this.getAttribute('min-height')) || 320;

    // Create iframe to load your hosted form
    const iframe = document.createElement('iframe');
    iframe.src = this.getAttribute('src') || '';
    iframe.style.width = '100%';
    iframe.style.height = (this.getAttribute('min-height') || '320') + 'px';
    iframe.style.border = '0';
    iframe.style.display = 'block';
    iframe.setAttribute('scrolling', 'no');
    iframe.style.minHeight = `${minHAttr}px`; // sensible minimum so it never collapses
    shadow.appendChild(iframe);

    // Smoothly apply height changes (guards against jitter)
    let lastApplied = 0;
    let __oddSuccessMode = false;
    let applyTimer = null;
    
    const applyHeight = (h) => {
      const n = Math.round(Number(h) || 0);
      if (!n) return;
      const px = __oddSuccessMode ? n : Math.max(minHAttr, n);
      if (Math.abs(px - lastApplied) < 1) return;
      lastApplied = px;
      iframe.style.height = `${px}px`;
      clearTimeout(applyTimer);
      applyTimer = setTimeout(() => {
        const again = __oddSuccessMode ? lastApplied : Math.max(minHAttr, lastApplied);
        iframe.style.height = `${again}px`;
      }, 120);
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
          // success screen often has a different height
          h = data.height;
        }
      }

      if (data && data.type === 'ODD_FORM_SUCCESS' && typeof data.height === 'number') { __oddSuccessMode = true; }
      if (h != null) applyHeight(h);
    });
  }

  static get observedAttributes() { return ['src']; }
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'src' && this.shadowRoot) {
      const iframe = this.shadowRoot.querySelector('iframe');
      if (iframe && newVal && newVal !== oldVal) iframe.src = newVal;
    }
  }
}
customElements.define('odd-intake', OddIntakeElement);
