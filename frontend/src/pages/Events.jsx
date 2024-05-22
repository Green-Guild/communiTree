import { useState, useEffect, useContext } from 'react';
import { getAllEvents } from '../adapters/event-adapter';
import EventsCard from '../components/EventsCard';
import CurrentUserContext from '../contexts/current-user-context';
import NewEventForm from '../components/NewEventForm';

const Events = () => {
  const [event, setEvent] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEvents();
      setEvent(data);
      setSearchResults(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setSearchResults(event);
      return;
    }

    const filteredEvents = event.filter((event) =>
      event.location.includes(searchQuery)
    );

    setSearchResults(filteredEvents);
  }, [searchQuery, event]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <main className="flex-col items-center">
          <form
            className="border-none flex rounded-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              className="rounded-full p-1 px-3"
              value={searchQuery}
              onChange={handleSearchChange}
              name="Event"
              placeholder="Search"
              aria-label="Browse through events by entering zipcode"
            />
            <button
              className="absalute mb-4 -ml-6"
              aria-label="Submit zipcode"
              type="submit"
            >
              <img className="w-4 h-4" src="/search.svg" alt="search" />
            </button>
          </form>

          <div className="bg-yellow dark:bg-opacity-30 flex flex-col items-center mt-6 w-[90vw] mr-6 ml-6 p-6 rounded-t-xl h-full min-h-[70vh] mb-0 relative">
            <p className="text-white bg-white bg-opacity-30 rounded-full px-4">
              Events
            </p>
            <div>
              {currentUser && <NewEventForm ownerId={currentUser.id} />}
            </div>
            <div className="flex flex-wrap justify-center m-12">
              {/* <div className="overflow-auto m-12" style={{ maxHeight: '50vh' }}> */}
              <ul className="w-full grid grid-cols-3 gap-8">
                {searchResults.map((event) => (
                  <li key={event.id} className="flex justify-center">
                    <EventsCard event={event} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Events;
