import { useState, useEffect, useContext } from 'react';
import { getAllGardens } from '../adapters/garden-adapter';
import GardenCard from '../components/GardenCard';
import CurrentUserContext from '../contexts/current-user-context';
import NewGardenForm from '../components/NewGardenForm';

const Gardens = () => {
  const [gardens, setGardens] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllGardens();
      setGardens(data);
      setSearchResults(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setSearchResults(gardens);
      return;
    }

    const filteredGardens = gardens.filter(garden =>
      garden.location.includes(searchQuery)
    );

    setSearchResults(filteredGardens);
  }, [searchQuery, gardens]);

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
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
          name="garden"
          placeholder="Search By Zipcode"
          aria-label="Browse through Gardens by entering zipcode"
        />
        <button aria-label="Submit zipcode" type="submit">Search</button>
        <button aria-label='Clear Results' type="submit" onClick={handleClearSearch}>Clear</button>
      </form>
    </div>
    <div>
      {currentUser && <NewGardenForm ownerId={currentUser.id} />}
    </div>
    <div>
      <ul>
        {searchResults.map(garden => (
        <li key={garden.id}>
          <GardenCard garden={garden} /> 
        </li>
        ))}
      </ul>
    </div>
  </main>
</>

};
export default Gardens;