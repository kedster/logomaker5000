# Continuous Integration (CI) Documentation

## Overview
This repository uses GitHub Actions to automatically test and validate code changes. The CI pipeline ensures code quality and prevents introducing breaking changes to the logomaker5000 application.

## Workflow Structure
The CI workflow runs on:
- Push to `main` or `develop` branches
- Pull requests targeting `main` or `develop` branches

## Jobs Overview

### 1. Code Quality Checks
- **ESLint**: JavaScript linting with relaxed rules appropriate for the existing codebase
- **Stylelint**: CSS linting to catch syntax errors and basic style issues
- **HTML Validator**: HTML validation (skipped if internet access unavailable)
- **Prettier**: Code formatting checks

### 2. Functionality Tests  
- **Playwright Tests**: Browser-based smoke tests that verify:
  - Page loads correctly
  - Logo SVG elements are present and visible
  - Template selection works
  - Color controls update the logo
  - Export buttons are accessible

### 3. Security Audit
- Checks for potential XSS vulnerabilities
- Scans for hardcoded secrets/API keys
- Reviews console.log statements for data leakage

### 4. Deployment Readiness
- Verifies all required files are present
- Tests static file serving
- Validates HTML structure for essential elements

## Development Scripts
The following npm scripts are available for local development:

```bash
# Start local development server
npm run start

# Run all tests
npm run test

# Lint code
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code
npm run format

# Check code formatting
npm run format:check

# Validate HTML
npm run validate:html

# Run complete CI pipeline locally
npm run ci
```

## Configuration Files
- `.eslintrc.json`: ESLint configuration with relaxed rules
- `.stylelintrc.json`: Stylelint configuration focusing on critical issues
- `.prettierrc.json`: Prettier formatting configuration
- `playwright.config.js`: Playwright test configuration
- `package.json`: Dependencies and scripts

## Troubleshooting

### Common Issues

1. **HTML Validation Fails**: The HTML validator requires internet access. If it fails in CI, the job will continue with a warning.

2. **Linting Errors**: The CI allows up to 50 JavaScript warnings and 10 CSS warnings. Critical errors will still fail the build.

3. **Test Failures**: Browser tests may fail due to timing issues. Tests include appropriate waits and timeouts.

### Local Development
To set up CI tools locally:

1. Install dependencies: `npm install`
2. Install Playwright browsers: `npx playwright install chromium`
3. Run tests: `npm run test`

## Modifying the CI Pipeline

### Adding New Tests
Add test files to the `tests/` directory following the existing pattern.

### Updating Linting Rules
Modify `.eslintrc.json` or `.stylelintrc.json` as needed, but keep rules appropriate for the existing codebase.

### Adding New Jobs
Add new jobs to `.github/workflows/ci.yml` following the existing structure.

## Benefits
- **Automated Quality Assurance**: Catches issues before they reach main branch
- **Consistent Code Style**: Enforces basic formatting and style guidelines  
- **Functional Verification**: Ensures the web application works as expected
- **Security Scanning**: Basic checks for common security issues
- **Deployment Confidence**: Verifies the application is ready for deployment