# AWS Architecture Diagram Generator

A powerful tool that generates AWS architecture diagrams using natural language descriptions. Built with React, TypeScript, and Flask, this application leverages Google's Gemini AI to create accurate and professional AWS diagrams.

![AWS Diagram Generator](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)
![Flask](https://img.shields.io/badge/Flask-3.0.2-green)
![Gemini AI](https://img.shields.io/badge/Gemini%20AI-0.3.2-orange)

## Features

- 🎨 Generate AWS architecture diagrams from natural language descriptions
- 🔄 Real-time diagram generation using Google's Gemini AI
- 🎯 Support for all major AWS services and components
- 📱 Responsive and modern UI with Aceternity UI components
- 🔒 Secure API key management
- 🚀 Easy deployment options

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.9 or higher)
- Google Gemini API key
- npm or yarn package manager

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/aws-diagram-generator.git
cd aws-diagram-generator
```

### 2. Backend Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the root directory:
```env
GOOGLE_API_KEY=your_api_key_here
```

### 3. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000
```

## Running the Application

### Start the Backend Server

```bash
# From the root directory
python app.py
```

The backend server will run on `http://localhost:5000`

### Start the Frontend Development Server

```bash
# From the frontend directory
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter your AWS architecture description in the text area
3. Click "Generate Diagram"
4. View and download the generated diagram

### Example Prompts

- "Create a diagram for a web application using EC2, RDS, and S3"
- "Show a serverless architecture with Lambda, API Gateway, and DynamoDB"
- "Design a VPC with public and private subnets, NAT Gateway, and EC2 instances"

## Project Structure

```
aws-diagram-generator/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── utils/        # Utility functions
│   │   └── App.tsx       # Main application
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
├── app.py                # Flask backend
├── requirements.txt      # Python dependencies
└── README.md            # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Google Gemini AI](https://ai.google.dev/)
- [React](https://reactjs.org/)
- [Flask](https://flask.palletsprojects.com/)
- [Aceternity UI](https://ui.aceternity.com/)

## Support

For support, email aryanpandit17032002@gmail.com or open an issue in the GitHub repository.
