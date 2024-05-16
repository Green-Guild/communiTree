import { useState } from "react";
import Forum from "../components/Forum";
import Notifications from "../components/Notifications";
import React from "react";

const Community = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      <form
        className="border-none flex rounded-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="rounded-full p-1 px-3"
          onChange={console.log('hi')}
          name="garden"
          placeholder="Search"
          aria-label="Browse through Gardens by entering zipcode"
        />
        <button
          className="absalute mb-4 -ml-6"
          aria-label="Submit zipcode"
          type="submit"
        >
          <img
            className="w-4 h-4"
            src="/search.svg"
            alt="search"
          />
        </button>
      </form>


      <div className="flex justify-center items-center ">
        <Forum />
      </div>
      <div>
        <button
          className="bottom-1 right-1 m-6 fixed bg-yellow rounded-full p-2"
          onClick={toggleNotifications}
        >
          {/* {showNotifications ? "Hide Notifications" : "Show Notifications"} */}
          <img
            className="w-6 h-6"
            src="/notification.svg"
          />
        </button>
        {showNotifications && <Notifications />}
      </div>
    </>
  );
};
export default Community;
