import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';

interface AwsService {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  connections: string[];
}

interface AwsDiagramRendererProps {
  xmlData: string;
}

const AwsDiagramRenderer: React.FC<AwsDiagramRendererProps> = ({ xmlData }) => {
  const diagramRef = useRef<HTMLDivElement>(null);

  // Parse the XML to extract AWS services and their connections
  const parseServices = (xml: string): AwsService[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    const services: AwsService[] = [];

    // Extract services from the XML
    const cells = doc.getElementsByTagName('mxCell');
    Array.from(cells).forEach((cell, index) => {
      const style = cell.getAttribute('style') || '';
      if (style.includes('aws4')) {
        const geometry = cell.getElementsByTagName('mxGeometry')[0];
        if (geometry) {
          services.push({
            id: cell.getAttribute('id') || `service-${index}`,
            type: style.match(/aws4\.([^;.]+)(?:\.([^;]+))?/)?.[1] || 'generic',
            name: cell.getAttribute('value') || 'AWS Service',
            x: parseFloat(geometry.getAttribute('x') || '0'),
            y: parseFloat(geometry.getAttribute('y') || '0'),
            connections: []
          });
        }
      }
    });

    return services;
  };

  const services = parseServices(xmlData);

  const downloadAsPng = async () => {
    if (diagramRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(diagramRef.current, {
          quality: 1.0,
          backgroundColor: 'white'
        });
        
        const link = document.createElement('a');
        link.download = 'aws-diagram.png';
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error generating PNG:', error);
      }
    }
  };

  const downloadAsSvg = async () => {
    if (diagramRef.current) {
      try {
        const dataUrl = await htmlToImage.toSvg(diagramRef.current, {
          quality: 1.0,
          backgroundColor: 'white'
        });
        
        const link = document.createElement('a');
        link.download = 'aws-diagram.svg';
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error generating SVG:', error);
      }
    }
  };

  // Get color based on service type
  const getServiceColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      compute: '#FF9900',
      storage: '#3F8624',
      database: '#3B48CC',
      network: '#FF4F8B',
      security: '#DD344C',
      application: '#CC2264',
      analytics: '#00A4A6'
    };
    return colors[type.toLowerCase()] || '#666666';
  };

  return (
    <div className="space-y-4">
      <div 
        ref={diagramRef}
        className="bg-white p-8 rounded-lg shadow-lg"
        style={{ minHeight: '400px' }}
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg border-2 bg-white shadow-md transition-all hover:shadow-lg"
            style={{
              left: service.x,
              top: service.y,
              borderColor: getServiceColor(service.type),
              minWidth: '120px'
            }}
          >
            <div className="text-center">
              <div className="font-medium text-gray-800">{service.name}</div>
              <div className="text-xs text-gray-500 mt-1">{service.type}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={downloadAsPng}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Download as PNG
        </button>
        <button
          onClick={downloadAsSvg}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Download as SVG
        </button>
      </div>
    </div>
  );
};

export default AwsDiagramRenderer; 
 