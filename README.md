# Project Starter Template

Clean project template with Vue 3 frontend and Express backend.

## Project Structure

```
.
├── backend/              # Express.js Backend
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Helper functions
│   ├── constants/       # Constants and enums
│   ├── config/          # Configuration files
│   ├── uploads/         # File uploads
│   └── server.js        # Entry point
│
└── frontend/            # Vue 3 Frontend
    ├── src/
    │   ├── assets/      # Static assets
    │   ├── components/  # Vue components
    │   ├── views/       # Page components
    │   ├── router/      # Vue Router
    │   ├── stores/      # Pinia stores
    │   ├── services/    # API services
    │   ├── composables/ # Vue composables
    │   ├── constants/   # Constants
    │   ├── App.vue      # Root component
    │   └── main.js      # Entry point
    │
    └── public/          # Public assets
```

## Getting Started

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`

5. Start the server:
```bash
npm start
```

Backend will run on `http://localhost:8081`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run serve
```

Frontend will run on `http://localhost:8080`

## Tech Stack

### Backend
- Express.js
- CORS
- Body-parser
- Express-rate-limit
- dotenv

### Frontend
- Vue 3 (Composition API)
- Vue Router
- Pinia (State Management)
- Axios
- Various UI libraries

## Development

Start building your application by:
1. Adding routes in `backend/routes/`
2. Creating controllers in `backend/controllers/`
3. Adding services in `backend/services/`
4. Creating Vue components in `frontend/src/components/`
5. Adding views in `frontend/src/views/`

## License

ISC
