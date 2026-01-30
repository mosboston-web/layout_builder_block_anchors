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
              const successful = document.execCommand('copy');
              if (successful) {
                showMessage('Anchor link copied to clipboard!');
              } else {
                showMessage('Failed to copy anchor link.', 'error');
              }
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

    // Remove any existing messages to prevent overlap.
    const existingMessages = document.querySelectorAll('.layout-builder-block-anchors-message');
    existingMessages.forEach(function (msg) {
      msg.remove();
    });

    // Create message element.
    const messageEl = document.createElement('div');
    messageEl.className = 'messages messages--' + type + ' layout-builder-block-anchors-message';
    messageEl.setAttribute('role', type === 'error' ? 'alert' : 'status');
    messageEl.setAttribute('aria-live', 'polite');
    messageEl.setAttribute('aria-atomic', 'true');

    // Create message text.
    const messageText = document.createElement('span');
    messageText.textContent = message;
    messageEl.appendChild(messageText);

    // Create close button for accessibility.
    const closeButton = document.createElement('button');
    closeButton.className = 'layout-builder-block-anchors-message-close';
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('aria-label', 'Close message');
    closeButton.textContent = '×';
    closeButton.addEventListener('click', function () {
      messageEl.remove();
    });
    messageEl.appendChild(closeButton);

    document.body.appendChild(messageEl);

    // Remove after 5 seconds for better accessibility.
    setTimeout(function () {
      if (messageEl.parentNode) {
        messageEl.remove();
      }
    }, 5000);
  }

})(Drupal);
