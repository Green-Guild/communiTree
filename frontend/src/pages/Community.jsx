import { useState } from "react";
import Forum from "../components/Forum";
import Notifications from "../components/Notifications";
import { searchPosts } from "../adapters/post-adapter";

const Community = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // TODO: decide whether to wait for submit or not
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <form className="border-none flex rounded-full" onSubmit={handleSearch}>
        <input
          type="text"
          className="rounded-full p-1 px-3"
          name="garden"
          placeholder="Search"
          aria-label="Browse through Posts by entering query"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="mb-4 -ml-6" aria-label="Submit query" type="submit">
          <img className="w-4 h-4" src="/search.svg" alt="search" />
        </button>
      </form>

      <div className="flex justify-center items-center ">
        <Forum query={searchQuery} />
      </div>
      <div>
        <button className="notification-button" onClick={toggleNotifications}>
          <img
            className="w-6 h-6"
            src="/notification.svg"
            alt="Notifications"
          />
        </button>
        {showNotifications && <Notifications />}
      </div>
    </>
  );
};
export default Community;
