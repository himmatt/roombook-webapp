# Meeting Room Booking System

A full-stack Meeting Room Booking System built with React, Node.js, Express, MongoDB, and JWT Authentication.

## Features

### Authentication & Authorization

- User login with JWT authentication
- Role-based access control
- Roles:
  - User
  - Admin
  - Owner

### Booking Management

- Create booking
- View bookings
- Delete booking
- Conflict detection for overlapping bookings
- Booking duration calculation
- Pagination support

### Dashboard

#### User

- View current active booking

#### Admin

- View current active booking
- View total bookings
- View total users

#### Owner

- View current active booking
- View total bookings
- View total users
- View bookings grouped by user
- View booking usage summary

### User Profile

- View profile information
- Role information
- Account creation date

---

# Tech Stack

## Frontend

- React
- React Router
- Axios
- Tailwind CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

# Project Structure

```bash
meeting-room-booking/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── package.json
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/meeting-room-booking.git
```

```bash
cd meeting-room-booking
```

---

# Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

Start backend:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

---

# Frontend Setup

Open a new terminal.

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# Running the Application

## Start Backend

```bash
cd backend
npm run dev
```

## Start Frontend

```bash
cd frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# API Endpoints

## Authentication

| Method | Endpoint          |
| ------ | ----------------- |
| POST   | /api/auth/login   |
| GET    | /api/auth/profile |

## Bookings

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | /api/bookings     |
| POST   | /api/bookings     |
| DELETE | /api/bookings/:id |

## Dashboard

| Method | Endpoint               |
| ------ | ---------------------- |
| GET    | /api/dashboard/summary |

---

# Roles & Permissions

| Action             | User | Admin | Owner |
| ------------------ | ---- | ----- | ----- |
| Create Booking     | ✅   | ✅    | ✅    |
| View Bookings      | ✅   | ✅    | ✅    |
| Delete Own Booking | ✅   | ✅    | ✅    |
| Delete Any Booking | ❌   | ✅    | ✅    |
| View Dashboard     | ✅   | ✅    | ✅    |
| View Usage Summary | ❌   | ❌    | ✅    |
| Manage Users.      | ❌   | ✅    | ❌    |

---

# Development

## Create New Feature Branch

```bash
git checkout -b feature/new-feature
```

## Commit Changes

```bash
git add .
```

```bash
git commit -m "Add new feature"
```

## Push Changes

```bash
git push origin feature/new-feature
```

---

# Future Improvements

- Meeting room management
- Booking approval workflow
- Email notifications
- Calendar view
- Booking analytics
- Export reports
- Real-time updates
- Dark mode support

---

# Author

Developed by Ye Yint Aung (himmat)
