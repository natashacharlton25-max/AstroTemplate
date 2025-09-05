export async function initDesktopNav() {
  const nav = document.querySelector('[data-nav-desktop]') as HTMLElement | null;
  if (!nav) return;

  // Non-null alias for TypeScript (guard above ensures nav exists)
  const $nav = nav as HTMLElement;
  
  // Initialize dynamic megamenu functionality first
  initDynamicMegaMenu($nav);

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
      // Fast collapse on any scroll - hide megamenu immediately
      const megaMenuContainer = $nav.querySelector('.gm-megamenu-container');
      if (megaMenuContainer) {
        $nav.classList.remove('megamenu-active');
        megaMenuContainer.classList.remove('active');
        const megaMenuPanels = $nav.querySelectorAll('.gm-megamenu-panel');
        megaMenuPanels.forEach(panel => {
          panel.classList.remove('active');
        });
      }
      
      // Also handle old megamenu system if still present
      if (activeMenu) {
        const megaIndex = Array.from(megaMenus).indexOf(activeMenu);
        const navLink = menuItems[megaIndex]?.querySelector('.gmd-menu-link');
        navLink?.classList.remove('mega-active');
        activeMenu.classList.remove('show');
        activeMenu = null;
      }
      
      collapseNav('scroll');
      cancelIdleTimer();
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

  // Prevent logo from navigating to home when nav is collapsed (just expand instead)
  const logoLink = $nav.querySelector('.gm-brand');
  if (logoLink) {
    logoLink.addEventListener('click', (event) => {
      if (isDesktop() && $nav.getAttribute('data-collapsed') === 'true') {
        event.preventDefault();
        event.stopPropagation();
        console.log('Logo clicked - expanding nav instead of navigating');
        expandNav('hover');
      }
    });
  }

  // Add comprehensive click prevention for collapsed nav
  $nav.addEventListener('click', (event) => {
    if (isDesktop() && $nav.getAttribute('data-collapsed') === 'true') {
      // If clicking on nav when collapsed, prevent all default behaviors
      event.preventDefault();
      event.stopPropagation();
      console.log('Nav clicked while collapsed - expanding');
      expandNav('hover');
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

function initDynamicMegaMenu(nav: HTMLElement) {
  const menuLinks = nav.querySelectorAll('[data-megamenu-trigger]');
  const megaMenuContainer = nav.querySelector('.gm-megamenu-container');
  const megaMenuPanels = nav.querySelectorAll('.gm-megamenu-panel');
  const navSection = nav.querySelector('.gmd-menu-section');
  let currentActiveMegaMenu: Element | null = null;
  let megaMenuTimer: ReturnType<typeof setTimeout> | null = null;
  
  function showMegaMenu(menuTrigger: string) {
    if (!megaMenuContainer) return;
    
    // Hide all megamenu panels
    megaMenuPanels.forEach(panel => {
      panel.classList.remove('active');
    });
    
    // Show the corresponding megamenu panel
    const targetPanel = nav.querySelector(`[data-megamenu-for="${menuTrigger}"]`);
    if (targetPanel) {
      nav.classList.add('megamenu-active');
      megaMenuContainer.classList.add('active');
      targetPanel.classList.add('active');
      currentActiveMegaMenu = targetPanel;
    }
  }
  
  function hideMegaMenu() {
    if (!megaMenuContainer) return;
    
    nav.classList.remove('megamenu-active');
    megaMenuContainer.classList.remove('active');
    megaMenuPanels.forEach(panel => {
      panel.classList.remove('active');
    });
    currentActiveMegaMenu = null;
  }
  
  // Add scroll listener to hide megamenu on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50 && currentActiveMegaMenu) {
      hideMegaMenu();
    }
  }, { passive: true });
  
  function clearMegaMenuTimer() {
    if (megaMenuTimer) {
      clearTimeout(megaMenuTimer);
      megaMenuTimer = null;
    }
  }
  
  // Add hover and click listeners to nav links with megamenus
  menuLinks.forEach(link => {
    const menuTrigger = link.getAttribute('data-megamenu-trigger');
    if (!menuTrigger) return;
    
    // Hover support for desktop
    link.addEventListener('mouseenter', () => {
      clearMegaMenuTimer();
      showMegaMenu(menuTrigger);
    });
    
    // Click support for touch devices (tablets/mobile)
    link.addEventListener('click', (event) => {
      // Only prevent default if megamenu is being toggled
      const isCurrentlyActive = currentActiveMegaMenu && 
        currentActiveMegaMenu.getAttribute('data-megamenu-for') === menuTrigger;
      
      if (isCurrentlyActive) {
        // If clicking same item, hide megamenu
        event.preventDefault();
        hideMegaMenu();
      } else {
        // If clicking different item or no megamenu open, show it
        event.preventDefault();
        clearMegaMenuTimer();
        showMegaMenu(menuTrigger);
      }
    });
  });
  
  // Handle nav section mouse leave
  if (navSection) {
    navSection.addEventListener('mouseleave', () => {
      megaMenuTimer = setTimeout(() => {
        if (megaMenuContainer && !megaMenuContainer.matches(':hover')) {
          hideMegaMenu();
        }
      }, 150);
    });
  }
  
  // Keep megamenu open when hovering over container
  if (megaMenuContainer) {
    megaMenuContainer.addEventListener('mouseenter', () => {
      clearMegaMenuTimer();
    });
    
    megaMenuContainer.addEventListener('mouseleave', () => {
      hideMegaMenu();
    });
  }
  
  // Close megamenu when clicking outside on touch devices
  document.addEventListener('click', (event) => {
    if (currentActiveMegaMenu && !(event.target && (event.target as Element).closest('.gm-nav'))) {
      hideMegaMenu();
    }
  });
}