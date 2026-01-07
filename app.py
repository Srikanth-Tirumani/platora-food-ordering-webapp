from flask import Flask, render_template, request, redirect, url_for, session
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

app = Flask(__name__)
app.secret_key = "Platora_secret_key"
app.config["SESSION_COOKIE_HTTPONLY"] = True

DATABASE = "Platora.db"


# ---------------- DATABASE CONNECTION ----------------
def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


# ---------------- CREATE TABLES ----------------
def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # USERS TABLE
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT
    )
    """)

    # ORDERS TABLE (NEW)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        order_id TEXT,
        items TEXT,
        total INTEGER,
        status TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()



# ---------------- LOGIN REQUIRED DECORATOR ----------------
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "user_id" not in session:
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated_function


# ---------------- LOGIN (FIRST PAGE) ----------------
@app.route("/", methods=["GET", "POST"])
@app.route("/login", methods=["GET", "POST"])
def login():
    # If already logged in → go to home
    if "user_id" in session:
        return redirect(url_for("home"))

    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        with get_db() as conn:
            user = conn.execute(
                "SELECT * FROM users WHERE email = ?", (email,)
            ).fetchone()

        if user and check_password_hash(user["password"], password):
            session.permanent = True
            session["user_id"] = user["id"]
            session["user_name"] = user["name"]
            session["cart"] = []
            return redirect(url_for("home"))

        return render_template(
            "login.html",
            error="Invalid Email or Password"
        )

    return render_template("login.html")


# ---------------- SIGNUP ----------------
@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        password = generate_password_hash(request.form["password"])

        try:
            with get_db() as conn:
                conn.execute(
                    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                    (name, email, password)
                )
            return redirect(url_for("login"))

        except sqlite3.IntegrityError:
            return render_template(
                "signup.html",
                error="Email already exists"
            )

    return render_template("signup.html")


# ---------------- HOME (INDEX) ----------------
@app.route("/home")
@login_required
def home():
    return render_template(
        "index.html",
        user=session.get("user_name")
    )


# ---------------- LOGOUT ----------------
@app.route("/logout")
@login_required
def logout():
    session.clear()
    return redirect(url_for("login"))


# ---------------- MENU ROUTES (PROTECTED) ----------------
@app.route("/nonveg")
@login_required
def nonveg():
    return render_template("nonveg.html")

@app.route("/veg")
@login_required
def veg():
    return render_template("veg.html")

@app.route("/soups")
@login_required
def soups():
    return render_template("soups.html")

@app.route("/seafood")
@login_required
def seafood():
    return render_template("seafood.html")

@app.route("/maincourse")
@login_required
def maincourse():
    return render_template("maincourse.html")

@app.route("/noodles")
@login_required
def noodles():
    return render_template("noodles.html")

@app.route("/salads")
@login_required
def salads():
    return render_template("salads.html")

@app.route("/desserts")
@login_required
def desserts():
    return render_template("desserts.html")


# ---------------- ADD TO CART ----------------
@app.route("/add-to-cart", methods=["POST"])
@login_required
def add_to_cart():
    name = request.form["name"]
    price = int(request.form["price"])

    cart = session.get("cart", [])

    for item in cart:
        if item["name"] == name:
            item["qty"] += 1
            session["cart"] = cart
            session.modified = True
            return redirect(request.referrer)

    cart.append({
        "name": name,
        "price": price,
        "qty": 1
    })

    session["cart"] = cart
    session.modified = True
    return redirect(request.referrer)


# ---------------- CART PAGE ----------------
@app.route("/cart")
@login_required
def cart():
    cart_items = session.get("cart", [])
    total = sum(item["price"] * item["qty"] for item in cart_items)
    return render_template(
        "cart.html",
        cart=cart_items,
        total=total
    )


# ---------------- REMOVE ITEM ----------------
@app.route("/remove-from-cart", methods=["POST"])
@login_required
def remove_from_cart():
    name = request.form["name"]
    session["cart"] = [
        item for item in session.get("cart", [])
        if item["name"] != name
    ]
    session.modified = True
    return redirect(url_for("cart"))


# ---------------- CLEAR CART ----------------
@app.route("/clear-cart")
@login_required
def clear_cart():
    session["cart"] = []
    return redirect(url_for("cart"))

#-----------proceed to checkout route----------------
@app.route("/checkout")
@login_required
def checkout():
    cart_items = session.get("cart", [])
    total = sum(item["price"] * item["qty"] for item in cart_items)
    return render_template("checkout.html", cart=cart_items, total=total)

#-----------order success route----------------
import random

@app.route("/order-success", methods=["POST"])
@login_required
def order_success():
    order_id = f"FM{random.randint(100000,999999)}"
    cart = session.get("cart", [])

    items_text = ", ".join(
        [f"{item['name']} x{item['qty']}" for item in cart]
    )

    total = sum(item["price"] * item["qty"] for item in cart)

    conn = get_db()
    conn.execute("""
        INSERT INTO orders (user_id, order_id, items, total, status)
        VALUES (?, ?, ?, ?, ?)
    """, (
        session["user_id"],
        order_id,
        items_text,
        total + 35,
        "Delivered"
    ))
    conn.commit()
    conn.close()

    session["cart"] = []

    return render_template("order_success.html", order_id=order_id)

#---------------- ORDER HISTORY ----------------
@app.route("/orders")
@login_required
def orders():
    conn = get_db()
    orders = conn.execute("""
        SELECT * FROM orders
        WHERE user_id=?
        ORDER BY created_at DESC
    """, (session["user_id"],)).fetchall()
    conn.close()

    return render_template("orders.html", orders=orders)

# ---------------- RUN ----------------
if __name__ == "__main__":
    init_db()
    app.run(debug=True)


