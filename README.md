# AWS Architecture Diagram Generator

This project allows users to generate AWS architecture diagrams using natural language input. It uses OpenAI's GPT model to convert text descriptions into draw.io compatible XML, which is then rendered as a diagram using the draw.io API.

## Features

- Natural language to AWS architecture diagram conversion
- ChatGPT-like interface
- Real-time diagram generation
- Support for AWS icons and components
- Modern, responsive UI

## Prerequisites

- Python 3.8 or higher
- OpenAI API key
- Internet connection for API access

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install the required dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the project root and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
DRAW_IO_API_URL=https://exp.draw.io/ImageExport4/export
```

4. Run the application:
```bash
python app.py
```

5. Open your web browser and navigate to `http://localhost:5000`

## Usage

1. Enter a description of your AWS architecture in the input field
2. Click "Generate" or press Enter
3. Wait for the diagram to be generated
4. The diagram will appear in the chat interface

## Example Prompts

- "Create a diagram showing a web application with an EC2 instance behind an Application Load Balancer, using RDS for the database"
- "Show me a serverless architecture with API Gateway, Lambda functions, and DynamoDB"
- "Design a high-availability architecture with multiple AZs and auto-scaling groups"

## Technologies Used

- Flask (Python web framework)
- OpenAI GPT-4
- draw.io API
- TailwindCSS
- JavaScript

## License

MIT License #   a w s - d i a g r a m - g e n e r a t o r  
 