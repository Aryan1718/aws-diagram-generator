import React, { useState } from 'react';
import DiagramGenerator from './components/DiagramGenerator';
import Examples from './components/Examples';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Error Toast */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-neutral-800 text-neutral-100 px-6 py-3 rounded-xl shadow-lg border border-neutral-700">
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <DiagramGenerator onError={handleError} />
        <Examples />
      </main>
    </div>
  );
};

export default App;
