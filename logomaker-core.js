/**
 * LogoMaker5000 Core Module
 * Modular version of the logo maker functionality for testing
 */

// Global state
let currentShape = 'circle';
let logoConfig = {
    shape: 'circle',
    text: 'LOGO',
    shapeColor: '#667eea',
    textColor: '#ffffff',
    backgroundColor: '#ffffff',
    fontSize: 40,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    shapeSize: 120,
    textY: 220
};

// Template configurations
const templates = {
    modern: {
        shape: 'circle',
        shapeColor: '#667eea',
        textColor: '#ffffff',
        backgroundColor: '#ffffff',
        fontSize: 40,
        fontFamily: 'Arial',
        fontWeight: 'bold'
    },
    minimal: {
        shape: 'square',
        shapeColor: '#333333',
        textColor: '#333333',
        backgroundColor: '#ffffff',
        fontSize: 35,
        fontFamily: 'Helvetica',
        fontWeight: 'normal'
    },
    tech: {
        shape: 'triangle',
        shapeColor: '#764ba2',
        textColor: '#ffffff',
        backgroundColor: '#f8f9fa',
        fontSize: 38,
        fontFamily: 'Arial',
        fontWeight: 'bold'
    },
    creative: {
        shape: 'diamond',
        shapeColor: '#ff6b6b',
        textColor: '#ffffff',
        backgroundColor: '#ffffff',
        fontSize: 42,
        fontFamily: 'Impact',
        fontWeight: 'bold'
    }
};

// Core functions
function setShape(shape) {
    if (typeof document !== 'undefined') {
        document.querySelectorAll('.shape-item').forEach(item => item.classList.remove('active'));
        if (event && event.target) {
            event.target.closest('.shape-item').classList.add('active');
        }
    }
    currentShape = shape;
    logoConfig.shape = shape;
    if (typeof updateLogo === 'function') {
        updateLogo();
    }
}

function applyTemplate(template) {
    if (!templates[template]) {
        throw new Error(`Template '${template}' not found`);
    }

    if (typeof document !== 'undefined') {
        document.querySelectorAll('.template-item').forEach(item => item.classList.remove('active'));
        if (event && event.target) {
            event.target.closest('.template-item').classList.add('active');
        }
    }

    const config = templates[template];
    logoConfig = { ...logoConfig, ...config };
    
    // Update form controls if in browser
    if (typeof document !== 'undefined') {
        const controls = ['shapeColor', 'textColor', 'backgroundColor', 'fontSize', 'fontFamily', 'fontWeight'];
        controls.forEach(control => {
            const element = document.getElementById(control);
            if (element && config[control] !== undefined) {
                element.value = config[control];
            }
        });
    }
    
    currentShape = config.shape;
    if (typeof updateShapeSelection === 'function') {
        updateShapeSelection();
    }
    if (typeof updateLogo === 'function') {
        updateLogo();
    }
}

function updateShapeSelection() {
    if (typeof document === 'undefined') return;
    
    document.querySelectorAll('.shape-item').forEach((item, index) => {
        item.classList.remove('active');
        const shapes = ['circle', 'square', 'triangle', 'diamond', 'hexagon', 'star'];
        if (shapes[index] === currentShape) {
            item.classList.add('active');
        }
    });
}

