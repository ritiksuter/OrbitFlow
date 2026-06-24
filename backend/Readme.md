# OrbitFlow Backend

The backend service for OrbitFlow is a Node.js + Express API that powers authentication, workspace/project/task management, user profiles, comments, and activity tracking.

## Overview

- Node.js Express server using ES modules
- MongoDB persistence with Mongoose
- JWT-based authentication
- CORS configuration for the frontend origin
- Request validation using Zod and `zod-express-middleware`
- Email support via configured SMTP credentials

## Tech Stack

- Node.js
- Express
- MongoDB / Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- Zod validation
- Nodemailer
- Morgan logging
- dotenv for environment configuration

## Getting Started

### Install dependencies

```bash
cd backend
npm install
```

### Configure environment

Copy the sample env file and fill in your values:

```bash
cp .env.sample .env
```

Required variables:

- `FRONTEND_URL` - allowed origin for CORS
- `MONGODB_URI` - MongoDB connection URI without the database name
- `PORT` - port to run the backend server on
- `JWT_SECRET` - secret used to sign JWT tokens
- `EMAIL` - sender email address for notifications
- `EMAIL_PASS` - email password or app-specific key
- `ARCJET_KEY` - Arcjet API key if email or other services require it

> Note: The code appends the database name `orbitFlow` to `MONGODB_URI`.

### Run locally

```bash
npm run dev
```

This starts the server with `nodemon` and loads environment variables from `.env`.

## Server Entry Points

- `src/index.js` - application bootstrap and database connection
- `src/app.js` - Express app configuration and middleware setup
- `src/db/index.js` - MongoDB connection logic

## API Base URL

`/api-v1`

## Main API Routes

### Auth

- `POST /api-v1/auth/register`
- `POST /api-v1/auth/login`
- `POST /api-v1/auth/verify-email`
- `POST /api-v1/auth/reset-password-request`
- `POST /api-v1/auth/reset-password`

### User

- `GET /api-v1/users/profile`
- `PUT /api-v1/users/profile`
- `PUT /api-v1/users/change-password`

### Workspace

- `POST /api-v1/workspaces`
- `GET /api-v1/workspaces`
- `GET /api-v1/workspaces/:workspaceId`
- `GET /api-v1/workspaces/:workspaceId/projects`
- `GET /api-v1/workspaces/:workspaceId/stats`
- `POST /api-v1/workspaces/:workspaceId/invite-member`
- `POST /api-v1/workspaces/:workspaceId/accept-generate-invite`
- `POST /api-v1/workspaces/accept-invite-token`

### Project

- `POST /api-v1/projects/:workspaceId/create-project`
- `GET /api-v1/projects/:projectId`
- `GET /api-v1/projects/:projectId/tasks`

### Task

- `POST /api-v1/tasks/:projectId/create-task`
- `POST /api-v1/tasks/:taskId/add-subtask`
- `POST /api-v1/tasks/:taskId/add-comment`
- `POST /api-v1/tasks/:taskId/watch`
- `POST /api-v1/tasks/:taskId/achieved`
- `PUT /api-v1/tasks/:taskId/update-subtask/:subTaskId`
- `PUT /api-v1/tasks/:taskId/title`
- `PUT /api-v1/tasks/:taskId/description`
- `PUT /api-v1/tasks/:taskId/status`
- `PUT /api-v1/tasks/:taskId/assignees`
- `PUT /api-v1/tasks/:taskId/priority`
- `GET /api-v1/tasks/my-tasks`
- `GET /api-v1/tasks/:taskId`
- `GET /api-v1/tasks/:resourceId/activity`
- `GET /api-v1/tasks/:taskId/comments`
- `DELETE /api-v1/tasks/:taskId`

## Authentication

Routes under `/api-v1/users`, `/api-v1/workspaces`, `/api-v1/projects`, and `/api-v1/tasks` require a valid Bearer token in the `Authorization` header:

```
Authorization: Bearer <token>
```

## Notes

- Static assets are served from the `public/` folder.
- All unknown routes return `404 Not Found`.
- A generic error middleware sends `500 Internal server error` for unhandled exceptions.

## Useful Scripts

```bash
npm run dev
npm run start
```

`npm run dev` starts the service with `nodemon`, while `npm run start` also runs `src/index.js` through `nodemon`.

## Contribution

If you add new routes or features, keep route registration in `src/routes/index.js` and add validation schemas in `src/utils/validate-schema.js`.
