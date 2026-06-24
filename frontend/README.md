# OrbitFlow Frontend

This is the React frontend for OrbitFlow. It is built with React Router v7, TypeScript, React Query, Tailwind CSS, and SSR support through `@react-router/dev`.

## Overview

- React 19 application
- Server-side rendering enabled by default
- Client-side routes under `app/routes/`
- Global API client in `app/lib/fetch-util.ts`
- Authentication and workspace/task data fetched via REST API

## Project Structure

```text
frontend/
├─ app/                # React entrypoints, routes, components, hooks, and providers
├─ public/             # Static public assets
├─ src/                # Additional frontend helpers and shared components
├─ .env                # runtime env for API base URL
├─ Dockerfile          # production container build
├─ package.json
├─ tsconfig.json
├─ vite.config.ts      # Vite plugins and build configuration
└─ react-router.config.ts # SSR configuration for React Router
```

## Getting Started

### Install dependencies

```bash
cd frontend
npm install
```

### Configure environment

Create or update `.env` with the backend URL:

```env
VITE_API_URL=http://localhost:8000/api-v1
```

### Run in development

```bash
npm run dev
```

Open the URL shown by Vite, typically `http://localhost:5173`.

## Build and Preview

### Build for production

```bash
npm run build
```

### Start the production server

```bash
npm run start
```

The production server uses the bundled React Router app from `build/server/index.js`.

## API Integration

The frontend uses `app/lib/fetch-util.ts` to call backend APIs. It reads `VITE_API_URL` and defaults to `http://localhost:8000/api-v1`.

The client also attaches a Bearer token from `localStorage` to all requests.

## Key Frontend Features

- Auth flows: login, register, forgot password, reset password, verify email
- Workspace management: create workspaces, invite members, view workspace details
- Project and task management: create projects, create tasks, update task title/status/priority/assignees
- Comments, subtasks, activity feed, and watch/achieve task flows
- React Query for data fetching and caching
- Tailwind CSS utility styling

## Docker

Build the container:

```bash
docker build -t orbitflow-frontend .
```

Run the container:

```bash
docker run -p 4173:4173 orbitflow-frontend
```

> Ensure `VITE_API_URL` is set to the backend service URL before running in a container.

## Useful Scripts

```bash
npm run dev     # development server
npm run build   # production bundle
npm run start   # serve production bundle
npm run typecheck # run type generation and TypeScript checks
```

## Notes

- The app is configured for SSR through `react-router.config.ts`.
- Main HTML layout and error handling are in `app/root.tsx`.
- API requests are centralized in `app/lib/fetch-util.ts`.

## Contributing

Add new UI routes in `app/routes/`, keep request logic in `app/hooks/`, and validate backend calls through `app/lib/fetch-util.ts`.
