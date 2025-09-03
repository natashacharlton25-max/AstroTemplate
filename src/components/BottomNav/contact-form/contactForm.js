// Contact Form Functionality
export function initContactForm() {
  const pageIndicator = document.querySelector('[data-current-page]');
  const pageCheckbox = document.querySelector('[data-page-specific]');
  const contactForm = document.querySelector('[data-contact-form]');
  const messageTextarea = document.querySelector('#contact-message');
  
  // Get current page information
  const currentPath = window.location.pathname;
  const pageName = currentPath === '/' ? 'Home' : 
                  currentPath.replace(/^\//, '').replace(/\/$/, '').split('/').pop() || 'Current Page';
  
  // Set page indicator text
  if (pageIndicator) {
    pageIndicator.textContent = `📄 ${pageName}`;
  }
  
  // Handle page-specific checkbox
  if (pageCheckbox && messageTextarea) {
    pageCheckbox.addEventListener('change', () => {
      if (pageCheckbox.checked) {
        // Add page information to message
        const currentMessage = messageTextarea.value.trim();
        const pageInfo = `\n\n--- Page Information ---\nPage: ${pageName}\nURL: ${window.location.href}\nUser Agent: ${navigator.userAgent}\nTimestamp: ${new Date().toISOString()}`;
        
        if (!currentMessage.includes('--- Page Information ---')) {
          messageTextarea.value = currentMessage + pageInfo;
        }
      } else {
        // Remove page information from message
        const currentMessage = messageTextarea.value;
        const pageInfoIndex = currentMessage.indexOf('\n\n--- Page Information ---');
        if (pageInfoIndex > -1) {
          messageTextarea.value = currentMessage.substring(0, pageInfoIndex);
        }
      }
    });
  }
  
  // Handle form submission
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.contact-submit-btn');
      if (!submitBtn) return;
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = `
        <svg class="submit-icon animate-spin" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        Sending...
      `;
      submitBtn.disabled = true;
      
      try {
        // Get form data
        const formData = new FormData(contactForm);
        
        // Here you would typically send the data to your backend
        // For now, we'll simulate a successful submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success state
        submitBtn.innerHTML = `
          <svg class="submit-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Message Sent!
        `;
        
        // Reset form after success
        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          
          // Close the overlay after successful submission
          const emailOverlay = document.querySelector('[data-overlay-screen="email"]');
          if (emailOverlay) {
            emailOverlay.classList.remove('show');
            document.body.style.overflow = '';
          }
        }, 2000);
        
      } catch (error) {
        console.error('Error sending message:', error);
        
        // Show error state
        submitBtn.innerHTML = `
          <svg class="submit-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          Try Again
        `;
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }
}