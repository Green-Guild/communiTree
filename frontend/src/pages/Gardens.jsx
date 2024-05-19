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
   <main className='mt-6 flex-col items-center'>
      <form className='border-none flex rounded-full' onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          className='rounded-full p-1 px-3'
          value={searchQuery}
          onChange={handleSearchChange}
          name="garden"
          placeholder="Search"
          aria-label="Browse through Gardens by entering zipcode"
        />
        <button className='absalute mb-4 -ml-6' aria-label="Submit zipcode" type="submit">
          <img className='w-4 h-4' src="/search.svg" alt="search" />
        </button>
        {/* <button aria-label='Clear Results' type="submit" onClick={handleClearSearch}>Clear</button> */}
      </form>

    <div className='bg-yellow  p-5 flex-col justify-center align-middle items-center h-full rounded-t-xl m-16 mb-0'>
    <div>
      {currentUser && <NewGardenForm ownerId={currentUser.id} />}
    </div>
    <div className='mt-14'>
      <ul>
        {searchResults.map(garden => (
        <li key={garden.id}>
          <GardenCard garden={garden} /> 
        </li>
        ))}
      </ul>
    </div>
    </div>
  </main>
</>

};
export default Gardens;