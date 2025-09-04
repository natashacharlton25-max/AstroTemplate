export async function initDesktopNav() {
  const nav = document.querySelector('[data-nav-desktop]') as HTMLElement | null;
  if (!nav) return;

  // Non-null alias for TypeScript (guard above ensures nav exists)
  const $nav = nav as HTMLElement;

  // Initialize transition manager - Per README, this is desktop-only
  const { TransitionManager } = await import('./transitions/transitionManager.js');
  const transitionManager = new TransitionManager(nav);

  const IDLE_DELAY = 7000;
  let idleTimer: ReturnType<typeof setTimeout> | null;
  let activeMenu: HTMLElement | null = null;
  let menuTimer: ReturnType<typeof setTimeout> | null = null;

  // Scoped Elements
  const menuItems = $nav.querySelectorAll('.gmd-menu-item[data-mega-menu]');
  const megaMenus = $nav.querySelectorAll('.gmd-mega-menu');
  const megaContainer = $nav.querySelector('.gmd-mega-menu-container');

  const $menuItems = menuItems as NodeListOf<HTMLElement>;
  const $megaMenus = megaMenus as NodeListOf<HTMLElement>;
  const $megaContainer = megaContainer as HTMLElement | null;

  function isDesktop() {
    return window.matchMedia('(min-width: 1024px)').matches;
  }

  function cancelIdleTimer() {
    if (idleTimer) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }
  }

  function collapseNav(triggerType: 'scroll' | 'timer' | 'hover' = 'timer') {
    if (!isDesktop()) return;

    if (triggerType === 'scroll') transitionManager.useScrollTransition();
    else if (triggerType === 'hover') transitionManager.useHoverTransition();
    else transitionManager.useSmoothTransition();

  $nav.setAttribute('data-collapsed', 'true');
  $nav.removeAttribute('data-expanded');

  }

  function expandNav(triggerType: 'scroll' | 'timer' | 'hover' = 'timer') {
    if (!isDesktop()) return;

    if (triggerType === 'scroll') transitionManager.useScrollTransition();
    else if (triggerType === 'hover') transitionManager.useHoverTransition();
    else transitionManager.useSmoothTransition();

  $nav.removeAttribute('data-collapsed');
  $nav.setAttribute('data-expanded', 'true');
  }

  function scheduleCollapse(delay = IDLE_DELAY) {
    if (!isDesktop()) return;
    cancelIdleTimer();
    idleTimer = setTimeout(() => {
      if (activeMenu) {
        activeMenu.classList.remove('show');
        activeMenu = null;
        setTimeout(() => collapseNav('timer'), 1200);
      } else {
        collapseNav('timer');
      }
    }, delay);
  }

  function showMegaMenu(megaMenu: HTMLElement) {
    if (menuTimer) clearTimeout(menuTimer);

    const megaIndex = Array.from(megaMenus).indexOf(megaMenu);
    const navLink = menuItems[megaIndex]?.querySelector('.gmd-menu-link');

    megaMenus.forEach(menu => menu.classList.remove('show'));
    menuItems.forEach(item => {
      item.querySelector('.gmd-menu-link')?.classList.remove('mega-active');
    });

    if (megaContainer && !megaContainer.classList.contains('show')) {
      megaContainer.classList.add('show');
      (megaContainer as HTMLElement).style.height = '';
    }

    megaMenu.classList.add('show');
    navLink?.classList.add('mega-active');
    activeMenu = megaMenu;
  }

  function hideMegaMenu(delay = 5000) {
    if (menuTimer) clearTimeout(menuTimer);

    menuTimer = setTimeout(() => {
      activeMenu = null;

      $megaMenus.forEach(menu => menu.classList.remove('show'));
      $menuItems.forEach(item => {
        item.querySelector('.gmd-menu-link')?.classList.remove('mega-active');
      });

      if ($megaContainer) {
        $megaContainer.classList.remove('show');
        $megaContainer.style.height = '';

        setTimeout(() => {
          if (!$nav.matches(':hover') && window.scrollY > 50) {
            collapseNav('timer');
          }
        }, 800);
      }
    }, delay <= 300 ? 0 : delay);
  }

  function cancelHide() {
    if (menuTimer) {
      clearTimeout(menuTimer);
      menuTimer = null;
    }
  }

  function handleScroll() {
    if (!isDesktop()) return;

    const scrolled = window.scrollY > 50;
    if (scrolled) {
  const isHoveringNav = $nav.matches(':hover');
      const isHoveringMegaMenu = activeMenu && activeMenu.matches(':hover');

      if (!isHoveringNav && !isHoveringMegaMenu) {
        if (activeMenu) {
          const megaIndex = Array.from(megaMenus).indexOf(activeMenu);
          const navLink = menuItems[megaIndex]?.querySelector('.gmd-menu-link');
          navLink?.classList.remove('mega-active');
          activeMenu.classList.remove('show');
          activeMenu = null;
        }
        collapseNav('scroll');
        cancelIdleTimer();
      }
  } else if (!$nav.matches(':hover')) {
      expandNav('timer');
      scheduleCollapse();
    }
  }

  function handleResize() {
    if (isDesktop()) {
      if (window.scrollY <= 50) {
        expandNav('timer');
        scheduleCollapse();
      } else {
        collapseNav('timer');
      }
    } else {
      $nav.removeAttribute('data-collapsed');
      $nav.removeAttribute('data-expanded');
    }
  }

  // --- Event Listeners ---

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && isDesktop()) {
      collapseNav('timer');
    }
  });

  $nav.addEventListener('mouseenter', () => {
    if (isDesktop()) {
      cancelIdleTimer();
      if ($nav.getAttribute('data-collapsed') === 'true') {
        expandNav('hover');
      }
    }
  });

  $nav.addEventListener('mouseleave', () => {
    if (isDesktop()) {
      if (activeMenu) {
        hideMegaMenu(1000);
      } else {
        scheduleCollapse(1000);
      }
    }
  });

  const allMenuItems = $nav.querySelectorAll('.gmd-menu-item');
  allMenuItems.forEach((item, index) => {
    (item as HTMLElement).style.setProperty('--item-index', index.toString());
  });

  allMenuItems.forEach((item) => {
    const hasMegaMenu = item.hasAttribute('data-mega-menu');
    if (hasMegaMenu) {
  const index = Array.from($menuItems).indexOf(item as HTMLElement);
  const megaMenu = $megaMenus[index] as HTMLElement;
      if (!megaMenu) return;

      item.addEventListener('mouseenter', () => {
  if (!isDesktop() || $nav.getAttribute('data-expanded') !== 'true') return;
        cancelHide();
        showMegaMenu(megaMenu);
      });
      item.addEventListener('mouseleave', () => {
        if (!isDesktop()) return;
        hideMegaMenu(1000);
      });
    } else {
      item.addEventListener('mouseenter', () => {
  if (!isDesktop() || $nav.getAttribute('data-expanded') !== 'true') return;
        hideMegaMenu(200);
      });
    }
  });

  if ($megaContainer) {
    $megaContainer.addEventListener('mouseenter', cancelHide);
    $megaContainer.addEventListener('mouseleave', () => hideMegaMenu(1300));
  }

  const menuSection = $nav.querySelector('.gmd-menu-section');
  if (menuSection) {
    menuSection.addEventListener('mouseleave', () => {
      if (!isDesktop()) return;
      hideMegaMenu(500);
    });
  }

  // Initial state setup
  handleResize();
  handleScroll();
}