<<<<<<< HEAD
import React from "react";
import HomeCard from "./HomeCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";

const FeaturedDestination = () => {
  const { rooms, navigate } = useAppContext();
=======
import React from 'react'
import HouseCard from './HouseCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const FeaturedDestination = () => {

    const navigate = useNavigate()
    const { rooms } = useAppContext()
>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46

  return (
    rooms.length > 0 && (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
        <Title
          title="Featured Destination"
          subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences"
        />

<<<<<<< HEAD
        <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
          {rooms.slice(0, 4).map((room, index) => (
            <HomeCard key={room._id} room={room} index={index} />
          ))}
        </div>
        <button
          onClick={() => {
            navigate("/rooms");
            scrollTo(0, 0);
          }}
          className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer"
        >
          View All Destinations
=======
        <Title title=' Featured Destination' subTitle=' Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences'/>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center gap-6 mt-20'>
            {rooms.slice(0,4).map((room, index)=>(
                <HouseCard key={room._id} room={room} index={index}/>
            ))}
        </div>
        <button onClick={()=>{navigate('/rooms'); window.scrollTo(0,0)}} 
        className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>
            View All Destinations
>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46
        </button>
      </div>
    )
  );
};

export default FeaturedDestination;
