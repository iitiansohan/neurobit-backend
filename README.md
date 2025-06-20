
# 🧠 NeuroBit Backend

NeuroBit is a full-stack **telemedicine platform** designed for doctor-patient interaction, built with the **MERN stack**. This repository contains the **backend** code, built with **Node.js, Express.js, MongoDB, JWT**, and **Nodemailer**.

---

## 🚀 Features

- 🧑‍⚕️ Role-based access for `doctor` and `patient`
- 🔒 JWT-based authentication and route protection
- 📬 Email notifications for appointment booking (via Nodemailer)
- 🗂️ Modular folder structure (Controllers, Routes, Models, Middleware)
- 🧾 RESTful API design for scalability and ease of integration

---

## 🛠️ Tech Stack

| Category | Tools |
|----------|-------|
| Language | Node.js, JavaScript (ES Modules) |
| Framework | Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt |
| Email | Nodemailer (Gmail SMTP) |
| Deployment | (e.g., Render / Railway / Localhost) |
| Version Control | Git, GitHub |

---

## 📁 Folder Structure

```
server/
├── auth/                 # Authentication & role-based middleware
├── controllers/          # Business logic (auth, user, doctor, appointment)
├── models/               # Mongoose schemas
├── routes/               # API endpoints
├── index.js              # Entry point
├── .env                  # Environment variables (not committed)
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/neurobit.git
cd neurobit/server
```

2. **Install dependencies**

```bash
npm install
```

3. **Set environment variables**

Create a `.env` file in `server/` with the following content:

```env
PORT=5000
ACCESS_TOKEN_SECRET=your_jwt_secret
MONGO_URI=mongodb://127.0.0.1:27017/medicall
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

> 🔐 *Use an App Password for Gmail SMTP (2FA enabled).*

4. **Run the server**

```bash
npm start
```

Server will run at `http://localhost:5000`

---

## 🔐 Authentication

- **Signup/Login** generates a JWT token.
- Token is verified via `authenticate` middleware.
- Role-based access (`doctor` / `patient`) is enforced via `restrict` middleware.

---

## 📬 Email Notification

Nodemailer is used to send emails to doctors upon booking an appointment.

- **Service**: Gmail SMTP
- **Config**: Set in `appointmentController.js` or moved to `.env` for production.

---

## 🧠 API Endpoints

### 🔐 Auth

| Method | Route           | Description          |
|--------|------------------|----------------------|
| POST   | `/api/auth/signup` | Register a new user (doctor/patient) |
| POST   | `/api/auth/login`  | Login user and return JWT |

---

### 👤 User

| Method | Route                         | Description                        |
|--------|-------------------------------|------------------------------------|
| GET    | `/api/users/:id`              | Get a specific user (auth required) |
| GET    | `/api/users/`                 | Get all users (auth required)      |
| PUT    | `/api/users/:id`              | Update user info                   |
| DELETE | `/api/users/:id`              | Delete user                        |
| GET    | `/api/users/profile/me`       | Get current user's profile         |
| GET    | `/api/users/appointments/my-appointments` | Get patient's booked appointments |

---

### 🩺 Doctor

| Method | Route                         | Description                        |
|--------|-------------------------------|------------------------------------|
| GET    | `/api/doctors/:id`            | Get a specific doctor (public)     |
| GET    | `/api/doctors/`               | Get all doctors (public)           |
| PUT    | `/api/doctors/:id`            | Update doctor info (auth + doctor) |
| DELETE | `/api/doctors/:id`            | Delete doctor profile (auth + doctor) |
| GET    | `/api/doctors/profile/me`     | Get current doctor's profile       |

---

### 📅 Appointment

| Method | Route                         | Description                        |
|--------|-------------------------------|------------------------------------|
| POST   | `/api/appointments/book-appointment` | Book an appointment and send email |

---

## ✅ Future Improvements

- Replace static doctor list with dynamic DB queries
- Add filtering, and search APIs
- Add admin panel for user/doctor management
- Improve error handling with centralized middleware
- Protect email credentials using `.env`
- Role-based appointment controls (patient can book, doctor can approve)

---

## 👨‍💻 Developer

**Sohan Roy Chowdhury (SRC)**  
B.Tech CSE @ IIT ISM Dhanbad  
[GitHub](https://github.com/iitiansohan) | [LinkedIn](https://linkedin.com/in/sohan-roy-chowdhury)

---

## 📄 License

MIT License. Feel free to use and modify for educational or production use.
