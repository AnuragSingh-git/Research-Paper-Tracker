# 📚 Research Paper Tracker

A full-stack MERN application for organizing, tracking, and analyzing research papers. Users can manage their research library, monitor reading progress, visualize analytics, and search papers efficiently through an intuitive dashboard.

https://research-paper-tracker-fawn.vercel.app
---

## 🚀 Features

### 🔐 Authentication

* User registration and login
* JWT Authentication (Access & Refresh Tokens)
* Secure HTTP-only cookies
* Protected routes
* Logout functionality

### 📄 Research Paper Management

* Add new research papers
* Edit paper details
* Delete papers
* View all papers in a searchable table

Each paper stores:

* Title
* First Author
* Research Domain
* Reading Stage
* Citation Count
* Impact Score
* Date Added

---

## 🔍 Advanced Filtering

Filter papers using multiple criteria:

* Search by paper title
* Reading Stage (multiple selection)
* Research Domain (multiple selection)
* Impact Score (multiple selection)
* Date Added

  * This Week
  * This Month
  * Last 3 Months
  * All Time

---

## 📊 Analytics Dashboard

The dashboard provides insightful visualizations including:

### Summary Cards

* Total Papers
* Papers Fully Read
* Average Citation Count
* Completion Rate

### Charts

* Pie Chart: Reading Stage Distribution
* Pie Chart: Average Citation by Research Domain
* Stacked Bar Chart: Papers by Domain & Reading Stage
* Scatter Chart: Citation Count vs Impact Score
* Reading Funnel Visualization

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Hook Form
* Axios
* Recharts
* Base UI
* Sonner
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* Cookie Parser
* Helmet
* Morgan

---

## 📂 Project Structure

```
Research-Paper-Tracker
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── hooks
│   │   ├── layouts
│   │   └── utils
│   │
│   └── package.json
│
├── server
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── validators
│   │   └── utils
│   │
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/research-paper-tracker.git
```

```bash
cd research-paper-tracker
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_secret

REFRESH_TOKEN_SECRET=your_refresh_secret

ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_EXPIRY=7d

CLIENT_URL=http://localhost:5173


```

Run the backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

---

## 🌐 Deployment

### Frontend

* Vercel

### Backend

* Render

Ensure the following environment variables are configured in production:

Backend:

```env
CLIENT_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

Frontend:

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## 📸 Screenshots
<img width="1918" height="907" alt="dashboard" src="https://github.com/user-attachments/assets/4fb907f6-cf5f-4c55-bc34-8cfb2bc457be" />
<img width="1918" height="910" alt="paper library" src="https://github.com/user-attachments/assets/bb4f9278-0197-4f83-ab9c-29ae8c12d04f" />
<img width="1918" height="905" alt="a1" src="https://github.com/user-attachments/assets/bc95ac52-40de-4d65-be68-335dca9980bc" />
<img width="1918" height="907" alt="a2" src="https://github.com/user-attachments/assets/ceb7ffd6-9c1b-4557-9b8f-8602c8b7b963" />
<img width="1918" height="907" alt="a3" src="https://github.com/user-attachments/assets/12954c7a-8cd5-4266-9480-a9fee9b650e5" />

---

## Future Improvements

* Export analytics reports (PDF/CSV)
* Bookmark favorite papers
* Paper recommendations
* AI-powered paper summarization
* Notes editor with Markdown support
* Dark mode
* Pagination and sorting improvements

---

## 👨‍💻 Author

**Anurag Singh**

* GitHub: https://github.com/AnuragSingh-git
* LinkedIn: www.linkedin.com/in/anurag-singh-98b83217a
---

## 📄 License

This project is licensed under the MIT License.

Feel free to use, modify, and contribute to the project.
