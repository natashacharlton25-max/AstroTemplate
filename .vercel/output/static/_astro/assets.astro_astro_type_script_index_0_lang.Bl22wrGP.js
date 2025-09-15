document.addEventListener("DOMContentLoaded",()=>{const y=document.querySelectorAll(".assets-nav-tab"),n=document.getElementById("assetsDropdownContent"),p=n?n.querySelector(".dropdown-content-wrapper"):null,S=document.querySelector(".page-header");document.querySelector(".assets-nav-tabs");const q=document.getElementById("categoryWidget"),M=document.getElementById("featuredWidget"),W=document.getElementById("keywordsWidget");function u(){if(!n||!S)return;const e=S.getBoundingClientRect();n.style.setProperty("--dropdown-top",`${e.bottom}px`)}const g=new WeakMap;let l=null;function D(e){if(!n||!e)return;const t=e;if(l===t)return;const s=t.getBoundingClientRect(),o=n.getBoundingClientRect(),a=s.left-o.left+s.width/2,i=Math.round(s.width),c=Math.round(s.height),r=document.createElement("span");r.className="tab-placeholder",r.style.display="inline-flex",r.style.width=`${i}px`,r.style.height=`${c}px`,r.style.flex=`0 0 ${i}px`;const b=t.parentNode,E=t.nextSibling;g.set(t,{parent:b,nextSibling:E,placeholder:r,widthPx:i,correctLeft:a}),l&&l!==t&&w(l),b.insertBefore(r,t),n.appendChild(t),t.classList.add("attached-tab"),t.style.pointerEvents="auto",t.style.width=`${i}px`,t.style.flex=`0 0 ${i}px`,m(t),l=t}function m(e){const t=e||l;if(!n||!t)return;const s=g.get(t);if(s)try{const o=n.getBoundingClientRect();let a;if(s.correctLeft!==void 0)a=s.correctLeft;else{const B=s.placeholder.getBoundingClientRect();a=B.left-o.left+B.width/2}const i=t.offsetWidth||100,c=i/2,r=o.width-i/2,b=Math.max(c,Math.min(r,a)),E=Math.round(b*2)/2;n.style.setProperty("--attached-tab-left",`${E}px`)}catch{}}function w(e){const t=e||l;if(!t)return;const s=g.get(t);if(!s)return;const o=t.style.transition;t.style.transition="none",t.classList.remove("attached-tab"),t.style.removeProperty("pointer-events");const{parent:a,nextSibling:i,placeholder:c,widthPx:r}=s;t.style.width=`${r}px`,t.style.flex=`0 0 ${r}px`,a.insertBefore(t,i),requestAnimationFrame(()=>{c.remove(),requestAnimationFrame(()=>{t.style.removeProperty("width"),t.style.removeProperty("flex")})}),requestAnimationFrame(()=>{t.style.transition=o||""}),g.delete(t),l===t&&(l=null)}let f=!1;function h(){if(!n||!n.classList.contains("open")||f)return;f=!0,m(),u(),n.classList.add("closing");const e=()=>{l&&w(l),y.forEach(o=>o.classList.remove("active")),f=!1,n.classList.remove("closing"),n.classList.remove("open")},t=o=>{o.target===n&&o.propertyName==="transform"&&(n.removeEventListener("transitionend",t),clearTimeout(s),e())};n.addEventListener("transitionend",t);const s=setTimeout(e,1200)}function I(e){if(!n)return;const t=document.querySelector(`[data-tab="${e}"]`),s=n.classList.contains("open"),o=t?t.classList.contains("active"):!1;if(s&&o){h();return}if(y.forEach(a=>a.classList.remove("active")),t&&t.classList.add("active"),p){p.innerHTML="";let a=null;if(e==="category"&&(a=q),e==="featured"&&(a=M),e==="keywords"&&(a=W),a){p.appendChild(a.cloneNode(!0));const i=p.querySelector(".widget");i&&(i.style.display="block")}}u(),D(t),n.classList.add("open")}y.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const s=e.getAttribute("data-tab");s&&I(s)})});function O(e){document.querySelectorAll(".asset-card").forEach(s=>{const o=s.getAttribute("data-category");e==="all"||o===e?s.style.display="block":s.style.display="none"})}function R(e){document.querySelectorAll(".asset-card").forEach(s=>{(s.getAttribute("data-keywords")||"").includes(e)?s.style.display="block":s.style.display="none"})}document.addEventListener("click",e=>{const t=e.target;if(t.classList.contains("category-btn")){e.preventDefault();const a=t.getAttribute("data-category"),i=t.closest(".category-buttons");i&&(i.querySelectorAll(".category-btn").forEach(c=>{c.classList.remove("active")}),t.classList.add("active")),a&&O(a);return}if(t.classList.contains("keyword-tag")){e.preventDefault();const a=t.getAttribute("data-keyword"),i=t.closest(".keyword-tags");i&&(i.querySelectorAll(".keyword-tag").forEach(c=>{c.classList.remove("active")}),t.classList.add("active")),a&&R(a);return}const s=e.target;!(s&&s.closest&&(s.closest(".header-tabs-container")||s.closest(".assets-dropdown-content")))&&n&&n.classList.contains("open")&&h()});let C=window.innerWidth>480;window.addEventListener("resize",()=>{u(),f||m();const e=window.innerWidth<=480,t=window.innerWidth>480;C&&e&&n&&n.classList.contains("open")&&(l&&w(l),y.forEach(s=>s.classList.remove("active")),n.classList.remove("open"),n.classList.remove("closing")),C=t}),window.addEventListener("scroll",()=>{u(),f||m()},{passive:!0}),u();const L=document.getElementById("slideOutCard"),P=document.querySelectorAll(".pill-button");let d=null;const A={category:`
        <div class="category-buttons">
          <button class="category-btn active" data-category="all">All Assets</button>
          <button class="category-btn" data-category="templates">Templates</button>
          <button class="category-btn" data-category="checklists">Checklists</button>
          <button class="category-btn" data-category="guides">Guides</button>
          <button class="category-btn" data-category="tools">Tools</button>
        </div>
      `,featured:`
        <div class="featured-cards">
          <a href="#" class="featured-card">
            <div class="featured-content">
              <h4>Design System Template</h4>
              <span class="featured-meta">Most Popular</span>
            </div>
          </a>
          <a href="#" class="featured-card">
            <div class="featured-content">
              <h4>WCAG Checklist</h4>
              <span class="featured-meta">Essential</span>
            </div>
          </a>
          <a href="#" class="featured-card">
            <div class="featured-content">
              <h4>Screen Reader Guide</h4>
              <span class="featured-meta">New Release</span>
            </div>
          </a>
        </div>
      `,keywords:`
        <div class="keyword-tags">
          <button class="keyword-tag" data-keyword="accessibility">ACCESSIBILITY</button>
          <button class="keyword-tag" data-keyword="wcag">WCAG</button>
          <button class="keyword-tag" data-keyword="design">DESIGN</button>
          <button class="keyword-tag" data-keyword="templates">TEMPLATES</button>
          <button class="keyword-tag" data-keyword="testing">TESTING</button>
          <button class="keyword-tag" data-keyword="mobile">MOBILE</button>
          <button class="keyword-tag" data-keyword="forms">FORMS</button>
          <button class="keyword-tag" data-keyword="compliance">COMPLIANCE</button>
        </div>
      `};P.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const s=e.dataset.filter;if(d===e){x();return}d&&d.classList.remove("active"),d=e;const o=document.getElementById("cardContent");o&&s&&s in A&&(o.innerHTML=A[s]||""),L.classList.add("open"),e.classList.add("active")})});function x(){L&&(L.classList.remove("open"),d&&(d.classList.remove("active"),d=null))}document.addEventListener("click",e=>{const t=e.target;!(t&&(t.closest(".page-nav-pills")||t.closest(".slide-out-card")))&&n&&n.classList.contains("open")&&h()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&x()});let v=window.scrollY,T=!1,N=50;function $(){const e=document.querySelector(".page-nav-pills"),t=document.querySelector(".slide-out-card");if(!e||!t)return;if(t.classList.contains("open")){console.log("📌 Pills are pinned (sidebar open) - staying visible"),e.style.opacity="1",e.style.visibility="visible",e.style.transform="translateX(0)",t.style.opacity="1",t.style.visibility="visible",t.style.transform="translateX(0)",v=window.scrollY;return}const o=window.scrollY;Math.abs(o-v)<N||(T=o>v,T?(console.log("📜⬇️ Hiding pills on scroll down"),e.style.opacity="0",e.style.visibility="hidden",e.style.transform="translateX(100px)"):(console.log("📜⬆️ Showing pills on scroll up"),e.style.opacity="1",e.style.visibility="visible",e.style.transform="translateX(0)"),v=o)}let k;window.addEventListener("scroll",()=>{k&&clearTimeout(k),k=setTimeout($,10)},{passive:!0}),console.log("✅ Assets slide-out navigation loaded")});
