# Rooms Finder - New Project Structure

The project has been reorganized to support a single-command startup and better environment management.

## 📁 File Structure
```text
rooms-finder/
├── package.json         # Root package.json (Monorepo manager)
├── AUTHENTICATION.md    # Auth guide & sample credentials
├── RUN_GUIDE.md        # Detailed running instructions
├── structure.md        # This file
├── client/             # Frontend (Vite + React)
│   ├── .env            # Frontend environment variables
│   ├── package.json
│   └── ...
└── server/             # Backend (Express + Node.js)
    ├── .env            # Backend environment variables
    ├── server.js       # Consolidated server entry
    ├── controllers/    # Business logic
    ├── routes/         # API endpoints
    ├── models/         # MongoDB schemas
    ├── middleware/     # Auth & Upload logic
    └── ...
```

## 🚀 How to Run (New Way)
I have added a root manager. Now you only need **one terminal**:

1. **Install everything**:
   ```bash
   npm run install-all
   ```

2. **Run both Client & Server**:
   ```bash
   npm run dev
   ```

## 🛠️ Key Improvements Made
1. **Single Command Startup**: No more opening multiple terminals. `npm run dev` handles everything.
2. **Bug Fixes**:
   - Fixed `expresss` typo in `roomRoutes.js`.
   - Fixed `res.JSON` (capitalized) to `res.json` in `roomController.js`.
   - Fixed `succcess` and `falser` typos in `homeController.js`.
   - Fixed shadowing of `Home` model in `roomController.js`.
   - Fixed broken template literals in `Navbar.jsx`.
3. **Environment Sync**: Both `.env` files are now synchronized with the keys you provided.
4. **Server Consolidation**: All backend logic is now in the root `/server` directory (the duplicate `/client/sever` has been removed).

## 🔑 Environment Variables
Your provided keys have been applied to:
- `server/.env` (Full backend access)
- `client/.env` (Clerk Publishable Key & Backend URL)
