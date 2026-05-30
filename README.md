# School Student Portal

A comprehensive web application for students to log in and check their academic results.

## Features

- Student authentication (Login/Logout)
- View academic results and grades
- Grade filtering by semester/course
- Responsive design for mobile and desktop
- Secure session management
- Admin panel for uploading results

## Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express.js
- MongoDB for database
- JWT for authentication
- Bcrypt for password encryption

## Project Structure

```
student-portal/
├── frontend/          # React application
├── backend/           # Express API server
├── docs/              # Documentation
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/fernand1436/student-portal.git
cd student-portal
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### Running the Application

**Backend**
```bash
cd backend
npm start
```

**Frontend**
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new student
- `POST /api/auth/login` - Login student
- `POST /api/auth/logout` - Logout student

### Results
- `GET /api/results` - Get student results
- `GET /api/results/:courseId` - Get specific course results

## Default Test Credentials

Username: `student@school.edu`
Password: `password123`

## License

MIT
