import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesCore } from './ui/SparklesPreview';
import { TextareaAutosize } from './ui/TextareaAutosize';

interface DiagramGeneratorProps {
  onError: (message: string) => void;
}

export const DiagramGenerator: React.FC<DiagramGeneratorProps> = ({ onError }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [diagram, setDiagram] = useState<string | null>(null);
  const [showXml, setShowXml] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDiagram(null);

    try {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate diagram');
      }

      setDiagram(data.xml);
      setShowXml(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 py-8 px-4">
      {/* Sparkles Background */}
      <div className="h-[20rem] w-full bg-neutral-950 flex flex-col items-center justify-center overflow-hidden rounded-md absolute top-0 left-0 right-0">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleCount={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl font-bold text-neutral-100 mb-2">
            AWS Architecture Diagram Generator
          </h1>
          <p className="text-neutral-400">
            Describe your AWS architecture and get a professional diagram
          </p>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={false}
          animate={{ height: isHelpOpen ? 'auto' : '48px' }}
          className="mb-6 rounded-xl border border-neutral-800 overflow-hidden bg-neutral-900/50 backdrop-blur-sm"
        >
          <button
            onClick={() => setIsHelpOpen(!isHelpOpen)}
            className="w-full px-4 h-12 flex items-center justify-between text-neutral-100 hover:bg-neutral-800/50"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              How to Use This Generator
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transform transition-transform ${isHelpOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          <div className="px-4 py-4 text-neutral-300">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-neutral-100 mb-2">Writing Effective Prompts</h3>
              <p className="mb-3">To get accurate diagrams, include these details in your prompt:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>List all AWS services you want to include</li>
                <li>Describe how services connect and interact</li>
                <li>Specify any VPCs or subnets needed</li>
                <li>Mention data flow directions</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-neutral-100 mb-2">Example Prompt:</h3>
              <div className="bg-neutral-800/50 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">
                  "Create a two-tier architecture with:
                  - A VPC containing public and private subnets
                  - EC2 instances in the private subnet
                  - Application Load Balancer in the public subnet
                  - RDS database in the private subnet
                  Show all connections and data flow between components."
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-100 mb-2">Steps to Use:</h3>
              <ol className="list-decimal pl-6 space-y-1">
                <li>Write your architecture description in the text area below</li>
                <li>Click "Generate Diagram" and wait for the XML file</li>
                <li>Save the generated content as a .drawio or .xml file</li>
                <li>Go to <a href="https://app.diagrams.net/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">draw.io</a></li>
                <li>Click File → Import → Device and select your saved file</li>
                <li>The diagram will load and can be edited further</li>
              </ol>
            </div>
          </div>
        </motion.div>

        {/* Input Form */}
        <motion.form
          onSubmit={handleGenerate}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <TextareaAutosize
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your AWS architecture here... 
Example: Create a serverless architecture with API Gateway connected to two Lambda functions. The first Lambda function reads from DynamoDB, and the second Lambda stores files in S3. Include CloudWatch for logging."
            className="w-full bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-500 p-4 min-h-[200px] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
          />
          <div className="flex justify-end">
            <motion.button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-900 rounded-xl font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate Diagram'
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Result Section */}
        <AnimatePresence>
          {showXml && diagram && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-neutral-100">Generated Diagram XML</h2>
                  <motion.button
                    onClick={() => {
                      const blob = new Blob([diagram], { type: 'application/xml' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'aws-diagram.drawio';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className="px-4 py-2 bg-neutral-800 text-neutral-100 rounded-lg hover:bg-neutral-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Download XML
                  </motion.button>
                </div>
                <pre className="bg-neutral-800 p-4 rounded-lg overflow-x-auto text-neutral-300 text-sm">
                  {diagram}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500"
          >
            {error}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DiagramGenerator; 