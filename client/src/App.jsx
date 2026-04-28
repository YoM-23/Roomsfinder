<<<<<<< HEAD
import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import HomeReg from "./components/HomeReg";
import Layout from "./pages/HomeOwner/Layout";
import Dashboard from "./pages/HomeOwner/Dashboard";
import AddRoom from "./pages/HomeOwner/AddRoom";
import ListRoom from "./pages/HomeOwner/ListRoom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
=======
import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBookings'
import HomeReg from './components/HomeReg'
import Layout from './pages/HomeOwner/Layout'
import Dashboard from './pages/HomeOwner/Dashboard'
import AddRoom from './pages/HomeOwner/AddRoom'
import ListRoom from './pages/HomeOwner/ListRoom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const { showHomeReg } = useAppContext();

  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar />}
      {showHomeReg && <HomeReg />}
<<<<<<< HEAD
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
=======
      <div className='min-h-[70vh]'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/rooms' element={<AllRooms/>} />
        <Route path='/rooms/:id' element={<RoomDetails/>} />
        <Route path='/my-bookings' element={<MyBookings/>} />
        <Route path='/owner' element={<Layout/>}>
          <Route index element={<Dashboard/>} />
          <Route path="add-room" element={<AddRoom/>} />
           <Route path="list-room" element={<ListRoom/>} />
        
        </Route>
      </Routes>
>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46
      </div>
      <Footer />
    </div>
  );
};

export default App;
