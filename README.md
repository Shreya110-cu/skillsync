# SkillSync – MERN Hiring Platform

A full-stack recruitment platform built using the MERN stack.

## Features

### Candidate
- Register / Login
- Browse jobs
- Search jobs
- Apply to jobs
- View personalized dashboard

### Recruiter
- Register / Login
- Create jobs
- View posted jobs
- View applicants
- Analytics dashboard

## Tech Stack

Frontend:
- React
- Tailwind CSS
- Axios
- React Router

Backend:
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt

## Project Structure

/client → React frontend  
/server → Node backend  

## Installation

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Environment Variables

Create `.env` inside server:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000
```

## Future Enhancements

- Resume upload
- Email notifications
- Interview scheduling
- AI job matching

## Author

Shreya
