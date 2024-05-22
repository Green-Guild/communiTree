import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent } from '../adapters/event-adapter';
import { formatDate } from '../utils';

const EventsProfile = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEvent(id);
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, []);

  const { title, event_date, description, zipcode, address, image } = event;

  return (
    <>
      {/* <main>
        <div>
          <h1>{title}</h1>
        </div>
        <div>
          <img src={image} alt={title}></img>
        </div>
        <div>
          <h2>Date</h2>
          <p>{event_date}</p>
        </div>
        <div>
          <h2>About</h2>
          <p>{description}</p>
        </div>

        <div>
          <p>{zipcode}</p>
        </div>
      </main> */}
       <main className="bg-yellow h-screen p-16 flex items-center justify-center align-middle">
      <div className="bg-white min-w-fit w-[40vw] dark:bg-black flex rounded-xl h-96 shadow-md hover:scale-105 hover:shadow-lg hover:shadow-light-yellow transition duration-300 ease-in-out">
        <img src={image} alt={title} className="h-full w-[50%] rounded-l-xl object-cover" />

        <div className="flex-col p-6">
          <div className="mb-4">
            <h1 className="text-bright-orange dark:text-white font-ubuntu font-bold text-3xl">{title}</h1>
            <p className="text-yellow font-ubuntu ubuntu-light-italic">{formatDate(event_date)}</p>
          </div>
          <div className="text-yellow">
            <h2 className="text-yellow text-xl font-semibold">About</h2>
            <p className="text-black dark:text-white">{description}</p>
          </div>
          <div className="text-yellow">
            <p className="text-black dark:text-white ubuntu-light-italic">{address}</p>
          </div>
        </div>
      </div>
    </main>
    </>
  );
};
export default EventsProfile;
