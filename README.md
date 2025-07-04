#  Smart Task Manager

A full-stack productivity app to create, update, and manage tasks with deadlines, categories, and user authentication.

##  Features

 **User Authentication**
- Register and login securely
- JSON Web Tokens (JWT) used for session management

 **Task Management**
- Create, edit, and delete tasks
- Mark tasks as completed
- Filter by category and deadline (Overdue, Due Today, Upcoming)

 **User-Specific Tasks**
- Each user sees only their own tasks

 **Visual Cues**
- Completed tasks show a strikethrough
- Overdue tasks highlighted

---

## Tech Stack

**Frontend**
- React
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Bcrypt for password hashing
- JWT for authentication

---

## Setup Instructions

### Backend

1. Navigate to the backend folder: cd backend
2. Install dependencies
3. Start the server: node index.js

### The server will run on **http://localhost:5000**

### Frontend

1. Navigate to the frontend folder: cd src
2. Install dependencies
3. Start the app: npm start

### The app will open in your browser on **http://localhost:3000**


---

##  Assumptions

- Each user must be logged in to access their tasks.
- Tasks are private to each user.
- Token expires after 1 hour; the user must log in again.

---

## Future Improvements

- Email verification on signup
- Password reset functionality
- Pagination for large task lists
- Notifications for deadlines









