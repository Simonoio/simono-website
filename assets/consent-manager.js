(() => {
  "use strict";
  const KEY = "simono_cookie_preferences_v2";
  const GA_ID = "G-R8M4SS5NS1";
  const CLARITY_ID = "xqd5akkf8o";
  let analyticsLoaded = false;

  function getPrefs() {
    try { return JSON.parse(localStorage.getItem(KEY) || "null"); }
    catch (_) { return null; }
  }
  function setPrefs(analytics) {
    const value = { essential: true, analytics: !!analytics, updatedAt: new Date().toISOString() };
    localStorage.setItem(KEY, JSON.stringify(value));
    if (value.analytics) loadAnalytics();
    closeAll();
  }
  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });
    const ga = document.createElement("script");
    ga.async = true;
    ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(ga);
    (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script",CLARITY_ID);
  }
  function injectStyles() {
    if (document.getElementById("simono-cookie-style")) return;
    const style = document.createElement("style");
    style.id = "simono-cookie-style";
    style.textContent = `
      #simono-cookie-banner,#simono-cookie-modal{font-family:Geist,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#f7f7f4}
      #simono-cookie-banner{position:fixed;left:20px;right:20px;bottom:20px;z-index:100000;max-width:1180px;margin:0 auto;background:#111;border:1px solid rgba(255,255,255,.14);border-radius:18px;box-shadow:0 22px 70px rgba(0,0,0,.58);padding:18px 20px}
      #simono-cookie-banner .scb-row{display:flex;align-items:center;justify-content:space-between;gap:24px}
      #simono-cookie-banner p{margin:0;max-width:700px;color:#aaa9a3;font-size:14px;line-height:1.6}
      #simono-cookie-banner a{color:#f7f7f4;text-decoration:underline;text-underline-offset:3px}
      .sc-actions{display:flex;gap:10px;align-items:center;flex-shrink:0}
      .sc-btn{appearance:none;border-radius:999px;padding:10px 16px;font:inherit;font-size:14px;font-weight:650;cursor:pointer;transition:.2s ease}
      .sc-btn-secondary{background:transparent;border:1px solid rgba(255,255,255,.22);color:#f7f7f4}
      .sc-btn-secondary:hover{border-color:rgba(255,255,255,.5)}
      .sc-btn-primary{background:#00b5e2;border:1px solid #00b5e2;color:#041217}
      .sc-btn-primary:hover{filter:brightness(1.08)}
      #simono-cookie-modal{position:fixed;inset:0;z-index:100001;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(0,0,0,.72);backdrop-filter:blur(8px)}
      #simono-cookie-modal .sc-panel{width:min(560px,100%);background:#111;border:1px solid rgba(255,255,255,.14);border-radius:20px;box-shadow:0 28px 90px rgba(0,0,0,.68);padding:28px}
      #simono-cookie-modal h2{margin:0 0 8px;font-size:26px;letter-spacing:-.03em}
      #simono-cookie-modal .sc-intro{margin:0 0 22px;color:#aaa9a3;font-size:14px;line-height:1.6}
      .sc-option{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;padding:17px 0;border-top:1px solid rgba(255,255,255,.1)}
      .sc-option strong{display:block;margin-bottom:5px;font-size:15px}.sc-option span{display:block;color:#8f8f89;font-size:13px;line-height:1.5}
      .sc-switch{position:relative;width:48px;height:27px;flex:0 0 auto}.sc-switch input{opacity:0;width:0;height:0}.sc-slider{position:absolute;inset:0;border-radius:999px;background:#383838;cursor:pointer;transition:.2s}.sc-slider:before{content:"";position:absolute;width:21px;height:21px;left:3px;top:3px;border-radius:50%;background:#fff;transition:.2s}.sc-switch input:checked+.sc-slider{background:#00b5e2}.sc-switch input:checked+.sc-slider:before{transform:translateX(21px)}.sc-switch input:disabled+.sc-slider{opacity:.7;cursor:not-allowed}
      #simono-cookie-modal .sc-footer{display:flex;justify-content:flex-end;gap:10px;margin-top:22px}
      @media(max-width:760px){#simono-cookie-banner{left:12px;right:12px;bottom:12px;padding:16px}#simono-cookie-banner .scb-row{display:block}.sc-actions{margin-top:14px;display:grid;grid-template-columns:1fr 1fr}.sc-actions .sc-btn-primary{grid-column:1/-1}#simono-cookie-modal .sc-panel{padding:22px}#simono-cookie-modal .sc-footer{display:grid;grid-template-columns:1fr 1fr}.sc-btn{width:100%}}
    `;
    document.head.appendChild(style);
  }
  function closeAll(){
    document.getElementById("simono-cookie-banner")?.remove();
    document.getElementById("simono-cookie-modal")?.remove();
    document.body.style.removeProperty("overflow");
  }
  function openPreferences(){
    injectStyles();
    document.getElementById("simono-cookie-modal")?.remove();
    const prefs=getPrefs();
    const modal=document.createElement("div");
    modal.id="simono-cookie-modal";
    modal.setAttribute("role","dialog");
    modal.setAttribute("aria-modal","true");
    modal.setAttribute("aria-labelledby","simono-cookie-title");
    modal.innerHTML=`<div class="sc-panel"><h2 id="simono-cookie-title">Cookie preferences</h2><p class="sc-intro">Choose which optional cookies Simono may use. Essential cookies are always enabled because they are required for the website to function.</p><div class="sc-option"><div><strong>Essential cookies</strong><span>Required for core website functionality and for remembering your cookie choice.</span></div><label class="sc-switch" aria-label="Essential cookies enabled"><input type="checkbox" checked disabled><span class="sc-slider"></span></label></div><div class="sc-option"><div><strong>Analytics cookies</strong><span>Help us understand website usage through Google Analytics and Microsoft Clarity.</span></div><label class="sc-switch" aria-label="Analytics cookies"><input id="simono-analytics-toggle" type="checkbox" ${prefs?.analytics ? "checked" : ""}><span class="sc-slider"></span></label></div><div class="sc-footer"><button class="sc-btn sc-btn-secondary" type="button" data-sc-cancel>Cancel</button><button class="sc-btn sc-btn-primary" type="button" data-sc-save>Save preferences</button></div></div>`;
    document.body.appendChild(modal);
    document.body.style.overflow="hidden";
    modal.addEventListener("click",e=>{if(e.target===modal){modal.remove();document.body.style.removeProperty("overflow");}});
    modal.querySelector("[data-sc-cancel]").onclick=()=>{modal.remove();document.body.style.removeProperty("overflow");};
    modal.querySelector("[data-sc-save]").onclick=()=>setPrefs(modal.querySelector("#simono-analytics-toggle").checked);
  }
  function showBanner(){
    injectStyles();
    document.getElementById("simono-cookie-banner")?.remove();
    const banner=document.createElement("div");
    banner.id="simono-cookie-banner";
    banner.setAttribute("role","dialog");
    banner.setAttribute("aria-label","Cookie consent");
    banner.innerHTML=`<div class="scb-row"><p>We use optional analytics cookies to understand how the website performs. You can accept, decline or customise your preferences. Read our <a href="/privacy-policy">Privacy Policy</a>.</p><div class="sc-actions"><button class="sc-btn sc-btn-secondary" type="button" data-sc-customise>Customise</button><button class="sc-btn sc-btn-secondary" type="button" data-sc-reject>Reject</button><button class="sc-btn sc-btn-primary" type="button" data-sc-accept>Accept analytics</button></div></div>`;
    document.body.appendChild(banner);
    banner.querySelector("[data-sc-customise]").onclick=openPreferences;
    banner.querySelector("[data-sc-reject]").onclick=()=>setPrefs(false);
    banner.querySelector("[data-sc-accept]").onclick=()=>setPrefs(true);
  }
  document.addEventListener("DOMContentLoaded",()=>{
    const prefs=getPrefs();
    if(prefs?.analytics) loadAnalytics();
    if(!prefs) showBanner();
    document.querySelectorAll("[data-cookie-settings]").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();openPreferences();}));
  });
  window.SimonoCookiePreferences={open:openPreferences,reset:()=>{localStorage.removeItem(KEY);showBanner();}};
})();
