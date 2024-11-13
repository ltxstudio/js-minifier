import React, { useState } from 'react';
import csso from 'csso';
import { FaArrowDown, FaCopy, FaMoon, FaSun, FaTrashAlt } from 'react-icons/fa'; // React Icons for theme toggle and clear

function App() {
  const [inputCss, setInputCss] = useState('');
  const [minifiedCss, setMinifiedCss] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Handle input change
  const handleInputChange = (event) => {
    setInputCss(event.target.value);
  };

  // Minify the CSS
  const handleMinify = () => {
    setIsLoading(true);
    try {
      const result = csso.minify(inputCss);
      setMinifiedCss(result.css);
    } catch (error) {
      setMinifiedCss('Invalid CSS');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(minifiedCss);
  };

  // Handle clear input
  const handleClear = () => {
    setInputCss('');
    setMinifiedCss('');
  };

  // Toggle dark mode
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} flex flex-col justify-center items-center py-8 transition-colors`}>
      <div className={`bg-white ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} p-8 rounded-lg shadow-lg max-w-3xl w-full`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center mb-6">CSS Minifier Tool</h1>
          <button onClick={handleToggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {darkMode ? <FaSun size={24} className="text-yellow-400" /> : <FaMoon size={24} />}
          </button>
        </div>
        
        <div className="mb-4">
          <textarea
            value={inputCss}
            onChange={handleInputChange}
            placeholder="Paste your CSS here..."
            rows="10"
            className={`w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
          ></textarea>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleMinify}
            disabled={isLoading || !inputCss}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <>
                <FaArrowDown />
                Minify CSS
              </>
            )}
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <FaTrashAlt />
            Clear
          </button>
        </div>

        {minifiedCss && (
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-700">Minified CSS:</h3>
            <textarea
              value={minifiedCss}
              readOnly
              rows="10"
              className={`w-full p-4 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-700 ${darkMode ? 'bg-gray-800 text-white' : ''}`}
            ></textarea>
            
            <div className="flex justify-between items-center">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-500"
              >
                <FaCopy />
                Copy to Clipboard
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([minifiedCss], { type: 'text/css' });
                  const link = document.createElement('a');
                  link.href = URL.createObjectURL(blob);
                  link.download = 'minified.css';
                  link.click();
                }}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-500"
              >
                Download Minified CSS
                <FaArrowDown />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