function updateLogo() {
    if (typeof document === 'undefined') return;
    
    const svg = document.getElementById('logoSvg');
    const shape = document.getElementById('logoShape');
    const text = document.getElementById('logoText');
    const companyName = document.getElementById('companyName');
    const bg = document.getElementById('bgRect');
    
    if (!svg || !shape || !text || !bg) return;
    
    // Get values from controls
    const controls = {
        companyText: logoConfig.text,
        shapeColor: logoConfig.shapeColor,
        textColor: logoConfig.textColor,
        backgroundColor: logoConfig.backgroundColor,
        fontSize: logoConfig.fontSize,
        fontFamily: logoConfig.fontFamily,
        fontWeight: logoConfig.fontWeight,
        shapeSize: logoConfig.shapeSize,
        textY: logoConfig.textY
    };
    
    // Update from form if available
    if (document.getElementById('companyText')) {
        logoConfig.text = document.getElementById('companyText').value || 'LOGO';
        logoConfig.shapeColor = document.getElementById('shapeColor').value;
        logoConfig.textColor = document.getElementById('textColor').value;
        logoConfig.backgroundColor = document.getElementById('backgroundColor').value;
        logoConfig.fontSize = parseInt(document.getElementById('fontSize').value);
        logoConfig.fontFamily = document.getElementById('fontFamily').value;
        logoConfig.fontWeight = document.getElementById('fontWeight').value;
        logoConfig.shapeSize = parseInt(document.getElementById('shapeSize').value);
        logoConfig.textY = parseInt(document.getElementById('textY').value);
    }
    
    // Update background
    bg.setAttribute('fill', logoConfig.backgroundColor);
    
    // Update shape
    const shapeSize = logoConfig.shapeSize / 2;
    shape.remove();
    
    let newShape = createShape(currentShape, shapeSize);
    if (newShape) {
        newShape.setAttribute('id', 'logoShape');
        newShape.setAttribute('fill', logoConfig.shapeColor);
        newShape.setAttribute('filter', 'url(#shadow)');
        
        const logoGroup = document.getElementById('logoGroup');
        logoGroup.insertBefore(newShape, text);
    }
    
    // Update text
    text.textContent = logoConfig.text;
    text.setAttribute('fill', logoConfig.textColor);
    text.setAttribute('font-size', logoConfig.fontSize);
    text.setAttribute('font-family', logoConfig.fontFamily);
    text.setAttribute('font-weight', logoConfig.fontWeight);
    
    // Update company name position
    if (companyName) {
        companyName.setAttribute('y', logoConfig.textY);
    }
}

function createShape(shapeType, size) {
    if (typeof document === 'undefined') return null;
    
    let shape;
    switch (shapeType) {
        case 'circle':
            shape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            shape.setAttribute('cx', '0');
            shape.setAttribute('cy', '0');
            shape.setAttribute('r', size);
            break;
        case 'square':
            shape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            shape.setAttribute('x', -size);
            shape.setAttribute('y', -size);
            shape.setAttribute('width', size * 2);
            shape.setAttribute('height', size * 2);
            shape.setAttribute('rx', '8');
            break;
        case 'triangle':
            shape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            shape.setAttribute('points', `0,${-size} ${size},${size} ${-size},${size}`);
            break;
        case 'diamond':
            shape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            shape.setAttribute('points', `0,${-size} ${size},0 0,${size} ${-size},0`);
            break;
        case 'hexagon':
            const hex = size * 0.866;
            shape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            shape.setAttribute('points', `0,${-size} ${hex},${-size/2} ${hex},${size/2} 0,${size} ${-hex},${size/2} ${-hex},${-size/2}`);
            break;
        case 'star':
            shape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            const outer = size;
            const inner = size * 0.4;
            const points = [];
            for (let i = 0; i < 10; i++) {
                const angle = (i * Math.PI) / 5 - Math.PI / 2;
                const radius = i % 2 === 0 ? outer : inner;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                points.push(`${x},${y}`);
            }
            shape.setAttribute('points', points.join(' '));
            break;
        default:
            throw new Error(`Unknown shape type: ${shapeType}`);
    }
    return shape;
}

function validateAPIKey(apiKey) {
    return !!(apiKey && typeof apiKey === 'string' && apiKey.trim().length > 0);
}

function validateBusinessDescription(description) {
    return !!(description && typeof description === 'string' && description.trim().length > 0);
}

function generateCSS() {
    return `/* Logo CSS */
.logo {
    width: 200px;
    height: 200px;
    display: inline-block;
}

.logo-shape {
    fill: ${logoConfig.shapeColor};
    filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
}

.logo-text {
    fill: ${logoConfig.textColor};
    font-family: ${logoConfig.fontFamily};
    font-size: ${logoConfig.fontSize}px;
    font-weight: ${logoConfig.fontWeight};
    text-anchor: middle;
}`;
}

// Export functions for testing (if in Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setShape,
        applyTemplate,
        updateShapeSelection,
        updateLogo,
        createShape,
        validateAPIKey,
        validateBusinessDescription,
        generateCSS,
        getCurrentShape: () => currentShape,
        getLogoConfig: () => ({ ...logoConfig }),
        getTemplates: () => ({ ...templates }),
        setLogoConfig: (config) => { logoConfig = { ...logoConfig, ...config }; },
        resetLogoConfig: () => {
            currentShape = 'circle';
            logoConfig = {
                shape: 'circle',
                text: 'LOGO',
                shapeColor: '#667eea',
                textColor: '#ffffff',
                backgroundColor: '#ffffff',
                fontSize: 40,
                fontFamily: 'Arial',
                fontWeight: 'bold',
                shapeSize: 120,
                textY: 220
            };
        }
    };
}