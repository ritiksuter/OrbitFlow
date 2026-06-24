# OrbitFlow

A full-stack task and workspace management application with separate frontend and backend services.

- `backend/` contains the Node.js Express API, MongoDB integration, authentication, and notification utilities.
- `frontend/` contains the React application built with React Router, TypeScript, and modern UI components.

## Project Structure

```text
OrbitFlow/
├─ backend/      # Express API service
├─ frontend/     # React application
```

## Prerequisites

- Node.js (18+ recommended)
- npm
- MongoDB instance or Atlas connection

## Backend Setup

1. Open a terminal in `backend/`
2. Install dependencies:

```bash
cd backend
npm install
```

3. Create a `.env` file from `.env.sample` and set values:

```bash
cp .env.sample .env
```

4. Update `.env` with your environment details:

- `CORS_ORIGIN` - allowed frontend origin
- `MONGODB_URI` - MongoDB connection string
- `PORT` - backend server port
- `JWT_SECRET` - secret key for JWT signing
- `EMAIL` - email account for outgoing messages
- `EMAIL_PASS` - email app password / SMTP auth token
- `ARCJET_KEY` - Arcjet API key if required

5. Start backend development server:

```bash
npm run dev
```

The backend entry point is `src/index.js`.

## Frontend Setup

1. Open a terminal in `frontend/`
2. Install dependencies:

```bash
cd frontend
npm install
```

3. Start the frontend development server:

```bash
npm run dev
```

The frontend is built using React Router with a modern SPA architecture. The main application root is `app/root.tsx`.

## Running the App Locally

Run both services in separate terminals:

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm run dev
```

Then open the frontend URL shown by Vite (typically `http://localhost:5173`).

> Ensure `CORS_ORIGIN` in `backend/.env` matches the frontend URL.

## Production Builds

### Backend

Production deployment typically uses the compiled Node.js app from `backend/src`.

### Frontend

Build the frontend for production:

```bash
cd frontend
npm run build
```

Then deploy the generated build output using your chosen hosting provider.

## Docker

This repository includes Dockerfiles for both services and a `docker-compose.yml` at the project root to run them together.

### Build images (optional)

Build the backend and frontend images locally (tags match `docker-compose.yml`):

```bash
docker build -t ritiksuteri/orbitflow-backend:latest ./backend
docker build -t ritiksuteri/orbitflow-frontend:latest ./frontend
```

### Run with docker-compose

Start both services with Docker Compose (builds images if needed):

```bash
docker compose up --build -d
```

View logs:

```bash
docker compose logs -f
```

Stop and remove containers:

```bash
docker compose down
```

### Notes

- The `backend` service reads environment variables from `./backend/.env` as referenced in `docker-compose.yml`. Create or update `backend/.env` (you can copy from `.env.sample` if present).
- The backend Dockerfile exposes port `8000`; the frontend Dockerfile exposes port `5173`. The compose file maps these to the same host ports by default.
- Backend image: `ritiksuteri/orbitflow-backend:latest` (built from `backend/Dockerfile`).
- Frontend image: `ritiksuteri/orbitflow-frontend:latest` (built from `frontend/Dockerfile`).

## Notes

- The backend uses `express`, `mongoose`, `jsonwebtoken`, `bcrypt`, `cors`, and email utilities.
- The frontend uses React 19, React Router 7, React Query, MUI, Radix UI primitives, and TypeScript.
- There is no root-level package; install and run each service inside its own folder.

## Useful Commands

### Backend

```bash
cd backend
npm install
npm run dev
npm run start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
npm run build
npm run start
```

## License

This repository does not specify a license.
