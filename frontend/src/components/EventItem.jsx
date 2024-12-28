import React from 'react';
import { Link } from "react-router-dom";

const EventItem = ({ event }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow border-black-700 transform hover:scale-105 transition-transform duration-300 ">

      <Link to={`/event/${event.id}`}>
        {/* Image with 16:9 aspect ratio */}
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 ratio */}
          <img
            className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
            src={event?.image}
            alt={event?.title || "Event image"}
          />
        </div>

        {/* Event details */}
        <div className="px-5 pb-5">
          {/* Title */}
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
            {event?.title}
          </h5>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-600 mt-2 text-md line-clamp-2">
            {event?.description}
          </p>

          {/* Category */}
          <p className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400">
            Type: {event?.category || "Uncategorized"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default EventItem;