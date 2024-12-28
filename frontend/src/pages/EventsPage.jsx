import React, { useState, useEffect } from 'react';
import EventItem from '../components/EventItem';
import Pagination from '../components/Pagination';

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
    <div className="flex flex-col min-h-screen">
      
      {/* Content Wrapper */}
      <div>
        <div className="grid lg:grid-cols-4 gap-8 container mx-auto">
          {currentEvents.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </div>

        
      </div>

      {/* Pagination */}
      <div className="py-4 container mx-auto">
        <Pagination
          eventsPerPage={eventsPerPage}
          totalEvents={events.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default EventsPage;
