import React from "react";
import { assets } from "../assets/assets";
import Title from "./Title";

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-30 bg-gray-900 text-white">
      <Title
        title="Stay Inspired"
        subTitle="Join our newsletter and be the first to discover the new destinations, exclusive offer, and travel inspiration."
      />

<<<<<<< HEAD
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
        <input
          type="text"
          className="bg-white/10 px-4 py-2.5 border border-white/20 rounded outline-none max-w-66 w-full"
          placeholder="Enter your email"
        />
        <button className="flex items-center justify-center gap-2 group bg-black px-4 md:px-7 py-2.5 rounded active:scale-95 transition-all">
          Subscribe
          <img
            src={assets.arrowIcon}
            alt="arrow-icon"
            className="w-3.5 invert group-hover:translate-x-1 transition-all"
          />
        </button>
      </div>
      <p className="text-gray-500 mt-6 text-xs text-center">
        By subscribing, you agree to our Privacy Policy and consent to receive
        updates.
      </p>
    </div>
  );
};
=======
        <Title title='Stay Inspired' subTitle= 'Join our newsletter and be the first to discover the new destinations, exclusive offer, and travel inspiration.'/>
    
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10 w-full max-w-md">
        <input type="email" className="bg-white/10 px-6 py-4 border border-white/20 rounded-xl outline-none w-full focus:ring-2 focus:ring-blue-400 transition-all" placeholder="Enter your email" />
            <button className="flex items-center justify-center gap-2 group bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl active:scale-95 transition-all whitespace-nowrap font-semibold">Subscribe
               <img src={assets.arrowIcon} alt="arrow-icon" className='w-3.5 invert group-hover:translate-x-1 transition-all' />
            </button>
    </div>
    <p className="text-gray-400 mt-8 text-sm text-center">By subscribing, you agree to our <span className="underline cursor-pointer">Privacy Policy</span>.</p>
</div>
  )
}
>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46

export default NewsLetter;
