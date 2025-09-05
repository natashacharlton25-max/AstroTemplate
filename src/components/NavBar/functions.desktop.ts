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

    // Clear any pending timers to avoid conflicts
    if (idleTimer) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }
    if (menuTimer) {
      clearTimeout(menuTimer);
      menuTimer = null;
    }

    // Protect logo before transition
    const logoElements = $nav.querySelectorAll('.gm-logo, .gm-brand, .gm-logo-section');
    logoElements.forEach(el => {
      (el as HTMLElement).style.setProperty('opacity', '1', 'important');
      (el as HTMLElement).style.setProperty('visibility', 'visible', 'important');
      (el as HTMLElement).style.setProperty('transform', 'none', 'important');
      (el as HTMLElement).style.setProperty('transition', 'none', 'important');
    });

    if (triggerType === 'scroll') transitionManager.useScrollTransition();
    else if (triggerType === 'hover') transitionManager.useHoverTransition();
    else transitionManager.useSmoothTransition();

    $nav.setAttribute('data-collapsed', 'true');
    $nav.removeAttribute('data-expanded');
    
    // CRITICAL: For timer-based collapses, clean up all transition classes after animation completes
    if (triggerType === 'timer') {
      setTimeout(() => {
        // Remove all transition classes to prevent scroll jerk
        $nav.classList.remove('transition-scroll', 'transition-smooth', 'transition-hover');
        
        // Reset navbar height in case there are leftover mega menu effects
        $nav.style.minHeight = '';
        
        // Ensure final state is clean
        const megaMenuContainer = $nav.querySelector('.gm-megamenu-container');
        if (megaMenuContainer) {
          $nav.classList.remove('megamenu-active');
          (megaMenuContainer as HTMLElement).classList.remove('active');
          (megaMenuContainer as HTMLElement).style.maxHeight = '';
          (megaMenuContainer as HTMLElement).style.minHeight = '';
        }
      }, 800); // Wait for transitions to complete
    }
  }

  function expandNav(triggerType: 'scroll' | 'timer' | 'hover' = 'timer') {
    if (!isDesktop()) return;

    // Clear any pending timers to avoid conflicts
    if (idleTimer) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }
    if (menuTimer) {
      clearTimeout(menuTimer);
      menuTimer = null;
    }

    // Protect logo before transition
    const logoElements = $nav.querySelectorAll('.gm-logo, .gm-brand, .gm-logo-section');
    logoElements.forEach(el => {
      (el as HTMLElement).style.setProperty('opacity', '1', 'important');
      (el as HTMLElement).style.setProperty('visibility', 'visible', 'important');
      (el as HTMLElement).style.setProperty('transform', 'none', 'important');
      (el as HTMLElement).style.setProperty('transition', 'none', 'important');
    });

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
    const isCurrentlyCollapsed = $nav.getAttribute('data-collapsed') === 'true';
    const isCurrentlyExpanded = $nav.getAttribute('data-expanded') === 'true';
    
    if (scrolled) {
      // Only collapse if not already collapsed - prevent redundant transitions
      if (!isCurrentlyCollapsed) {
        // CRITICAL: Clear all pending transitions immediately
        cancelIdleTimer();
        if (menuTimer) {
          clearTimeout(menuTimer);
          menuTimer = null;
        }
        
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
        
        // Clean up any mega menu container state from the old system
        if ($megaContainer) {
          $megaContainer.classList.remove('show');
          $megaContainer.style.height = '';
        }
        
        // Ensure logo visibility before collapsing
        const logoElements = $nav.querySelectorAll('.gm-logo, .gm-brand, .gm-logo-section');
        logoElements.forEach(el => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.visibility = 'visible';
          (el as HTMLElement).style.transform = 'none';
        });
        
        collapseNav('scroll');
      }
      // If already collapsed, do nothing to prevent jerkiness
      else {
        // EXTRA SAFETY: Remove any lingering transition classes on collapsed nav
        $nav.classList.remove('transition-scroll', 'transition-smooth', 'transition-hover');
      }
    } else if (!$nav.matches(':hover')) {
      // Only expand if not already expanded - prevent redundant transitions
      if (!isCurrentlyExpanded) {
        // Ensure logo visibility before expanding
        const logoElements = $nav.querySelectorAll('.gm-logo, .gm-brand, .gm-logo-section');
        logoElements.forEach(el => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.visibility = 'visible';
          (el as HTMLElement).style.transform = 'none';
        });
        
        expandNav('timer');
        scheduleCollapse();
      }
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
      // Handle old mega menu system
      if (activeMenu) {
        hideMegaMenu(1000);
      }
      
      // Handle new dynamic mega menu system with proper fade timing
      const megaMenuContainer = $nav.querySelector('.gm-megamenu-container');
      if (megaMenuContainer && megaMenuContainer.classList.contains('active')) {
        setTimeout(() => {
          // Double-check mouse isn't over the mega menu container
          if (!megaMenuContainer.matches(':hover') && !$nav.matches(':hover')) {
            // Use the proper hideMegaMenu function for coordinated timing
            const currentActive = $nav.querySelector('.gm-megamenu-panel.active');
            if (currentActive) {
              currentActive.classList.remove('active');
            }
            
            // Wait for content fade, then collapse background
            setTimeout(() => {
              $nav.classList.remove('megamenu-active');
              (megaMenuContainer as HTMLElement).classList.remove('active');
              (megaMenuContainer as HTMLElement).style.maxHeight = '';
              (megaMenuContainer as HTMLElement).style.minHeight = '';
              
              const megaMenuPanels = $nav.querySelectorAll('.gm-megamenu-panel');
              megaMenuPanels.forEach(panel => {
                panel.classList.remove('active');
              });
              
              // Reset navbar height after background collapse
              setTimeout(() => {
                $nav.style.minHeight = '';
              }, 500);
            }, 400); // Wait for content fade
          }
        }, 300); // Small delay to allow moving to mega menu
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
        // Hide both old and new mega menu systems
        hideMegaMenu(200);
        
        // Also hide the new dynamic mega menu system
        const megaMenuContainer = $nav.querySelector('.gm-megamenu-container');
        if (megaMenuContainer && megaMenuContainer.classList.contains('active')) {
          $nav.classList.remove('megamenu-active');
          megaMenuContainer.classList.remove('active');
          const megaMenuPanels = $nav.querySelectorAll('.gm-megamenu-panel');
          megaMenuPanels.forEach(panel => {
            panel.classList.remove('active');
          });
          // Reset navbar height
          $nav.style.minHeight = '';
        }
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
  const megaMenuContainer = nav.querySelector('.gm-megamenu-container') as HTMLElement;
  const megaMenuPanels = nav.querySelectorAll('.gm-megamenu-panel');
  const navSection = nav.querySelector('.gmd-menu-section');
  let currentActiveMegaMenu: Element | null = null;
  let megaMenuTimer: ReturnType<typeof setTimeout> | null = null;
  let isTransitioning = false;
  let heightCache = new Map<string, number>(); // Cache heights to avoid recalculation
  
  function calculatePanelHeight(panel: Element): number {
    // Create a temporary clone to measure height
    const clone = panel.cloneNode(true) as HTMLElement;
    clone.style.cssText = `
      position: absolute;
      visibility: hidden;
      opacity: 1;
      transform: translateX(0);
      pointer-events: none;
      top: 0;
      left: 0;
      right: 0;
      height: auto;
      max-height: none;
    `;
    panel.parentElement?.appendChild(clone);
    const height = clone.offsetHeight;
    clone.remove();
    return height;
  }
  
  function updateContainerHeight(targetPanel: Element) {
    if (!megaMenuContainer) return;
    
    const panelId = targetPanel.getAttribute('data-megamenu-for') || '';
    const screenWidth = window.innerWidth;
    const cacheKey = `${panelId}_${Math.floor(screenWidth / 100)}00`; // Group by 100px increments
    
    let panelHeight: number;
    if (heightCache.has(cacheKey)) {
      panelHeight = heightCache.get(cacheKey)!;
    } else {
      panelHeight = calculatePanelHeight(targetPanel);
      heightCache.set(cacheKey, panelHeight);
    }
    
    const totalHeight = panelHeight + 48; // Add padding (24px top + 24px bottom)
    
    // Responsive minimum heights based on screen size
    let minHeight = 300; // Default
    
    if (screenWidth >= 1024 && screenWidth < 1200) {
      minHeight = 330; // Smaller desktop screens
    } else if (screenWidth >= 1200 && screenWidth < 1400) {
      minHeight = 310; // Medium desktop screens  
    } else if (screenWidth >= 1400) {
      minHeight = 290; // Large desktop screens
    }
    
    const finalHeight = Math.max(minHeight, totalHeight);
    
    // Update mega menu container height
    megaMenuContainer.style.maxHeight = `${finalHeight}px`;
    megaMenuContainer.style.minHeight = `${finalHeight}px`;
    
    // CRITICAL: Update the navbar container to expand and contain the mega menu
    const navHeight = 60; // var(--nav-height) is typically 60px
    const totalNavHeight = navHeight + finalHeight;
    nav.style.minHeight = `${totalNavHeight}px`;
  }
  
  function showMegaMenu(menuTrigger: string) {
    if (!megaMenuContainer) return;
    
    const targetPanel = nav.querySelector(`[data-megamenu-for="${menuTrigger}"]`);
    if (!targetPanel) return;
    
    // If showing the same menu, do nothing
    if (currentActiveMegaMenu === targetPanel && megaMenuContainer.classList.contains('active')) {
      return;
    }
    
    // If transitioning and this is a rapid switch, handle immediately
    if (isTransitioning) {
      isTransitioning = false; // Reset transition state
    }
    
    isTransitioning = true;
    
    // If this is a different panel than current, do smooth transition
    if (currentActiveMegaMenu && currentActiveMegaMenu !== targetPanel) {
      // Fade out current panel immediately for fast switching
      currentActiveMegaMenu.classList.remove('active');
      
      // Update container height for new content immediately
      updateContainerHeight(targetPanel);
      
      // Minimal delay for smooth transition
      setTimeout(() => {
        megaMenuPanels.forEach(panel => {
          if (panel !== targetPanel) {
            panel.classList.remove('active');
          }
        });
        
        targetPanel.classList.add('active');
        currentActiveMegaMenu = targetPanel;
        
        setTimeout(() => {
          isTransitioning = false;
        }, 300); // Reduced for faster switching
      }, 100); // Reduced delay for responsiveness
      
    } else {
      // First time showing or same panel
      megaMenuPanels.forEach(panel => {
        panel.classList.remove('active');
      });
      
      if (!megaMenuContainer.classList.contains('active')) {
        nav.classList.add('megamenu-active');
        megaMenuContainer.classList.add('active');
      }
      
      updateContainerHeight(targetPanel);
      
      // Small delay to ensure container starts expanding before content appears
      setTimeout(() => {
        targetPanel.classList.add('active');
        currentActiveMegaMenu = targetPanel;
        
        setTimeout(() => {
          isTransitioning = false;
        }, 200); // Reduced timeout
      }, 50); // Reduced delay
    }
  }
  
  function hideMegaMenu() {
    if (!megaMenuContainer || isTransitioning) return;
    
    isTransitioning = true;
    
    // First fade out the active panel
    if (currentActiveMegaMenu) {
      currentActiveMegaMenu.classList.remove('active');
    }
    
    // Wait for content fade to complete, THEN collapse the background
    setTimeout(() => {
      nav.classList.remove('megamenu-active');
      megaMenuContainer.classList.remove('active');
      megaMenuContainer.style.maxHeight = '';
      megaMenuContainer.style.minHeight = '';
      
      megaMenuPanels.forEach(panel => {
        panel.classList.remove('active');
      });
      
      currentActiveMegaMenu = null;
      
      // Reset navbar height AFTER container transition completes
      setTimeout(() => {
        nav.style.minHeight = '';
        isTransitioning = false;
      }, 500); // Wait for container collapse transition
    }, 400); // Wait for panel fade-out (CSS transition is 400ms)
  }
  
  // Add scroll listener to hide megamenu on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50 && currentActiveMegaMenu) {
      hideMegaMenu();
    }
  }, { passive: true });
  
  // Add resize listener to recalculate mega menu height
  window.addEventListener('resize', () => {
    if (currentActiveMegaMenu && megaMenuContainer.classList.contains('active')) {
      updateContainerHeight(currentActiveMegaMenu);
    }
  }, { passive: true });
  
  function clearMegaMenuTimer() {
    if (megaMenuTimer) {
      clearTimeout(megaMenuTimer);
      megaMenuTimer = null;
    }
  }
  
  // Add hover listeners to ALL nav links (both mega menu and non-mega menu)
  const allNavLinks = nav.querySelectorAll('.gmd-menu-link');
  allNavLinks.forEach(link => {
    const menuTrigger = link.getAttribute('data-megamenu-trigger');
    
    link.addEventListener('mouseenter', () => {
      clearMegaMenuTimer();
      
      if (menuTrigger) {
        // This link has a mega menu - show it
        showMegaMenu(menuTrigger);
      } else {
        // This link doesn't have a mega menu - hide any open mega menu
        if (currentActiveMegaMenu) {
          hideMegaMenu();
        }
      }
    });
  });
  
  // Add hover and click listeners to nav links with megamenus for click support
  menuLinks.forEach(link => {
    const menuTrigger = link.getAttribute('data-megamenu-trigger');
    if (!menuTrigger) return;
    
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
  
  // Handle nav section mouse leave with better detection
  if (navSection) {
    navSection.addEventListener('mouseleave', (event) => {
      // Only hide if mouse is truly leaving the nav area (not moving to mega menu)
      megaMenuTimer = setTimeout(() => {
        // Double check that mouse isn't over mega menu or returning to nav
        if (megaMenuContainer && !megaMenuContainer.matches(':hover') && !navSection.matches(':hover')) {
          hideMegaMenu();
        }
      }, 100); // Reduced delay for more responsive hiding
    });
  }
  
  // Nav mouseleave is already handled above in the main nav event handler
  
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