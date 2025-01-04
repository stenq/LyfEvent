import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CreateEventPage from './CreateEventPage';
import { AuthContext } from '../context/AuthContext';
import Join from '../components/Join';

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getEvent();
  }, [id]);

  const getEvent = async () => {
    try {
      const response = await fetch(`/api/events-detail/${id}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch event details.');
      }
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error.message);
    }
  };

  const handleEdit = () => {
    setEditOpen(true); // Open the edit mode
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/events-delete/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        navigate('/events');
      } else {
        throw new Error('Failed to delete the event.');
      }
    } catch (error) {
      console.error('Error deleting event:', error.message);
    }
  };

  return (
    <div>
      {editOpen ? (
        <CreateEventPage eventId={id} />
      ) : (
        <section className="py-8 bg-gray-50 md:py-16 antialiased">
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            {/* Page Title */}
            <div className="mb-16 text-center">
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Event Overview
              </h1>
            </div>

            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              {/* Image Section */}
              <div className="shrink-0 mx-auto w-full max-w-sm lg:max-w-md">
                <div className="border border-gray-200 rounded-lg shadow-lg bg-white">
                  <img
                    className="w-full h-full object-cover rounded-md"
                    src={event?.image || '/placeholder-image.jpg'}
                    alt="Event"
                  />
                </div>
              </div>

              {/* Text Content Section */}
              <div className="mt-6 sm:mt-8 lg:mt-0">
                {/* Event Title */}
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {event?.title}
                </h1>

                {/* Description Section */}
                <div className="mt-4">
                  <h4 className="text-lg font-medium text-gray-700 sm:text-xl">Description:</h4>
                  <p className="mt-2 text-base text-gray-600">{event?.description}</p>
                </div>

                {/* Category Section */}
                {event?.category && (
                  <div className="mt-6">
                    <h4 className="text-lg font-medium text-gray-700 sm:text-xl">Category:</h4>
                    <p className="mt-2 text-base text-gray-600">{event?.category}</p>
                  </div>
                )}

                {event?.location && (
                  <div className="mt-6">
                    <h4 className="text-lg font-medium text-gray-700 sm:text-xl">Location:</h4>
                    <p className="mt-2 text-base  text-gray-600">{event?.location}</p>
                  </div>
                )}

              {event?.date && (
                <div className="mt-6 flex ">
                  <div className='mr-8'>
                  <h4 className="text-lg font-medium text-gray-700 sm:text-xl">Date:</h4>
                  <p className="mt-2 text-base text-gray-600">
                    {new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' }).format(new Date(event.date))}
                  </p>
                  </div>
                  
                  <div>
                  <h4 className="text-lg font-medium text-gray-700 sm:text-xl">Time:</h4>
                  <p className="mt-2 text-base text-gray-600">
                    {new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(new Date(event.date))}
                  </p>
                  </div>
                </div>
              )}



                {/* Edit  Delete Join/Joined Buttons */}
                {user?.user_id === event?.host ? (
                  <div className="mt-8 flex gap-4">
                    <button
                      className="px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-6 py-3.5 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <Join eventId={id} />
                ) }
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default EventPage;
