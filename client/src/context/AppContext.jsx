import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

<<<<<<< HEAD
  const [isOwner, setIsOwner] = useState(false)
  const [showHomeReg, setShowHomeReg] = useState(false)
  const [searchedCities, setSearchedCities] = useState([])
  const [rooms, setRooms] = useState([])

  const fetchRooms = async () =>{
    try {
        const { data } = await axios.get('/api/rooms')
        if (data.success){
            setRooms(data.rooms)
        }else{
            toast.error(data.message)
=======
    const [isOwner, setIsOwner] = useState(false)
    const [showHomeReg, setShowHomeReg] = useState(false)
    const [searchedCities, setSearchedCities] = useState([])
    const [rooms, setRooms] = useState([])

    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('/api/rooms')
            if (data.success) {
                setRooms(data.rooms)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const fetchUser = async ()=>{
        try {
            const token = await getToken();
            console.log("Clerk Token Check:", token ? "Token present" : "Token MISSING");
            
            const { data } = await axios.get('/api/user', {headers: {Authorization: `Bearer ${token}`}})

            if (data.success) {
                setIsOwner(data.role === "homeOwner");
                setSearchedCities(data.recentSearchedCities)
            }else{
                //return Fetching User /details after 5 seconds
                setTimeout(()=>{
                    fetchUser()
                },5000)
            }
        } catch (error) {
            console.error(error)
>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46
        }
    } catch (error) {
         toast.error(error.message)
    }
<<<<<<< HEAD
  }


  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setIsOwner(data.role === "homeOwner");
        setSearchedCities(data.recentSearchedCities);
      } else {
        //return Fetching User /details after 5 seconds
        setTimeout(() => {
          fetchUser();
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message);
=======

    useEffect(()=>{
        fetchRooms();
    },[])

    useEffect(()=>{
        if (user) {
        fetchUser();
        }
    },[user])


    const value ={
        currency, navigate, user, getToken, isOwner, setIsOwner, axios, showHomeReg, setShowHomeReg, setSearchedCities, searchedCities, rooms, fetchRooms
>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

   useEffect(() => {
      fetchRooms();
  }, []);

  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    axios,
    showHomeReg,
    setShowHomeReg,
    searchedCities,
    setSearchedCities,
    rooms,
    setRooms
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
