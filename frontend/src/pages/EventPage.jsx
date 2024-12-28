import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateEventPage from './CreateEventPage';

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    getEvent();
  }, [id]);

  const getEvent = async () => {
    let response = await fetch(`/api/events-detail/${id}/`);
    let data = await response.json();
    setEvent(data);
  };

  const handleEdit = () => {
    setEditOpen(true); // Open the edit mode
  };

  return (
    <div>
      {editOpen ? (
        <CreateEventPage eventId={id} />
      ) : (
        <section className="py-8 bg-gray-50 md:py-16 antialiased">
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            {/* Page Title */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Event Overview</h1>
            </div>

            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              {/* Image Section */}
              <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                <div className="border border-gray-200 rounded-lg shadow-lg p-4 bg-white">
                  <img className="w-full rounded-md" src={event?.image} alt="Event" />
                </div>
              </div>

              {/* Text Content Section */}
              <div className="mt-6 sm:mt-8 lg:mt-0">
                {/* Event Title */}
                <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
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

                {/* Edit Button */}
                <button
                  className="mt-8 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default EventPage;
