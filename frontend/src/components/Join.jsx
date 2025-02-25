import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const Join = ({ eventId }) => {
  const [joined, setJoined] = useState(false);
  const { authTokens, user, joinedEvents, updateJoinedEvents } = useContext(AuthContext);  // Extract joinedEvents and updateJoinedEvents from context
  const navigate = useNavigate();

  useEffect(() => {
    checkJoined();
  }, [eventId]);  // Dependency should be only `eventId` as we're checking the event status

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
    if (!user) {
      navigate("/login");
      return;
    }
  
    try {
      const response = await fetch(`/api/events-join/${eventId}/`, {
        method: "POST",  // Ensure POST request
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,  // Send access token
        },
      });
  
      if (response.ok) {
        setJoined(true);
        const updatedJoinedEvents = [...joinedEvents, eventId];
        updateJoinedEvents(updatedJoinedEvents);
      } else {
        const errorData = await response.json();
        console.error("Join event failed:", errorData);
      }
    } catch (error) {
      console.error("Error joining the event:", error);
    }
  };

  const handleLeave = async () => {
    try {
      const response = await fetch(`/api/events-leave/${eventId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      if (response.ok) {
        setJoined(false);  // Successfully left the event
        const updatedJoinedEvents = joinedEvents.filter(id => id !== eventId);  // Remove the event from the list
        updateJoinedEvents(updatedJoinedEvents);  // Update context
      }
    } catch (error) {
      console.error("Error leaving the event:", error);
    }
  };

  return (
    <div>
      {joined ? (
        <div className="mt-8">
          <p className="text-lg font-medium text-gray-700 mb-4">
            You've already joined this event.
          </p>
          <button
            onClick={handleLeave}  // Trigger leave event
            className="px-6 py-3.5 font-semibold rounded-md shadow bg-red-600 text-white hover:bg-red-800"
          >
            Leave
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-lg font-medium text-gray-700 mb-4">
            Join if you plan on participating in this event.
          </p>
          <button
            onClick={handleJoin}  // Trigger join event
            className="px-6 py-3.5 font-semibold rounded-md shadow bg-green-600 text-white hover:bg-green-800"
          >
            Join
          </button>
        </div>
      )}
    </div>
  );
};

export default Join;
