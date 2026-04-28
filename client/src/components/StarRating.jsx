import React from "react";
import { assets } from "../assets/assets";

const StarRating = ({ rating = 4 }) => {
  return (
    <>
<<<<<<< HEAD
      {Array(5)
        .fill("")
        .map((_, index) => (
          <img
            key={index}
            src={
              rating > index ? assets.starIconFilled : assets.starIconOutlined
            }
            alt="star-icon"
            className="w-4.5 h-4.5"
          />
        ))}
=======
        {Array(5).fill('').map((_, index) => (
          <img key={index} src={rating > index ? assets.starIconFilled : assets.starIconOutlined} alt="star-icon" className='w-4.5 h-4.5'/>
                            ))}
>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46
    </>
  );
};

export default StarRating;
