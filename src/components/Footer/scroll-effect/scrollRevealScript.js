// Footer scroll reveal functionality
export function initScrollReveal() {
  let isAtBottom = false;
  let ticking = false;

  function updateScrollState() {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    
    // Calculate how much is left to scroll
    const remainingScroll = scrollHeight - scrollTop - clientHeight;
    
    // Fixed distance from bottom to match desired reveal height
    // Adjust this value to control how much footer shows underneath
    const nearBottom = remainingScroll <= 400 && remainingScroll >= 0;
    
    if (nearBottom && !isAtBottom) {
      isAtBottom = true;
      document.body.classList.add('tight');
    } else if (!nearBottom && isAtBottom) {
      isAtBottom = false;
      document.body.classList.remove('tight');
    }
    
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  }

  // Scroll event listener
  window.addEventListener('scroll', requestTick);

  // Click handler for scaled content to scroll back up
  document.querySelector('.wrapper')?.addEventListener('click', (event) => {
    // Don't scroll if clicking on ANY navigation elements or interactive elements
    if (event.target.closest('.gm-nav') || 
        event.target.closest('nav') || 
        event.target.closest('button') ||
        event.target.closest('a') ||
        event.target.closest('[data-nav-desktop]') ||
        event.target.closest('[data-nav-mobile]')) {
      console.log('Scroll prevented - clicked on nav element:', event.target);
      return;
    }
    
    if (isAtBottom) {
      console.log('Scrolling to top from footer reveal');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });

  // Initial check
  updateScrollState();
}