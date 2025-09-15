import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate, l as renderScript, k as renderComponent, n as Fragment, o as renderSlot, p as renderHead } from './astro/server_CzAMUll2.mjs';
import 'kleur/colors';
/* empty css                         */
import 'clsx';

const siteConfig = {
  brand: {
    name: "Your Company Name",
    tagline: "Your Business Tagline",
    logo: {
      path: "/images/LogoPlaceholder.png",
      alt: "Company Logo"},
    favicon: "/Favicon/favicon.ico"
  },
  contact: {
    email: "hello@yourcompany.com"},
  content: {
    hero: {
      title: "Your Company Name",
      subtitle: "Your Business Focus"},
    navigation: {
      items: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Projects", href: "/projects" },
        { label: "Insights", href: "/insights" },
        { label: "Assets", href: "/assets" }
      ]
    },
    footer: {
      copyright: {
        year: (/* @__PURE__ */ new Date()).getFullYear()}
    }
  },
  seo: {
    title: "Your Company Name - Your Business Focus",
    description: "Your company description and what you do for your customers.",
    keywords: ["business", "services", "company", "professional", "solutions"],
    ogImage: "/images/og-image.jpg"
  }
};

const $$Astro$3 = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Footer;
  const { showLogo = true } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<footer class="simple-footer" data-astro-cid-ak3upacl> <div class="simple-footer-container" data-astro-cid-ak3upacl> ${showLogo && renderTemplate`<div class="simple-footer-header" data-astro-cid-ak3upacl> <div class="simple-footer-logo" data-astro-cid-ak3upacl> <img${addAttribute(siteConfig.brand.logo.path, "src")}${addAttribute(siteConfig.brand.logo.alt, "alt")} data-astro-cid-ak3upacl> </div> <p class="simple-footer-tagline" data-astro-cid-ak3upacl>${siteConfig.brand.tagline}</p> </div>`} <div class="simple-footer-content" data-astro-cid-ak3upacl> <!-- Simple links grid --> <div class="simple-footer-links" data-astro-cid-ak3upacl> <div class="simple-footer-section" data-astro-cid-ak3upacl> <h4 data-astro-cid-ak3upacl>Company</h4> <a href="/about" data-astro-cid-ak3upacl>About</a> <a href="/services" data-astro-cid-ak3upacl>Services</a> <a href="/projects" data-astro-cid-ak3upacl>Projects</a> </div> <div class="simple-footer-section" data-astro-cid-ak3upacl> <h4 data-astro-cid-ak3upacl>Resources</h4> <a href="/insights" data-astro-cid-ak3upacl>Insights</a> <a href="/assets" data-astro-cid-ak3upacl>Assets</a> <a href="/contact" data-astro-cid-ak3upacl>Contact</a> </div> <div class="simple-footer-section simple-footer-legal" data-astro-cid-ak3upacl> <h4 data-astro-cid-ak3upacl>Legal</h4> <a href="/privacy" data-astro-cid-ak3upacl>Privacy</a> <a href="/terms" data-astro-cid-ak3upacl>Terms</a> </div> </div> </div> <!-- Mobile Legal Links - Small horizontal line --> <div class="simple-footer-mobile-legal" data-astro-cid-ak3upacl> <a href="/privacy" data-astro-cid-ak3upacl>Privacy</a> <a href="/terms" data-astro-cid-ak3upacl>Terms</a> </div> <div class="simple-footer-bottom" data-astro-cid-ak3upacl> <div class="simple-footer-copyright" data-astro-cid-ak3upacl>
