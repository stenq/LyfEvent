import React, { useState, useEffect } from 'react';
import EventItem from '../components/EventItem';
import Pagination from '../components/Pagination';
import Footer from "../components/Footer";
const EventsPage = () => {
  let [events, setEvents] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [eventsPerPage] = useState(8);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    let response = await fetch("/api/events-list/");
    let data = await response.json();
    setEvents(data);
  };

  // Get Current Events (Pagination)
  let indexOfLastEvent = currentPage * eventsPerPage;
  let indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  let currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col min-h-screen">
      {/* Content Wrapper */}
      <h1 className='flex justify-center text-4xl font-bold text-black mb-6'>All Events</h1>
      <div>
        {events.length > 0 ? (
          <div className="grid lg:grid-cols-4 gap-8 container mx-auto">
            {currentEvents.map((event) => (
              <EventItem key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center  ">
            <p className="text-xl font-bold text-gray-600">EVENTS COMING...</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {events.length > 0 && (
        <div className="py-4 container mx-auto">
          <Pagination
            eventsPerPage={eventsPerPage}
            totalEvents={events.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
      <Footer></Footer>
    </div>

  );
};

export default EventsPage;

