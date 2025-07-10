## 📝 **Project Idea: Personal Notes App**

A simple web app where users can:

- Register and log in
- Create, view, edit, and delete personal notes
- Each user only sees their own notes

---

## 🔧 Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT or sessions (you choose)
- **Frontend (Optional)**: HTML/CSS + EJS, or use a React frontend if time permits

---

## 🔄 Core Features

### ✅ Day 1: Setup & Basic CRUD

- [x] Set up Node.js, Express, MongoDB, Mongoose
- [ ] Define Mongoose models: `User`, `Note`
- [ ] Create RESTful API routes:

  - `POST /notes` – Create a note
  - `GET /notes` – List user's notes
  - `PUT /notes/:id` – Edit a note
  - `DELETE /notes/:id` – Delete a note

- [ ] Test API with Postman

---

### 🔐 Day 2: Authentication & User Management

- [ ] User Registration (`POST /register`)
- [ ] User Login (`POST /login`)
- [ ] Protect note routes using JWT or session auth
- [ ] Only allow users to access their own notes

---

### 🎨 Day 3: Frontend (Optional) or Polish

- Option 1: Build simple frontend using EJS or React

  - [ ] Display user notes
  - [ ] Forms for login and note creation

- Option 2: Polish backend

  - [ ] Add error handling
  - [ ] Add timestamps
  - [ ] Add basic search/filter by title

---

## 📁 Suggested Folder Structure

```bash
project/
│
├── models/
│   ├── User.js
│   └── Note.js
│
├── routes/
│   ├── auth.js
│   └── notes.js
│
├── middleware/
│   └── auth.js
│
├── server.js
└── .env
```

---

## 🌟 Stretch Goals (if time)

- Password hashing with **bcrypt**
- Deploy to **Render**, **Vercel**, or **Railway**
- Use **MongoDB Atlas** instead of local DB
- Add tags or categories for notes
