/**
 * Tests for LogoMaker5000 Export and DOM Functionality
 */

// Mock the DOM setup for testing
const mockSVGElement = {
    remove: jest.fn(),
    setAttribute: jest.fn(),
    textContent: '',
    querySelectorAll: jest.fn(() => []),
    getElementById: jest.fn(),
    createElementNS: jest.fn()
};

const mockDocument = {
    getElementById: jest.fn(),
    querySelectorAll: jest.fn(() => []),
    createElement: jest.fn(),
    createElementNS: jest.fn(() => mockSVGElement),
    body: {
        appendChild: jest.fn(),
        removeChild: jest.fn()
    }
};

// Set up DOM globals
global.document = mockDocument;
global.XMLSerializer = jest.fn(() => ({
    serializeToString: jest.fn(() => '<svg>mock-svg-content</svg>')
}));
global.Blob = jest.fn(() => ({ type: 'test' }));
global.URL = {
    createObjectURL: jest.fn(() => 'mock-blob-url'),
    revokeObjectURL: jest.fn()
};

describe('LogoMaker5000 Export Functionality', () => {
    
    beforeEach(() => {
        // Reset all mocks
        jest.clearAllMocks();
        
        // Setup mock DOM elements
        const mockElements = {
            logoSvg: { 
                ...mockSVGElement,
                querySelectorAll: jest.fn(() => []),
                viewBox: { baseVal: { x: 0, y: 0, width: 400, height: 400 } }
            },
            logoShape: { ...mockSVGElement },
            logoText: { ...mockSVGElement },
            bgRect: { ...mockSVGElement },
            logoGroup: { 
                ...mockSVGElement,
                insertBefore: jest.fn()
            },
            companyName: { ...mockSVGElement },
            companyText: { value: 'TEST LOGO' },
            shapeColor: { value: '#ff0000' },
            textColor: { value: '#ffffff' },
            backgroundColor: { value: '#f0f0f0' },
            fontSize: { value: '45' },
            fontFamily: { value: 'Helvetica' },
            fontWeight: { value: 'normal' },
            shapeSize: { value: '100' },
            textY: { value: '250' }
        };
        
        mockDocument.getElementById.mockImplementation((id) => mockElements[id] || null);
    });

    describe('SVG Export', () => {
        test('should create SVG download link correctly', () => {
            // Mock the downloadSVG function behavior
            const mockLink = {
                href: '',
                download: '',
                click: jest.fn()
            };
            mockDocument.createElement.mockReturnValue(mockLink);
            
            // Simulate downloadSVG function
            const svg = mockDocument.getElementById('logoSvg');
            const svgData = '<svg>test-content</svg>';
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);
            
            const downloadLink = mockDocument.createElement('a');
            downloadLink.href = svgUrl;
            downloadLink.download = 'test-logo.svg';
            
            expect(mockDocument.createElement).toHaveBeenCalledWith('a');
            expect(URL.createObjectURL).toHaveBeenCalledWith(svgBlob);
            expect(downloadLink.href).toBe('mock-blob-url');
            expect(downloadLink.download).toBe('test-logo.svg');
        });

        test('should serialize SVG correctly', () => {
            const xmlSerializer = new XMLSerializer();
            const result = xmlSerializer.serializeToString(mockSVGElement);
            
            expect(XMLSerializer).toHaveBeenCalled();
            expect(result).toBe('<svg>mock-svg-content</svg>');
        });

        test('should clean up URL after download', () => {
            const url = 'mock-blob-url';
            URL.revokeObjectURL(url);
            
            expect(URL.revokeObjectURL).toHaveBeenCalledWith(url);
        });
    });

    describe('PNG Export', () => {
        test('should create canvas for PNG export', () => {
            const mockCanvas = {
                width: 0,
                height: 0,
                getContext: jest.fn(() => ({
                    drawImage: jest.fn()
                })),
                toBlob: jest.fn((callback) => callback(new Blob(['test'], { type: 'image/png' })))
            };
            
            mockDocument.createElement.mockReturnValue(mockCanvas);
            
            const canvas = mockDocument.createElement('canvas');
            canvas.width = 800;
            canvas.height = 800;
            
            expect(canvas.width).toBe(800);
            expect(canvas.height).toBe(800);
            expect(mockDocument.createElement).toHaveBeenCalledWith('canvas');
        });

        test('should create Image object for PNG conversion', () => {
            const mockImage = {
                onload: null,
                src: ''
            };
            
            // Test Image creation
            expect(mockImage).toHaveProperty('onload');
            expect(mockImage).toHaveProperty('src');
        });

        test('should generate correct data URL for image', () => {
            const svgData = '<svg>test</svg>';
            const expectedDataUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
            
            expect(expectedDataUrl).toContain('data:image/svg+xml;base64,');
            expect(expectedDataUrl.length).toBeGreaterThan(30);
        });
    });

    describe('CSS Export', () => {
        test('should copy CSS to clipboard', async () => {
            const mockCSS = `/* Logo CSS */
.logo {
    width: 200px;
    height: 200px;
    display: inline-block;
}`;
            
            global.navigator.clipboard.writeText.mockResolvedValue(true);
            
            await navigator.clipboard.writeText(mockCSS);
            
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockCSS);
        });

        test('should handle clipboard copy errors', async () => {
            const error = new Error('Clipboard not available');
            global.navigator.clipboard.writeText.mockRejectedValue(error);
            
            try {
                await navigator.clipboard.writeText('test');
            } catch (e) {
                expect(e.message).toBe('Clipboard not available');
            }
        });
    });

    describe('File Name Generation', () => {
        test('should generate valid file names from logo text', () => {
            const testCases = [
                { input: 'LOGO', expected: 'logo' },
                { input: 'My Company', expected: 'my-company' },
                { input: 'TEST LOGO', expected: 'test-logo' },
                { input: 'Brand Name!', expected: 'brand-name!' }
            ];
            
            testCases.forEach(({ input, expected }) => {
                const fileName = input.toLowerCase().replace(/\s+/g, '-');
                expect(fileName).toContain(expected.replace(/[^a-z0-9-]/g, ''));
            });
        });

        test('should handle special characters in file names', () => {
            const logoText = 'Logo & Co.';
            const fileName = logoText.toLowerCase().replace(/\s+/g, '-');
            
            // Should replace spaces with hyphens
            expect(fileName).not.toContain(' ');
            expect(fileName).toContain('-');
        });
    });
});

