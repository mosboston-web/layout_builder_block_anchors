# How It Works

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  DRUPAL PAGE WITH LAYOUT BUILDER                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────┐             │
│  │  Block 1 (id="block-abc123-def456-...")   [⚙]│◄────────┐    │
│  │  Content here...                                │         │    │
│  └────────────────────────────────────────────────┘         │    │
│                                                               │    │
│  ┌────────────────────────────────────────────────┐         │    │
│  │  Block 2 (id="block-xyz789-ghi012-...")   [⚙]│◄────┐   │    │
│  │  More content...                                │     │   │    │
│  └────────────────────────────────────────────────┘     │   │    │
│                                                           │   │    │
└───────────────────────────────────────────────────────────┼───┼───┘
                                                            │   │
                                                            │   │
    ┌───────────────────────────────────────────────────────┘   │
    │  CONTEXTUAL MENU                                           │
    │  ┌─────────────────────────┐                              │
    │  │ ⚙ Configure             │                              │
    │  │ ↔ Move                  │                              │
    │  │ 🔗 Copy Anchor Link     │◄─────────────────────────────┘
    │  │ 🗑 Remove Block          │       (NEW!)
    │  └─────────────────────────┘
    │           │
    │           │ (click)
    │           ▼
    │  ┌─────────────────────────────────────────────────┐
    │  │ JavaScript: Copy to Clipboard                    │
    │  │ URL: https://example.com/page#block-abc123-...  │
    │  └─────────────────────────────────────────────────┘
    │           │
    │           ▼
    │  ┌─────────────────────────────────────┐
    │  │  ✓ Anchor link copied to clipboard! │ [×]
    │  └─────────────────────────────────────┘
    │       (Success message - auto-dismiss after 5s)
    │
    └────────────────────────────────────────────────────►
                       USER CLIPBOARD
         https://example.com/page#block-abc123-def456-...
```

## Step-by-Step Flow

### 1. Module Enabled
When the module is enabled, it registers two hooks:
- `hook_block_view_alter()` - Adds UUID-based IDs to blocks
- `hook_contextual_links_view_alter()` - Adds "Copy Anchor Link" menu item

### 2. Page Rendering
When a Layout Builder page renders:
```php
// Before: <div class="block">Content</div>
// After:  <div class="block" id="block-abc123-def456-...">Content</div>
```

### 3. Editing Mode
When a user enters Layout Builder edit mode:
```
Block Contextual Menu (before):
├── Configure
├── Move
└── Remove Block

Block Contextual Menu (after):
├── Configure
├── Move
├── Copy Anchor Link  ← NEW!
└── Remove Block
```

### 4. Click "Copy Anchor Link"
JavaScript executes:
```javascript
1. Get block UUID from data attribute
2. Construct full URL with anchor: currentURL + '#block-' + UUID
3. Copy to clipboard using Clipboard API
4. Show success message
5. Auto-dismiss after 5 seconds
```

### 5. Share the Link
User shares the copied link:
```
https://example.com/page#block-abc123-def456-...
                         └──────────────┬────────────┘
                              Scrolls to this block
```

## Technical Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  MODULE: layout_builder_block_anchors                        │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  PHP Layer (.module file)                                     │
│  ├── hook_block_view_alter()                                 │
│  │   └── Adds id="block-{UUID}" to block HTML               │
│  │                                                             │
│  └── hook_contextual_links_view_alter()                      │
│      └── Adds "Copy Anchor Link" to contextual menu          │
│          └── Attaches JS library                              │
│                                                                │
│  ─────────────────────────────────────────────────────────── │
│                                                                │
│  JavaScript Layer (copy-anchor-link.js)                       │
│  ├── Drupal.behaviors.copyAnchorLink                         │
│  │   └── Attaches click handlers                             │
│  │       └── Handles clipboard copy                           │
│  │           ├── Modern: navigator.clipboard.writeText()     │
│  │           └── Fallback: document.execCommand('copy')      │
│  │                                                             │
│  └── showMessage()                                            │
│      └── Shows success/error feedback                         │
│          ├── ARIA attributes                                  │
│          ├── Close button                                     │
│          └── 5-second auto-dismiss                            │
│                                                                │
│  ─────────────────────────────────────────────────────────── │
│                                                                │
│  CSS Layer (copy-anchor-link.css)                            │
│  ├── .copy-anchor-link styles                                │
│  ├── .layout-builder-block-anchors-message styles            │
│  └── .layout-builder-block-anchors-message-close styles      │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow

```
User Action → JavaScript Event → Clipboard API → User Feedback
     ↓              ↓                  ↓               ↓
   Click     preventDefault()      writeText()    showMessage()
             stopPropagation()
```

## Security Considerations

1. **UUID Validation**: UUIDs are validated before use
2. **HTML Sanitization**: Html::getId() ensures valid HTML IDs
3. **XSS Prevention**: Uses textContent, not innerHTML
4. **Error Handling**: Try-catch blocks for all operations
5. **No Data Storage**: Module doesn't store any user data

## Browser Compatibility

| Feature | Modern Browsers | Fallback |
|---------|----------------|----------|
| Clipboard API | ✓ Chrome, Firefox, Safari, Edge | execCommand('copy') |
| ARIA Support | ✓ All modern browsers | Graceful degradation |
| CSS Flexbox | ✓ All modern browsers | Standard block display |
