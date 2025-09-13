/* empty css                                 */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CzAMUll2.mjs';
import 'kleur/colors';
import { $ as $$Layout, s as siteConfig } from '../chunks/Layout_CQLPwF-w.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Insights = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Insights - ${siteConfig.brand.name}`, "data-astro-cid-2p3u5vct": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="insights-page" data-astro-cid-2p3u5vct> <section class="hero-section" data-astro-cid-2p3u5vct> <div class="container" data-astro-cid-2p3u5vct> <h1 data-astro-cid-2p3u5vct>Digital Insights</h1> <p class="hero-description" data-astro-cid-2p3u5vct>
Thoughts, research, and insights on digital accessibility, inclusive design, and modern web development.
</p> </div> </section> <section class="content-section" data-astro-cid-2p3u5vct> <div class="container" data-astro-cid-2p3u5vct> <div class="insights-grid" data-astro-cid-2p3u5vct> <article class="insight-card" data-astro-cid-2p3u5vct> <h2 data-astro-cid-2p3u5vct>Accessibility in Modern Web Design</h2> <p class="meta" data-astro-cid-2p3u5vct>Published March 2024</p> <p data-astro-cid-2p3u5vct>Exploring the latest trends and techniques for creating inclusive digital experiences that work for everyone.</p> <a href="#" class="read-more" data-astro-cid-2p3u5vct>Read More</a> </article> <article class="insight-card" data-astro-cid-2p3u5vct> <h2 data-astro-cid-2p3u5vct>The Future of Digital Inclusion</h2> <p class="meta" data-astro-cid-2p3u5vct>Published February 2024</p> <p data-astro-cid-2p3u5vct>Understanding how emerging technologies can be leveraged to create more accessible and inclusive digital spaces.</p> <a href="#" class="read-more" data-astro-cid-2p3u5vct>Read More</a> </article> <article class="insight-card" data-astro-cid-2p3u5vct> <h2 data-astro-cid-2p3u5vct>UX Design for All Abilities</h2> <p class="meta" data-astro-cid-2p3u5vct>Published January 2024</p> <p data-astro-cid-2p3u5vct>Best practices for designing user experiences that accommodate diverse needs and abilities from the ground up.</p> <a href="#" class="read-more" data-astro-cid-2p3u5vct>Read More</a> </article> </div> </div> </section> </main> ` })} `;
}, "C:/Users/natas/my-astro-template/src/pages/insights.astro", void 0);

const $$file = "C:/Users/natas/my-astro-template/src/pages/insights.astro";
const $$url = "/insights";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Insights,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
