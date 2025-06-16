# Student Management System API

A RESTful API built with Node.js, Express, and MongoDB for managing student records with authentication. The application uses JWT for authentication and MongoDB Atlas for data storage.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB instance)
- npm (Node Package Manager)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/StudentDemo
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=24h
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   # For development (with auto-reload)
   npm run dev
   
   # For production
   npm start
   ```

## Project Structure

```
src/
├── app.js              # Main application file
├── controllers/        # Route controllers
│   ├── AuthController.js    # Handles user registration and login
│   └── StudentController.js # Handles student CRUD operations
├── services/          # Business logic
│   ├── AuthService.js      # Authentication business logic
│   └── StudentService.js   # Student management business logic
├── models/            # Database models
│   ├── User.js            # User model for authentication
│   └── Student.js         # Student model
├── middleware/        # Custom middleware
│   └── auth.js           # JWT authentication middleware
└── config/           # Configuration files
    └── test-env.js      # Environment variable testing utility
.env  # Port, MongoDb, JWT and Environment configurations
```

## API Documentation

### Authentication Endpoints

#### Register a new user
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "username": "testuser",
    "password": "testpass123"
  }
  ```
- **Response:**
  ```json
  {
    "user": {
      "username": "testuser",
      "role": "user",
      "_id": "...",
      "createdAt": "...",
      "updatedAt": "..."
    },
    "token": "jwt_token_here"
  }
  ```

#### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "username": "testuser",
    "password": "testpass123"
  }
  ```
- **Response:** Same as register endpoint

### Student Endpoints

All student endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer your_jwt_token
```

#### Create a new student
- **POST** `/api/students`
- **Headers:**
  ```
  Content-Type: application/json
  Authorization: Bearer your_jwt_token
  ```
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 21,
    "grade": "A",
    "address": {
      "street": "123 Main St",
      "city": "Boston",
      "state": "MA",
      "zipCode": "02108"
    }
  }
  ```

#### Get all students
- **GET** `/api/students`
- **Headers:**
  ```
  Authorization: Bearer your_jwt_token
  ```

#### Get student by ID
- **GET** `/api/students/:id`
- **Headers:**
  ```
  Authorization: Bearer your_jwt_token
  ```

#### Update student
- **PUT** `/api/students/:id`
- **Headers:**
  ```
  Content-Type: application/json
  Authorization: Bearer your_jwt_token
  ```
- **Body:** Same as create student

#### Delete student
- **DELETE** `/api/students/:id`
- **Headers:**
  ```
  Authorization: Bearer your_jwt_token
  ```

## Testing the API

### Using cURL

1. **Register a new user:**
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "testpass123"}'
   ```

2. **Create a student (using the token from registration):**
   ```bash
   curl -X POST http://localhost:3000/api/students \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your_jwt_token" \
     -d '{
       "name": "John Doe",
       "email": "john.doe@example.com",
       "age": 21,
       "grade": "A",
       "address": {
         "street": "123 Main St",
         "city": "Boston",
         "state": "MA",
         "zipCode": "02108"
       }
     }'
   ```

### Using Postman

1. **Authentication:**
   - Create a new request for registration
   - Set method to POST
   - Enter URL: `http://localhost:3000/api/auth/register`
   - In Headers, set `Content-Type: application/json`
   - In Body (raw JSON), enter registration details
   - Send request and copy the token from response

2. **Student Operations:**
   - Create a new request for student operations
   - Set the appropriate HTTP method (GET, POST, PUT, DELETE)
   - Enter the corresponding URL
   - In Headers, add:
     - `Content-Type: application/json`
     - `Authorization: Bearer your_jwt_token`
   - For POST/PUT requests, add the student data in Body (raw JSON)
   - Send request

## Environment Variables

The application uses the following environment variables:

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_EXPIRES_IN`: JWT token expiration time
- `NODE_ENV`: Environment (development/production)

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- Input validation
- Error handling middleware

## Testing Environment Variables

To verify that your environment variables are correctly configured, run:
```bash
npm run test-env
```

This will check:
- All required environment variables are present
- MongoDB connection is working
- JWT configuration is valid 

Upcomming Updates:
- Frontend in Angular
- Unit tests
- Better folder structure