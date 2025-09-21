# Contributing to Logo Maker Pro 🎨

Thank you for your interest in contributing to Logo Maker Pro! This project is a web-based logo creation tool that helps users design professional logos with templates, customization options, and AI-powered enhancements.

## 🚀 Project Overview

Logo Maker Pro is a client-side web application built with vanilla HTML, CSS, and JavaScript. The application features:

- **Template System**: Pre-designed logo templates (Modern, Minimal, Tech, Creative)
- **Shape Customization**: Multiple shape options (circle, square, triangle, diamond, hexagon, star)
- **Typography Controls**: Font family, weight, size, and color customization
- **AI Enhancement**: OpenAI integration for intelligent design suggestions
- **Export Options**: SVG, PNG download and CSS code generation
- **Real-time Preview**: Live logo preview with interactive editing

## 🛠️ Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic text editor or IDE
- Local web server (optional, for development)

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kedster/logomaker5000.git
   cd logomaker5000
   ```

2. **Run locally**
   - Option 1: Open `index.html` directly in your browser
   - Option 2: Use a local server (recommended for testing AI features):
     ```bash
     # Using Python
     python3 -m http.server 8000
     
     # Using Node.js (if you have live-server installed)
     npx live-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the application**
   - Direct file: `file:///path/to/index.html`
   - Local server: `http://localhost:8000`

## 🐛 Filing Issues

We welcome bug reports, feature requests, and general feedback! Please use the following guidelines:

### Bug Reports

When filing a bug report, please include:

- **Clear title**: Briefly describe the issue
- **Steps to reproduce**: Detailed steps to recreate the problem
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Browser information**: Browser name, version, and operating system
- **Screenshots**: If applicable, include screenshots or screen recordings
- **Console errors**: Open browser DevTools and include any error messages

**Template for bug reports:**
```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error...

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- Browser: Chrome 120.0
- OS: Windows 11
- Device: Desktop/Mobile

## Additional Context
Any other relevant information, screenshots, or console errors
```

### Feature Requests

For new feature suggestions:

- **Clear description**: Explain the feature and its benefits
- **Use cases**: Describe specific scenarios where this would be helpful
- **Implementation ideas**: If you have technical suggestions (optional)
- **Priority level**: Low, Medium, High (your opinion)

**Template for feature requests:**
```markdown
## Feature Description
Clear description of the proposed feature

## Problem it Solves
What problem does this feature address?

## Proposed Solution
How do you envision this working?

## Alternatives Considered
Any alternative approaches you've thought about

## Additional Context
Mockups, examples, or related features in other tools
```

## 💡 Suggesting Features

We're always open to new ideas! Here are some areas where contributions would be particularly welcome:

### High Priority Features
- Additional export formats (PDF, EPS)
- More shape options and templates
- Color palette presets
- Logo animation capabilities
- Batch processing features

### Medium Priority Features
- Undo/redo functionality
- Keyboard shortcuts
- Accessibility improvements
- Mobile-responsive enhancements
- Multi-language support

### Technical Improvements
- Code organization and modularity
- Performance optimizations
- Error handling improvements
- Unit test coverage
- Documentation enhancements

## 🔄 Submitting Pull Requests

We follow a standard GitHub workflow for contributions:

### Before You Start

1. **Check existing issues**: Look for related issues or pull requests
2. **Create an issue**: For significant changes, create an issue first to discuss
3. **Fork the repository**: Create your own fork to work in

### Development Process

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-number-description
   ```

2. **Make your changes**
   - Follow the existing code style and structure
   - Test your changes thoroughly
   - Ensure the application still works in multiple browsers

3. **Test your changes**
   - Test all existing functionality to ensure nothing is broken
   - Test your new feature/fix in multiple browsers
   - Test with different screen sizes (responsive design)
   - If touching AI features, test with and without API keys

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new template selection feature"
   # or
   git commit -m "fix: resolve color picker not updating preview"
   ```

### Commit Message Guidelines

We use conventional commits for clarity:

- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting, missing semicolons, etc.
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

### Pull Request Guidelines

When submitting a pull request:

