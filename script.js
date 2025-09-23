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

        function setShape(shape) {
            document.querySelectorAll('.shape-item').forEach(item => item.classList.remove('active'));
            event.target.closest('.shape-item').classList.add('active');
            currentShape = shape;
            logoConfig.shape = shape;
            updateLogo();
        }

        function applyTemplate(template) {
            document.querySelectorAll('.template-item').forEach(item => item.classList.remove('active'));
            event.target.closest('.template-item').classList.add('active');
            
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

            const config = templates[template];
            logoConfig = { ...logoConfig, ...config };
            
            // Update form controls
            document.getElementById('shapeColor').value = config.shapeColor;
            document.getElementById('textColor').value = config.textColor;
            document.getElementById('backgroundColor').value = config.backgroundColor;
            document.getElementById('fontSize').value = config.fontSize;
            document.getElementById('fontFamily').value = config.fontFamily;
            document.getElementById('fontWeight').value = config.fontWeight;
            
            currentShape = config.shape;
            updateShapeSelection();
            updateLogo();
        }

        function updateShapeSelection() {
            document.querySelectorAll('.shape-item').forEach((item, index) => {
                item.classList.remove('active');
                const shapes = ['circle', 'square', 'triangle', 'diamond', 'hexagon', 'star'];
                if (shapes[index] === currentShape) {
                    item.classList.add('active');
                }
            });
        }

        function updateLogo() {
            const svg = document.getElementById('logoSvg');
            const shape = document.getElementById('logoShape');
            const text = document.getElementById('logoText');
            const companyName = document.getElementById('companyName');
            const bg = document.getElementById('bgRect');
            
            // Get values from controls
            logoConfig.text = document.getElementById('companyText').value || 'LOGO';
            logoConfig.shapeColor = document.getElementById('shapeColor').value;
            logoConfig.textColor = document.getElementById('textColor').value;
            logoConfig.backgroundColor = document.getElementById('backgroundColor').value;
            logoConfig.fontSize = parseInt(document.getElementById('fontSize').value);
            logoConfig.fontFamily = document.getElementById('fontFamily').value;
            logoConfig.fontWeight = document.getElementById('fontWeight').value;
            logoConfig.shapeSize = parseInt(document.getElementById('shapeSize').value);
            logoConfig.textY = parseInt(document.getElementById('textY').value);
            
            // Update background
            bg.setAttribute('fill', logoConfig.backgroundColor);
            
            // Update shape
            const shapeSize = logoConfig.shapeSize / 2;
            shape.remove();
            
            let newShape;
            switch (currentShape) {
                case 'circle':
                    newShape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    newShape.setAttribute('cx', '0');
                    newShape.setAttribute('cy', '0');
                    newShape.setAttribute('r', shapeSize);
                    break;
                case 'square':
                    newShape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    newShape.setAttribute('x', -shapeSize);
                    newShape.setAttribute('y', -shapeSize);
                    newShape.setAttribute('width', shapeSize * 2);
                    newShape.setAttribute('height', shapeSize * 2);
                    newShape.setAttribute('rx', '8');
                    break;
                case 'triangle':
                    newShape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                    newShape.setAttribute('points', `0,${-shapeSize} ${shapeSize},${shapeSize} ${-shapeSize},${shapeSize}`);
                    break;
                case 'diamond':
                    newShape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                    newShape.setAttribute('points', `0,${-shapeSize} ${shapeSize},0 0,${shapeSize} ${-shapeSize},0`);
                    break;
                case 'hexagon':
                    const hex = shapeSize * 0.866;
                    newShape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                    newShape.setAttribute('points', `0,${-shapeSize} ${hex},${-shapeSize/2} ${hex},${shapeSize/2} 0,${shapeSize} ${-hex},${shapeSize/2} ${-hex},${-shapeSize/2}`);
                    break;
                case 'star':
                    newShape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                    const outer = shapeSize;
                    const inner = shapeSize * 0.4;
                    const points = [];
                    for (let i = 0; i < 10; i++) {
                        const angle = (i * Math.PI) / 5 - Math.PI / 2;
                        const radius = i % 2 === 0 ? outer : inner;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        points.push(`${x},${y}`);
                    }
                    newShape.setAttribute('points', points.join(' '));
                    break;
            }
            
            newShape.setAttribute('id', 'logoShape');
            newShape.setAttribute('fill', logoConfig.shapeColor);
            newShape.setAttribute('filter', 'url(#shadow)');
            
            const logoGroup = document.getElementById('logoGroup');
            logoGroup.insertBefore(newShape, text);
            
            // Update text
            text.textContent = logoConfig.text;
            text.setAttribute('fill', logoConfig.textColor);
            text.setAttribute('font-size', logoConfig.fontSize);
            text.setAttribute('font-family', logoConfig.fontFamily);
            text.setAttribute('font-weight', logoConfig.fontWeight);
            
            // Update company name position
            companyName.setAttribute('y', logoConfig.textY);
        }

        function downloadSVG() {
            const svg = document.getElementById('logoSvg');
            const svgData = new XMLSerializer().serializeToString(svg);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);
            
            const downloadLink = document.createElement('a');
            downloadLink.href = svgUrl;
            downloadLink.download = `${logoConfig.text.toLowerCase().replace(/\s+/g, '-')}-logo.svg`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(svgUrl);
        }

        function downloadPNG() {
            const svg = document.getElementById('logoSvg');
            const svgData = new XMLSerializer().serializeToString(svg);
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            canvas.width = 800;
            canvas.height = 800;
            
            img.onload = function() {
                ctx.drawImage(img, 0, 0, 800, 800);
                
                canvas.toBlob(function(blob) {
                    const url = URL.createObjectURL(blob);
                    const downloadLink = document.createElement('a');
                    downloadLink.href = url;
                    downloadLink.download = `${logoConfig.text.toLowerCase().replace(/\s+/g, '-')}-logo.png`;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    URL.revokeObjectURL(url);
                });
            };
            
            img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
        }

        function copyCSS() {
            const css = `/* Logo CSS */
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

            navigator.clipboard.writeText(css).then(() => {
                alert('CSS copied to clipboard!');
            });
        }

        // AI Enhancement Functions
        async function enhanceWithAI() {
            const apiKey = document.getElementById('apiKey').value.trim();
            const businessDesc = document.getElementById('businessDescription').value.trim();
            
            if (!apiKey) {
                alert('Please enter your OpenAI API Key');
                return;
            }
            
            if (!businessDesc) {
                alert('Please describe your business first');
                return;
            }
            
            const suggestionsDiv = document.getElementById('aiSuggestions');
            suggestionsDiv.classList.remove('hidden');
            suggestionsDiv.innerHTML = '<div class="loading"><div class="spinner"></div><p>AI is analyzing your logo...</p></div>';
            
            try {
                const currentLogoContext = {
                    text: logoConfig.text,
                    shape: logoConfig.shape,
                    shapeColor: logoConfig.shapeColor,
                    textColor: logoConfig.textColor,
                    backgroundColor: logoConfig.backgroundColor,
                    fontFamily: logoConfig.fontFamily,
                    fontWeight: logoConfig.fontWeight
                };
                
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: 'gpt-4',
                        messages: [{
                            role: 'system',
                            content: 'You are a professional logo designer. Analyze the current logo design and business description, then provide 3 specific improvement suggestions. Each suggestion should include: shape, colors (hex codes), text styling, and a brief explanation. Return your response as a JSON array with objects containing: title, shape, shapeColor, textColor, backgroundColor, fontFamily, fontWeight, reasoning.'
                        }, {
                            role: 'user',
                            content: `Business: ${businessDesc}\n\nCurrent Logo Config: ${JSON.stringify(currentLogoContext, null, 2)}\n\nPlease suggest 3 improved variations with specific design choices and reasoning.`
                        }],
                        max_tokens: 1500,
                        temperature: 0.8
                    })
                });

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                const suggestions = JSON.parse(data.choices[0].message.content);
                
                displaySuggestions(suggestions);
                
            } catch (error) {
                console.error('AI Enhancement Error:', error);
                suggestionsDiv.innerHTML = `<div style="color: #ff6b6b; padding: 15px; text-align: center;">
                    <strong>Error:</strong> ${error.message}<br>
                    <small>Make sure your API key is valid and you have credits available.</small>
                </div>`;
            }
        }
        
        function displaySuggestions(suggestions) {
            const suggestionsDiv = document.getElementById('aiSuggestions');
            
            let html = '<h4 style="margin-bottom: 15px; color: white;">AI Suggestions:</h4>';
            
            suggestions.forEach((suggestion, index) => {
                html += `
                    <div class="suggestion-item" onclick="applySuggestion(${index})">
                        <strong>${suggestion.title}</strong>
                        <div style="font-size: 13px; margin-top: 5px; opacity: 0.9;">
                            ${suggestion.reasoning}
                        </div>
                        <div style="display: flex; gap: 10px; margin-top: 8px; font-size: 11px;">
                            <span style="background: ${suggestion.shapeColor}; padding: 2px 6px; border-radius: 3px; color: white;">Shape</span>
                            <span style="background: ${suggestion.textColor}; padding: 2px 6px; border-radius: 3px; color: ${suggestion.textColor === '#ffffff' ? '#000' : '#fff'};">Text</span>
                            <span>${suggestion.fontFamily}</span>
                        </div>
                    </div>
                `;
            });
            
            suggestionsDiv.innerHTML = html;
            
            // Store suggestions globally for applying
            window.aiSuggestions = suggestions;
        }
        
        function applySuggestion(index) {
            const suggestion = window.aiSuggestions[index];
            
            if (!suggestion) return;
            
            // Update the logo configuration
            logoConfig = {
                ...logoConfig,
                shape: suggestion.shape,
                shapeColor: suggestion.shapeColor,
                textColor: suggestion.textColor,
                backgroundColor: suggestion.backgroundColor,
                fontFamily: suggestion.fontFamily,
                fontWeight: suggestion.fontWeight
            };
            
            // Update form controls
            document.getElementById('shapeColor').value = suggestion.shapeColor;
            document.getElementById('textColor').value = suggestion.textColor;
            document.getElementById('backgroundColor').value = suggestion.backgroundColor;
            document.getElementById('fontFamily').value = suggestion.fontFamily;
            document.getElementById('fontWeight').value = suggestion.fontWeight;
            
            // Update current shape and shape selection
            currentShape = suggestion.shape;
            updateShapeSelection();
            
            // Update the logo display
            updateLogo();
            
            // Hide suggestions after applying
            document.getElementById('aiSuggestions').classList.add('hidden');
        }

        // Initialize
        updateLogo();

        // Mobile Navigation Toggle
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const toggleText = document.querySelector('.toggle-text');
            
            sidebar.classList.toggle('collapsed');
            
            if (sidebar.classList.contains('collapsed')) {
                toggleText.textContent = 'Show Controls';
            } else {
                toggleText.textContent = 'Hide Controls';
            }
        }

        // Main Navigation Toggle
        function toggleMainNav() {
            const nav = document.querySelector('.main-nav');
            const toggle = document.querySelector('.mobile-nav-toggle');
            
            nav.classList.toggle('active');
            toggle.classList.toggle('active');
        }