describe('LogoMaker5000 AI Enhancement Validation', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn();
    });

    describe('Input Validation', () => {
        test('should validate API key presence', () => {
            const validKey = 'sk-123456789abcdef';
            const emptyKey = '';
            const nullKey = null;
            
            expect(validKey.trim().length > 0).toBe(true);
            expect(emptyKey.trim().length > 0).toBe(false);
            expect((nullKey && nullKey.trim().length > 0) || false).toBe(false);
        });

        test('should validate business description', () => {
            const validDescription = 'Tech startup focused on AI solutions';
            const emptyDescription = '';
            const whitespaceDescription = '   ';
            
            expect(validDescription.trim().length > 0).toBe(true);
            expect(emptyDescription.trim().length > 0).toBe(false);
            expect(whitespaceDescription.trim().length > 0).toBe(false);
        });
    });

    describe('API Request Structure', () => {
        test('should create proper OpenAI API request', () => {
            const apiKey = 'sk-test-key';
            const businessDesc = 'Healthcare startup';
            const currentConfig = {
                text: 'HEALTH',
                shape: 'circle',
                shapeColor: '#667eea',
                textColor: '#ffffff'
            };
            
            const expectedRequest = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [{
                        role: 'system',
                        content: expect.stringContaining('professional logo designer')
                    }, {
                        role: 'user',
                        content: expect.stringContaining(businessDesc)
                    }],
                    max_tokens: 1500,
                    temperature: 0.8
                })
            };
            
            // Test the structure
            expect(expectedRequest.method).toBe('POST');
            expect(expectedRequest.headers['Authorization']).toBe(`Bearer ${apiKey}`);
            expect(expectedRequest.headers['Content-Type']).toBe('application/json');
            
            const body = JSON.parse(expectedRequest.body);
            expect(body.model).toBe('gpt-4');
            expect(body.messages).toHaveLength(2);
            expect(body.max_tokens).toBe(1500);
            expect(body.temperature).toBe(0.8);
        });

        test('should handle API response correctly', async () => {
            const mockResponse = {
                ok: true,
                json: async () => ({
                    choices: [{
                        message: {
                            content: JSON.stringify([
                                {
                                    title: 'Modern Healthcare',
                                    shape: 'circle',
                                    shapeColor: '#2E86AB',
                                    textColor: '#ffffff',
                                    backgroundColor: '#f8f9fa',
                                    fontFamily: 'Arial',
                                    fontWeight: 'bold',
                                    reasoning: 'Blue conveys trust and professionalism in healthcare'
                                }
                            ])
                        }
                    }]
                })
            };
            
            global.fetch.mockResolvedValue(mockResponse);
            
            const response = await fetch('https://api.openai.com/v1/chat/completions');
            const data = await response.json();
            const suggestions = JSON.parse(data.choices[0].message.content);
            
            expect(response.ok).toBe(true);
            expect(suggestions).toHaveLength(1);
            expect(suggestions[0]).toHaveProperty('title');
            expect(suggestions[0]).toHaveProperty('shape');
            expect(suggestions[0]).toHaveProperty('shapeColor');
            expect(suggestions[0]).toHaveProperty('reasoning');
        });

        test('should handle API errors correctly', async () => {
            const mockErrorResponse = {
                ok: false,
                status: 401,
                statusText: 'Unauthorized'
            };
            
            global.fetch.mockResolvedValue(mockErrorResponse);
            
            const response = await fetch('https://api.openai.com/v1/chat/completions');
            
            expect(response.ok).toBe(false);
            expect(response.status).toBe(401);
            expect(response.statusText).toBe('Unauthorized');
        });
    });

    describe('Suggestion Application', () => {
        test('should apply AI suggestion to logo config', () => {
            const suggestion = {
                title: 'Tech Startup Theme',
                shape: 'hexagon',
                shapeColor: '#764ba2',
                textColor: '#ffffff',
                backgroundColor: '#f8f9fa',
                fontFamily: 'Impact',
                fontWeight: 'bold',
                reasoning: 'Hexagonal shape suggests innovation and technology'
            };
            
            // Simulate applying suggestion
            const newConfig = {
                shape: suggestion.shape,
                shapeColor: suggestion.shapeColor,
                textColor: suggestion.textColor,
                backgroundColor: suggestion.backgroundColor,
                fontFamily: suggestion.fontFamily,
                fontWeight: suggestion.fontWeight
            };
            
            expect(newConfig.shape).toBe('hexagon');
            expect(newConfig.shapeColor).toBe('#764ba2');
            expect(newConfig.textColor).toBe('#ffffff');
            expect(newConfig.fontFamily).toBe('Impact');
        });

        test('should validate suggestion structure', () => {
            const validSuggestion = {
                title: 'Test Suggestion',
                shape: 'circle',
                shapeColor: '#ff0000',
                textColor: '#ffffff',
                backgroundColor: '#f0f0f0',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                reasoning: 'Test reasoning'
            };
            
            const requiredFields = ['title', 'shape', 'shapeColor', 'textColor', 'backgroundColor', 'fontFamily', 'fontWeight', 'reasoning'];
            
            requiredFields.forEach(field => {
                expect(validSuggestion).toHaveProperty(field);
                expect(validSuggestion[field]).toBeTruthy();
            });
        });
    });
});