# Layout Builder Block Anchors

A Drupal module that adds anchorable UUIDs to layout builder blocks with a site builder menu item for copying anchored links.

## Features

- **Automatic Block IDs**: Adds UUID-based HTML ID attributes to all layout builder blocks on the frontend (e.g., `id="block-abc123-def456-..."`)
- **Copy Anchor Link**: Adds a "Copy Anchor Link" option to the contextual menu of layout builder blocks (alongside Configure, Move, and Remove Block)
- **Clipboard Integration**: Clicking "Copy Anchor Link" copies the full URL with anchor to the user's clipboard
- **User Feedback**: Displays a temporary success message when the link is copied

## Requirements

- Drupal 9, 10, or 11
- Layout Builder module (core)

## Installation

1. Download or clone this module into your `modules/contrib` or `modules/custom` directory
2. Enable the module: `drush en layout_builder_block_anchors`
3. Clear cache: `drush cr`

## Usage

1. Navigate to a page with Layout Builder enabled
2. Click "Layout" to enter edit mode
3. Hover over any block to reveal its contextual menu
4. Click the new "Copy Anchor Link" option
5. The full URL with anchor (e.g., `https://example.com/page#block-abc123-def456-...`) is copied to your clipboard
6. Share this link with others to direct them to the specific block on the page

## How It Works

### Frontend Block IDs

The module implements `hook_block_view_alter()` to add a UUID-based HTML ID to each layout builder block. This ID is based on the block's unique identifier and follows the pattern `block-{UUID}`.

### Contextual Menu Integration

The module implements `hook_contextual_links_view_alter()` to add a "Copy Anchor Link" option to the contextual menu of layout builder blocks. This appears alongside the standard Configure, Move, and Remove Block options.

### JavaScript Clipboard Handling

When clicked, the JavaScript library:
1. Extracts the block's UUID from the data attribute
2. Constructs the full anchor link using the current page URL
3. Copies the link to the clipboard using the Clipboard API (with fallback for older browsers)
4. Displays a success message to the user

## Technical Details

### Files Structure

```
layout_builder_block_anchors/
├── layout_builder_block_anchors.info.yml       # Module definition
├── layout_builder_block_anchors.module         # Hook implementations
├── layout_builder_block_anchors.libraries.yml  # JavaScript library definition
├── composer.json                               # Composer package definition
├── js/
│   └── copy-anchor-link.js                    # Clipboard copy functionality
├── css/
│   └── copy-anchor-link.css                   # Styling for contextual link and messages
└── README.md                                  # This file
```

### Browser Compatibility

The module uses the modern Clipboard API when available and falls back to the older `document.execCommand('copy')` method for older browsers.

## Troubleshooting

### The "Copy Anchor Link" option doesn't appear

- Ensure you're in Layout Builder edit mode (click "Layout" on the page)
- Clear Drupal's cache: `drush cr`
- Verify the module is enabled: `drush pml | grep layout_builder_block_anchors`

### The link doesn't copy to clipboard

- Check browser console for JavaScript errors
- Ensure you're using HTTPS (Clipboard API requires a secure context)
- Try a different browser to rule out browser-specific issues

### The anchor doesn't scroll to the block

- Verify the block has the ID attribute in the HTML (inspect the element)
- Check if custom CSS might be interfering with scroll behavior

## Contributing

Contributions are welcome! Please submit issues and pull requests on the project's repository.

## License

This module is licensed under the GPL-2.0-or-later license, consistent with Drupal core.
