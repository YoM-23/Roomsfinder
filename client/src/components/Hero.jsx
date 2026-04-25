import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("")

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate('/rooms', { state: { destination } });
  }

  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>
      <p className='bg-[#49B9FF]/50 px-4 py-1 rounded-full mt-20 text-sm font-medium backdrop-blur-sm'>The Ultimate Room Experience</p>
      <h1 className='font-playfair text-4xl md:text-[64px] md:leading-[72px] font-bold max-w-2xl mt-4 animate-fade-in'>Discover Your Perfect Gateway Destination</h1>
      <p className='max-w-xl mt-6 text-base md:text-lg text-white/90 leading-relaxed'>Unparalleled luxury and comfort await at the world's most exclusive Rooms and flats. Start your Journey today!</p>

        <form onSubmit={onSearchHandler} className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="" className='h-4'/>
                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <input list='destinations' id="destinationInput" type="text" 
                value={destination} onChange={(e)=> setDestination(e.target.value)}
                className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
                <datalist id='destinations'>
                  {cities.map((city, index)=>(
                    <option value={city} key={index} />
                  ))}
                </datalist>
            </div>

            <div>
                <div className='flex items-center gap-2'>
                     <img src={assets.calenderIcon} alt="" className='h-4'/>
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                     <img src={assets.calenderIcon} alt="" className='h-4'/>
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Guests</label>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                 <img src={assets.searchIcon} alt="searchIcon" className='h-7'/>
                <span>Search</span>
            </button>
        </form>
    </div>
  )
}

export default Hero