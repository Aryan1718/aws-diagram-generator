import React from 'react';
import { motion } from 'framer-motion';
import { SparklesCore } from './ui/SparklesPreview';

const examples = [
  {
    title: 'Three-Tier Web App',
    description: 'A scalable web application with ALB, EC2, and RDS',
    prompt: 'Create a three-tier architecture with Application Load Balancer, EC2 instances in an Auto Scaling Group, and RDS database in a private subnet.',
  },
  {
    title: 'Serverless API',
    description: 'API Gateway with Lambda and DynamoDB',
    prompt: 'Design a serverless API using API Gateway, Lambda functions, and DynamoDB with a Cognito authorizer.',
  },
  {
    title: 'Static Website',
    description: 'S3 static hosting with CloudFront',
    prompt: 'Create a static website hosting setup using S3 bucket and CloudFront distribution with Route 53 for DNS.',
  },
  {
    title: 'Microservices',
    description: 'Container-based microservices on ECS',
    prompt: 'Design a microservices architecture using ECS Fargate with service discovery, Application Load Balancer, and ECR for container registry.',
  }
];

const Examples: React.FC = () => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Sparkles */}
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleColor="#888"
        className="opacity-50"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400"
          >
            Example Architectures
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-neutral-400"
          >
            Get started with these common AWS architecture patterns
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {examples.map((example, index) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                {example.title}
              </h3>
              <p className="text-neutral-400 mb-4">
                {example.description}
              </p>
              <motion.button
                onClick={() => copyToClipboard(example.prompt)}
                className="px-4 py-2 bg-neutral-800 text-neutral-100 rounded-lg hover:bg-neutral-700 transition-colors w-full text-left"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <span className="line-clamp-1">{example.prompt}</span>
                  <span className="text-neutral-500 text-sm">Click to copy</span>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Examples; 