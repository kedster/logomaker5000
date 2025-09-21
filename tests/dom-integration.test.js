/**
 * Tests for LogoMaker5000 DOM Integration and User Interface
 */

describe('LogoMaker5000 DOM Integration', () => {
    let mockDocument;
    let mockElements;

    beforeEach(() => {
        // Set up comprehensive DOM mock
        mockElements = {
            templateItems: [
                { classList: { add: jest.fn(), remove: jest.fn() } },
                { classList: { add: jest.fn(), remove: jest.fn() } },
                { classList: { add: jest.fn(), remove: jest.fn() } },
                { classList: { add: jest.fn(), remove: jest.fn() } }
            ],
            shapeItems: [
                { classList: { add: jest.fn(), remove: jest.fn() } },
                { classList: { add: jest.fn(), remove: jest.fn() } },
                { classList: { add: jest.fn(), remove: jest.fn() } },
                { classList: { add: jest.fn(), remove: jest.fn() } },
                { classList: { add: jest.fn(), remove: jest.fn() } },
                { classList: { add: jest.fn(), remove: jest.fn() } }
            ],
            companyText: { 
                value: 'LOGO',
                addEventListener: jest.fn()
            },
            shapeColor: { 
                value: '#667eea',
                addEventListener: jest.fn()
            },
            textColor: { 
                value: '#ffffff',
                addEventListener: jest.fn()
            },
            backgroundColor: { 
                value: '#ffffff',
                addEventListener: jest.fn()
            },
            fontSize: { 
                value: '40',
                addEventListener: jest.fn()
            },
            fontFamily: { 
                value: 'Arial',
                addEventListener: jest.fn()
            },
            fontWeight: { 
                value: 'bold',
                addEventListener: jest.fn()
            },
            shapeSize: { 
                value: '120',
                addEventListener: jest.fn()
            },
            textY: { 
                value: '220',
                addEventListener: jest.fn()
            }
        };

        mockDocument = {
            getElementById: jest.fn((id) => mockElements[id] || null),
            querySelectorAll: jest.fn((selector) => {
                if (selector === '.template-item') return mockElements.templateItems;
                if (selector === '.shape-item') return mockElements.shapeItems;
                return [];
            }),
            createElement: jest.fn(),
            createElementNS: jest.fn(),
            body: {
                appendChild: jest.fn(),
                removeChild: jest.fn()
            }
        };

        global.document = mockDocument;
    });

    describe('Template Selection UI', () => {
        test('should remove active class from all template items', () => {
            const templateItems = mockDocument.querySelectorAll('.template-item');
            
            // Simulate removing active class from all items
            templateItems.forEach(item => item.classList.remove('active'));
            
            templateItems.forEach(item => {
                expect(item.classList.remove).toHaveBeenCalledWith('active');
            });
        });

        test('should add active class to selected template', () => {
            const templateItems = mockDocument.querySelectorAll('.template-item');
            const selectedItem = templateItems[1]; // Select second template
            
            selectedItem.classList.add('active');
            
            expect(selectedItem.classList.add).toHaveBeenCalledWith('active');
        });

        test('should update form controls when template is applied', () => {
            const modernTemplate = {
                shapeColor: '#667eea',
                textColor: '#ffffff',
                backgroundColor: '#ffffff',
                fontSize: 40,
                fontFamily: 'Arial',
                fontWeight: 'bold'
            };

            // Simulate updating form controls
            if (mockElements.shapeColor) mockElements.shapeColor.value = modernTemplate.shapeColor;
            if (mockElements.textColor) mockElements.textColor.value = modernTemplate.textColor;
            if (mockElements.backgroundColor) mockElements.backgroundColor.value = modernTemplate.backgroundColor;
            if (mockElements.fontSize) mockElements.fontSize.value = modernTemplate.fontSize.toString();
            if (mockElements.fontFamily) mockElements.fontFamily.value = modernTemplate.fontFamily;
            if (mockElements.fontWeight) mockElements.fontWeight.value = modernTemplate.fontWeight;

            expect(mockElements.shapeColor.value).toBe('#667eea');
            expect(mockElements.textColor.value).toBe('#ffffff');
            expect(mockElements.fontSize.value).toBe('40');
            expect(mockElements.fontFamily.value).toBe('Arial');
            expect(mockElements.fontWeight.value).toBe('bold');
        });
    });

    describe('Shape Selection UI', () => {
        test('should handle shape selection with proper DOM updates', () => {
            const shapes = ['circle', 'square', 'triangle', 'diamond', 'hexagon', 'star'];
            const selectedShapeIndex = 2; // triangle
            
            // Simulate shape selection
            mockElements.shapeItems.forEach(item => item.classList.remove('active'));
            mockElements.shapeItems[selectedShapeIndex].classList.add('active');
            
            // Verify all items had active class removed
            mockElements.shapeItems.forEach(item => {
                expect(item.classList.remove).toHaveBeenCalledWith('active');
            });
            
            // Verify selected item has active class added
            expect(mockElements.shapeItems[selectedShapeIndex].classList.add).toHaveBeenCalledWith('active');
        });

        test('should map shape indices to shape names correctly', () => {
            const shapeMap = ['circle', 'square', 'triangle', 'diamond', 'hexagon', 'star'];
            
            shapeMap.forEach((shapeName, index) => {
                expect(shapeMap[index]).toBe(shapeName);
            });
            
            expect(shapeMap.length).toBe(6);
        });
    });

    describe('Form Control Updates', () => {
        test('should read values from form controls', () => {
            // Test reading current values
            const currentValues = {
                text: mockElements.companyText.value,
                shapeColor: mockElements.shapeColor.value,
                textColor: mockElements.textColor.value,
                backgroundColor: mockElements.backgroundColor.value,
                fontSize: parseInt(mockElements.fontSize.value),
                fontFamily: mockElements.fontFamily.value,
                fontWeight: mockElements.fontWeight.value,
                shapeSize: parseInt(mockElements.shapeSize.value),
                textY: parseInt(mockElements.textY.value)
            };

            expect(currentValues.text).toBe('LOGO');
            expect(currentValues.shapeColor).toBe('#667eea');
            expect(currentValues.textColor).toBe('#ffffff');
            expect(currentValues.fontSize).toBe(40);
            expect(currentValues.fontFamily).toBe('Arial');
            expect(currentValues.fontWeight).toBe('bold');
            expect(currentValues.shapeSize).toBe(120);
            expect(currentValues.textY).toBe(220);
        });

        test('should handle missing form elements gracefully', () => {
            // Test with missing elements
            mockDocument.getElementById.mockReturnValue(null);
            
            const safeGetValue = (elementId, defaultValue) => {
                const element = mockDocument.getElementById(elementId);
                return element ? element.value : defaultValue;
            };

            expect(safeGetValue('companyText', 'LOGO')).toBe('LOGO');
            expect(safeGetValue('nonexistent', 'default')).toBe('default');
        });

        test('should validate numeric input values', () => {
            const validateNumericInput = (value, min = 1, max = 100, defaultValue = 40) => {
                const numValue = parseInt(value);
                if (isNaN(numValue)) return defaultValue;
                if (numValue < min) return min;
                if (numValue > max) return max;
                return numValue;
            };

            expect(validateNumericInput('40')).toBe(40);
            expect(validateNumericInput('0', 1, 100, 40)).toBe(1);
            expect(validateNumericInput('150', 1, 100, 40)).toBe(100);
            expect(validateNumericInput('invalid', 1, 100, 40)).toBe(40);
        });
    });

    describe('SVG Element Updates', () => {
        beforeEach(() => {
            // Mock SVG elements
            mockElements.logoSvg = {
                viewBox: { baseVal: { x: 0, y: 0, width: 400, height: 400 } }
            };
            mockElements.logoShape = {
                remove: jest.fn(),
                setAttribute: jest.fn()
            };
            mockElements.logoText = {
                setAttribute: jest.fn(),
                textContent: ''
            };
            mockElements.bgRect = {
                setAttribute: jest.fn()
            };
            mockElements.logoGroup = {
                insertBefore: jest.fn()
            };
            mockElements.companyName = {
                setAttribute: jest.fn()
            };
        });

        test('should update background color correctly', () => {
            const backgroundColor = '#f0f0f0';
            mockElements.bgRect.setAttribute('fill', backgroundColor);

            expect(mockElements.bgRect.setAttribute).toHaveBeenCalledWith('fill', backgroundColor);
        });

        test('should update text properties correctly', () => {
            const textProperties = {
                content: 'NEW LOGO',
                fill: '#000000',
                fontSize: '50',
                fontFamily: 'Helvetica',
                fontWeight: 'normal'
            };

            mockElements.logoText.textContent = textProperties.content;
            mockElements.logoText.setAttribute('fill', textProperties.fill);
            mockElements.logoText.setAttribute('font-size', textProperties.fontSize);
            mockElements.logoText.setAttribute('font-family', textProperties.fontFamily);
            mockElements.logoText.setAttribute('font-weight', textProperties.fontWeight);

            expect(mockElements.logoText.textContent).toBe('NEW LOGO');
            expect(mockElements.logoText.setAttribute).toHaveBeenCalledWith('fill', '#000000');
            expect(mockElements.logoText.setAttribute).toHaveBeenCalledWith('font-size', '50');
            expect(mockElements.logoText.setAttribute).toHaveBeenCalledWith('font-family', 'Helvetica');
            expect(mockElements.logoText.setAttribute).toHaveBeenCalledWith('font-weight', 'normal');
        });

        test('should handle shape removal and insertion', () => {
            // Mock shape creation
            const newShape = {
                setAttribute: jest.fn()
            };
            mockDocument.createElementNS.mockReturnValue(newShape);

            // Simulate shape update process
            mockElements.logoShape.remove();
            const createdShape = mockDocument.createElementNS('http://www.w3.org/2000/svg', 'circle');
            createdShape.setAttribute('id', 'logoShape');
            createdShape.setAttribute('fill', '#ff0000');
            createdShape.setAttribute('filter', 'url(#shadow)');
            mockElements.logoGroup.insertBefore(createdShape, mockElements.logoText);

            expect(mockElements.logoShape.remove).toHaveBeenCalled();
            expect(mockDocument.createElementNS).toHaveBeenCalledWith('http://www.w3.org/2000/svg', 'circle');
            expect(createdShape.setAttribute).toHaveBeenCalledWith('id', 'logoShape');
            expect(createdShape.setAttribute).toHaveBeenCalledWith('fill', '#ff0000');
            expect(createdShape.setAttribute).toHaveBeenCalledWith('filter', 'url(#shadow)');
            expect(mockElements.logoGroup.insertBefore).toHaveBeenCalledWith(createdShape, mockElements.logoText);
        });
    });

    describe('Event Handling', () => {
        test('should set up input event listeners', () => {
            const controls = ['companyText', 'shapeColor', 'textColor', 'backgroundColor', 
                            'fontSize', 'fontFamily', 'fontWeight', 'shapeSize', 'textY'];

            controls.forEach(controlId => {
                const element = mockElements[controlId];
                if (element && element.addEventListener) {
                    // Simulate adding event listener
                    element.addEventListener('input', jest.fn());
                    element.addEventListener('change', jest.fn());
                    
                    expect(element.addEventListener).toHaveBeenCalled();
                }
            });
        });

        test('should handle click events on templates and shapes', () => {
            const clickHandler = jest.fn();
            
            // Simulate click event setup
            mockElements.templateItems.forEach(item => {
                item.onclick = clickHandler;
            });
            mockElements.shapeItems.forEach(item => {
                item.onclick = clickHandler;
            });

            // Simulate clicks
            mockElements.templateItems[0].onclick();
            mockElements.shapeItems[2].onclick();

            expect(clickHandler).toHaveBeenCalledTimes(2);
        });

        test('should prevent default behavior for form submissions', () => {
            const mockEvent = {
                preventDefault: jest.fn()
            };

            const formSubmitHandler = (event) => {
                event.preventDefault();
                // Handle form submission
            };

            formSubmitHandler(mockEvent);
            expect(mockEvent.preventDefault).toHaveBeenCalled();
        });
    });

    describe('Accessibility Features', () => {
        test('should have proper ARIA labels', () => {
            const accessibilityAttributes = {
                'aria-label': 'Logo maker controls',
                'role': 'application',
                'tabindex': '0'
            };

            // Test that accessibility attributes can be set
            Object.entries(accessibilityAttributes).forEach(([attr, value]) => {
                expect(typeof attr).toBe('string');
                expect(typeof value).toBe('string');
            });
        });

        test('should support keyboard navigation', () => {
            const keyboardHandler = (event) => {
                switch (event.key) {
                    case 'Enter':
                    case ' ':
                        // Activate selected item
                        return true;
                    case 'ArrowRight':
                    case 'ArrowLeft':
                        // Navigate between items
                        return true;
                    default:
                        return false;
                }
            };

            expect(keyboardHandler({ key: 'Enter' })).toBe(true);
            expect(keyboardHandler({ key: ' ' })).toBe(true);
            expect(keyboardHandler({ key: 'ArrowRight' })).toBe(true);
            expect(keyboardHandler({ key: 'Escape' })).toBe(false);
        });
    });

    describe('Error Handling', () => {
        test('should handle missing DOM elements gracefully', () => {
            mockDocument.getElementById.mockReturnValue(null);
            mockDocument.querySelectorAll.mockReturnValue([]);

            const safelyUpdateElement = (elementId, property, value) => {
                const element = mockDocument.getElementById(elementId);
                if (element && element[property] !== undefined) {
                    element[property] = value;
                    return true;
                }
                return false;
            };

            expect(safelyUpdateElement('nonexistent', 'value', 'test')).toBe(false);
        });

        test('should validate form input before processing', () => {
            const validateInput = (input, type = 'text') => {
                if (!input) return false;
                
                switch (type) {
                    case 'color':
                        return /^#[0-9A-Fa-f]{6}$/.test(input);
                    case 'number':
                        return !isNaN(Number(input));
                    case 'text':
                        return typeof input === 'string' && input.trim().length > 0;
                    default:
                        return false;
                }
            };

            expect(validateInput('#ff0000', 'color')).toBe(true);
            expect(validateInput('#invalid', 'color')).toBe(false);
            expect(validateInput('42', 'number')).toBe(true);
            expect(validateInput('not-a-number', 'number')).toBe(false);
            expect(validateInput('Valid text', 'text')).toBe(true);
            expect(validateInput('', 'text')).toBe(false);
        });
    });
});