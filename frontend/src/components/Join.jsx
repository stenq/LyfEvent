import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from '../context/AuthContext';

const Join = ({ eventId }) => {
  const [joined, setJoined] = useState(false);
  const { authTokens, user } = useContext(AuthContext);

  useEffect(() => {
    checkJoined();
  }, [eventId, joined]); // Effect dependency should be `eventId` instead of `joined`

  const checkJoined = async () => {
    try {
      const response = await fetch(`/api/events-detail/${eventId}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch event details.');
      }
      const data = await response.json();
      
      // Check if user is already in participants
      const isUserJoined = data.participants.some(participant => participant === user.user_id);
      
      if (isUserJoined) {
        setJoined(true);
      } else {
        setJoined(false);
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const handleJoin = async () => {
    try {
      const response = await fetch(`/api/events-join/${eventId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      if (response.ok) {
        setJoined(true); // Successfully joined the event
      } 
    } catch (error) {
      console.error("Error joining the event:", error);
      
    }
  };

  return (
    <div>
      <button
        onClick={handleJoin}  // Trigger the join event when clicked
        disabled={joined}     // Disable the button if already joined
        className={`mt-8 px-6 py-3.5 font-semibold rounded-md shadow ${joined ? 'bg-gray-400 '  : 'bg-green-600 text-white hover:bg-green-800'}`}
      >
        {joined ? "Joined" : "Join"}  
      </button>
    </div>
  );
};

export default Join;
