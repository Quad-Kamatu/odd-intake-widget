// odd-intake-element.js
class OddIntakeElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Create iframe to load your hosted form
    const iframe = document.createElement('iframe');
    iframe.src = this.getAttribute('src') || '';
    iframe.style.width = '100%';
    iframe.style.border = '0';
    iframe.setAttribute('scrolling', 'no');
    shadow.appendChild(iframe);

    // Receive height from the form and resize the element
    window.addEventListener('message', (e) => {
      const data = e?.data || {};
      if (data.type === 'ODD_FORM_HEIGHT' && typeof data.height === 'number') {
        const h = Math.max(0, data.height | 0);
        iframe.style.height = h + 'px';
        if (typeof this.updateHeight === 'function') this.updateHeight(h);
      }
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
