'use client';
import { useState, useEffect, useRef, SetStateAction } from 'react';
import AirflexBackground from '@/Components/AirflexBackground';
export default function AirflexTShirtDesigner() {
  const [activeColor, setActiveColor] = useState('#3b82f6');
  const [activePattern, setActivePattern] = useState('pattern-3');
  const [textColor, setTextColor] = useState('#ffffff');
  const [textSize, setTextSize] = useState(64);
  const [designText, setDesignText] = useState('AIRFLEX PRO');
  const [rotateX, setRotateX] = useState(-10);
  const [rotateY, setRotateY] = useState(-20);
  const [isLoading, setIsLoading] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const tshirtRef = useRef(null);

  // Color options
  const colorOptions = [
    '#3b82f6', '#1e293b', '#ffffff', '#dc2626', '#16a34a',
    '#d97706', '#7e22ce', '#0ea5e9', '#ec4899', '#64748b'
  ];

  // Pattern options
  const patterns = [
    { id: 'pattern-1', name: 'Classic Stripe' },
    { id: 'pattern-2', name: 'Ocean Wave' },
    { id: 'pattern-3', name: 'Sport Dots' },
    { id: 'pattern-4', name: 'Dynamic Line' },
    { id: 'pattern-5', name: 'Zig Zag' },
    { id: 'none', name: 'None' }
  ];

  // Text color options
  const textColors = [
    '#ffffff', '#facc15', '#22c55e', '#3b82f6', '#ef4444'
  ];

  // Simulate loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle mouse events for 3D rotation
  useEffect(() => {
    const handleMouseMove = (e: { clientX: SetStateAction<number>; clientY: SetStateAction<number>; }) => {
      if (!isMouseDown) return;
    const [startX, setStartX] = useState<number>(0);
const [startY, setStartY] = useState<number>(0);

      const handleTextSizeChange = (e: { target: { value: string; }; }) => {
  setTextSize(parseInt(e.target.value));
};
const [rotateX, setRotateX] = useState<number>(-10);
const [rotateY, setRotateY] = useState<number>(-20);

      setStartX(e.clientX);
      setStartY(e.clientY);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    if (isMouseDown) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMouseDown, startX, startY]);

  const handleMouseDown = (e: { clientX: SetStateAction<number>; clientY: SetStateAction<number>; }) => {
    setIsMouseDown(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleColorChange = (color: SetStateAction<string>) => {
    setActiveColor(color);
  };

  const handlePatternChange = (patternId: SetStateAction<string>) => {
    setActivePattern(patternId);
  };

  const handleTextChange = (e: { target: { value: string; }; }) => {
    setDesignText(e.target.value.slice(0, 20));
  };

  const handleTextColorChange = (color: SetStateAction<string>) => {
    setTextColor(color);
  };

  const handleTextSizeChange = (e: { target: { value: string; }; }) => {
    setTextSize(parseInt(e.target.value));
  };

  const handleAddText = () => {
    if (designText.trim()) {
      // In a real app, this would add text to the 3D model
      console.log(`Adding text: ${designText}`);
    }
  };

  const handleClearText = () => {
    setDesignText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-4 md:py-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="bg-blue-600 rounded-full p-3 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3.5a1.5 1.5 0 00-1.5 1.5v2.5a1.5 1.5 0 003 0V5a1.5 1.5 0 00-1.5-1.5z" />
                <path fillRule="evenodd" d="M5 4.5A2.5 2.5 0 017.5 2h5A2.5 2.5 0 0115 4.5v3.879a2.5 2.5 0 01.732 1.767l.878 5.121a2.5 2.5 0 01-2.227 2.787H5.617a2.5 2.5 0 01-2.227-2.787l.878-5.121A2.5 2.5 0 015 8.379V4.5zm5 8.5a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              AIRFLEX DESIGNER
            </h1>
          </div>
          <p className="text-blue-300 max-w-2xl mx-auto text-base md:text-lg">
            Create your custom sports t-shirt with our 3D designer. Preview in real-time before ordering.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Controls Panel */}
          <div className="bg-blue-900/50 backdrop-blur-md border border-blue-700/30 rounded-xl p-4 md:p-6 shadow-xl w-full lg:w-1/3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-blue-300 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Design Controls
              </h2>
              <button 
                onClick={() => {
                  setRotateX(-10);
                  setRotateY(-20);
                }}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Reset View
              </button>
            </div>
            
            {/* Color Picker */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-blue-200 font-medium">T-Shirt Color</h3>
                <span className="text-xs text-blue-400">BASE COLOR</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {colorOptions.map((color, index) => (
                  <button
                    key={index}
                    className={`w-full h-10 rounded-lg border-2 transition-all hover:scale-105
                      ${activeColor === color ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-blue-900' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
            </div>
            
            {/* Pattern Picker */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-blue-200 font-medium">Pattern</h3>
                <span className="text-xs text-blue-400">OVERLAY</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {patterns.map((pattern) => (
                  <button
                    key={pattern.id}
                    className={`h-16 rounded-lg border-2 transition-all flex items-center justify-center overflow-hidden relative
                      ${activePattern === pattern.id 
                        ? 'border-blue-400 ring-2 ring-blue-500 ring-offset-2 ring-offset-blue-900' 
                        : 'border-white/20 hover:border-blue-300'}`}
                    onClick={() => handlePatternChange(pattern.id)}
                  >
                    {pattern.id !== 'none' ? (
                      <>
                        <div className={`absolute inset-0 ${pattern.id}`}></div>
                        <span className="absolute bottom-0 left-0 right-0 bg-black/70 py-1 text-xs">
                          {pattern.name}
                        </span>
                      </>
                    ) : (
                      <span className="text-blue-300 text-sm">None</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Text Controls */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-blue-200 font-medium">Custom Text</h3>
                <span className="text-xs text-blue-400">MAX 20 CHARS</span>
              </div>
              <input 
                type="text"
                className="w-full p-3 rounded-lg bg-blue-900/50 border border-blue-700 text-white placeholder-blue-400 mb-3"
                placeholder="Team Name / Slogan"
                value={designText}
                onChange={handleTextChange}
                maxLength={20}
              />
              
              <div className="flex gap-3 mb-3">
                <div className="flex-1">
                  <h4 className="text-blue-200 text-sm mb-1">Text Color</h4>
                  <div className="flex gap-1">
                    {textColors.map((color, index) => (
                      <button
                        key={index}
                        className={`w-6 h-6 rounded-full border-2 transition-all
                          ${textColor === color ? 'border-white' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleTextColorChange(color)}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-blue-200 text-sm mb-1">Text Size</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">S</span>
                    <input 
                      type="range" 
                      min="24" 
                      max="80" 
                      value={textSize} 
                      onChange={handleTextSizeChange}
                      className="w-full accent-blue-500"
                    />
                    <span className="text-xs">L</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-all"
                  onClick={handleAddText}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Text
                </button>
                <button 
                  className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white p-3 rounded-lg transition-all"
                  onClick={handleClearText}
                >
                  Clear
                </button>
              </div>
            </div>
            
            {/* Finalize Button */}
            <button className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold p-3 rounded-lg transition-all flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              FINALIZE DESIGN
            </button>
          </div>
          
          {/* Preview Panel */}
          <div className="bg-gradient-to-br from-blue-950 to-indigo-950 rounded-xl overflow-hidden shadow-2xl w-full lg:w-2/3 relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-blue-950/70 backdrop-blur-sm z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-3"></div>
                  <p className="text-blue-300 font-medium">Loading 3D designer...</p>
                </div>
              </div>
            )}
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] perspective-1000">
              <div
                ref={tshirtRef}
                className="w-full h-full relative transform-style-3d transition-transform duration-500"
                style={{ 
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  cursor: isMouseDown ? 'grabbing' : 'grab'
                }}
                onMouseDown={handleMouseDown}
              >
                <div 
                  className="absolute w-full h-full bg-gradient-to-b from-blue-500 to-blue-800 rounded-xl shadow-lg transform translate-z-20"
                  style={{ background: `linear-gradient(to bottom, ${activeColor}, ${darkerColor(activeColor)})` }}
                >
                  {/* Shirt neck */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-blue-900 rounded-t-full"></div>
                  
                  {/* Sleeves */}
                  <div className="absolute top-1/4 -left-12 w-16 h-28 bg-inherit rounded-xl transform rotate-6"></div>
                  <div className="absolute top-1/4 -right-12 w-16 h-28 bg-inherit rounded-xl transform -rotate-6"></div>
                  
                  {/* Pattern overlay */}
                  {activePattern !== 'none' && (
                    <div className={`absolute inset-0 opacity-30 ${activePattern}`}></div>
                  )}
                  
                  {/* Text design */}
                  {designText && (
                    <div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold max-w-[80%]"
                      style={{ 
                        color: textColor,
                        fontSize: `${textSize}px`,
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      {designText}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 bg-blue-900/60 backdrop-blur px-3 py-1.5 rounded-full text-sm text-blue-200 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
              <span>Drag to rotate • Scroll to zoom</span>
            </div>
            
            <div className="absolute bottom-4 right-4 opacity-10 text-blue-500 font-black text-9xl transform -rotate-30 pointer-events-none">
              3D
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="flex items-center gap-2 bg-blue-900/40 px-4 py-2 rounded-full">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-blue-300">Premium Polyester Fabric</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-900/40 px-4 py-2 rounded-full">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-blue-300">Moisture Wicking Technology</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-900/40 px-4 py-2 rounded-full">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <span className="text-blue-300">3D Breathable Mesh</span>
          </div>
        </div>
      </div>
      
      {/* Pattern styles */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .pattern-1 {
          background: linear-gradient(45deg, #1e40af 25%, #3b82f6 25%, #3b82f6 50%, #1e40af 50%, #1e40af 75%, #3b82f6 75%);
          background-size: 20px 20px;
        }
        
        .pattern-2 {
          background: linear-gradient(45deg, #0c4a6e 25%, #0ea5e9 25%, #0ea5e9 50%, #0c4a6e 50%, #0c4a6e 75%, #0ea5e9 75%);
          background-size: 20px 20px;
        }
        
        .pattern-3 {
          background: radial-gradient(circle, #3b82f6 20%, transparent 20%), 
                      radial-gradient(circle, #3b82f6 20%, #1e3a8a 20%);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
        }
        
        .pattern-4 {
          background: linear-gradient(135deg, #1d4ed8 25%, #3b82f6 25%, #3b82f6 50%, #1d4ed8 50%, #1d4ed8 75%, #3b82f6 75%);
          background-size: 20px 20px;
        }
        
        .pattern-5 {
          background: repeating-linear-gradient(45deg, #60a5fa, #60a5fa 10px, #3b82f6 10px, #3b82f6 20px);
        }
      `}</style>
    </div>
  );
}

// Helper function to generate darker color for gradient
function darkerColor(color: string) {
  // Simple color darkening - in a real app use a color library
  if (color.startsWith('#')) {
    // Convert hex to RGB
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    
    // Darken by 20%
    return `rgb(${Math.max(0, r - 51)}, ${Math.max(0, g - 51)}, ${Math.max(0, b - 51)})`;
  }
  return color;
}