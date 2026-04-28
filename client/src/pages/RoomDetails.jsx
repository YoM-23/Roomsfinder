import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData } from '../assets/assets'
import StarRating from '../components/StarRating'
import { useAppContext } from '../context/AppContext'
import { useClerk } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

const RoomDetails = () => {
    const { id } = useParams()
    const { rooms, user, axios, getToken, navigate } = useAppContext()
    const { openSignIn } = useClerk()
    
    const [room, setRoom] = useState(null)
    const [mainImage, setMainImage] = useState(null)
    const [checkInDate, setCheckInDate] = useState("")
    const [checkOutDate, setCheckOutDate] = useState("")
    const [guests, setGuests] = useState(1)

    useEffect(() => {
        if (rooms.length > 0) {
            const foundRoom = rooms.find(r => r._id === id)
            if (foundRoom) {
                setRoom(foundRoom)
                setMainImage(foundRoom.images[0])
            }
        }
    }, [id, rooms])

    const onBookingHandler = async (e) => {
        e.preventDefault()
        if (!user) {
            return navigate('/login')
        }

        try {
            const { data } = await axios.post('/api/bookings/book', {
                room: id,
                checkInDate,
                checkOutDate,
                guests
            }, { headers: { Authorization: `Bearer ${await getToken()}` } })

            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    if (!room) return <div className='py-40 text-center'>Loading...</div>

    return (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
            {/* Room Title */}
            <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
                <h1 className='text-3xl md:text-4xl font-playfair'>{room.home?.name} <span className='font-inter text-sm'>({room.roomType})</span></h1>
                <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>SPECIAL OFFER</p>
            </div>

            {/* Room Rating */}
            <div className='flex items-center gap-1 mt-2'>
                <StarRating rating={room.rating || 4} />
                <p className='ml-2'>200+ reviews</p>
            </div>

            {/* Room Address */}
            <div className='flex items-center gap-1 text-gray-500 mt-2'>
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.home?.address}, {room.home?.city}</span>
            </div>

            {/* Room Images */}
            <div className='flex flex-col lg:flex-row mt-6 gap-6'>
                <div className='lg:w-1/2 w-full'>
                    <img src={mainImage} alt="Room" className='w-full h-[400px] rounded-xl shadow-lg object-cover' />
                </div>
                <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                    {room.images.map((image, index) => (
                        <img onClick={() => setMainImage(image)}
                            key={index} src={image} alt="Room Thumbnail" 
                            className={`w-full h-[190px] rounded-xl shadow-md object-cover cursor-pointer transition-all ${mainImage === image ? 'outline outline-3 outline-orange-500' : 'opacity-80 hover:opacity-100'}`} />
                    ))}
                </div>
            </div>

            <div className='flex flex-col md:flex-row md:justify-between mt-10'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                        {room.amenities.map((item, index) => (
                            <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                                <img src={facilityIcons[item] || assets.roomServiceIcon} alt={item} className='w-5 h-5' />
                                <p className='text-xs'>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>
            </div>

            {/* Booking Form */}
            <form onSubmit={onBookingHandler} className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
                <div className='flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                    <div className='flex flex-col'>
                        <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
                        <input type="date" id='checkInDate' value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                    <div className='flex flex-col'>
                        <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
                        <input type="date" id='checkOutDate' value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                    <div className='flex flex-col'>
                        <label htmlFor="guests" className='font-medium'>Guests</label>
                        <input type="number" id='guests' min={1} value={guests} onChange={(e) => setGuests(e.target.value)} className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                </div>
                <button type='submit' className='bg-black hover:bg-gray-800 active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-20 py-3 md:py-4 text-base cursor-pointer font-medium'>
                    Book Now
                </button>
            </form>

            {/* Common Specifications */}
            <div className='mt-25 space-y-4'>
                {roomCommonData.map((spec, index) => (
                    <div key={index} className='flex items-start gap-2'>
                        <img src={spec.icon} alt={spec.title} className='w-6.5' />
                        <div>
                            <p className='text-base font-medium'>{spec.title}</p>
                            <p className='text-gray-500 text-sm'>{spec.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500 leading-relaxed'>
                <p>Guests will be allocated on the ground floor according to availability. You get a comfortable two-bed apartment with a true city feeling. The price quoted is for two guests; please remark the number of guests in the slot to get the exact price for groups.</p>
            </div>

            {/* Hosted By */}
            <div className='flex flex-col items-start gap-4'>
                <div className='flex gap-4 items-center'>
                    <img src={room.home?.owner?.image || assets.userIcon} alt="Host" className='h-14 w-14 md:h-18 md:w-18 rounded-full object-cover' />
                    <div>
                        <p className='text-lg md:text-xl font-playfair'>Hosted by {room.home?.name}</p>
                        <div className='flex items-center mt-1'>
                            <StarRating rating={5} />
                            <p className='ml-2 text-sm text-gray-500'>Verified Host</p>
                        </div>
                    </div>
                </div>
                <button className='px-8 py-3 mt-4 rounded-full text-white bg-black hover:bg-gray-800 transition-all cursor-pointer font-medium'>Contact Host</button>
            </div>
        </div>
    )
}

export default RoomDetails