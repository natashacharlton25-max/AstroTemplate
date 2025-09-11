/* empty css                                         */
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CzAMUll2.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_j7aDvM_i.mjs';
/* empty css                                          */
export { renderers } from '../renderers.mjs';

const $$SearchResults = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-6ouf65ld": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="search-results-page" style="position: relative;" data-astro-cid-6ouf65ld> <!-- Search Results Header --> <div class="search-results-header" data-astro-cid-6ouf65ld> <div class="container" data-astro-cid-6ouf65ld> <h1 id="searchResultsTitle" data-astro-cid-6ouf65ld>Search Results</h1> <div class="search-info" data-astro-cid-6ouf65ld> <span id="searchQuery" class="search-query" data-astro-cid-6ouf65ld></span> <span id="searchCount" class="search-count" data-astro-cid-6ouf65ld></span> </div> <!-- Search Again Bar --> <div class="search-again-container" data-astro-cid-6ouf65ld> <div class="search-input-container" data-astro-cid-6ouf65ld> <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-6ouf65ld> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" data-astro-cid-6ouf65ld></path> </svg> <input type="text" id="searchAgainInput" placeholder="Search again..." class="search-input" autocomplete="off" data-astro-cid-6ouf65ld> <button id="clearSearchAgain" class="clear-search-btn" style="display: none;" data-astro-cid-6ouf65ld>
✕
</button> </div> <button id="searchAgainBtn" class="search-btn" data-astro-cid-6ouf65ld>
Search
</button> </div> </div> </div> <!-- Search Results Content --> <div class="search-results-content" data-astro-cid-6ouf65ld> <div class="container" data-astro-cid-6ouf65ld> <!-- Loading State --> <div id="loadingState" class="loading-state" style="display: none;" data-astro-cid-6ouf65ld> <div class="loading-spinner" data-astro-cid-6ouf65ld></div> <p data-astro-cid-6ouf65ld>Searching...</p> </div> <!-- Results Container --> <div id="resultsContainer" class="results-container" data-astro-cid-6ouf65ld> <!-- Results will be populated by JavaScript --> </div> <!-- No Results State --> <div id="noResultsState" class="no-results" style="display: none;" data-astro-cid-6ouf65ld> <h2 data-astro-cid-6ouf65ld>No results found</h2> <p data-astro-cid-6ouf65ld>Try adjusting your search terms or browse our content below.</p> <!-- Popular Content Suggestions --> <div class="suggestions-section" data-astro-cid-6ouf65ld> <h3 data-astro-cid-6ouf65ld>Popular Content</h3> <div class="suggestions-grid" data-astro-cid-6ouf65ld> <a href="/about" class="suggestion-card" data-astro-cid-6ouf65ld> <h4 data-astro-cid-6ouf65ld>About Us</h4> <p data-astro-cid-6ouf65ld>Learn about our mission and values</p> </a> <a href="/services" class="suggestion-card" data-astro-cid-6ouf65ld> <h4 data-astro-cid-6ouf65ld>Services</h4> <p data-astro-cid-6ouf65ld>Discover what we can do for you</p> </a> <a href="/portfolio" class="suggestion-card" data-astro-cid-6ouf65ld> <h4 data-astro-cid-6ouf65ld>Portfolio</h4> <p data-astro-cid-6ouf65ld>See our best work and projects</p> </a> <a href="/contact" class="suggestion-card" data-astro-cid-6ouf65ld> <h4 data-astro-cid-6ouf65ld>Contact</h4> <p data-astro-cid-6ouf65ld>Get in touch with us</p> </a> </div> </div> </div> </div> </div> </main> ` })}  ${renderScript($$result, "C:/Users/natas/my-astro-template/src/pages/search-results.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/natas/my-astro-template/src/pages/search-results.astro", void 0);

const $$file = "C:/Users/natas/my-astro-template/src/pages/search-results.astro";
const $$url = "/search-results";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SearchResults,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
