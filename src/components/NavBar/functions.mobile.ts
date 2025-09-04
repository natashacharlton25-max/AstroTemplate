export function initMobileNav() {
  const nav = document.querySelector('[data-nav-mobile]') as HTMLElement | null;
  const mobileToggle = nav?.querySelector('[data-mobile-toggle]') as HTMLElement | null;
  const mobileMenu = document.querySelector('[data-mobile-menu]') as HTMLElement | null;
  const backdrop = document.querySelector('[data-backdrop]') as HTMLElement | null;

  if (!nav || !mobileToggle || !mobileMenu || !backdrop) {
    return;
  }

  let hoverTimer: ReturnType<typeof setTimeout> | null;
  const STAGE1_DELAY = 3000;
  const STAGE2_DELAY = 2000;
  let isInteractingMobileMenu = false;
  let collapseStage1Timer: ReturnType<typeof setTimeout> | null = null;
  let collapseStage2Timer: ReturnType<typeof setTimeout> | null = null;

  function isDesktop() {
    return window.matchMedia('(min-width: 1024px)').matches;
  }

  function cancelHoverTimer() {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
  }

  function cancelStagedMobileCollapse() {
    if (collapseStage1Timer) { clearTimeout(collapseStage1Timer); collapseStage1Timer = null; }
    if (collapseStage2Timer) { clearTimeout(collapseStage2Timer); collapseStage2Timer = null; }
  }

  function collapseMobileStage1() {
    const megaCol = document.querySelector('[data-mobile-mega-column]') as HTMLElement | null;
    nav?.removeAttribute('data-mobile-mega-open');
    megaCol?.classList.remove('show');
    document.querySelectorAll('[data-mobile-mega-content]').forEach((el) => el.classList.remove('active'));
  }

  function scheduleStagedMobileCollapse() {
    cancelStagedMobileCollapse();
    collapseStage1Timer = setTimeout(() => {
      collapseMobileStage1();
      collapseStage2Timer = setTimeout(() => { closeMobileMenu(); }, STAGE2_DELAY);
    }, STAGE1_DELAY);
  }

  function openMobileMenu() {
    if (isDesktop()) return;
    nav.setAttribute('data-mobile-open', 'true');
    mobileToggle?.setAttribute('aria-expanded', 'true');
    scheduleAutoClose();
    cancelStagedMobileCollapse();
  }

  function scheduleAutoClose() {
    cancelHoverTimer();
    const megaOpen = document.querySelector('[data-mobile-mega-column]')?.classList.contains('show');
    const isHoveringMenu = mobileMenu?.matches(':hover');

    let delay = 3000;
    if (isHoveringMenu) {
      delay = megaOpen ? 4000 : 3000;
    } else {
      delay = 1500;
    }

    hoverTimer = setTimeout(() => {
      if (nav?.getAttribute('data-mobile-open') === 'true') {
        if (megaOpen) {
          scheduleMobileMegaCollapse();
        } else {
          closeMobileMenu();
        }
      }
    }, delay);
  }

  function scheduleMobileMegaCollapse() {
    setTimeout(() => {
      const megaCol = document.querySelector('[data-mobile-mega-column]') as HTMLElement | null;
      nav?.removeAttribute('data-mobile-mega-open');
      megaCol?.classList.remove('show');
      document.querySelectorAll('[data-mobile-mega-content]').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('[data-mobile-mega-toggle]').forEach(toggle => toggle.classList.remove('selected'));

      setTimeout(() => {
        closeMobileMenu();
      }, 600);
    }, 100);
  }

  function closeMobileMenu() {
    if (isDesktop() || nav.getAttribute('data-mobile-open') !== 'true') return;

    const megaMenuOpen = nav.getAttribute('data-mobile-mega-open') === 'true';

    if (megaMenuOpen) {
      nav?.removeAttribute('data-mobile-mega-open');
      const mobileMegaColumn = document.querySelector('[data-mobile-mega-column]') as HTMLElement | null;
      mobileMegaColumn?.classList.remove('show');
      document.querySelectorAll('[data-mobile-mega-content]').forEach(content => content.classList.remove('active'));
      document.querySelectorAll('[data-mobile-mega-toggle]').forEach(toggle => toggle.classList.remove('selected'));

      setTimeout(() => {
        nav?.removeAttribute('data-mobile-open');
        mobileToggle?.setAttribute('aria-expanded', 'false');
      }, 600);
    } else {
      nav?.removeAttribute('data-mobile-open');
      mobileToggle?.setAttribute('aria-expanded', 'false');
    }

    cancelHoverTimer();
    cancelStagedMobileCollapse();
  }

  function toggleMobileMenu() {
    if (nav && nav.getAttribute('data-mobile-open') === 'true') {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  }

  function handleResize() {
    if (isDesktop()) {
      closeMobileMenu();
    }
  }

  // --- Event Listeners ---

  mobileToggle.addEventListener('click', toggleMobileMenu);
  backdrop.addEventListener('click', closeMobileMenu);
  document.addEventListener('keydown', handleKeydown);
  window.addEventListener('resize', handleResize);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      closeMobileMenu();
    }
  });

  mobileMenu.addEventListener('mouseenter', () => {
    if (!isDesktop()) {
      isInteractingMobileMenu = true;
      cancelHoverTimer();
      cancelStagedMobileCollapse();
    }
  });

  mobileMenu.addEventListener('mouseleave', () => {
    if (!isDesktop()) {
      isInteractingMobileMenu = false;
      scheduleAutoClose();
    }
  });

  mobileMenu.addEventListener('click', (e) => {
    const target = e.target as Element | null;
    if (target && target.closest('a')) {
      closeMobileMenu();
    }
  });

  const pauseAutoClose = () => { if (!isDesktop()) { isInteractingMobileMenu = true; cancelHoverTimer(); cancelStagedMobileCollapse(); } };
  const resumeAutoClose = () => { if (!isDesktop()) { isInteractingMobileMenu = false; scheduleAutoClose(); } };
  mobileMenu.addEventListener('wheel', pauseAutoClose, { passive: true });
  mobileMenu.addEventListener('touchstart', pauseAutoClose, { passive: true });
  mobileMenu.addEventListener('touchmove', pauseAutoClose, { passive: true });
  mobileMenu.addEventListener('touchend', resumeAutoClose, { passive: true });

  // Mobile two-column mega menu logic
  const mobileMegaToggles = document.querySelectorAll('[data-mobile-mega-toggle]');
  const mobileMegaColumn = document.querySelector('[data-mobile-mega-column]') as HTMLElement | null;

  mobileMegaToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLabel = toggle.getAttribute('data-mobile-mega-toggle');
      const megaContent = document.querySelector(`[data-mobile-mega-content="${targetLabel}"]`) as HTMLElement | null;
      const isCurrentlyActive = toggle.classList.contains('selected');

      mobileMegaToggles.forEach(t => t.classList.remove('selected'));
      document.querySelectorAll('[data-mobile-mega-content]').forEach(content => content.classList.remove('active'));

      if (!isCurrentlyActive && megaContent) {
        nav.setAttribute('data-mobile-mega-open', 'true');
        mobileMegaColumn?.classList.add('show');
        toggle.classList.add('selected');
        megaContent.classList.add('active');
      } else {
        nav.removeAttribute('data-mobile-mega-open');
        mobileMegaColumn?.classList.remove('show');
      }
    });
  });

  document.querySelectorAll('.gmm-mobile-mega-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.removeAttribute('data-mobile-mega-open');
      mobileMegaColumn?.classList.remove('show');
      mobileMegaToggles.forEach(t => t.classList.remove('selected'));
      document.querySelectorAll('[data-mobile-mega-content]').forEach(content => content.classList.remove('active'));
    });
  });

  document.querySelectorAll('[data-mobile-mega-content]').forEach(content => {
    content.querySelectorAll('.gmm-mobile-mega-section').forEach(section => {
      const title = section.querySelector('.gmm-mobile-mega-section-title');
      if (!title) return;
      title.addEventListener('click', () => section.classList.toggle('open'));
    });
  });

  // Initial state setup
  handleResize();
}