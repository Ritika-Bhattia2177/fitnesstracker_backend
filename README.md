# Feedback Tracker API

## Objective
Build a secure and scalable backend API for collecting, managing, and tracking user feedback with role-aware access control.

## Tools & Technologies
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Middleware: Helmet, CORS, Morgan, Rate Limit, Custom Error Handler
- Postman (API Testing)
- Deployment: Render (or Railway)

## System Architecture
Client (Postman/Web App) → Express Routes → Auth Middleware (JWT) → Controllers → MongoDB (Mongoose Models) → JSON Response

## Project Folder Structure
```bash
feedbacktracker/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── feedbackController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Feedback.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── feedbackRoutes.js
│   ├── utils/
│   │   └── ApiError.js
│   ├── app.js
│   └── server.js
├── postman/
│   └── FeedbackTracker.postman_collection.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Database Schema
### User
- name: String (required)
- email: String (required, unique)
- password: String (required, hashed)
- role: String (`student` | `admin`)

### Feedback
- title: String (required)
- message: String (required)
- category: String (`ui` | `performance` | `bug` | `feature` | `other`)
- rating: Number (1-5, required)
- status: String (`open` | `reviewed` | `resolved`)
- createdBy: ObjectId (ref: User)

## API Endpoints (list only)
- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/feedback`
- `GET /api/feedback`
- `GET /api/feedback/:id`
- `PUT /api/feedback/:id`
- `DELETE /api/feedback/:id`

## Authentication Method
JWT (Bearer token in Authorization header)

## Error Handling Approach
- `try-catch` in controllers
- Custom `ApiError` class
- Centralized error middleware for validation, duplicate key, cast errors
- User-friendly custom messages in API responses

## Middleware Used
- `helmet` for security headers
- `cors` for cross-origin support
- `morgan` for request logging
- `express-rate-limit` for API abuse protection
- `protect` middleware for JWT verification
- `notFound` + `errorHandler` middleware for error flow

## Setup & Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` from `.env.example` and update values.
3. Start server:
   ```bash
   npm run dev
   ```

## Postman Testing
- Import: `postman/FeedbackTracker.postman_collection.json`
- Run order:
  1. Register
  2. Login (copy token)
  3. Set `{{token}}` variable
  4. Test Feedback CRUD endpoints

## Deployment (Compulsory)
### Option: Render
1. Push project to GitHub.
2. Create new Web Service on Render.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
   - `NODE_ENV=production`
   - `CLIENT_URL`
6. Deploy and test deployed base URL in Postman.

## Viva Preparation (Be Ready to Explain)
- API flow: Route → Middleware → Controller → DB → Response
- Authentication: JWT creation at login/register and token verification in protected routes
- Deployment: env setup, start/build commands, and live API testing
