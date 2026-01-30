# Installation Guide

## Quick Start

### Via Git

```bash
cd /path/to/drupal/modules/contrib
git clone https://github.com/mosboston-web/layout_builder_block_anchors.git
cd ../../../
drush en layout_builder_block_anchors -y
drush cr
```

### Manual Installation

1. Download this repository
2. Extract to `modules/contrib/layout_builder_block_anchors` or `modules/custom/layout_builder_block_anchors`
3. Enable the module:
   ```bash
   drush en layout_builder_block_anchors
   ```
4. Clear cache:
   ```bash
   drush cr
   ```

### Via Composer (if published to Packagist)

```bash
composer require drupal/layout_builder_block_anchors
drush en layout_builder_block_anchors -y
drush cr
```

## Configuration

No configuration required! The module works automatically once enabled.

## Usage

1. Navigate to any page with Layout Builder enabled
2. Click "Layout" button to enter edit mode
3. Hover over any block to see its contextual menu
4. Click "Copy Anchor Link" to copy the anchor link to clipboard
5. A success message will appear confirming the copy
6. Share the copied link to direct users to that specific block

## Verification

To verify the module is working:

1. Enable the module and clear cache
2. Edit a Layout Builder page
3. Inspect a block's HTML - it should have an `id` attribute like `id="block-abc123-def456-..."`
4. Open the block's contextual menu - you should see "Copy Anchor Link" option
5. Click it - you should see a success message and the link should be in your clipboard

## Browser Requirements

- **Modern browsers**: Chrome, Firefox, Safari, Edge (uses Clipboard API)
- **Older browsers**: Fallback using `document.execCommand()` for IE11 and older

## Accessibility Features

- ARIA attributes for screen readers
- 5-second message timeout (configurable in JS)
- Manual dismiss button (×) for messages
- Keyboard accessible close button

## Troubleshooting

### "Copy Anchor Link" doesn't appear
- Clear Drupal cache: `drush cr`
- Verify module is enabled: `drush pml | grep layout_builder_block_anchors`
- Check browser console for JavaScript errors

### Link doesn't copy
- Try using HTTPS (Clipboard API requires secure context)
- Check browser permissions for clipboard access
- Try a different browser

### Anchor doesn't scroll
- Verify block has the ID attribute (inspect HTML)
- Check for CSS that might prevent scrolling (e.g., `scroll-behavior: auto`)

## Uninstallation

```bash
drush pmu layout_builder_block_anchors -y
```

The module doesn't store any data, so uninstallation is clean.
