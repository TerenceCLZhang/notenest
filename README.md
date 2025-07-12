## 📝 **Project Idea: Personal Notes App**

A simple web app where users can:

- Register and log in
- Create, view, edit, and delete personal notes
- Each user only sees their own notes

---

## 🔧 Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Frontend (Optional)**: React

---

## 🔄 Core Features

### ✅ Day 1: Setup & Basic CRUD

- [x] Set up Node.js, Express, MongoDB, Mongoose
- [x] Define Mongoose models: `User`, `Note`
- [x] Create RESTful API routes:
  - [x] `POST /notes` – Create a note
  - [x] `GET /notes` – List user's notes
  - [x] `PUT /notes/:id` – Edit a note
  - [x] `DELETE /notes/:id` – Delete a note

---

### 🔐 Day 2: Authentication & User Management

- [x] User Registration (`POST /register`)
- [x] User Login (`POST /login`)
- [x] Protect note routes using JWT
- [x] Only allow users to access their own notes

---

### 🎨 Day 3: Frontend (Optional) or Polish

- Option 1: Build simple frontend using EJS or React

  - [ ] Display user notes
  - [ ] Forms for login and note creation

- Option 2: Polish backend

  - [x] Add error handling
  - [x] Add timestamps
  - [ ] Add basic search/filter by title

---

## 🌟 Stretch Goals (if time)

- [x] Password hashing with **bcrypt**
- [ ] Deploy to **Netlify**
- [x] Use **MongoDB Atlas** instead of local DB
- [ ] Add tags or categories for notes
