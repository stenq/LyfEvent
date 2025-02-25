import React from 'react';
import { Link } from "react-router-dom";

const EventItem = ({ event }) => {
  return (
    <Link to={`/event/${event.id}`}>
    <div className="bg-white border border-gray-200 rounded-lg shadow border-black-700 transform hover:scale-105 transition-transform duration-300 ">

        {/* Image with 16:9 aspect ratio */}
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 ratio */}
          <img
            className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
            src={event?.image}
            alt={event?.title || "Event image"}
          />
        </div>

{/* Event details */}
<div className="px-5 pb-2">
  {/* Title */}
  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
    {event?.title}
  </h5>

  {/* Description & Category on one line with centered splitter */}
  <div className="flex items-center mt-2 text-md text-gray-700 dark:text-gray-600">
    {/* Description (left-aligned) */}
    <p className="truncate flex-1">{event?.description}</p>

    {/* Centered splitter */}
    <span className="text-gray-400 mx-4">|</span>

    {/* Category (right-aligned) */}
    <p className="text-customBlue-600 dark:text-customBlue-400 text-sm font-medium whitespace-nowrap">
      Type: {event?.category || "Uncategorized"}
    </p>
  </div>
</div>
    </div>
  
    </Link>
  );
};

export default EventItem;