// odd-intake-element.js
class OddIntakeElement extends HTMLElement {
  static get observedAttributes() {
    return ['src', 'min-height', 'scroll-into-view-on-success'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._minHeight = 600;
    this._currentHeight = 0;
    this._onMessage = this._onMessage.bind(this);

    const style = document.createElement('style');
    style.textContent = `
      :host { display:block; width:100%; }
      .wrap { position:relative; width:100%; display:block; }
      iframe { border:0; width:100%; display:block; height:${this._minHeight}px; }
    `;

    const wrap = document.createElement('div');
    wrap.className = 'wrap';

    this._iframe = document.createElement('iframe');
    this._iframe.setAttribute('scrolling', 'no');
    this._iframe.setAttribute('title', 'One Day Dance Service Request');
    this._iframe.style.height = `${this._minHeight}px`;

    wrap.appendChild(this._iframe);
    this.shadowRoot.append(style, wrap);
  }

  connectedCallback() {
    // Apply attributes on first connect
    if (this.hasAttribute('min-height')) {
      const v = parseInt(this.getAttribute('min-height'), 10);
      if (!Number.isNaN(v)) { this._minHeight = v; this._setHeight(v); }
    }
    if (this.hasAttribute('src')) this._load();

    window.addEventListener('message', this._onMessage);
  }

  disconnectedCallback() {
    window.removeEventListener('message', this._onMessage);
  }

  attributeChangedCallback(name, _oldVal, _newVal) {
    if (name === 'src') this._load();
    if (name === 'min-height') {
      const v = parseInt(this.getAttribute('min-height'), 10);
      if (!Number.isNaN(v)) {
        this._minHeight = v;
        this._setHeight(Math.max(v, this._currentHeight));
      }
    }
  }

  _load() {
    const src = this.getAttribute('src') || '';
    // Optional: bust cache on demand by appending ?v=timestamp outside of this component
    this._iframe.src = src;
    this._setHeight(this._minHeight); // start tall enough to avoid scrollbars
  }

  _setHeight(h) {
    const px = Math.max(this._minHeight, Math.ceil(Number(h) || 0));
    this._currentHeight = px;
    this._iframe.style.height = px + 'px';
    // If you had a host page API: this.updateHeight?.(px);
  }

  _onMessage(e) {
    const d = e?.data;
    if (!d || typeof d !== 'object') return;

    // Accept both new and legacy height messages
    let h = null;
    if (d.type === 'ODD_FORM_HEIGHT' && typeof d.height === 'number') {
      h = d.height;
    } else if (typeof d.oddIntakeHeight === 'number') {
      h = d.oddIntakeHeight;
    }
    if (h != null) this._setHeight(h);

    // Success signal: snap height and bubble an event; optionally scroll into view
    if (d.type === 'ODD_FORM_SUCCESS') {
      if (typeof d.height === 'number') this._setHeight(d.height);
      this.dispatchEvent(new CustomEvent('odd-intake:success', {
        bubbles: true,
        detail: { ts: d.ts || Date.now() }
      }));
      if (this.hasAttribute('scroll-into-view-on-success')) {
        this.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}

customElements.define('odd-intake', OddIntakeElement);
