import axios from "axios";
import { Children, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useUser, useAuth } from "@clerk/clerk-react";
import {toast} from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children })=>{

    const currency = import.meta.env.VITE_CURRENCY || "$";
    const navigate = useNavigate();
    const {user} = useUser();
    const { getToken } = useAuth()

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
            const { data } = await axios.get('/api/user', {headers: {Authorization: `Bearer ${await getToken()}`}})

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
        }
    }

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
    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> useContext(AppContext);