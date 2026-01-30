# Changelog

All notable changes to the Layout Builder Block Anchors module will be documented in this file.

## [1.0.0] - 2026-01-30

### Added
- Initial release of Layout Builder Block Anchors module
- Automatic UUID-based HTML ID attributes for all layout builder blocks
- "Copy Anchor Link" contextual menu item for layout builder blocks
- JavaScript clipboard functionality with modern Clipboard API
- Fallback clipboard support for older browsers using execCommand
- User feedback messages with success/error states
- Accessibility features including ARIA attributes and manual dismiss
- Close button for messages (×) with keyboard accessibility
- CSS styling for contextual link and feedback messages
- Comprehensive README.md documentation
- INSTALL.md with step-by-step installation instructions
- composer.json for Composer/Packagist integration
- Support for Drupal 9, 10, and 11

### Security
- UUID validation before use
- HTML ID sanitization using Html::getId()
- CodeQL security scan passed with 0 vulnerabilities
- XSS prevention using textContent instead of innerHTML
- Proper error handling for clipboard operations

### Accessibility
- ARIA live regions for screen reader announcements
- ARIA atomic attribute for complete message reading
- 5-second message timeout (increased from 3s for cognitive accessibility)
- Manual dismiss button for users who need more time
- Keyboard accessible close button
- Proper role attributes (alert/status)

### Performance
- Duplicate message prevention
- One-time event handler attachment
- Minimal DOM manipulation
- Efficient library loading

### Developer Experience
- Clean, well-commented code
- Drupal coding standards compliance
- Comprehensive inline documentation
- Modular, maintainable structure

## Roadmap

Potential future enhancements:
- Configuration page for customizing message timeout
- Option to customize anchor ID prefix
- Support for custom block types
- Copy to clipboard button icon/styling options
- Integration with other Drupal modules
