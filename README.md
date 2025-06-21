# Refugee Kiosk - LlamaHack

A modern kiosk application designed to assist refugees with essential information and services.

## Project Structure

```
.
├── backend/           # Backend server code
├── frontend/          # Frontend application
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## Prerequisites

- Node.js (v16 or later)
- Python (v3.8 or later)
- npm or yarn

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up environment variables (create a `.env` file based on `.env.example`)
4. Run the backend server:
   ```bash
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Backend
PORT=5000
DATABASE_URL=your_database_connection_string
SECRET_KEY=your_secret_key

# Frontend
REACT_APP_API_URL=http://localhost:5000
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with ❤️ for the LlamaHack hackathon
- Special thanks to all contributors

## Support

For support, please open an issue in the GitHub repository.
