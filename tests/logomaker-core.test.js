/**
 * Tests for LogoMaker5000 Core Functionality
 */

const {
    setShape,
    applyTemplate,
    createShape,
    validateAPIKey,
    validateBusinessDescription,
    generateCSS,
    getCurrentShape,
    getLogoConfig,
    getTemplates,
    setLogoConfig,
    resetLogoConfig
} = require('../logomaker-core.js');

describe('LogoMaker5000 Core Functions', () => {
    
    beforeEach(() => {
        // Reset to default state before each test
        resetLogoConfig();
    });

    describe('Shape Management', () => {
        test('should set current shape correctly', () => {
            setShape('square');
            expect(getCurrentShape()).toBe('square');
            
            setShape('triangle');
            expect(getCurrentShape()).toBe('triangle');
        });

        test('should update logo config when shape changes', () => {
            setShape('hexagon');
            const config = getLogoConfig();
            expect(config.shape).toBe('hexagon');
        });

        test('should handle all valid shape types', () => {
            const validShapes = ['circle', 'square', 'triangle', 'diamond', 'hexagon', 'star'];
            
            validShapes.forEach(shape => {
                setShape(shape);
                expect(getCurrentShape()).toBe(shape);
                expect(getLogoConfig().shape).toBe(shape);
            });
        });
    });

    describe('Template System', () => {
        test('should apply modern template correctly', () => {
            applyTemplate('modern');
            const config = getLogoConfig();
            const templates = getTemplates();
            
            expect(config.shape).toBe(templates.modern.shape);
            expect(config.shapeColor).toBe(templates.modern.shapeColor);
            expect(config.textColor).toBe(templates.modern.textColor);
            expect(config.backgroundColor).toBe(templates.modern.backgroundColor);
            expect(config.fontSize).toBe(templates.modern.fontSize);
            expect(config.fontFamily).toBe(templates.modern.fontFamily);
            expect(config.fontWeight).toBe(templates.modern.fontWeight);
        });

        test('should apply minimal template correctly', () => {
            applyTemplate('minimal');
            const config = getLogoConfig();
            const templates = getTemplates();
            
            expect(config.shape).toBe(templates.minimal.shape);
            expect(config.shapeColor).toBe(templates.minimal.shapeColor);
            expect(config.textColor).toBe(templates.minimal.textColor);
            expect(config.fontWeight).toBe(templates.minimal.fontWeight);
        });

        test('should apply tech template correctly', () => {
            applyTemplate('tech');
            const config = getLogoConfig();
            const templates = getTemplates();
            
            expect(config.shape).toBe(templates.tech.shape);
            expect(config.shapeColor).toBe(templates.tech.shapeColor);
            expect(config.backgroundColor).toBe(templates.tech.backgroundColor);
        });

        test('should apply creative template correctly', () => {
            applyTemplate('creative');
            const config = getLogoConfig();
            const templates = getTemplates();
            
            expect(config.shape).toBe(templates.creative.shape);
            expect(config.shapeColor).toBe(templates.creative.shapeColor);
            expect(config.fontFamily).toBe(templates.creative.fontFamily);
        });

        test('should throw error for invalid template', () => {
            expect(() => {
                applyTemplate('invalid-template');
            }).toThrow("Template 'invalid-template' not found");
        });

        test('should preserve existing config values not in template', () => {
            setLogoConfig({ text: 'CUSTOM TEXT', shapeSize: 150 });
            applyTemplate('modern');
            
            const config = getLogoConfig();
            expect(config.text).toBe('CUSTOM TEXT');
            expect(config.shapeSize).toBe(150);
        });
    });

    describe('Logo Configuration', () => {
        test('should initialize with default configuration', () => {
            const config = getLogoConfig();
            
            expect(config.shape).toBe('circle');
            expect(config.text).toBe('LOGO');
            expect(config.shapeColor).toBe('#667eea');
            expect(config.textColor).toBe('#ffffff');
            expect(config.backgroundColor).toBe('#ffffff');
            expect(config.fontSize).toBe(40);
            expect(config.fontFamily).toBe('Arial');
            expect(config.fontWeight).toBe('bold');
            expect(config.shapeSize).toBe(120);
            expect(config.textY).toBe(220);
        });

        test('should update configuration correctly', () => {
            setLogoConfig({
                text: 'TEST LOGO',
                shapeColor: '#ff0000',
                fontSize: 50
            });
            
            const config = getLogoConfig();
            expect(config.text).toBe('TEST LOGO');
            expect(config.shapeColor).toBe('#ff0000');
            expect(config.fontSize).toBe(50);
            // Other values should remain unchanged
            expect(config.fontFamily).toBe('Arial');
            expect(config.backgroundColor).toBe('#ffffff');
        });

        test('should reset configuration to defaults', () => {
            setLogoConfig({
                text: 'MODIFIED',
                shapeColor: '#ff0000',
                fontSize: 80
            });
            
            resetLogoConfig();
            
            const config = getLogoConfig();
            expect(config.text).toBe('LOGO');
            expect(config.shapeColor).toBe('#667eea');
            expect(config.fontSize).toBe(40);
        });
    });

    describe('Shape Creation', () => {
        beforeEach(() => {
            // Mock document.createElementNS for SVG shape creation
            document.createElementNS = jest.fn().mockImplementation((namespace, tagName) => ({
                setAttribute: jest.fn(),
                tagName: tagName.toUpperCase()
            }));
        });

        test('should create circle shape with correct attributes', () => {
            const shape = createShape('circle', 50);
            
            expect(document.createElementNS).toHaveBeenCalledWith('http://www.w3.org/2000/svg', 'circle');
            expect(shape.setAttribute).toHaveBeenCalledWith('cx', '0');
            expect(shape.setAttribute).toHaveBeenCalledWith('cy', '0');
            expect(shape.setAttribute).toHaveBeenCalledWith('r', 50);
        });

        test('should create square shape with correct attributes', () => {
            const shape = createShape('square', 60);
            
            expect(document.createElementNS).toHaveBeenCalledWith('http://www.w3.org/2000/svg', 'rect');
            expect(shape.setAttribute).toHaveBeenCalledWith('x', -60);
            expect(shape.setAttribute).toHaveBeenCalledWith('y', -60);
            expect(shape.setAttribute).toHaveBeenCalledWith('width', 120);
            expect(shape.setAttribute).toHaveBeenCalledWith('height', 120);
            expect(shape.setAttribute).toHaveBeenCalledWith('rx', '8');
        });

        test('should create triangle shape with correct points', () => {
            const shape = createShape('triangle', 40);
            
            expect(document.createElementNS).toHaveBeenCalledWith('http://www.w3.org/2000/svg', 'polygon');
            expect(shape.setAttribute).toHaveBeenCalledWith('points', '0,-40 40,40 -40,40');
        });

        test('should create diamond shape with correct points', () => {
            const shape = createShape('diamond', 45);
            
            expect(document.createElementNS).toHaveBeenCalledWith('http://www.w3.org/2000/svg', 'polygon');
            expect(shape.setAttribute).toHaveBeenCalledWith('points', '0,-45 45,0 0,45 -45,0');
        });

        test('should create hexagon shape with correct points', () => {
            const shape = createShape('hexagon', 50);
            const hex = 50 * 0.866; // Expected hex value
            
            expect(document.createElementNS).toHaveBeenCalledWith('http://www.w3.org/2000/svg', 'polygon');
            expect(shape.setAttribute).toHaveBeenCalledWith('points', `0,-50 ${hex},-25 ${hex},25 0,50 ${-hex},25 ${-hex},-25`);
        });

        test('should create star shape with correct points', () => {
            const shape = createShape('star', 30);
            
            expect(document.createElementNS).toHaveBeenCalledWith('http://www.w3.org/2000/svg', 'polygon');
            // Star should have 10 points (5 outer, 5 inner)
            const pointsCall = shape.setAttribute.mock.calls.find(call => call[0] === 'points');
            expect(pointsCall).toBeTruthy();
            const points = pointsCall[1].split(' ');
            expect(points.length).toBe(10);
        });

        test('should throw error for unknown shape type', () => {
            expect(() => {
                createShape('unknown', 50);
            }).toThrow('Unknown shape type: unknown');
        });
    });

    describe('API Validation', () => {
        test('should validate valid API key', () => {
            expect(validateAPIKey('sk-1234567890abcdef')).toBe(true);
            expect(validateAPIKey('valid-api-key')).toBe(true);
        });

        test('should reject invalid API keys', () => {
            expect(validateAPIKey('')).toBe(false);
            expect(validateAPIKey('   ')).toBe(false);
            expect(validateAPIKey(null)).toBe(false);
            expect(validateAPIKey(undefined)).toBe(false);
            expect(validateAPIKey(123)).toBe(false);
        });

        test('should validate valid business description', () => {
            expect(validateBusinessDescription('Tech startup focused on AI')).toBe(true);
            expect(validateBusinessDescription('Healthcare company')).toBe(true);
        });

        test('should reject invalid business descriptions', () => {
            expect(validateBusinessDescription('')).toBe(false);
            expect(validateBusinessDescription('   ')).toBe(false);
            expect(validateBusinessDescription(null)).toBe(false);
            expect(validateBusinessDescription(undefined)).toBe(false);
            expect(validateBusinessDescription(123)).toBe(false);
        });
    });

    describe('CSS Generation', () => {
        test('should generate correct CSS with default config', () => {
            const css = generateCSS();
            
            expect(css).toContain('.logo {');
            expect(css).toContain('width: 200px;');
            expect(css).toContain('height: 200px;');
            expect(css).toContain('fill: #667eea;'); // Default shape color
            expect(css).toContain('fill: #ffffff;'); // Default text color
            expect(css).toContain('font-family: Arial;');
            expect(css).toContain('font-size: 40px;');
            expect(css).toContain('font-weight: bold;');
        });

        test('should generate CSS with custom colors', () => {
            setLogoConfig({
                shapeColor: '#ff0000',
                textColor: '#000000',
                fontFamily: 'Helvetica',
                fontSize: 60,
                fontWeight: 'normal'
            });
            
            const css = generateCSS();
            
            expect(css).toContain('fill: #ff0000;');
            expect(css).toContain('fill: #000000;');
            expect(css).toContain('font-family: Helvetica;');
            expect(css).toContain('font-size: 60px;');
            expect(css).toContain('font-weight: normal;');
        });

        test('should generate valid CSS structure', () => {
            const css = generateCSS();
            
            expect(css).toMatch(/\.logo\s*{[^}]*}/);
            expect(css).toMatch(/\.logo-shape\s*{[^}]*}/);
            expect(css).toMatch(/\.logo-text\s*{[^}]*}/);
        });
    });

    describe('Template Properties', () => {
        test('should have all required template properties', () => {
            const templates = getTemplates();
            const requiredProps = ['shape', 'shapeColor', 'textColor', 'backgroundColor', 'fontSize', 'fontFamily', 'fontWeight'];
            
            Object.keys(templates).forEach(templateName => {
                const template = templates[templateName];
                requiredProps.forEach(prop => {
                    expect(template).toHaveProperty(prop);
                });
            });
        });

        test('should have valid color values in templates', () => {
            const templates = getTemplates();
            const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
            
            Object.keys(templates).forEach(templateName => {
                const template = templates[templateName];
                expect(template.shapeColor).toMatch(hexColorRegex);
                expect(template.textColor).toMatch(hexColorRegex);
                // Background can be hex or named color
                expect(template.backgroundColor).toMatch(/^(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}|\w+)$/);
            });
        });

        test('should have valid shape types in templates', () => {
            const templates = getTemplates();
            const validShapes = ['circle', 'square', 'triangle', 'diamond', 'hexagon', 'star'];
            
            Object.keys(templates).forEach(templateName => {
                const template = templates[templateName];
                expect(validShapes).toContain(template.shape);
            });
        });

        test('should have reasonable font sizes in templates', () => {
            const templates = getTemplates();
            
            Object.keys(templates).forEach(templateName => {
                const template = templates[templateName];
                expect(template.fontSize).toBeGreaterThan(20);
                expect(template.fontSize).toBeLessThan(100);
            });
        });
    });
});