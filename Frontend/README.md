# 🛒 Full Stack E-Commerce Application

A production-ready full stack E-Commerce platform built using Angular and Spring Boot, featuring JWT authentication, role-based access control, admin dashboard, cart management, and Razorpay payment integration.

---

## 🚀 Live Demo

Frontend: https://your-frontend-link  
Backend API: https://your-backend-link  

---

## 🏗️ Tech Stack

### 🔹 Frontend
- Angular 21
- Angular Material 21
- NgRx (Router Store)
- RxJS 7
- TypeScript 5.9

### 🔹 Backend
- Java 17
- Spring Boot 4.0.2
- Spring Security
- Spring Data JPA (Hibernate)
- JWT Authentication (jjwt 0.11.1)
- Razorpay Payment Integration
- Maven

### 🔹 Database
- MySQL 8.0.42

---

## ✨ Features

### 👤 User Features
- User Registration & Login (JWT Based Authentication)
- Role-Based Access Control
- Browse Products by Category
- Product Details Page
- Add to Cart / Remove from Cart
- Secure Checkout
- Razorpay Payment Integration
- Order History
- Responsive UI using Angular Material

### 👑 Admin Features
- Admin Login
- Dashboard with Key Metrics
- Add / Edit / Delete Products
- Manage Users
- Manage Orders
- Role-Protected Routes using Angular Guard

---

## 🔐 Authentication & Security

- JWT-based authentication
- Stateless session management
- Role-based authorization (USER / ADMIN)
- Spring Security integration
- Angular route guards for protected routes

---

## 🏛️ Architecture

Frontend (Angular SPA)  
⬇  
REST API (Spring Boot)  
⬇  
MySQL Database  

The application follows a layered architecture:

- Controller Layer
- Service Layer
- Repository Layer
- Security Configuration
- DTO-based request handling

---

## 📂 Project Structure

### Backend
```
src/main/java/com/anuj/ecommerce
 ├── controller
 ├── service
 ├── repository
 ├── config
 ├── model
 └── security
```

### Frontend
```
src/app
 ├── feature
 ├── shared
 ├── admin
 ├── state
 └── models
```

---

## ⚙️ Installation Guide

### Backend Setup

```bash
git clone <backend-repo>
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend Setup

```bash
git clone <frontend-repo>
cd frontend
npm install
ng serve
```

---

## 🌍 Deployment

- Frontend hosted on Netlify
- Backend hosted on Render
- Database hosted on Railway

---

## 📈 Key Highlights

- Fixed infinite routing loop in Angular authentication flow
- Implemented role-based route protection
- Optimized change detection for performance
- Production-ready deployment configuration
- Clean separation of concerns (Frontend & Backend)

---

## 🧠 What I Learned

- JWT authentication implementation
- Role-based authorization
- REST API design best practices
- Angular state management
- Full stack deployment process
- Debugging complex routing issues

---

## 👨‍💻 Author

Anuj  
Full Stack Developer  
Java | Spring Boot | Angular | MySQL
