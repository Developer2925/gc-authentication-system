# Authentication System Workflow (React + Node.js + Express + MySQL)

This document explains the full workflow of an authentication system built using **React**, **Node.js**, **Express**, and **MySQL**. The system allows users to **register**, **log in**, and **stay authenticated** using JSON Web Tokens (JWT) stored in the browser's **localStorage**.

---

## 🚀 Tech Stack

### **Frontend (Client)**

* React
* Axios
* TailwindCSS
* React Toastify (notifications)
* React Router DOM (routing)

### **Backend (Server)**

* Node.js
* Express
* MySQL2 (database connection)
* JSON Web Token (JWT)
* BcryptJS (password hashing)
* CORS
* Dotenv
* Nodemon

---

## ⚙️ Overview of Workflow

The authentication flow consists of three major steps:

1. **User Registration**
2. **User Login**
3. **Protected Routes using JWT**

Each step is explained in detail below.

---

# 1️⃣ User Registration Workflow
<img width="600" height="400" alt="Screenshot 2025-12-13 at 0 34 58" src="https://github.com/user-attachments/assets/24af77dc-aea1-4c79-9a83-cf1a62ceeb37" />

### **Step 1: User enters details**

The registration page collects:

* **Username**
* **Email**
* **Password**

### **Step 2: Frontend validation**

React checks if all fields are filled. If not, React Toastify displays an error message.

### **Step 3: API Request to Backend**

Frontend sends user data to the server using Axios:

```
POST /register
```

### **Step 4: Backend validation**

The server checks:

* All fields are provided
* Email is unique
* Password meets security requirements

### **Step 5: Password hashing**

The password is hashed using **bcryptjs** before storing it in MySQL.

### **Step 6: Store user in database**

The server creates a new user record in MySQL.

### **Step 7: Redirect user to Login Page**

After successful registration, frontend redirects the user to the **Login Page**.

---

# 2️⃣ User Login Workflow
<img width="600" height="400" alt="Screenshot 2025-12-13 at 0 35 06" src="https://github.com/user-attachments/assets/2f354c39-e3c6-4d4c-90b4-463904c94844" />

### **Step 1: User enters email and password**

If any field is empty, React Toastify shows an error.

### **Step 2: API request to backend**

```
POST /login
```

### **Step 3: Backend validations**

* Verify user exists
* Verify password with bcryptjs

### **Step 4: Generate JWT token**

If the credentials are valid, the server creates a JSON Web Token containing the user's ID.

### **Step 5: Send token to frontend**

Frontend receives the JWT and stores it in **localStorage**:

```
localStorage.setItem("token", receivedToken);
```

### **Step 6: Redirect to Home Page**
<img width="600" height="400" alt="Screenshot 2025-12-13 at 0 35 20" src="https://github.com/user-attachments/assets/a6b682fa-4681-4963-9dbf-7fcbc12a79d8" />

User is directed to the **Home Page**, which is protected.

---

# 3️⃣ Protected Route (Home Page) Workflow

### **Goal:**

Prevent unauthorized users from directly accessing the Home Page URL.

### **Step 1: Check token in localStorage**

When the user opens:

```
/home
```

or directly types the URL into:

* Incognito window
* Safari
* Another browser

The frontend checks:

```
const token = localStorage.getItem("token");
```

### **Step 2: If token exists**

* User stays logged in
* Access to Home Page is granted

### **Step 3: If token does NOT exist**

* The system immediately redirects user to the **Login Page**
* User must authenticate again

This ensures **security and session consistency across different browsers**.

---

# 🔐 JWT-Based Authentication Logic

### **Why use a token?**

Tokens allow stateless authentication — no need for session storage.

### Token includes:

* User ID
* Expiration time

### Token is stored in:

* LocalStorage (client-side persistence)

Frontend uses this token to decide whether the user is authenticated.

---

# 📦 Dependencies

## **Client-side Dependencies**

```
npm install axios tailwindcss react-toastify react-router-dom
npm run dev
```

## **Server-side Dependencies**

```
npm install express cors dotenv nodemon jsonwebtoken mysql2 bcryptjs
npm start
```

---

# 🎯 Summary of Features

* Register with username, email, password
* Hash password before saving
* Login with email + password
* Generate JWT on login
* Store JWT in localStorage
* Redirect after registration & login
* Access control based on token
* Auto redirect to login page when token missing
