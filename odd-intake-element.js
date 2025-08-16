
// odd-intake-element.js
class OddIntakeElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Config
    const minHAttr = Number(this.getAttribute('min-height')) || 320;

    
    let __oddSuccessMode = false;
// Create iframe to load your hosted form
    const iframe = document.createElement('iframe');
    iframe.src = this.getAttribute('src') || '';
    iframe.style.width = '100%';
    iframe.style.border = '0';
    iframe.style.display = 'block';
    iframe.setAttribute('scrolling', 'no');
    iframe.style.minHeight = `${minHAttr}px`; // sensible minimum so it never collapses
    shadow.appendChild(iframe);

// ==== ODD HEIGHT PROTOCOL v3 (host/parent element) ====
let __oddChildReady = false;
let __oddReqTimer = 0;
let __oddLastHeight = 0;

function _hostEmit(msg){
  try{ iframe && iframe.contentWindow && iframe.contentWindow.postMessage(msg, '*'); }catch(_){/*noop*/}
}

function _requestHeight(reason){
  _hostEmit({ type:'ODD_REQUEST_HEIGHT', ts: Date.now(), reason });
}

function _hostReady(){
  _hostEmit({ type:'ODD_HOST_READY', ts: Date.now() });
}

function _successMode(){
  __oddSuccessMode = true;
  _hostEmit({ type:'ODD_HOST_SUCCESS_MODE', ts: Date.now() });
}

// Upon iframe load, start handshake & polling until child confirms ready.
iframe.addEventListener('load', ()=>{
  __oddChildReady = false;
  let attempts = 0;
  clearInterval(__oddReqTimer);
  _hostReady();
  __oddReqTimer = setInterval(()=>{
    attempts++;
    _hostReady();
    _requestHeight('poll');
    if (attempts > 40 || __oddChildReady){ clearInterval(__oddReqTimer); }
  }, 250);
});
// ==== END ODD HEIGHT PROTOCOL v3 ====


    // Smoothly apply height changes (guards against jitter)
    let lastApplied = 0;
    let applyTimer = null;
    
const applyHeight = (h) => {
  const target = Math.round(Number(h) || 0);
  if (!target || Math.abs(target - lastApplied) < 1) return;
  const px = __oddSuccessMode ? target : Math.max(minHAttr, target);
  lastApplied = px;
  iframe.style.height = `${px}px`;
  clearTimeout(applyTimer);
  applyTimer = setTimeout(() => {
    const againTarget = Math.round(Number(lastApplied) || 0);
    const again = __oddSuccessMode ? againTarget : Math.max(minHAttr, againTarget);
    iframe.style.height = `${again}px`;
  }, 120);
};

    // Receive height from the form and resize the element
    window.addEventListener('message', (e) => {
      const now = Date.now();
      const data = e?.data || {};

      // Accept both new and legacy height message formats
      let h = null;
      if (data && typeof data === 'object') {
        if (data.type === 'ODD_FORM_HEIGHT' && typeof data.height === 'number') {
          h = data.height;
        } else if (typeof data.oddIntakeHeight === 'number') {
          h = data.oddIntakeHeight;
        } else if (data.type === 'ODD_FORM_SUCCESS' && typeof data.height === 'number') {
          __oddSuccessMode = true; _successMode();
          __oddSuccessMode = true;
          // success screen often has a different height
          h = data.height;
        }
      }

      if (data && data.type === 'ODD_CHILD_READY'){ __oddChildReady = true; _requestHeight('ack_ready'); }
      if (data && data.type === 'ODD_HEIGHT_V3' && typeof data.height === 'number'){ h = data.height; }
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
