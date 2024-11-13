import React, { useState } from 'react';
import csso from 'csso';
import { FaArrowDown, FaCopy, FaMoon, FaSun, FaTrashAlt, FaInfoCircle, FaCheckCircle, FaQuestionCircle, FaDownload } from 'react-icons/fa'; // React Icons for sections

function App() {
  const [inputCss, setInputCss] = useState('');
  const [minifiedCss, setMinifiedCss] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [alert, setAlert] = useState('');
  const [progress, setProgress] = useState(0);

  // Handle input change
  const handleInputChange = (event) => {
    setInputCss(event.target.value);
  };

  // Minify the CSS
  const handleMinify = () => {
    setIsLoading(true);
    setAlert('');
    setProgress(0);

    // Simulate progress for UI
    let progressInterval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return oldProgress + 10;
      });
    }, 100);

    try {
      const result = csso.minify(inputCss);
      setMinifiedCss(result.css);
      setAlert('CSS Minified Successfully!');
    } catch (error) {
      setMinifiedCss('Invalid CSS');
      setAlert('Failed to Minify CSS');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(minifiedCss);
    setAlert('CSS Copied to Clipboard');
  };

  // Handle clear input
  const handleClear = () => {
    setInputCss('');
    setMinifiedCss('');
    setAlert('');
    setProgress(0);
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
          <button
            onClick={handleToggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle Dark Mode"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
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
            title="Minify the CSS"
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
            title="Clear Input and Output"
          >
            <FaTrashAlt />
            Clear
          </button>
        </div>

        {progress > 0 && progress < 100 && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {alert && (
          <div className={`p-4 mb-6 text-white rounded-md ${alert.includes('Failed') ? 'bg-red-600' : 'bg-green-600'}`}>
            {alert}
          </div>
        )}

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
                title="Copy to Clipboard"
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
                title="Download Minified CSS"
              >
                <FaDownload />
                Download Minified CSS
              </button>
            </div>
          </div>
        )}
      </div>

      {/* About Section */}
      <div className="bg-white p-8 mt-8 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex items-center mb-6">
          <FaInfoCircle className="text-4xl text-blue-600 mr-4" />
          <h2 className="text-2xl font-bold">About the Tool</h2>
        </div>
        <p className="text-gray-700">
          The CSS Minifier Tool helps you reduce the size of your CSS files by removing unnecessary whitespace, comments, and other non-essential elements. Simply paste your CSS into the input box, click the "Minify CSS" button, and get the compressed output.
        </p>
      </div>

      {/* Features Section with Bigger Icons */}
      <div className="bg-white p-8 mt-8 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex items-center mb-6">
          <FaCheckCircle className="text-5xl text-green-600 mr-4" />
          <h2 className="text-2xl font-bold">Features</h2>
        </div>
        <ul className="space-y-6">
          <li className="flex items-center gap-6 text-lg text-gray-700">
            <FaCheckCircle className="text-4xl text-green-600" />
            <span>Minify your CSS code to reduce file size.</span>
          </li>
          <li className="flex items-center gap-6 text-lg text-gray-700">
            <FaCheckCircle className="text-4xl text-green-600" />
            <span>Copy the minified CSS directly to your clipboard.</span>
          </li>
          <li className="flex items-center gap-6 text-lg text-gray-700">
            <FaCheckCircle className="text-4xl text-green-600" />
            <span>Download the minified CSS as a `.css` file.</span>
          </li>
          <li className="flex items-center gap-6 text-lg text-gray-700">
            <FaCheckCircle className="text-4xl text-green-600" />
            <span>Toggle between light and dark modes for a better experience.</span>
          </li>
          <li className="flex items-center gap-6 text-lg text-gray-700">
            <FaCheckCircle className="text-4xl text-green-600" />
            <span>Clear the input and output fields with one click.</span>
          </li>
        </ul>
      </div>

      {/* FAQ Section */}
      <div className="bg-white p-8 mt-8 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex items-center mb-6">
          <FaQuestionCircle className="text-4xl text-yellow-600 mr-4" />
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <FaQuestionCircle className="text-blue-500" />
            <p className="text-gray-700">What is CSS minification?</p>
          </div>
          <div className="flex items-center gap-4">
            <FaQuestionCircle className="text-blue-500" />
            <p className="text-gray-700">Why should I minify my CSS?</p>
          </div>
          <div className="flex items-center gap-4">
            <FaQuestionCircle className="text-blue-500" />
            <p className="text-gray-700">How do I download the minified CSS?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
