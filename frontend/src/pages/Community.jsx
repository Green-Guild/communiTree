import { useState } from "react";
import Forum from "../components/Forum";
import Notifications from "../components/Notifications";

const Community = () => {

  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      <div className="flex justify-center items-center ">
        <Forum />
      </div>
      <div>
        <button onClick={toggleNotifications}>
          {showNotifications ? "Hide Notifications" : "Show Notifications"}
        </button>
        {showNotifications && <Notifications />}
      </div>
    </>
  );
};
export default Community;
