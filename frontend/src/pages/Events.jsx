import { useState, useEffect, useContext } from 'react';
import { getAllEvents } from '../adapters/event-adapter';
import EventsCard from '../components/EventsCard';
import CurrentUserContext from '../contexts/current-user-context';
import NewEventForm from '../components/NewEventForm';

const Events = () => {
  const [gathering, setGathering] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEvents();
      setGathering(data);
      setSearchResults(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setSearchResults(gatherings);
      return;
    }

    const filteredEvents = gatherings.filter(gathering =>
      gathering.location.includes(searchQuery)
    );

    setSearchResults(filteredEvents);
  }, [searchQuery, gathering]);

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return <>
   <main>
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          name="Event"
          placeholder="Search By Zipcode"
          aria-label="Browse through events by entering zipcode"
        />
        <button aria-label="Submit zipcode" type="submit">Search</button>
        <button aria-label='Clear Results' type="submit" onClick={handleClearSearch}>Clear</button>
      </form>
    </div>
    <div>
      {currentUser && <NewEventForm ownerId={currentUser.id} />}
    </div>
    <div>
      <ul>
        {searchResults.map(gathering => (
        <li key={gathering.id}>
          <EventsCard gathering={gathering} /> 
        </li>
        ))}
      </ul>
    </div>
  </main>
</>

};
export default Events;