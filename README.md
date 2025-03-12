# 📚 **Student Course & Book Management System**

A **web application** for students to easily **search, filter, and access course-related books**. The platform allows students to **filter courses by department, level, and semester**, view a list of available books, and preview or download them.

---

## 🚀 **Features**
- 🔍 **Course Filtering**: Search and filter courses based on department, level, and semester.
- 🔗 **Persistent Filtering**: Filters are stored in the URL for easy sharing.
- 📖 **Book Listing**: Each course has a list of books with a **thumbnail, title, and download/preview options**.
- ☁️ **Google Drive Integration**: Books are hosted on Google Drive with an embedded preview.
<!-- - ⚡ **Performance Optimizations**: -->
  <!-- - 🛑 **Redis caching** for frequently accessed data. -->
  <!-- - 💾 **LocalStorage** for storing non-changing course data. -->
- 🔒 **Secure Access**: Users must be authenticated to upload books.

---

## 🛠 **Tech Stack**
### 🌐 **Frontend**
- ⚛️ **React.js** (framework)
- 🎨 **Tailwind CSS** (Styling)
- 🎨 **Shadcn UI** (UI Library)
- 🗂 **TanStack Query** (Data fetching library)

### 🔙 **Backend**
- 🟢 **Node.js** (Runtime)
- 🚀 **Express.js** (Server framework)
- 🏗 **TypeScript** (Static typing)
- 🍃 **MongoDB (Atlas)** (Database)
<!-- - ⚡ **Redis** (Cache for fast lookups) -->
<!-- - 📂 **Google Drive API** (For fetching PDF files) -->

### ☁️ **Deployment**
- 🖥 **Backend**: Hosted on **Render/Railway** *(TBD)*
- 🌍 **Frontend**: Hosted on **Vercel/Netlify**
- 🏦 **Database**: **MongoDB Atlas**

---

## 📡 **API Endpoints**
### 📘 **Courses**
| Method | Endpoint         | Description                  |
|--------|-----------------|------------------------------|
| `GET`  | `/courses?department=department&level=level&semester=semester`       | Filter courses by departments, level and semester             |
<!-- | `GET`  | `/courses/:id`   | Get a single course         | -->
| `POST` | `/courses`       | Create a new course         |

### 📚 **Books**
| Method | Endpoint          | Description                     |
|--------|------------------|---------------------------------|
| `GET`  | `/books?courseCode=xyz` | Get books for a course      |
| `POST` | `/books`         | Upload a book (Admin only)    |

### 🔑 **User Authentication**
| Method | Endpoint        | Description                      |
|--------|---------------|----------------------------------|
| `POST` | `/auth/login`  | User login                      |
| `POST` | `/auth/signup` | User registration               |
| `POST` | `/auth/logout` | User logout               |

---

## 🏗 **Setup Instructions**
### 📥 **1. Clone the Repository**
```sh
git clone https://github.com/idighekere/faculty-library.git
cd server #for Backend
cd client #for Frontend
```

### 🔧 **2. Install Dependencies**
```sh
pnpm install
```

### 🛠 **3. Set Up Environment Variables**
Create a `.env` file in the **server** directory:
```env
PORT=5500
NODE_ENV=
FRONTEND_URL=

# Database
MONGO_URI=

# JWT
REFRESH_SECRET=
ACCESS_SECRET=
ACCESS_EXPIRES_IN=
REFRESH_EXPIRES_IN=
JWT_COOKIE_EXPIRES_IN=

```

Create a `.env` file in the **client** directory:
```env
VITE_NODE_ENV=
VITE_BASE_URL=


```

### ▶️ **4. Run the Application**
- **Backend**:
  ```sh
  pnpm run dev
  ```
- **Frontend**:
  ```sh
  cd client
  pnpm run dev
  ```

---

## 🎯 **Future Improvements**
<!-- - 🤖 **Book recommendations** based on student course history. -->
<!-- - 💬 **Comments & ratings** for books. -->
- ⚡ **Improved search algorithm** for faster results.

---

## 👥 **Contributors**
- **Idighekere Udo** – Developer

---
