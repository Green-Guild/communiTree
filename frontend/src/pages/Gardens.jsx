import { useState, useEffect, useContext } from "react";
import { getAllGardens } from "../adapters/garden-adapter";
import GardenCard from "../components/GardenCard";
import CurrentUserContext from "../contexts/current-user-context";
import NewGardenForm from "../components/NewGardenForm";

const Gardens = () => {
  const [gardens, setGardens] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);
  
  const fetchData = async () => {
    try {
      const data = await getAllGardens();
      setGardens(data);
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching gardens:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(gardens);
      return;
    }

    const filteredGardens = gardens.filter(garden =>
      garden.zipcode.includes(searchQuery)
    );

    setSearchResults(filteredGardens);
  }, [searchQuery, gardens]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return <>
      <main className="mt-6 flex-col items-center">
        <form
          className="border-none flex rounded-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="dark:bg-yellow dark:bg-opacity-10 dark:placeholder-white dark:placeholder-opacity-40 dark:text-white rounded-full p-1 px-3"
            value={searchQuery}
            onChange={handleSearchChange}
            name="garden"
            placeholder="Search By Zipcode"
            aria-label="Browse through Gardens by entering zipcode"
          />
          <button
            className="absalute mb-4 -ml-6"
            aria-label="Submit zipcode"
            type="submit"
          >
            <img className="w-4 h-4 dark:invert" src="/search.svg" alt="search" />
          </button>
          </form>

        <div className="bg-yellow dark:bg-opacity-30 p-5 flex-col justify-center align-middle items-center h-full min-h-[50vw] rounded-t-xl m-16 mb-0">
          <p className=" ml-[38%] mb-5 absolute text-white w-24 bg-white bg-opacity-30 rounded-full px-4">
            Gardens
          </p>

          <div>{currentUser && <NewGardenForm ownerId={currentUser.id} onGardenCreated={fetchData} />}</div>
          <div className="mt-14">
            <ul>
              {searchResults.map((garden) => (
                <li key={garden.id}>
                  <GardenCard garden={garden} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  ;
};
export default Gardens;