1. **Descriptive title**: Summarize the change clearly
2. **Detailed description**: Explain what changed and why
3. **Link related issues**: Use "Fixes #123" or "Closes #123"
4. **Screenshots**: Include before/after screenshots for UI changes
5. **Testing notes**: Describe how you tested the changes

**Pull Request Template:**
```markdown
## Description
Brief description of changes made

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Related Issues
Fixes #(issue number)

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested on mobile
- [ ] AI features work correctly

## Screenshots
Before: [if applicable]
After: [if applicable]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] No console errors
- [ ] All existing features still work
```

## 📋 Code Style Guidelines

### JavaScript
- Use camelCase for variables and functions
- Use meaningful variable names
- Add comments for complex logic
- Keep functions focused and small
- Handle errors gracefully

```javascript
// Good
function updateLogoPreview(config) {
    const logoElement = document.getElementById('logoSvg');
    // Update shape based on configuration
    updateShapeElement(logoElement, config.shape);
}

// Avoid
function update(c) {
    let e = document.getElementById('logoSvg');
    // complex logic without comments
}
```

### CSS
- Use consistent indentation (4 spaces)
- Group related properties
- Use meaningful class names
- Prefer CSS variables for repeated values
- Mobile-first responsive design

```css
/* Good */
.template-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.template-item:hover {
    background-color: var(--hover-color);
    transform: translateY(-2px);
}
```

### HTML
- Use semantic HTML elements
- Include proper accessibility attributes
- Maintain consistent indentation
- Use meaningful IDs and class names

```html
<!-- Good -->
<section class="template-section" aria-label="Logo Templates">
    <h3>Templates</h3>
    <div class="template-grid" role="grid">
        <button class="template-item" 
                onclick="applyTemplate('modern')" 
                aria-label="Apply modern template">
            <svg role="img" aria-hidden="true">...</svg>
            <span>Modern</span>
        </button>
    </div>
</section>
```

## 🧪 Testing Guidelines

### Manual Testing

Before submitting changes, test:

1. **Core functionality**
   - Template selection works
   - Shape customization works
   - Color changes apply correctly
   - Text editing functions properly
   - Export features work (SVG, PNG, CSS)

2. **Browser compatibility**
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)

3. **Responsive design**
   - Desktop (1920x1080, 1366x768)
   - Tablet (768x1024)
   - Mobile (375x667, 414x896)

4. **Accessibility**
   - Keyboard navigation
   - Screen reader compatibility
   - Color contrast
   - Focus indicators

### AI Feature Testing

If modifying AI features:
- Test with valid OpenAI API key
- Test with invalid API key
- Test with no API key
- Test error handling for API failures
- Test suggestion application

## 🤝 Community Guidelines

### Code of Conduct

We are committed to providing a welcoming and inclusive environment:

- **Be respectful**: Treat everyone with respect and kindness
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Remember that contributors have different experience levels
- **Be collaborative**: Work together to improve the project

### Communication

- **GitHub Issues**: For bugs, features, and project discussions
- **Pull Request Comments**: For code-specific discussions
- **Be clear**: Use clear, descriptive language
- **Be specific**: Provide detailed information and examples

### Recognition

Contributors will be recognized through:
- GitHub contributor graphs
- Mention in release notes for significant contributions
- Credit in project documentation

## 📚 Additional Resources

### Useful Tools
- [Figma](https://figma.com) - For design mockups
- [Adobe Color](https://color.adobe.com) - For color palette creation
- [SVG Optimizer](https://svgomg.firebaseapp.com/) - For optimizing SVG exports
- [Accessibility Checker](https://wave.webaim.org/) - For accessibility testing

### Learning Resources
- [MDN Web Docs](https://developer.mozilla.org/) - Web development reference
- [SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial) - Learn SVG
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - For potential canvas features

### Project Architecture
```
logomaker5000/
├── index.html          # Main application interface
├── script.js          # Core application logic
├── styles.css         # Styling and responsive design
└── CONTRIBUTING.md    # This file
```

## ❓ Questions?

If you have questions about contributing:

1. Check existing issues and discussions
2. Create a new issue with the "question" label
3. Provide as much context as possible

Thank you for contributing to Logo Maker Pro! Your contributions help make logo design accessible to everyone. 🎨✨