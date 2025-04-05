from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
import logging
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Configure Gemini API
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
if not GOOGLE_API_KEY:
    logger.error("GOOGLE_API_KEY not found in environment variables")
else:
    genai.configure(api_key=GOOGLE_API_KEY)
    logger.info("Gemini API configured successfully")

app = Flask(__name__)

# Configure CORS
CORS(app, resources={
    r"/generate": {
        "origins": ["*"],  # In production, replace with your frontend URL
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

def generate_drawio_xml(prompt):
    """Generate draw.io compatible XML using Google's Gemini"""
    try:
        logger.debug(f"Generating diagram for prompt: {prompt[:100]}...")  # Log first 100 chars of prompt
        
        system_prompt = """Generate a draw.io XML diagram for the following AWS architecture: {prompt}

Available AWS Components (use only what's needed):
- EC2: sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];outlineConnect=0;fontColor=#232F3E;fillColor=#ED7100;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.ec2;
- VPC: sketch=0;outlineConnect=0;gradientColor=none;html=1;whiteSpace=wrap;fontSize=12;fontStyle=0;shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_vpc;strokeColor=#248814;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#AAB7B8;dashed=0;
- S3: sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];outlineConnect=0;fontColor=#232F3E;fillColor=#7AA116;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.s3;
- Lambda: sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];outlineConnect=0;fontColor=#232F3E;fillColor=#ED7100;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.lambda;
- API Gateway: sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];outlineConnect=0;fontColor=#232F3E;fillColor=#E7157B;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.api_gateway;
- RDS: sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];outlineConnect=0;fontColor=#232F3E;fillColor=#2E73B8;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.rds;
- CloudFront: sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];outlineConnect=0;fontColor=#232F3E;fillColor=#8C4FFF;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudfront;
- Route53: sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[0,1,0],[0.25,1,0],[0.5,1,0],[0.75,1,0],[1,1,0],[0,0.25,0],[0,0.5,0],[0,0.75,0],[1,0.25,0],[1,0.5,0],[1,0.75,0]];outlineConnect=0;fontColor=#232F3E;fillColor=#8C4FFF;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.route_53;
- Internet Gateway: sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#232F3E;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.internet_alt2;
- User: sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#232F3E;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.user;
- Subnet: sketch=0;outlineConnect=0;gradientColor=none;html=1;whiteSpace=wrap;fontSize=12;fontStyle=0;shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_security_group;strokeColor=#7AA116;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#248814;dashed=0;

Connection Styles:
- Default: endArrow=classic;html=1;strokeWidth=2;startArrow=none;endFill=1;strokeColor=#000000;
- Data Flow: endArrow=classic;html=1;strokeWidth=2;startArrow=none;endFill=1;strokeColor=#000000;edgeStyle=orthogonalEdgeStyle;

Diagram Guidelines:
1. Include ONLY the components mentioned in the architecture description
2. Use appropriate connections between components based on their interactions
3. Label all components clearly with their purpose
4. Label all connections to show the type of interaction
5. Maintain proper spacing between components (40px minimum)
6. Group related components logically
7. Show clear data flow direction with arrows
8. Add subnets and VPCs only if specified in the architecture
9. Position components to minimize crossing connections
10. Keep the layout clean and easy to understand

Base XML structure:
<mxfile host="app.diagrams.net" modified="2024-01-01T00:00:00.000Z" agent="Mozilla/5.0" version="21.1.9">
  <diagram name="Page-1" id="aws-architecture">
    <mxGraphModel grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" page="1" fold="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <!-- Add components here -->
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>

Analyze the architecture description and create a diagram using ONLY the necessary components and connections. Label everything clearly and maintain a logical flow.

Return ONLY the complete XML. No explanations."""

        # Initialize the model
        logger.debug("Initializing Gemini model")
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        # Format the prompt
        formatted_prompt = system_prompt.format(prompt=prompt)
        logger.debug(f"Formatted prompt length: {len(formatted_prompt)}")
        
        # Generate response
        logger.debug("Sending request to Gemini API")
        response = model.generate_content(formatted_prompt)
        
        if not response:
            logger.error("Received empty response from Gemini")
            return "Error: Empty response from Gemini API"
            
        # Extract the generated text
        logger.debug("Extracting text from response")
        generated_text = response.text
        
        if not generated_text:
            logger.error("No text content in response")
            return "Error: No content generated"
            
        logger.debug(f"Generated text length: {len(generated_text)}")
        logger.debug(f"First 100 characters: {generated_text[:100]}")
        
        # Clean up the response to ensure it's valid XML
        if "<mxfile" not in generated_text:
            logger.error("Generated content does not contain mxfile tag")
            return "Error: Generated content is not valid XML"
            
        # Extract just the XML content
        try:
            # Find the first opening tag and last closing tag
            start_idx = generated_text.find("<mxfile")
            if start_idx == -1:
                logger.error("Could not find opening <mxfile> tag")
                return "Error: Invalid XML structure"
                
            end_idx = generated_text.find("</mxfile>", start_idx) + len("</mxfile>")
            if end_idx == -1:
                logger.error("Could not find closing </mxfile> tag")
                return "Error: Invalid XML structure"
                
            # Extract just the XML portion
            generated_text = generated_text[start_idx:end_idx]
            logger.debug(f"Extracted XML content length: {len(generated_text)}")
            
        except Exception as e:
            logger.error(f"Error cleaning XML content: {str(e)}")
            return "Error: Failed to clean XML content"
            
        logger.info("Successfully generated diagram XML")
        return generated_text
        
    except Exception as e:
        logger.error(f"Exception in generate_drawio_xml: {str(e)}", exc_info=True)
        return f"Error: {str(e)}"

@app.route('/')
def home():
    return "AWS Architecture Diagram Generator API"

@app.route('/generate', methods=['GET', 'POST', 'OPTIONS'])
def generate():
    try:
        logger.debug("Received request to /generate endpoint")
        logger.debug(f"Request method: {request.method}")
        
        # Handle preflight requests
        if request.method == 'OPTIONS':
            logger.debug("Handling OPTIONS request")
            response = jsonify({'status': 'ok'})
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
            response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
            return response

        # Handle GET requests
        if request.method == 'GET':
            return jsonify({'message': 'Please use POST method to generate diagrams'}), 405

        # Log request data
        logger.debug(f"Request headers: {dict(request.headers)}")
        logger.debug(f"Request content type: {request.content_type}")
        
        # Parse request data
        data = request.get_json()
        if not data:
            logger.error("No JSON data in request")
            return jsonify({'error': 'No data provided'}), 400
            
        prompt = data.get('prompt', '')
        if not prompt:
            logger.error("No prompt in request data")
            return jsonify({'error': 'No prompt provided'}), 400
            
        logger.debug(f"Processing prompt: {prompt[:100]}...")  # Log first 100 chars
        
        # Generate draw.io XML
        xml_content = generate_drawio_xml(prompt)
        
        if xml_content.startswith('Error:'):
            logger.error(f"Error generating diagram: {xml_content}")
            return jsonify({'error': xml_content}), 500
        
        logger.info("Successfully generated diagram")
        response = jsonify({'xml': xml_content})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
        
    except Exception as e:
        logger.error(f"Unexpected error in generate endpoint: {str(e)}", exc_info=True)
        return jsonify({'error': f'Unexpected error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 