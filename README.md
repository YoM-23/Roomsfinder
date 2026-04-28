# 🏠 Rooms Finder - Luxury Accommodation Booking Platform

Rooms Finder is a full-stack web application designed for listing and booking luxury rooms and apartments. It features a seamless user experience for both travelers looking for a stay and homeowners looking to list their properties.

## ✨ Features

- **For Users**:
  - Discover featured destinations and exclusive offers.
  - Search for rooms by city, dates, and number of guests.
  - Detailed room views with amenities and host information.
  - Personal dashboard to manage bookings.
- **For Homeowners**:
  - Register your home as a verified host.
  - List and manage multiple rooms with image uploads.
  - Track total bookings and revenue through a dedicated dashboard.
  - Toggle room availability in real-time.
- **Authentication**: Secure login and sign-up powered by Clerk.
- **Image Management**: Cloud-based image storage using Cloudinary.

---

## 🚀 Getting Started

This repository comes pre-configured with all necessary environment variables so you can get started immediately!

### 1. Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **Git**: To clone the repository.

### 2. Installation

Clone the repository and install dependencies for both the frontend and backend:

```bash
# Clone the repository
git clone <repository-url>
cd rooms-finder

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. Running the Application

You need to start both the server and the client.

#### Start the Backend (Server)
Open a terminal in the `server/` directory:
```bash
npm run server
```
*The API will be available at http://localhost:3000*

#### Start the Frontend (Client)
Open a new terminal in the `client/` directory:
```bash
npm run dev
```
*The application will be available at http://localhost:5173*

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Tailwind CSS, Vite, Clerk (Auth), Axios.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Cloudinary (Images), Clerk Express SDK.

---

## 🔒 Security Note

> [!WARNING]
> This repository currently includes `.env` files for ease of setup. In a production environment, you should never commit `.env` files to version control. Ensure you move these secrets to your deployment platform's environment variables.

---

## 📄 License

This project is licensed under the ISC License.
