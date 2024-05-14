import React from 'react';
import { Link } from 'react-router-dom';

const EventsCard = ({gathering}) => {
  const { id, title, image, event_date } = gathering;

  return <>
   <main>
      <div>
        <Link to={`/events/${id}`}>
        <h1>{title}</h1>
        </Link>
      </div>
      <div>
        <img src={image} alt={`${title} Event`} />
      </div>

      <div>
        <p>Location: {location}</p>
      </div>
      <div>
       <p>Date and Time: {event_date}</p>
      </div>
    </main>
  </>

};
export default EventsCard;