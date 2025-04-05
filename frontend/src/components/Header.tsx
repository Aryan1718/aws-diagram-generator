import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/aws-logo.png" alt="AWS Diagram Generator" className="h-8 w-auto" />
            <h1 className="ml-3 text-xl font-semibold text-gray-900">AWS Diagram Generator</h1>
          </div>
          <nav className="flex space-x-4">
            <a href="#examples" className="text-gray-600 hover:text-gray-900">Examples</a>
            <a href="#documentation" className="text-gray-600 hover:text-gray-900">Documentation</a>
            <a href="https://github.com/yourusername/aws-diagram-generator" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">GitHub</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 