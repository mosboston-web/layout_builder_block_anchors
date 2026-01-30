/**
 * @file
 * Provides functionality to copy anchor links to clipboard.
 */

(function (Drupal) {
  'use strict';

  /**
   * Behavior to attach click handlers to copy anchor link buttons.
   */
  Drupal.behaviors.copyAnchorLink = {
    attach: function (context, settings) {
      // Find all copy anchor link items.
      const copyLinks = context.querySelectorAll('.copy-anchor-link');
      
      copyLinks.forEach(function (link) {
        // Skip if already processed.
        if (link.dataset.anchorLinkProcessed) {
          return;
        }
        link.dataset.anchorLinkProcessed = 'true';
        
        link.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          
          // Get the block UUID from the data attribute.
          const blockUuid = this.dataset.blockUuid;
          if (!blockUuid) {
            return;
          }
          
          // Construct the anchor link.
          const currentUrl = window.location.href.split('#')[0];
          const anchorLink = currentUrl + '#block-' + blockUuid;
          
          // Copy to clipboard.
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(anchorLink).then(function () {
              // Show success message.
              showMessage('Anchor link copied to clipboard!');
            }).catch(function (err) {
              console.error('Failed to copy anchor link:', err);
              showMessage('Failed to copy anchor link.', 'error');
            });
          } else {
            // Fallback for older browsers.
            const textArea = document.createElement('textarea');
            textArea.value = anchorLink;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
              document.execCommand('copy');
              showMessage('Anchor link copied to clipboard!');
            } catch (err) {
              console.error('Failed to copy anchor link:', err);
              showMessage('Failed to copy anchor link.', 'error');
            }
            
            document.body.removeChild(textArea);
          }
        });
      });
    }
  };

  /**
   * Show a temporary message to the user.
   */
  function showMessage(message, type) {
    type = type || 'status';
    
    // Create message element.
    const messageEl = document.createElement('div');
    messageEl.className = 'messages messages--' + type;
    messageEl.setAttribute('role', type === 'error' ? 'alert' : 'status');
    messageEl.setAttribute('aria-live', 'polite');
    messageEl.textContent = message;
    messageEl.style.position = 'fixed';
    messageEl.style.top = '20px';
    messageEl.style.right = '20px';
    messageEl.style.zIndex = '10000';
    messageEl.style.padding = '10px 20px';
    messageEl.style.backgroundColor = type === 'error' ? '#f8d7da' : '#d4edda';
    messageEl.style.border = '1px solid ' + (type === 'error' ? '#f5c6cb' : '#c3e6cb');
    messageEl.style.color = type === 'error' ? '#721c24' : '#155724';
    messageEl.style.borderRadius = '4px';
    
    document.body.appendChild(messageEl);
    
    // Remove after 3 seconds.
    setTimeout(function () {
      messageEl.remove();
    }, 3000);
  }

})(Drupal);
