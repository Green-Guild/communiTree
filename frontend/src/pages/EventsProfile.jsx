import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent } from '../adapters/event-adapter';

const EventsProfile = () => {
  const { id } = useParams();
  const [gathering, setGathering] = useState(null);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEvent(id);
        setGathering(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const { title, event_date, description, location,image } = gathering;
  return<>
  <main>
    <div>
      <h1>{title}</h1>
    </div>
    <div>
      <img src={image} alt ={title} ></img>
    </div>
    <div>
      <h2>
        Date
      </h2>
      <p>{event_date}</p>
    </div>
    <div>
      <h2>About</h2>
      <p>{description}</p>
    </div>

    <div>
      <p>{location}</p>
    </div>
  </main>
  </>
}
export default EventsProfile