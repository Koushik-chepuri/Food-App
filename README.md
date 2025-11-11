# 🍽️ Food Ordering App

A full-stack food ordering platform.  
Users browse restaurants, add items to their cart, and place orders.  
Admins get a dashboard to manage orders.  
Everything is deployed, live, and works.

---

## 🌍 Live Deployment

| What | Link |
|-----|------|
| Frontend (UI) | https://food-app-z5dg.onrender.com |
| Backend API | https://food-app-backend-zqmn.onrender.com/api |

---

## 🔑 Test Accounts

Signup is currently disabled because role validation is strict.  
Use any of these logins:

| Email | Password | Role | Country |
|-------|----------|------|---------|
| furiousNick@forkit.com | samuelFJackson | Admin | America |
| brieLars@forkit.com | crappyMarvel | Manager | India |
| chrisEvans@forkit.com | winterSoldier | Member | America |
| joshBrolin@forkit.com | snappyFinger | Member | India |
| chrisHems@forkit.com | heavyHammer | Member | America |
| travis@forkit.com | iVoiceThor | Member | India |

**Admin / Manager** can cancel orders and (for Admin) change payment method.  
Regular members just order food like normal humans.

---

## 🧭 How to Use

1. **Login** with one of the above accounts.
2. Pick a restaurant → view menu.
3. Add items to cart → adjust quantity.
4. Checkout → choose payment method → place order.
5. Check **My Orders** to review past orders.
6. If you're **Admin / Manager** → go to **Manage Orders**.

Smooth flow. No hidden nonsense.

---

## 🛠 Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Auth:** JWT (token stored client-side)
- **Database:** MongoDB
- **Deployment:** Render (FE + BE)

---

## 💻 Run Locally (if needed)

```bash
git clone https://github.com/Koushik-chepuri/Food-App
cd food-app

**Backend**
cd food-be
npm install
npm start

**Frontend**
cd food-fe
npm install
npm run dev

**Base URL:**
https://food-app-backend-zqmn.onrender.com/api
**Method**	  **Endpoint**	               **Purpose**	                   **Who**
POST	       /auth/login	                 Login and get token	           Anyone
GET	         /restaurants	                 Get restaurant list	           Logged-in
GET	         /orders	                     Get user’s orders	             Logged-in
POST	       /orders	                     Place new order	               Logged-in
PATCH	       /orders/:id	                 Cancel an order	               Admin / Manager
PATCH	       /orders/:id/method	           Change payment method	         Admin only
GET	         /orders/all	                 View every order	               Admin only

Authorization: Bearer <token>

git clone <repo-url>
cd food-app
