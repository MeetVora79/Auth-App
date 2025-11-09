# 🔐 Laravel + React JWT Authentication System

A full-featured **User Authentication System** built with **Laravel** (backend) and **React.js** (frontend).  
It includes secure **JWT-based login**, **registration**, **password recovery**, and **role-based access control** for **Admin** and **User** dashboards.

---

## 🚀 Features

✅ **User Authentication**
- Register new users  
- Login with JWT-based authentication  
- Logout securely  
- Retrieve authenticated user profile (`/me` endpoint)

✅ **Password Recovery**
- Forgot Password (email reset link)  
- Reset Password with secure token  

✅ **Role-Based Access Control**
- Admin-only routes and dashboard  
- User dashboard access restricted by role  

✅ **Frontend (React.js)**
- Modern, responsive UI  
- Context-based Auth Management  
- Dynamic Navbar (changes after login/logout)  
- Persistent auth state using JWT + cookies  

✅ **Backend (Laravel)**
- RESTful API with clean structure  
- JWT token authentication  
- Custom `RoleMiddleware` for route protection  
- CORS properly configured for local dev  
- Password reset via mail  

---

## 🧠 Tech Stack

### **Frontend**
- ⚛️ React.js (Vite)
- 🌊 Tailwind CSS 
- 🔐 Axios for API requests
- 🌍 React Router DOM

### **Backend**
- 🐘 Laravel 
- 🔑 tymon/jwt-auth
- 📬 Laravel Mail for Password Reset
- 🧩 Custom Role Middleware

---

## ⚙️ Setup & Installation

### 🧩 1. Clone the repository 
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

### ⚙️ 2. Backend Setup (Laravel)
cd backend
composer install
cp .env.example .env
php artisan key:generate

**Configure your .env:**
APP_URL=http://127.0.0.1:8000
FRONTEND_URL=http://localhost:5173

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_db_name
DB_USERNAME=root
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=youremail@gmail.com
MAIL_PASSWORD=yourpassword
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=youremail@gmail.com
MAIL_FROM_NAME="Auth App"

**Run migrations & start the server:**
php artisan migrate
php artisan serve

**⚛️ 3. Frontend Setup (React)**
cd ../frontend
npm install
npm run dev

Now your React app should run at http://localhost:5173
and connect to your Laravel backend at http://127.0.0.1:8000

**🔑 API Endpoints**
| Method | Endpoint               | Description              | Middleware   |
| ------ | ---------------------- | ------------------------ | ------------ |
| POST   | `/api/register`        | Register new user        | -            |
| POST   | `/api/login`           | Login and get JWT token  | -            |
| GET    | `/api/me`              | Get logged-in user info  | `jwt.auth`   |
| POST   | `/api/logout`          | Logout user              | `jwt.auth`   |
| POST   | `/api/forgot-password` | Send reset link to email | -            |
| POST   | `/api/reset-password`  | Reset user password      | -            |
| GET    | `/api/admin-only`      | Access admin route       | `role:admin` |

**👑 Role-Based Access Control**
User: Can access user dashboard, general routes.
Admin: Has full access including /admin-only.

**🧠 How It Works**
~User logs in → backend issues JWT token
~Token stored in cookie (HTTP-only for security)
~AuthContext in React manages login state
~On refresh, app checks JWT and restores session
~RoleMiddleware ensures route-level protection

**🧰 Troubleshooting**
**💡 CORS Error**
Ensure both sides use same domain base:
# In Laravel .env
FRONTEND_URL=http://localhost:5173

**💡 JWT not recognized**
Run:
php artisan jwt:secret
php artisan optimize:clear

**🧑‍💻 Author**
**Meet Vora**
📧 [meetvora877@gmail.com]
🌍 (https://github.com/MeetVora79)