© ${(/* @__PURE__ */ new Date()).getFullYear()} ${siteConfig.brand.name}. All rights reserved.
</div> <div class="simple-footer-contact" data-astro-cid-ak3upacl> <a${addAttribute(`mailto:${siteConfig.contact.email}`, "href")} data-astro-cid-ak3upacl>${siteConfig.contact.email}</a> </div> </div> </div> </footer> `;
}, "/home/runner/work/AstroTemplate/AstroTemplate/src/components/Footer/Footer.astro", void 0);

const $$ContactPopup = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Popup Overlay (hidden by default) -->${maybeRenderHead()}<div id="contactPopup" class="popup-overlay" data-astro-cid-ff2wjjyr> <div class="popup-container" data-astro-cid-ff2wjjyr> <!-- Header --> <div class="popup-header" data-astro-cid-ff2wjjyr> <button id="closePopup" class="close-btn mobile-close-btn" aria-label="Close" data-astro-cid-ff2wjjyr>
✕
</button> <div class="header-content" data-astro-cid-ff2wjjyr> <h2 data-astro-cid-ff2wjjyr>Let's discuss something <span class="highlight" data-astro-cid-ff2wjjyr>cool</span> together</h2> </div> <div class="contact-info" data-astro-cid-ff2wjjyr> <div class="contact-item" data-astro-cid-ff2wjjyr> <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-ff2wjjyr> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-astro-cid-ff2wjjyr></path> </svg> <span data-astro-cid-ff2wjjyr>hello@icthemoon.com</span> </div> <div class="contact-item" data-astro-cid-ff2wjjyr> <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-ff2wjjyr> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" data-astro-cid-ff2wjjyr></path> </svg> <span data-astro-cid-ff2wjjyr>+123 456 789</span> </div> <div class="contact-item" data-astro-cid-ff2wjjyr> <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-ff2wjjyr> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-astro-cid-ff2wjjyr></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-ff2wjjyr></path> </svg> <span data-astro-cid-ff2wjjyr>Wherever the moon shines</span> </div> </div> </div> <!-- Form Section --> <div class="popup-form-section" data-astro-cid-ff2wjjyr> <button id="closePopupDesktop" class="close-btn desktop-close-btn" aria-label="Close" data-astro-cid-ff2wjjyr>
✕
</button> <div class="contact-form" id="contactForm" data-astro-cid-ff2wjjyr> <div class="form-section" data-astro-cid-ff2wjjyr> <h3 data-astro-cid-ff2wjjyr>I want to chat about...</h3> <div class="topic-buttons" data-astro-cid-ff2wjjyr> <button type="button" class="topic-btn" data-topic="This page" data-astro-cid-ff2wjjyr>
This page
</button> <button type="button" class="topic-btn" data-topic="General Message" data-astro-cid-ff2wjjyr>
General Message
</button> <button type="button" class="topic-btn" data-topic="Website settings" data-astro-cid-ff2wjjyr>
Website settings
</button> <button type="button" class="topic-btn" data-topic="Service Enquiry" data-astro-cid-ff2wjjyr>
Service Enquiry
</button> <button type="button" class="topic-btn" data-topic="Other" data-astro-cid-ff2wjjyr>
Other
</button> </div> </div> <div class="form-fields" data-astro-cid-ff2wjjyr> <div class="form-group" data-astro-cid-ff2wjjyr> <label for="contactName" data-astro-cid-ff2wjjyr>Your name</label> <input type="text" id="contactName" name="name" class="form-input" data-astro-cid-ff2wjjyr> </div> <div class="form-group" data-astro-cid-ff2wjjyr> <label for="contactEmail" data-astro-cid-ff2wjjyr>Your email</label> <input type="email" id="contactEmail" name="email" class="form-input" data-astro-cid-ff2wjjyr> </div> <div class="form-group" data-astro-cid-ff2wjjyr> <label for="contactMessage" data-astro-cid-ff2wjjyr>Your message</label> <textarea id="contactMessage" name="message" rows="4" class="form-textarea" data-astro-cid-ff2wjjyr></textarea> </div> <button id="submitContact" class="submit-btn" disabled data-astro-cid-ff2wjjyr>
Send Message
</button> </div> </div> <!-- Success Message Section (hidden by default) --> <div class="success-message" id="successMessage" style="display: none;" data-astro-cid-ff2wjjyr> <div class="success-content" data-astro-cid-ff2wjjyr> <div class="success-icon" data-astro-cid-ff2wjjyr> <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-ff2wjjyr> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-astro-cid-ff2wjjyr></path> </svg> </div> <h3 data-astro-cid-ff2wjjyr>Message Sent!</h3> <p data-astro-cid-ff2wjjyr>Thanks for reaching out! We'll get back to you soon.</p> <button class="close-success-btn" onclick="closeContactPopup()" data-astro-cid-ff2wjjyr>Close</button> </div> </div> </div> </div> </div>  ${renderScript($$result, "/home/runner/work/AstroTemplate/AstroTemplate/src/components/BottomNav/contact-form/Contact-Popup.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/AstroTemplate/AstroTemplate/src/components/BottomNav/contact-form/Contact-Popup.astro", void 0);

const $$BottomNav = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Settings Tab -->${maybeRenderHead()}<div class="settings-tab" data-settings-tab data-astro-cid-6ar7m7wu> <!-- Expanded Settings Menu --> <div class="settings-expanded" data-settings-expanded data-astro-cid-6ar7m7wu> <!-- Contact --> <button class="settings-item" data-action="contact" aria-label="Contact" data-astro-cid-6ar7m7wu> <span class="settings-text" data-astro-cid-6ar7m7wu>Contact</span> </button> <!-- Home --> <button class="settings-item" data-action="home" aria-label="Home" data-astro-cid-6ar7m7wu> <span class="settings-text" data-astro-cid-6ar7m7wu>Home</span> </button> <!-- Scroll to Top --> <button class="settings-item" data-action="scroll-top" aria-label="Scroll to top" data-astro-cid-6ar7m7wu> <span class="settings-text" data-astro-cid-6ar7m7wu>Top</span> </button> <!-- Search --> <button class="settings-item" data-action="search" aria-label="Search" data-astro-cid-6ar7m7wu> <span class="settings-text" data-astro-cid-6ar7m7wu>Search</span> </button> </div> <!-- Plus Text Tab --> <button class="settings-toggle" data-settings-toggle aria-label="Navigation Menu" data-astro-cid-6ar7m7wu> <span class="settings-text" data-astro-cid-6ar7m7wu>Menu</span> </button> </div> <!-- Contact Popup --> ${renderComponent($$result, "ContactPopup", $$ContactPopup, { "data-astro-cid-6ar7m7wu": true })}  ${renderScript($$result, "/home/runner/work/AstroTemplate/AstroTemplate/src/components/BottomNav/BottomNav.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/AstroTemplate/AstroTemplate/src/components/BottomNav/BottomNav.astro", void 0);

const $$Astro$2 = createAstro();
const $$ScrollRevealLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ScrollRevealLayout;
  const { title = "Page Title" } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-ehjnnorw": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main role="main" id="main-content" class="wrapper relative z-10 transition-all duration-700 ease-out origin-top scroll-reveal-main" style="min-height: 240vh; padding-bottom: 100px;" data-astro-cid-ehjnnorw>${renderSlot($$result2, $$slots["default"])}<!-- Add extra space at bottom to ensure proper scroll reveal --><div class="h-32 sm:h-40 lg:h-48" data-astro-cid-ehjnnorw></div></main><footer role="contentinfo" class="fixed inset-0 z-0 flex items-end justify-center" style="background: var(--color-background);" data-astro-cid-ehjnnorw><div class="w-full px-8 py-8" data-astro-cid-ehjnnorw><div class="footer-reveal-container" data-astro-cid-ehjnnorw>${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-ehjnnorw": true })}</div></div></footer><nav role="navigation" aria-label="Quick actions" data-astro-cid-ehjnnorw>${renderComponent($$result2, "BottomNav", $$BottomNav, { "data-astro-cid-ehjnnorw": true })}</nav>${renderScript($$result2, "/home/runner/work/AstroTemplate/AstroTemplate/src/components/Footer/scroll-effect/ScrollRevealLayout.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/home/runner/work/AstroTemplate/AstroTemplate/src/components/Footer/scroll-effect/ScrollRevealLayout.astro", void 0);

const links = siteConfig.content.navigation.items;

const $$Astro$1 = createAstro();
const $$TabNav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TabNav;
  const currentPath = Astro2.url.pathname;
  function isActive(href, currentPath2) {
    if (href === "/") return currentPath2 === "/";
    return currentPath2.startsWith(href);
  }
  return renderTemplate`${maybeRenderHead()}<nav class="nav-tab" id="navTab" role="navigation" aria-label="Main navigation" data-astro-cid-qyd32tkz> <!-- Expanded Menu --> <ul class="nav-expanded" id="navExpanded" role="menu" aria-hidden="true" data-astro-cid-qyd32tkz> ${links.map((link) => renderTemplate`<li class="nav-item" role="none" data-astro-cid-qyd32tkz> <a${addAttribute(link.href, "href")}${addAttribute(`nav-link ${isActive(link.href, currentPath) ? "active" : ""}`, "class")}${addAttribute(link.external ? "_blank" : void 0, "target")}${addAttribute(link.external ? "noopener noreferrer" : void 0, "rel")} role="menuitem"${addAttribute(isActive(link.href, currentPath) ? "page" : void 0, "aria-current")} data-astro-cid-qyd32tkz> ${link.label} </a> </li>`)} </ul> <!-- Hamburger Toggle --> <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="navExpanded" data-astro-cid-qyd32tkz> <div class="nav-icon" aria-hidden="true" data-astro-cid-qyd32tkz> <span class="nav-line" data-astro-cid-qyd32tkz></span> <span class="nav-line" data-astro-cid-qyd32tkz></span> <span class="nav-line" data-astro-cid-qyd32tkz></span> </div> </button> </nav> ${renderScript($$result, "/home/runner/work/AstroTemplate/AstroTemplate/src/components/NavBar/TabNav.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/AstroTemplate/AstroTemplate/src/components/NavBar/TabNav.astro", void 0);

const $$CustomScrollbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate``;
}, "/home/runner/work/AstroTemplate/AstroTemplate/src/components/Scroll-bar/CustomScrollbar.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = siteConfig.seo.title,
    description = siteConfig.seo.description,
    enableFooterReveal = true
  } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml"${addAttribute(siteConfig.brand.favicon, "href")}><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta name="keywords"${addAttribute(siteConfig.seo.keywords.join(", "), "content")}><!-- Open Graph / Social Media --><meta property="og:type" content="website"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}>${renderTemplate`<meta property="og:image"${addAttribute(siteConfig.seo.ogImage, "content")}>`}<!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}>${siteConfig.seo.twitterHandle && renderTemplate`<meta name="twitter:site"${addAttribute(siteConfig.seo.twitterHandle, "content")}>`}${renderTemplate`<meta name="twitter:image"${addAttribute(siteConfig.seo.ogImage, "content")}>`}<!-- FontAwesome for ProjectCard icons --><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">${renderHead()}</head> <body class="min-h-screen overflow-x-hidden" style="min-height:100vh"> <!-- Custom Scrollbar Styles --> ${renderComponent($$result, "CustomScrollbar", $$CustomScrollbar, {})} <!-- Top Navigation --> <header role="banner"> ${renderComponent($$result, "TabNav", $$TabNav, {})} </header> ${enableFooterReveal ? renderTemplate`${renderComponent($$result, "ScrollRevealLayout", $$ScrollRevealLayout, { "title": title }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`  <main role="main" id="main-content"> ${renderSlot($$result2, $$slots["default"])} </main>  ${renderComponent($$result2, "Footer", $$Footer, {})}  <nav role="navigation" aria-label="Quick actions"> ${renderComponent($$result2, "BottomNav", $$BottomNav, {})} </nav> ` })}`} <!-- Initialize unified navigation system --> ${renderScript($$result, "/home/runner/work/AstroTemplate/AstroTemplate/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/runner/work/AstroTemplate/AstroTemplate/src/layouts/Layout.astro", void 0);

export { $$Layout as $, siteConfig as s };
