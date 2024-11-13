import { useState } from 'react';
import { minifyCode } from './utils/minifier';
import { FaDownload, FaRegPaperPlane, FaSpinner } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">JavaScript Minifier Tool</h1>
      
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-xl shadow-lg">
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
        <div className="mt-8 w-full max-w-2xl bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-4">Minified Code:</h3>
          <pre className="whitespace-pre-wrap break-words text-sm font-mono bg-gray-700 p-4 rounded-md">
            {minifiedCode}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
