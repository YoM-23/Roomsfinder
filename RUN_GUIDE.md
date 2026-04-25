# How to Run Rooms Finder

This project consists of a **Frontend (client)** and a **Backend (server)**. You need to set up both.

## 1. Environment Variables
You MUST set up your environment variables before the app will work.

### Backend (`server/`)
1. Go to the `server/` directory.
2. Copy `.env.example` to a new file named `.env`.
3. Fill in your `MONGODB_URI`, `CLERK_SECRET_KEY`, and Cloudinary details.

### Frontend (`client/`)
1. Go to the `client/` directory.
2. Copy `.env.example` to a new file named `.env`.
3. Fill in your `VITE_CLERK_PUBLISHABLE_KEY`.

---

## 2. Install Dependencies
Open your terminal in the root `rooms-finder` directory and run:

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

## 3. Run the Application
You need to start both the server and the client.

### Start the Server (Backend)
In one terminal window:
```bash
cd server
npm run server
```
*The server will run on http://localhost:3000*

### Start the Client (Frontend)
In a second terminal window:
```bash
cd client
npm run dev
```
*The client will run on http://localhost:5173*

---

## 🛠️ Troubleshooting
- **Port 3000 is busy**: Change the `PORT` in `server/.env`.
- **Clerk Errors**: Double-check that your `VITE_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` match.
- **MongoDB Errors**: Ensure your IP address is whitelisted in your MongoDB Atlas dashboard.
