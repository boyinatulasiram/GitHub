# GitHub Clone

A full-stack GitHub-like version control system with a custom CLI tool, REST API backend, and React frontend.

---

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB (Native Driver), Socket.IO
- **Frontend:** React, Vite, @primer/react, react-router-dom
- **Auth:** JWT, bcryptjs
- **CLI:** Yargs

---

## Backend

### Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=8080
MONGO_URL=mongodb://localhost:27017
JWT_SECRET_KEY=your_secret_key
ALLOWED_ORIGINS=http://localhost:5173
```

### Start Server

```bash
node index.js start
```

---

### CLI Commands

| Command | Description |
|---|---|
| `node index.js init` | Initialize a new local repository |
| `node index.js add <file>` | Add a file to the staging area |
| `node index.js commit <message>` | Commit staged files with a message |
| `node index.js push` | Push commits to cloud |
| `node index.js pull` | Pull latest commit from cloud |
| `node index.js revert <commitId>` | Revert to a specific commit |
| `node index.js start` | Start the Express server |

---

### API Routes

#### Users — `/users`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users/allUsers` | Get all users |
| POST | `/users/signup` | Register a new user |
| POST | `/users/login` | Login and get JWT token |
| GET | `/users/userProfile/:id` | Get user profile by ID |
| PUT | `/users/updateProfile/:id` | Update user profile |
| DELETE | `/users/deleteProfile/:id` | Delete user profile |

#### Repositories — `/repo`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/repo/create` | Create a new repository |
| GET | `/repo/all` | Get all repositories |
| GET | `/repo/:id` | Get repository by ID |
| GET | `/repo/name/:name` | Get repository by name |
| GET | `/repo/user/:userId` | Get all repositories for a user |
| PUT | `/repo/update/:id` | Update repository by ID |
| DELETE | `/repo/delete/:id` | Delete repository by ID |
| PATCH | `/repo/toggle/:id` | Toggle repository visibility |

#### Issues — `/issue`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/issue/create` | Create a new issue |
| GET | `/issue/all` | Get all issues |
| GET | `/issue/:id` | Get issue by ID |
| PUT | `/issue/update/:id` | Update issue by ID |
| DELETE | `/issue/delete/:id` | Delete issue by ID |

---

### WebSocket Events (Socket.IO)

| Event | Description |
|---|---|
| `join_room` | Join a room using `userID` for real-time updates |

---

## Frontend

### Setup

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`

### Pages

| Route | Component | Description |
|---|---|---|
| `/` | Dashboard | View your and suggested repositories |
| `/auth` | Login | Login page |
| `/signup` | Signup | Register page |
| `/profile` | Profile | User profile with contribution heatmap |

---

## Architecture

```
Github/
├── backend/
│   ├── controllers/       # Business logic (user, repo, issue, git ops)
│   ├── routes/            # Express routers (user, repo, issue)
│   ├── index.js           # Entry point — CLI + server
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/    # auth, dashboard, user
    │   ├── authContext.jsx
    │   ├── Routes.jsx
    │   └── main.jsx
    └── package.json
```
