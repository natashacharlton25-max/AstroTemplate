/* empty css                                 */
import { e as createComponent, f as createAstro, m as maybeRenderHead, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_CzAMUll2.mjs';
import 'kleur/colors';
import { s as siteConfig, $ as $$Layout } from '../chunks/Layout_ZoZwWIkn.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$BrandHero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BrandHero;
  const {
    title = siteConfig.content.hero.title,
    subtitle = siteConfig.content.hero.subtitle
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="brand-text-container" data-astro-cid-j62sm46d> <h1 data-astro-cid-j62sm46d>${title}</h1> <p data-astro-cid-j62sm46d>${subtitle}</p> </div> `;
}, "/home/runner/work/AstroTemplate/AstroTemplate/src/components/Hero/BrandHero.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "enableFooterReveal": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="position: relative; height: 100vh; display: flex; align-items: center; justify-content: center; padding-top: 60px;"> ${renderComponent($$result2, "BrandHero", $$BrandHero, {})} </div> ` })}`;
}, "/home/runner/work/AstroTemplate/AstroTemplate/src/pages/index.astro", void 0);

const $$file = "/home/runner/work/AstroTemplate/AstroTemplate/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
