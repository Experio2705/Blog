# 📝 Full Stack Blog Platform

A modern full‑stack blogging platform where users can create posts, like, save, and interact with other users. The project demonstrates authentication, database relationships, REST APIs, and a responsive frontend UI.

---

## 🚀 Features

- User Registration & Login
- Create, Edit and Delete Blog Posts
- Like / Unlike Posts
- Save / Unsave Posts (Bookmarks)
- User Profile Page
- View Other Users' Posts
- Persistent Like State (remembers user actions)
- Responsive UI

---

## 🛠 Tech Stack

### Frontend

- React.js
- CSS
- Axios
- React Router
- Font Awesome Icons

### Backend

- Node.js
- Express.js
- REST API Architecture

### Database

- MySQL / Supabase (Relational Database)

---

## 📁 Project Structure

```
project-root
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── css/
│   │   └── App.jsx
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── db.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone <your-repo-link>
cd project-root
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=blogdb
```

Run backend:

```
nodemon server.js
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint  | Description    |
| ------ | --------- | -------------- |
| POST   | /Login    | User Login     |
| POST   | /Register | Create Account |

### Blog

| Method | Endpoint    | Description   |
| ------ | ----------- | ------------- |
| GET    | /Home       | Get All Posts |
| POST   | /Create     | Create Post   |
| DELETE | /Delete/:id | Delete Post   |

### Interaction

| Method | Endpoint   | Description        |
| ------ | ---------- | ------------------ |
| POST   | /Home/Like | Like / Unlike Post |
| POST   | /Home/Save | Save / Unsave Post |

### Profile

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| GET    | /Profile/:email | Get User Profile |

---

## 🗄 Database Schema (Example)

### userAuth

| Column   | Type    |
| -------- | ------- |
| email    | varchar |
| username | varchar |
| password | varchar |
| bio      | text    |
| address  | varchar |

### blogdata

| Column    | Type    |
| --------- | ------- |
| id        | int     |
| title     | varchar |
| content   | text    |
| userEmail | varchar |
| likes     | int     |
| likedby   | text    |
| savedby   | text    |

---

## 🔮 Future Improvements

- Comments System
- Image Uploads
- Real‑time Notifications
- Dark Mode
- Follow / Unfollow Users
- Search & Filters

---

## 👨‍💻 Author

**Aryan Shinde**

Student Project – Full Stack Web Development Practice
