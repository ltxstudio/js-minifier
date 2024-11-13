import { useState } from 'react';
import { minifyCode } from './utils/minifier';
import { FaDownload, FaRegPaperPlane, FaSpinner, FaClipboard, FaInfoCircle, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa';

function App() {
  const [inputCode, setInputCode] = useState('');
  const [minifiedCode, setMinifiedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleMinify = async () => {
    setIsLoading(true);
    const minified = await minifyCode(inputCode);
    setMinifiedCode(minified);
    setIsLoading(false);
  };

  const handleDownload = () => {
    const blob = new Blob([minifiedCode], { type: 'application/javascript' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'minified.js';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-3xl font-bold text-white">JavaScript Minifier Tool</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#about" className="hover:text-blue-400">About</a></li>
              <li><a href="#features" className="hover:text-blue-400">Features</a></li>
              <li><a href="#faq" className="hover:text-blue-400">FAQ</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
          <textarea
            placeholder="Paste your JavaScript code here"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            rows="10"
            className="w-full p-4 bg-gray-700 rounded-md text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handleMinify}
              disabled={isLoading || !inputCode}
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-md flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : <FaRegPaperPlane />}
              <span>{isLoading ? 'Minifying...' : 'Minify Code'}</span>
            </button>

            {minifiedCode && (
              <button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-500 text-white py-2 px-6 rounded-md flex items-center space-x-2"
              >
                <FaDownload />
                <span>Download Minified Code</span>
              </button>
            )}
          </div>
        </div>

        {minifiedCode && (
          <div className="mt-8 max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold mb-4">Minified Code:</h3>
            <pre className="whitespace-pre-wrap break-words text-sm font-mono bg-gray-700 p-4 rounded-md">
              {minifiedCode}
            </pre>
          </div>
        )}
      </main>

      {/* About Section */}
      <section id="about" className="bg-gray-800 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">About the Tool</h2>
          <p className="text-lg text-gray-400">
            This tool allows you to minify JavaScript code by removing unnecessary spaces, comments, and reducing the size of your code for faster loading and better performance.
          </p>
          <div className="mt-6 flex justify-center space-x-6">
            <FaInfoCircle className="text-blue-500 text-4xl" />
            <FaCheckCircle className="text-green-500 text-4xl" />
            <FaClipboard className="text-yellow-500 text-4xl" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Key Features</h2>
          <ul className="space-y-6 text-gray-400">
            <li className="flex items-center justify-center space-x-3">
              <FaRegPaperPlane className="text-blue-400" />
              <span>Minify your JavaScript code instantly.</span>
            </li>
            <li className="flex items-center justify-center space-x-3">
              <FaDownload className="text-green-400" />
              <span>Download the minified file directly.</span>
            </li>
            <li className="flex items-center justify-center space-x-3">
              <FaClipboard className="text-yellow-400" />
              <span>Copy the minified code to your clipboard.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-gray-800 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6 text-gray-400">
            <div className="flex items-center justify-center space-x-3">
              <FaQuestionCircle className="text-blue-400" />
              <span className="text-lg">What is JavaScript minification?</span>
            </div>
            <p className="text-lg">JavaScript minification is the process of removing unnecessary characters from JavaScript code without changing its functionality. This helps reduce the file size and improves load times.</p>

            <div className="flex items-center justify-center space-x-3">
              <FaQuestionCircle className="text-blue-400" />
              <span className="text-lg">Is this tool free to use?</span>
            </div>
            <p className="text-lg">Yes, this tool is completely free to use. Simply paste your code, click the button, and download the minified file.</p>

            <div className="flex items-center justify-center space-x-3">
              <FaQuestionCircle className="text-blue-400" />
              <span className="text-lg">Can I copy the minified code directly?</span>
            </div>
            <p className="text-lg">Absolutely! You can copy the minified code to your clipboard for easy pasting into your project.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-4">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2024 JavaScript Minifier Tool. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
