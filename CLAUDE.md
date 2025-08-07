# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Development server with hot reload
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod

# Run linting with auto-fix
npm run lint

# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e

# Format code
npm run format
```

## Architecture Overview

This is a NestJS-based chat backend application with the following key components:

### Core Structure
- **Framework**: NestJS with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based auth with bcrypt password hashing
- **Real-time Communication**: Socket.IO WebSocket gateway
- **Port**: Application runs on port 8000
- **CORS**: Enabled for all origins

### Key Modules

**AuthModule** (`src/auth/`)
- User registration and login endpoints
- JWT token generation and validation
- User schema with email/password/nickname fields
- JWT strategy for protecting routes

**ChatModule** (`src/chat/`)
- WebSocket gateway for real-time messaging
- Message persistence to MongoDB
- Socket.IO event handling for connections/disconnections
- Message schema with user/text/timestamp fields

**PostModule** (`src/post/`)
- Basic CRUD operations for posts
- Standard NestJS controller/service/entity pattern

### Database Configuration
- MongoDB connection string: `mongodb://admin:admin123@localhost:27017/chatdb`
- Auth source: `admin`
- Schemas use Mongoose decorators and class-transformer

### Authentication Flow
- JWT secret: `'super-duper-secret'` (hardcoded - should be environment variable)
- Token expiry: 1 day
- Password hashing with bcrypt
- User nicknames auto-generated as `User_<random_number>`

### WebSocket Events
- `message`: Handles incoming chat messages, broadcasts to all clients, saves to database
- Connection tracking with client IP detection
- CORS enabled for WebSocket connections

### Middleware
- Global validation pipe enabled
- Logger middleware applied to all routes
- CORS enabled globally

## Important Notes
- Database credentials and JWT secret are hardcoded and should be moved to environment variables
- Application uses global CORS with `origin: true` for development
- Chat messages are broadcast to all connected clients without room/channel separation