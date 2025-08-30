export function isActive(href: string, currentPath: string): boolean {
  // Handle external links
  if (href.startsWith('http')) {
    return false;
  }
  
  // Exact match for root path
  if (href === '/' && currentPath === '/') {
    return true;
  }
  
  // For non-root paths, match exactly (no trailing slash normalization needed for Astro)
  if (href !== '/' && currentPath === href) {
    return true;
  }
  
  return false;
}

export function initNavigation() {
  const nav = document.querySelector('[data-nav]') as HTMLElement | null;
  const mobileToggle = nav?.querySelector('[data-mobile-toggle]') as HTMLElement | null;
  const mobileMenu = document.querySelector('[data-mobile-menu]') as HTMLElement | null;
  const backdrop = document.querySelector('[data-backdrop]') as HTMLElement | null;

  const IDLE_DELAY = 7000;
  let idleTimer: ReturnType<typeof setTimeout> | null;
  let hoverTimer: ReturnType<typeof setTimeout> | null;
  let STAGE1_DELAY = 3000;
  let STAGE2_DELAY = 2000;
  let isInteractingMobileMenu = false;
  let collapseStage1Timer: ReturnType<typeof setTimeout> | null = null;
  let collapseStage2Timer: ReturnType<typeof setTimeout> | null = null;
  let scrollLockY = 0;

  function isDesktop() {
    return window.matchMedia('(min-width: 1024px)').matches;
  }

  function cancelIdleTimer() {
    if (idleTimer) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }
  }

  function cancelHoverTimer() {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
  }

  function collapseNav() {
    if (!nav || !isDesktop()) return;
    nav.setAttribute('data-collapsed', 'true');
    nav.removeAttribute('data-expanded');
  }

  function expandNav() {
    if (!nav || !isDesktop()) return;
    nav.removeAttribute('data-collapsed');
    nav.setAttribute('data-expanded', 'true');
  }

  function scheduleCollapse(delay = IDLE_DELAY) {
    if (!isDesktop()) return;
    cancelIdleTimer();
    idleTimer = setTimeout(() => {
      if (activeMenu) {
        activeMenu.classList.remove('show');
        activeMenu = null;
        setTimeout(() => {
          collapseNav();
        }, 1500);
      } else {
        collapseNav();
      }
    }, delay);
  }

  function cancelStagedMobileCollapse() {
    if (collapseStage1Timer) { clearTimeout(collapseStage1Timer); collapseStage1Timer = null; }
    if (collapseStage2Timer) { clearTimeout(collapseStage2Timer); collapseStage2Timer = null; }
  }

  function collapseMobileStage1() {
    const panel = document.querySelector('.gm-mobile-panel') as HTMLElement | null;
    const megaCol = document.querySelector('[data-mobile-mega-column]') as HTMLElement | null;
    panel?.classList.remove('expanded');
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

  function handleScroll() {
    if (!nav) return;
    
    const scrolled = window.scrollY > 50;
    
    if (isDesktop()) {
      if (scrolled) {
        const isHoveringNav = nav.matches(':hover');
        const isHoveringMegaMenu = activeMenu && activeMenu.matches(':hover');
        
        if (!isHoveringNav && !isHoveringMegaMenu) {
          if (activeMenu) {
            const megaIndex = Array.from(megaMenus).indexOf(activeMenu);
            const navLink = menuItems[megaIndex]?.querySelector('.gm-menu-link');
            navLink?.classList.remove('mega-active');
            activeMenu.classList.remove('show');
            activeMenu = null;
          }
          collapseNav();
          cancelIdleTimer();
        }
      } else if (!nav.matches(':hover')) {
        expandNav();
        scheduleCollapse();
      }
    }
    
    if (!isDesktop() && nav?.getAttribute('data-mobile-open') === 'true') {
      const hoveringMenu = mobileMenu?.matches(':hover');
      const hoveringNav = nav?.matches(':hover');
      
      if (!hoveringMenu && !hoveringNav && !isInteractingMobileMenu) {
        const megaOpen = document.querySelector('[data-mobile-mega-column]')?.classList.contains('show');
        
        if (megaOpen) {
          scheduleMobileMegaCollapse();
        } else {
          setTimeout(() => closeMobileMenu(), 300);
        }
      }
    }
  }

  function openMobileMenu() {
    if (!nav || !mobileMenu) return;
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
      const panel = document.querySelector('.gm-mobile-panel') as HTMLElement | null;
      const megaCol = document.querySelector('[data-mobile-mega-column]') as HTMLElement | null;
      panel?.classList.remove('expanded');
      megaCol?.classList.remove('show');
      document.querySelectorAll('[data-mobile-mega-content]').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('[data-mobile-mega-toggle]').forEach(toggle => toggle.classList.remove('selected'));
      
      setTimeout(() => {
        closeMobileMenu();
      }, 600);
    }, 100);
  }

  function closeMobileMenu() {
    if (!nav || !mobileMenu) return;
    nav.removeAttribute('data-mobile-open');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    cancelHoverTimer();
    cancelStagedMobileCollapse();
  }

  function toggleMobileMenu() {
    if (nav?.getAttribute('data-mobile-open') === 'true') {
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
      if (window.scrollY <= 50) {
        expandNav();
        scheduleCollapse();
      } else {
        collapseNav();
      }
    } else {
      nav?.removeAttribute('data-collapsed');
      nav?.removeAttribute('data-expanded');
    }
  }

  function init() {
    handleResize();
    handleScroll();
  }

  // Event listeners
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize);
  document.addEventListener('keydown', handleKeydown);
  
  mobileToggle?.addEventListener('click', toggleMobileMenu);
  backdrop?.addEventListener('click', closeMobileMenu);

  if (nav) {
    nav.addEventListener('mouseenter', () => {
      if (isDesktop()) {
        cancelIdleTimer();
        if (nav.getAttribute('data-collapsed') === 'true') {
          expandNav();
        }
      }
    });

    nav.addEventListener('mouseleave', () => {
      if (isDesktop()) {
        if (activeMenu) {
          hideMegaMenu(1000);
        } else {
          scheduleCollapse(1000);
        }
      }
    });
  }

  if (mobileMenu) {
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
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      closeMobileMenu();
      if (nav && isDesktop()) {
        collapseNav();
      }
    }
  });

  init();

  // Handle mega menu hover interactions
  const menuItems = document.querySelectorAll('.gm-menu-item[data-mega-menu]');
  const megaMenus = document.querySelectorAll('.gm-mega-menu');
  let activeMenu: HTMLElement | null = null;
  let menuTimer: ReturnType<typeof setTimeout> | null = null;

  function showMegaMenu(megaMenu: HTMLElement) {
    if (menuTimer) clearTimeout(menuTimer);
    
    const megaIndex = Array.from(megaMenus).indexOf(megaMenu);
    const navLink = menuItems[megaIndex]?.querySelector('.gm-menu-link');
    
    if (activeMenu && activeMenu !== megaMenu) {
      const prevIndex = Array.from(megaMenus).indexOf(activeMenu);
      const prevNavLink = menuItems[prevIndex]?.querySelector('.gm-menu-link');
      prevNavLink?.classList.remove('mega-active');
      
      megaMenu.classList.add('show');
      navLink?.classList.add('mega-active');
      
      const oldMenu = activeMenu;
      setTimeout(() => {
        oldMenu.classList.remove('show');
      }, 150);
      
      activeMenu = megaMenu;
      return;
    }
    
    megaMenu.classList.add('show');
    navLink?.classList.add('mega-active');
    activeMenu = megaMenu;
  }

  function hideMegaMenu(delay = 5000) {
    if (menuTimer) clearTimeout(menuTimer);
    
    menuTimer = setTimeout(() => {
      if (activeMenu) {
        const megaIndex = Array.from(megaMenus).indexOf(activeMenu);
        const navLink = menuItems[megaIndex]?.querySelector('.gm-menu-link');
        navLink?.classList.remove('mega-active');
        
        activeMenu.classList.remove('show');
        activeMenu = null;
        
        setTimeout(() => {
          if (nav && !nav.matches(':hover') && window.scrollY > 50) {
            collapseNav();
          }
        }, 2000);
      }
    }, delay);
  }

  function cancelHide() {
    if (menuTimer) {
      clearTimeout(menuTimer);
      menuTimer = null;
    }
  }

  menuItems.forEach((item, index) => {
    const megaMenu = megaMenus[index] as HTMLElement;
    if (!megaMenu) return;

    item.addEventListener('mouseenter', () => {
      if (!isDesktop() || nav?.getAttribute('data-expanded') !== 'true') return;
      showMegaMenu(megaMenu);
    });

    item.addEventListener('mouseleave', () => {
      if (!isDesktop()) return;
      hideMegaMenu(1000);
    });

    megaMenu.addEventListener('mouseenter', () => {
      cancelHide();
    });

    megaMenu.addEventListener('mouseleave', () => {
      hideMegaMenu(1300);
    });
  });

  // Handle mobile two-column mega menus
  const mobileMegaToggles = document.querySelectorAll('[data-mobile-mega-toggle]');
  const mobilePanel = document.querySelector('.gm-mobile-panel') as HTMLElement | null;
  const mobileMegaColumn = document.querySelector('[data-mobile-mega-column]') as HTMLElement | null;
  
  mobileMegaToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetLabel = toggle.getAttribute('data-mobile-mega-toggle');
      const megaContent = document.querySelector(`[data-mobile-mega-content="${targetLabel}"]`) as HTMLElement | null;
      
      const isCurrentlyActive = toggle.classList.contains('selected');
      
      mobileMegaToggles.forEach(t => t.classList.remove('selected'));
      
      document.querySelectorAll('[data-mobile-mega-content]').forEach(content => {
        content.classList.remove('active');
      });
      
      if (!isCurrentlyActive && megaContent) {
        mobilePanel?.classList.add('expanded');
        mobileMegaColumn?.classList.add('show');
        toggle.classList.add('selected');
        megaContent.classList.add('active');
      } else {
        mobilePanel?.classList.remove('expanded');
        mobileMegaColumn?.classList.remove('show');
      }
    });
  });

  document.querySelectorAll('.gm-mobile-mega-link').forEach(link => {
    link.addEventListener('click', () => {
      mobilePanel?.classList.remove('expanded');
      mobileMegaColumn?.classList.remove('show');
      mobileMegaToggles.forEach(t => t.classList.remove('selected'));
      document.querySelectorAll('[data-mobile-mega-content]').forEach(content => {
        content.classList.remove('active');
      });
    });
  });

  document.querySelectorAll('[data-mobile-mega-content]').forEach(content => {
    content.querySelectorAll('.gm-mobile-mega-section').forEach(section => {
      const title = section.querySelector('.gm-mobile-mega-section-title');
      if (!title) return;
      title.addEventListener('click', () => {
        section.classList.toggle('open');
      });
    });
  });
}