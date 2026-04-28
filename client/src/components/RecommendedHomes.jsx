import React, { useEffect, useState } from "react";
import HomeCard from "./HomeCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";

const RecommendedHomes = () => {
  const { rooms, searchedCities } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const filterHomes = () => {
    const filterHomes = rooms
      .slice()
      .filter((room) => searchedCities.includes(room.home.city));
    setRecommended(filterHomes);
  };

  useEffect(() => {
    filterHomes();
  }, [rooms, searchedCities]);

  return (
    recommended.length > 0 && (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
        <Title
          title="Recommended Homes"
          subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences"
        />

        <div className="flex flex items-center justify-center gap-3 mt-20">
          {recommended.slice(0, 4).map((room, index) => (
            <HomeCard key={room._id} room={room} index={index} />
          ))}
        </div>
      </div>
    )
  );
};

export default RecommendedHomes;
