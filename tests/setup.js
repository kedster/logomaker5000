/**
 * Jest setup file for LogoMaker5000 tests
 * Sets up JSDOM environment and mocks for browser APIs
 */

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};

global.localStorage = localStorageMock;

// Mock fetch for API tests
global.fetch = jest.fn();

// Mock URL.createObjectURL and revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock XMLSerializer for SVG testing
global.XMLSerializer = jest.fn().mockImplementation(() => ({
  serializeToString: jest.fn().mockReturnValue('<svg>mock-svg</svg>')
}));

// Mock Canvas and context
const mockCanvas = {
  getContext: jest.fn(() => ({
    drawImage: jest.fn(),
    toBlob: jest.fn((callback) => callback(new Blob(['mock'], { type: 'image/png' })))
  })),
  width: 800,
  height: 800
};

global.HTMLCanvasElement = jest.fn(() => mockCanvas);
document.createElement = jest.fn().mockImplementation((tagName) => {
  if (tagName === 'canvas') {
    return mockCanvas;
  }
  return document.createElement.wrappedMethod(tagName);
});
document.createElement.wrappedMethod = document.createElement;

// Mock Image
global.Image = jest.fn().mockImplementation(() => ({
  addEventListener: jest.fn(),
  onload: null,
  src: null
}));

// Mock alert and clipboard
global.alert = jest.fn();
global.navigator.clipboard = {
  writeText: jest.fn().mockResolvedValue(true)
};

// Suppress console.error for expected test errors
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('AI Enhancement Error')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});