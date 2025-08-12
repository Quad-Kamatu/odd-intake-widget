// odd-intake-element.js
class OddIntakeElement extends HTMLElement {
  static get observedAttributes() { return ['src', 'min-height', 'scroll-into-view-on-success']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._minHeight = 280;        // allow shrinking after submit
    this._currentHeight = 0;
    this._successNudge = null;
    this._onMessage = this._onMessage.bind(this);
    this._hideLoader = this._hideLoader.bind(this);

    const style = document.createElement('style');
    style.textContent = `
      :host { display:block; width:100%; }
      .wrap { position:relative; width:100%; display:block; }
      iframe { border:0; width:100%; display:block; height:${this._minHeight}px; }

      /* Loader overlay */
      .loader {
        position:absolute; inset:0;
        display:flex; align-items:center; justify-content:center;
        background:rgba(255,255,255,0.85);
        backdrop-filter:saturate(1.2) blur(0.5px);
        color:#111;
        font: 600 14px/1 system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif;
        transition: opacity .18s ease, visibility .18s ease;
        z-index: 5;
      }
      .loader.hide { opacity:0; visibility:hidden; pointer-events:none; }

      .row { display:flex; align-items:center; gap:.5rem; padding: .75rem 1rem; border:1px solid #eee; border-radius:12px; background:#fff; box-shadow:0 6px 18px rgba(0,0,0,.06); }
      .spinner {
        width:18px; height:18px; display:inline-block; margin-right:.25rem;
        animation: spin 1s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
      .spinner circle { opacity:.25; }
    `;

    const wrap = document.createElement('div'); 
    wrap.className = 'wrap';

    // Iframe
    this._iframe = document.createElement('iframe');
    this._iframe.setAttribute('title', 'One Day Dance Service Request');
    this._iframe.setAttribute('scrolling', 'no');
    this._iframe.style.height = `${this._minHeight}px`;

    // Loader overlay (shown immediately)
    this._loader = document.createElement('div');
    this._loader.className = 'loader';
    this._loader.setAttribute('role', 'status');
    this._loader.setAttribute('aria-live', 'polite');
    this._loader.innerHTML = `
      <div class="row">
        <svg class="spinner" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="4"></circle>
          <path d="M21 12a9 9 0 0 1-9 9" stroke="currentColor" stroke-width="4"></path>
        </svg>
        <span>Loading form…</span>
      </div>
    `;

    wrap.appendChild(this._iframe);
    wrap.appendChild(this._loader);
    this.shadowRoot.append(style, wrap);
  }

  connectedCallback() {
    if (this.hasAttribute('min-height')) {
      const v = parseInt(this.getAttribute('min-height'), 10);
      if (!Number.isNaN(v)) { this._minHeight = v; this._setHeight(v); }
    }
    if (this.hasAttribute('src')) this._load();

    window.addEventListener('message', this._onMessage);
    this._iframe.addEventListener('load', this._hideLoader);
    // Safety timeout: if nothing loads in time, hide loader anyway (e.g., CDN blocked)
    this._loaderKill = setTimeout(this._hideLoader, 12000);
  }

  disconnectedCallback() {
    window.removeEventListener('message', this._onMessage);
    this._iframe.removeEventListener('load', this._hideLoader);
    if (this._successNudge) clearInterval(this._successNudge);
    if (this._loaderKill) clearTimeout(this._loaderKill);
  }

  attributeChangedCallback(name) {
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
    // Show loader for each load attempt
    this._showLoader();
    this._iframe.src = src;
    this._setHeight(this._minHeight);
  }

  _setHeight(h) {
    const px = Math.max(this._minHeight, Math.ceil(Number(h) || 0));
    this._currentHeight = px;
    this._iframe.style.height = px + 'px';
  }

  _showLoader() {
    if (!this._loader) return;
    this._loader.classList.remove('hide');
    // refresh safeguard timer
    if (this._loaderKill) clearTimeout(this._loaderKill);
    this._loaderKill = setTimeout(this._hideLoader, 12000);
  }

  _hideLoader() {
    if (!this._loader) return;
    this._loader.classList.add('hide');
    if (this._loaderKill) { clearTimeout(this._loaderKill); this._loaderKill = null; }
  }

  _onMessage(e) {
    const d = e && e.data;
    if (!d || typeof d !== 'object') return;

    // First sign of life from inside → hide loader
    if (!this._loader?.classList.contains('hide')) this._hideLoader();

    // Accept both new and legacy height messages
    let h = null;
    if (d.type === 'ODD_FORM_HEIGHT' && typeof d.height === 'number') h = d.height;
    else if (typeof d.oddIntakeHeight === 'number') h = d.oddIntakeHeight;
    if (h != null) this._setHeight(h);

    // On submit success: snap height and nudge briefly to ensure host collapses
    if (d.type === 'ODD_FORM_SUCCESS') {
      if (typeof d.height === 'number') this._setHeight(d.height);
      if (this._successNudge) clearInterval(this._successNudge);
      const t0 = Date.now();
      this._successNudge = setInterval(() => {
        this._setHeight(this._currentHeight);
        if (Date.now() - t0 > 2000) {
          clearInterval(this._successNudge);
          this._successNudge = null;
        }
      }, 150);

      this.dispatchEvent(new CustomEvent('odd-intake:success', {
        bubbles: true,
        detail: { ts: d.ts || Date.now(), height: d.height }
      }));

      if (this.hasAttribute('scroll-into-view-on-success')) {
        this.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}

if (!customElements.get('odd-intake')) customElements.define('odd-intake', OddIntakeElement);
// Optional alias if you ever used the other tag
if (!customElements.get('odd-intake-widget')) customElements.define('odd-intake-widget', OddIntakeElement);
