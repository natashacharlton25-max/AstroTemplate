document.addEventListener("DOMContentLoaded",()=>{const u=document.querySelectorAll(".pill-button"),n=document.getElementById("slideOutCard"),p=document.getElementById("cardContent");let s=null;const d={categories:`
        <ul class="category-list">
          <li class="category-item">
            <a href="/results?type=category&value=Personal Growth" class="category-link">
              <span class="category-name">Personal Growth</span>
              <span class="category-count">(2)</span>
            </a>
          </li>
          <li class="category-item">
            <a href="/results?type=category&value=Natural Strategies" class="category-link">
              <span class="category-name">Natural Strategies</span>
              <span class="category-count">(1)</span>
            </a>
          </li>
          <li class="category-item">
            <a href="/results?type=category&value=Uncategorized" class="category-link">
              <span class="category-name">Uncategorized</span>
              <span class="category-count">(1)</span>
            </a>
          </li>
        </ul>
      `,archive:`
        <ul class="archive-list">
          <li class="archive-item">
            <a href="/results?type=archive&value=2025-04" class="archive-link">
              <span class="archive-period">April 2025</span>
              <span class="archive-count">(3)</span>
            </a>
          </li>
          <li class="archive-item">
            <a href="/results?type=archive&value=2025-03" class="archive-link">
              <span class="archive-period">March 2025</span>
              <span class="archive-count">(0)</span>
            </a>
          </li>
          <li class="archive-item">
            <a href="/results?type=archive&value=2025-02" class="archive-link">
              <span class="archive-period">February 2025</span>
              <span class="archive-count">(0)</span>
            </a>
          </li>
          <li class="archive-item">
            <a href="/results?type=archive&value=2025-01" class="archive-link">
              <span class="archive-period">January 2025</span>
              <span class="archive-count">(0)</span>
            </a>
          </li>
        </ul>
      `,tags:`
        <div class="tag-cloud">
          <a href="/results?type=tag&value=mindfulness" class="tag-link tag-size-large">mindfulness</a>
          <a href="/results?type=tag&value=personal growth" class="tag-link tag-size-medium">personal growth</a>
          <a href="/results?type=tag&value=natural strategies" class="tag-link tag-size-medium">natural strategies</a>
          <a href="/results?type=tag&value=wellness" class="tag-link tag-size-small">wellness</a>
          <a href="/results?type=tag&value=meditation" class="tag-link tag-size-small">meditation</a>
          <a href="/results?type=tag&value=healing" class="tag-link tag-size-small">healing</a>
          <a href="/results?type=tag&value=self-care" class="tag-link tag-size-small">self-care</a>
        </div>
      `};u.forEach(e=>{e.addEventListener("click",a=>{a.preventDefault();const o=e.dataset.filter;if(s===e){t();return}s&&s.classList.remove("active"),s=e,p.innerHTML=d[o]||"<p>Content coming soon...</p>",n.classList.add("open"),e.classList.add("active")})});function t(){n.classList.remove("open"),s&&(s.classList.remove("active"),s=null)}document.addEventListener("click",e=>{!e.target.closest(".page-nav-pills")&&!e.target.closest(".slide-out-card")&&t()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&t()});let l=window.scrollY,c=!1,g=50;function v(){const e=document.querySelector(".page-nav-pills"),a=document.querySelector(".slide-out-card");if(a&&a.classList.contains("open")){console.log("📌 Pills are pinned (sidebar open) - staying visible"),e.style.opacity="1",e.style.visibility="visible",e.style.transform="translateX(0)",a.style.opacity="1",a.style.visibility="visible",a.style.transform="translateX(0)",l=window.scrollY;return}const r=window.scrollY;Math.abs(r-l)<g||(c=r>l,c?(console.log("📜⬇️ Hiding pills on scroll down"),e.style.opacity="0",e.style.visibility="hidden",e.style.transform="translateX(100px)"):(console.log("📜⬆️ Showing pills on scroll up"),e.style.opacity="1",e.style.visibility="visible",e.style.transform="translateX(0)"),l=r)}let i;window.addEventListener("scroll",()=>{i&&clearTimeout(i),i=setTimeout(v,10)},{passive:!0}),console.log("✅ Slide-out pill navigation loaded")});
