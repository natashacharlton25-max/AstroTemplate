document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".category-btn"),document.querySelectorAll(".keyword-tag"),document.querySelector(".search-input"),document.querySelector(".search-form");const y=document.querySelectorAll(".results-nav-tab"),s=document.getElementById("resultsDropdownContent"),p=s?s.querySelector(".dropdown-content-wrapper"):null,E=document.querySelector(".page-header");document.querySelector(".results-nav-tabs");const B=document.getElementById("searchInWidget"),R=document.getElementById("keywordsWidget"),T=document.getElementById("featuredWidget");function d(){if(!s||!E)return;const e=E.getBoundingClientRect();s.style.setProperty("--dropdown-top",`${e.bottom}px`)}const g=new WeakMap;let c=null;function W(e){if(!s||!e)return;const t=e;if(c===t)return;const o=t.getBoundingClientRect(),a=s.getBoundingClientRect(),n=o.left-a.left+o.width/2,r=Math.round(o.width),f=Math.round(o.height),i=document.createElement("span");i.className="tab-placeholder",i.style.display="inline-flex",i.style.width=`${r}px`,i.style.height=`${f}px`,i.style.flex=`0 0 ${r}px`;const b=t.parentNode,k=t.nextSibling;g.set(t,{parent:b,nextSibling:k,placeholder:i,widthPx:r,correctLeft:n}),c&&c!==t&&h(c),b.insertBefore(i,t),s.appendChild(t),t.classList.add("attached-tab"),t.style.pointerEvents="auto",t.style.width=`${r}px`,t.style.flex=`0 0 ${r}px`,v(t),c=t}function v(e){const t=e||c;if(!s||!t)return;const o=g.get(t);if(o)try{const a=s.getBoundingClientRect();let n;if(o.correctLeft!==void 0)n=o.correctLeft;else{const A=o.placeholder.getBoundingClientRect();n=A.left-a.left+A.width/2}const r=t.offsetWidth||100,f=r/2,i=a.width-r/2,b=Math.max(f,Math.min(i,n)),k=Math.round(b*2)/2;s.style.setProperty("--attached-tab-left",`${k}px`)}catch{}}function h(e){const t=e||c;if(!t)return;const o=g.get(t);if(!o)return;const a=t.style.transition;t.style.transition="none",t.classList.remove("attached-tab"),t.style.removeProperty("pointer-events");const{parent:n,nextSibling:r,placeholder:f,widthPx:i}=o;t.style.width=`${i}px`,t.style.flex=`0 0 ${i}px`,n.insertBefore(t,r),requestAnimationFrame(()=>{f.remove(),requestAnimationFrame(()=>{t.style.removeProperty("width"),t.style.removeProperty("flex")})}),requestAnimationFrame(()=>{t.style.transition=a||""}),g.delete(t),c===t&&(c=null)}let u=!1;function S(){if(!s||!s.classList.contains("open")||u)return;u=!0,v(),d(),s.classList.add("closing");const e=()=>{c&&h(c),y.forEach(a=>a.classList.remove("active")),u=!1,s.classList.remove("closing"),s.classList.remove("open")},t=a=>{a.target===s&&a.propertyName==="transform"&&(s.removeEventListener("transitionend",t),clearTimeout(o),e())};s.addEventListener("transitionend",t);const o=setTimeout(e,1200)}function D(e){if(!s)return;const t=document.querySelector(`[data-tab="${e}"]`),o=s.classList.contains("open"),a=t?t.classList.contains("active"):!1;if(o&&a){S();return}if(y.forEach(n=>n.classList.remove("active")),t&&t.classList.add("active"),p){p.innerHTML="";let n=null;if(e==="searchin"&&(n=B),e==="keywords"&&(n=R),e==="featured"&&(n=T),n){p.appendChild(n.cloneNode(!0));const r=p.querySelector(".widget");r&&(r.style.display="block")}}d(),W(t),s.classList.add("open")}y.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const o=e.getAttribute("data-tab");o&&D(o)})});let x=window.innerWidth>480;window.addEventListener("resize",()=>{d(),u||v();const e=window.innerWidth<=480,t=window.innerWidth>480;x&&e&&s&&s.classList.contains("open")&&(c&&h(c),y.forEach(o=>o.classList.remove("active")),s.classList.remove("open"),s.classList.remove("closing")),x=t}),window.addEventListener("scroll",()=>{d(),u||v(c)},{passive:!0}),d(),document.addEventListener("click",e=>{if(e.target.classList.contains("category-btn")){e.preventDefault();const a=e.target.closest(".category-buttons");a&&(a.querySelectorAll(".category-btn").forEach(r=>{r.classList.remove("active")}),e.target.classList.add("active"));const n=e.target.getAttribute("data-category");n&&n!=="all"?window.location.href=`/results?type=category&value=${encodeURIComponent(n)}`:window.location.href="/results";return}if(e.target.classList.contains("keyword-tag")){e.preventDefault();const a=e.target.closest(".keyword-tags");a&&(a.querySelectorAll(".keyword-tag").forEach(r=>{r.classList.remove("active")}),e.target.classList.add("active"));const n=e.target.getAttribute("data-keyword");n&&(window.location.href=`/results?q=${encodeURIComponent(n)}`);return}if(e.target.closest(".featured-card"))return;const t=e.target;!(t&&t.closest&&(t.closest(".header-tabs-container")||t.closest(".results-dropdown-content")))&&s&&s.classList.contains("open")&&S()});const q=document.getElementById("slideOutCard"),I=document.querySelectorAll(".pill-button");let l=null;const M={categories:`
        <div class="category-buttons">
          <button class="category-btn active" data-category="all">All<br>Website</button>
          <button class="category-btn" data-category="pages">Pages</button>
          <button class="category-btn" data-category="blog">Blog</button>
          <button class="category-btn" data-category="projects">Projects</button>
          <button class="category-btn" data-category="resources">Resources</button>
        </div>
      `,keywords:`
        <div class="keyword-tags">
          <button class="keyword-tag" data-keyword="about">about</button>
          <button class="keyword-tag" data-keyword="services">services</button>
          <button class="keyword-tag" data-keyword="portfolio">portfolio</button>
          <button class="keyword-tag" data-keyword="contact">contact</button>
          <button class="keyword-tag" data-keyword="projects">projects</button>
          <button class="keyword-tag" data-keyword="experience">experience</button>
          <button class="keyword-tag" data-keyword="skills">skills</button>
          <button class="keyword-tag" data-keyword="testimonials">testimonials</button>
          <button class="keyword-tag" data-keyword="blog">blog</button>
          <button class="keyword-tag" data-keyword="resources">resources</button>
        </div>
      `,featured:`
        <div class="featured-cards">
          <a href="/about" class="featured-card">
            <div class="featured-content">
              <h4>About Our Company</h4>
              <span class="featured-meta">Most Popular</span>
            </div>
          </a>
          <a href="/contact" class="featured-card">
            <div class="featured-content">
              <h4>Get In Touch</h4>
              <span class="featured-meta">Recommended</span>
            </div>
          </a>
          <a href="/services" class="featured-card">
            <div class="featured-content">
              <h4>Our Services</h4>
              <span class="featured-meta">Trending</span>
            </div>
          </a>
          <a href="/portfolio" class="featured-card">
            <div class="featured-content">
              <h4>Portfolio</h4>
              <span class="featured-meta">Showcase</span>
            </div>
          </a>
          <a href="/team" class="featured-card">
            <div class="featured-content">
              <h4>Our Team</h4>
              <span class="featured-meta">Meet Us</span>
            </div>
          </a>
          <a href="/resources" class="featured-card">
            <div class="featured-content">
              <h4>Resources</h4>
              <span class="featured-meta">Essential</span>
            </div>
          </a>
        </div>
      `};I.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const o=e.dataset.filter;if(l===e){w();return}l&&l.classList.remove("active"),l=e,document.getElementById("cardContent").innerHTML=M[o]||"",q.classList.add("open"),e.classList.add("active")})});function w(){q.classList.remove("open"),l&&(l.classList.remove("active"),l=null)}document.addEventListener("click",e=>{!e.target.closest(".page-nav-pills")&&!e.target.closest(".slide-out-card")&&w()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&w()});let m=window.scrollY,C=!1,O=50;function P(){const e=document.querySelector(".page-nav-pills"),t=document.querySelector(".slide-out-card");if(t&&t.classList.contains("open")){console.log("📌 Pills are pinned (sidebar open) - staying visible"),e.style.opacity="1",e.style.visibility="visible",e.style.transform="translateX(0)",t.style.opacity="1",t.style.visibility="visible",t.style.transform="translateX(0)",m=window.scrollY;return}const a=window.scrollY;Math.abs(a-m)<O||(C=a>m,C?(console.log("📜⬇️ Hiding pills on scroll down"),e.style.opacity="0",e.style.visibility="hidden",e.style.transform="translateX(100px)"):(console.log("📜⬆️ Showing pills on scroll up"),e.style.opacity="1",e.style.visibility="visible",e.style.transform="translateX(0)"),m=a)}let L;window.addEventListener("scroll",()=>{L&&clearTimeout(L),L=setTimeout(P,10)},{passive:!0}),console.log("✅ Results slide-out navigation loaded")});
