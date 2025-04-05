import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

const AwsServiceNode = ({ data }: NodeProps) => {
  const getServiceInfo = (style: string) => {
    // Extract service type and category from style
    const serviceMatch = style.match(/shape=mxgraph\.aws4\.([^;.]+)(?:\.([^;]+))?/);
    if (!serviceMatch) return null;

    const [_, category, service] = serviceMatch;
    const serviceType = service || category;

    // Map common AWS services to their display names
    const serviceNames: { [key: string]: string } = {
      ec2: 'EC2',
      rds: 'RDS',
      s3: 'S3',
      lambda: 'Lambda',
      vpc: 'VPC',
      alb: 'Application Load Balancer',
      elasticloadbalancing: 'Load Balancer',
      autoscaling: 'Auto Scaling',
      cloudfront: 'CloudFront',
      route53: 'Route 53',
      apigateway: 'API Gateway',
      dynamodb: 'DynamoDB'
    };

    // Get background color based on category
    const categoryColors: { [key: string]: string } = {
      compute: '#FF9900',
      storage: '#3F8624',
      database: '#3B48CC',
      network: '#FF4F8B',
      security: '#DD344C',
      application: '#CC2264',
      analytics: '#00A4A6'
    };

    return {
      name: serviceNames[serviceType.toLowerCase()] || serviceType,
      color: categoryColors[category.toLowerCase()] || '#666666'
    };
  };

  const serviceInfo = data.style ? getServiceInfo(data.style) : null;

  return (
    <div 
      className="group relative shadow-lg rounded-lg bg-white border-2 transition-all duration-300 hover:shadow-xl"
      style={{ 
        borderColor: serviceInfo?.color || '#666',
        width: Math.max(data.width || 150, 150),
        height: Math.max(data.height || 100, 100)
      }}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!bg-gray-400 !w-3 !h-3 !border-2 !border-white" 
      />
      
      <div className="flex flex-col items-center justify-center h-full p-4">
        <div className="text-center">
          <div className="font-medium text-gray-800 mb-1">
            {serviceInfo?.name || data.label}
          </div>
          <div className="text-xs text-gray-500">
            {data.label}
          </div>
        </div>
      </div>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!bg-gray-400 !w-3 !h-3 !border-2 !border-white" 
      />

      {/* Hover effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: serviceInfo?.color || '#666' }} />
    </div>
  );
};

export default memo(AwsServiceNode); 