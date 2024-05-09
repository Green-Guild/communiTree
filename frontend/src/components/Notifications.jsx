import { useState } from "react";
import { amPmConverter } from "../utils";

const users = []

class Reply {
    constructor({ post_id, user_id, body }) {
      this.post_id = post_id;
      this.user_id = user_id;
      this.body = body;
    //   this.date = date;
    }
  }
  
  const replies = [
    new Reply({ post_id: 1, user_id: 1001, date: "2024-05-06-18-24-00", body: "Watering early in the morning helps prevent fungus growth on your plants." }),
    new Reply({ post_id: 2, user_id: 1002, date: "2024-05-06-18-24-00", body: "Consider using companion planting to naturally deter pests from your vegetable garden." }),
    new Reply({ post_id: 3, user_id: 1003, date: "2024-05-06-18-24-00", body: "Mulching your garden beds can help retain soil moisture and prevent weed growth." }),
    new Reply({ post_id: 4, user_id: 1004, date: "2024-05-06-18-24-00", body: "Use raised beds for better drainage, especially if your soil is heavy or clay-like." }),
    new Reply({ post_id: 5, user_id: 1005, date: "2024-05-06-18-24-00", body: "Plant native flowers to attract pollinators like bees and butterflies to your garden." })
  ];

  const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
  
    useEffect(() => {
      setNotifications(replies.slice(0, 10));
    }, []);
  
    const findDisplayNameById = (user_id) => {
      const user = users.find((user) => user.id === user_id);
      return user ? user.display_name : "Unknown User";
    };
  
    return (
      <div className="notifications-queue">
        {notifications.map((reply, index) => {
          const displayName = findDisplayNameById(reply.user_id);
          const commentSnippet = `${reply.body.substring(0, 20)}...`;
        //   const formattedTime = amPmConverter(reply.date);
  
          return (
            <div key={index} className="notification">
              <strong>{displayName}</strong> <strong>left a comment:</strong>{" "}
              {commentSnippet} <span>{formattedTime}</span>
            </div>
          );
        })}
      </div>
    );
  };

export default Notifications;