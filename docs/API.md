# Student Portal API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the header:
```
Headers:
x-auth-token: <token>
```

## Endpoints

### Authentication

#### Register Student
- **Endpoint**: `POST /auth/register`
- **Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@school.edu",
    "password": "password123",
    "studentId": "STU001",
    "enrollmentYear": 2023,
    "program": "Computer Science"
  }
  ```

#### Login
- **Endpoint**: `POST /auth/login`
- **Body**:
  ```json
  {
    "email": "john@school.edu",
    "password": "password123"
  }
  ```

### Results

#### Get All Results
- **Endpoint**: `GET /results`
- **Auth**: Required
- **Response**: Array of result objects

#### Get Results by Semester
- **Endpoint**: `GET /results/semester/:semester`
- **Auth**: Required
- **Response**: Array of result objects for the semester

#### Add Result (Admin)
- **Endpoint**: `POST /results`
- **Body**:
  ```json
  {
    "studentId": "ObjectId",
    "courseName": "Introduction to Programming",
    "courseCode": "CS101",
    "semester": "Fall 2023",
    "academicYear": "2023-2024",
    "score": 85,
    "grade": "B",
    "creditHours": 3
  }
  ```

### Students

#### Get Student Profile
- **Endpoint**: `GET /students/profile`
- **Auth**: Required
- **Response**: Student object
