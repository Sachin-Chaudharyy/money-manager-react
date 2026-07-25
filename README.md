# 💰 Money Manager — Frontend

The pretty face of Money Manager 💅 — a React app where you can sign up, log in (with a password *or* just your Google account), and soon, actually see where all your money disappears to every month.

---

## 🌸 What this is

This is the frontend for **Money Manager**, a personal finance tracker. It talks to a Spring Boot backend to handle auth, and is built to feel simple, clean, and a little bit soft around the edges.

---

## 🧰 Tech Stack

| Layer | Tech |
|---|---|
| Library | React |
| Bundler | Vite ⚡ |
| Styling | Tailwind CSS |
| Routing | React Router |
| HTTP | Axios |
| Auth | JWT + Google OAuth (`@react-oauth/google`) |
| Notifications | react-hot-toast 🍞 |
| Icons | lucide-react |

---

## ✨ Features

- 📝 **Signup & Login pages** with clean validation and helpful error toasts
- 🔵 **"Continue with Google"** button — because typing passwords is overrated
- 🖼️ **Profile photo upload** during signup
- 🔔 **Toast notifications** for every success and every "oops"
- 🔐 **JWT stored client-side**, auto-attached to authenticated requests

---

## 🗂️ Project Structure

```
src/
├── components/     → Reusable UI bits (Input, ProfilePhotoSelector, etc.)
├── pages/          → Signup, Login, Dashboard, and friends
├── util/           → axiosConfig, API endpoints, validation helpers
├── Context/        → Global app context
└── assets/         → Images & static files
```

---

## ⚙️ Getting Started Locally

### 1. Clone it
```bash
git clone https://github.com/Sachin-Chaudharyy/money-manager-react.git
cd money-manager-react
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up your environment variables
Create a `.env` file in the root:
```
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

### 4. Run the dev server
```bash
npm run dev
```

Open `http://localhost:5173` and you're in 🎀

---

## 🔗 Connecting to the Backend

Make sure your backend is running (see the [backend repo](https://github.com/Sachin-Chaudharyy/money-manager)) and that `apiEndPoints.js` points to the right `BASE_URL` — `localhost:8080` for local dev, or your deployed backend URL for production.

---

Made with 🩷, Tailwind, and way too many `toast.error()` calls.
