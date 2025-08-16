(function(){
  // ODD ELEMENT v7
  window.ODD_ELEMENT_VERSION = 'v7';
  class OddIntakeElement extends HTMLElement{
    constructor(){
      super();
      const shadow = this.attachShadow({ mode:'open' });
      const iframe = document.createElement('iframe');
      iframe.setAttribute('title', 'ODD Widget');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('scrolling', 'no');
      iframe.style.width = '100%';
      iframe.style.height = (this.getAttribute('min-height') || '320') + 'px';
      iframe.style.border = '0';
      iframe.style.overflow = 'hidden';

      const src = this.getAttribute('src');
      const parentOrigin = window.location.origin;
      const sep = (src && src.includes('?')) ? '&' : '?';
      const dbg = this.getAttribute('data-odd-debug') === '1' ? '&oddDebug=1' : '';
      iframe.src = src ? (src + `${sep}parentOrigin=${encodeURIComponent(parentOrigin)}${dbg}`) : '';

      shadow.appendChild(iframe);

      const minHAttr = Number(this.getAttribute('min-height')) || 320;
      let lastApplied = minHAttr;
      let applyTimer = null;
      let __oddSuccessMode = false;
      let __oddChildReady = false;
      let __oddGotHeight = false;
      let __oddFailSafeTimer = 0;
      const debug = this.getAttribute('data-odd-debug') === '1';
      const dlog = (...a)=>{ if (debug) try{ console.log('[odd-element]', ...a);}catch(_){}};

      const applyHeight = (h) => {
        const target = Math.round(Number(h)||0);
        if (!target) return;
        const px = __oddSuccessMode ? target : Math.max(minHAttr, target);
        if (Math.abs(px - lastApplied) < 1) return;
        lastApplied = px;
        iframe.style.height = `${px}px`;
        dlog('applyHeight', px);
        clearTimeout(applyTimer);
        applyTimer = setTimeout(()=>{
          const again = __oddSuccessMode ? lastApplied : Math.max(minHAttr, lastApplied);
          iframe.style.height = `${again}px`;
        }, 120);
      };

      function _hostEmit(msg){
        try{ iframe.contentWindow && iframe.contentWindow.postMessage(msg, '*'); }catch(_){}
      }
      function _requestHeight(reason){ _hostEmit({ type:'ODD_REQUEST_HEIGHT', ts: Date.now(), reason }); }
      function _hostReady(){ _hostEmit({ type:'ODD_HOST_READY', ts: Date.now() }); }
      function _successMode(){ __oddSuccessMode = true; _hostEmit({ type:'ODD_HOST_SUCCESS_MODE', ts: Date.now() }); }

      // On load, bootstrap handshake + polling + failsafe auto-grow
      iframe.addEventListener('load', ()=>{
        __oddChildReady = false; __oddGotHeight = false;
        _hostReady();
        let attempts = 0;
        const poll = setInterval(()=>{
          attempts++;
          _hostReady(); _requestHeight('boot');
          if (attempts > 40 || __oddChildReady) clearInterval(poll);
        }, 200);

        // Fail-safe: auto-grow until we get a height
        clearInterval(__oddFailSafeTimer);
        let step = Math.max(minHAttr, 320);
        __oddFailSafeTimer = setInterval(()=>{
          if (__oddGotHeight){ clearInterval(__oddFailSafeTimer); return; }
          step = Math.min(step + 200, 2400);
          iframe.style.height = step + 'px';
          lastApplied = step;
          dlog('failsafe-grow', step);
        }, 300);
      });

      window.addEventListener('message', (e)=>{
        const data = e && e.data || {};
        if (!data) return;

        // Parent-side fetch proxy (same-origin only)
        if (data.type === 'ODD_FETCH' && data.id){
          try{
            const u = data.input || '';
            const isRelative = typeof u === 'string' && u.startsWith('/');
            const isSameOrigin = typeof u === 'string' && u.startsWith(window.location.origin);
            if (!isRelative && !isSameOrigin) throw new Error('Blocked URL');
            const input = isRelative ? (window.location.origin + u) : u;
            const init = Object.assign({}, data.init || {});
            if (init.credentials == null) init.credentials = 'same-origin';
            fetch(input, init).then(async (res)=>{
              const ct = res.headers.get('content-type') || '';
              if (ct.includes('application/json')){
                const body = await res.json().catch(()=>({}));
                iframe.contentWindow.postMessage({ type:'ODD_FETCH_RESULT', id:data.id, ok:res.ok, status:res.status, kind:'json', body }, '*');
              }else{
                const body = await res.text();
                iframe.contentWindow.postMessage({ type:'ODD_FETCH_RESULT', id:data.id, ok:res.ok, status:res.status, kind:'text', body }, '*');
              }
            }).catch(err=>{
              try{ iframe.contentWindow.postMessage({ type:'ODD_FETCH_RESULT', id:data.id, error:String(err&&err.message||err) }, '*'); }catch(_){}
            });
          }catch(err){
            try{ iframe.contentWindow.postMessage({ type:'ODD_FETCH_RESULT', id:data.id, error:String(err&&err.message||err) }, '*'); }catch(_){}
          }
          return;
        }

        let h = null;
        if (data.type === 'ODD_CHILD_READY'){ __oddChildReady = true; _requestHeight('ack'); }
        else if (data.type === 'ODD_HEIGHT_V3' && typeof data.height === 'number') { __oddGotHeight = true; h = data.height; }
        else if (data.type === 'ODD_FORM_HEIGHT' && typeof data.height === 'number') { __oddGotHeight = true; h = data.height; }
        else if (data.oddIntakeHeight && typeof data.oddIntakeHeight === 'number') { __oddGotHeight = true; h = data.oddIntakeHeight; }
        else if (data.type === 'ODD_FORM_SUCCESS' && typeof data.height === 'number'){ __oddSuccessMode = true; __oddGotHeight = true; h = data.height; _successMode(); }

        if (h != null) applyHeight(h);
      });
    }

    connectedCallback(){
      // nothing additional
    }
  }
  customElements.define('odd-intake-element', OddIntakeElement);
})();
