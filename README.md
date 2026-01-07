# 🍽️ Platora – Food Ordering Web Application

Platora is a full-stack food ordering web application built using **Python (Flask)** that allows users to explore food menus, add items to a cart, place orders, and track their order history.  
The project focuses on **clean UI, secure authentication, user-wise data handling, and responsive design** similar to modern food ordering platforms.

---

## 📌 Project Overview

Platora provides a seamless food ordering experience where:

- New users can **sign up** and existing users can **log in**
- Users can **browse multiple food categories**
- Items can be **added to cart**
- Users can **checkout and place orders**
- Each user has **individual order history**
- The UI is **responsive** across devices

---

## ✨ Key Features

### 🔐 Authentication
- Secure **Login & Signup**
- Password hashing using Werkzeug
- Session-based authentication

### 🍕 Menu & Cart
- Multiple food categories
- Add items to cart
- Cart summary with total calculation
- Remove items from cart

### 💳 Checkout & Orders
- Checkout page with delivery address
- Payment options UI
- Order success confirmation
- User-wise order history

### 🎨 UI / UX
- Responsive design using Bootstrap
- Modern layout inspired by real food ordering platforms
- Smooth transitions & icons using Font Awesome

---

## 🛠️ Tech Stack

| Layer        | Technology |
|--------------|------------|
| Backend      | Python, Flask |
| Frontend     | HTML, CSS, Bootstrap |
| Database     | SQLite |
| Authentication | Werkzeug Security |
| Icons        | Font Awesome |

---

## 📁 Project Structure

platora/
│
├── app.py
├── platora.db
│
├── templates/
│ ├── login.html
│ ├── signup.html
│ ├── index.html
│ ├── cart.html
│ ├── checkout.html
│ ├── order_success.html
│ ├── order_history.html
│ ├── nonveg.html
│ ├── veg.html
│ ├── soups.html
│ ├── seafood.html
│ ├── maincourse.html
│ ├── noodles.html
│ ├── salads.html
│ └── desserts.html
│
├── static/
│ ├── css/
│ ├── js/
│ └── images/
│
└── README.md


---

## ⚙️ Prerequisites

Make sure you have the following installed:

- Python **3.8+**
- pip (Python package manager)
- Git

---

## 📥 Clone the Project

cd platora
git clone https://github.com/Srikanth-Tirumani/platora.git

📦 Install Dependencies
pip install flask werkzeug

▶️ Run the Project
python app.py

Open your browser and visit:
http://127.0.0.1:5000

🔁 Application Flow

Login Page opens first

New users → Signup

Successful login → Home Page

Explore menu → Add items to cart

Proceed to checkout → Place order

Order success → View order history

🧪 Database

SQLite database (foodmunch.db)

Automatically created when the app runs

Stores:

User details
Orders
Order items
