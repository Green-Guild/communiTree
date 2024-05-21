// import { useState, useEffect, useContext } from "react";
// import { amPmConverter } from "../utils";
// import { getPostsByUserId } from "../adapters/post-adapter";
// import { getCommentsByPostId } from "../adapters/comment-adapter";
// import { getUser } from "../adapters/user-adapter";
// import CurrentUserContext from "../contexts/current-user-context";

// import notificationSound from '/notification.wav';

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const { currentUser } = useContext(CurrentUserContext);
//   const [audio] = useState(new Audio(notificationSound));

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       const posts = await getPostsByUserId(currentUser.id);
//       const commentsPromises = posts.map((post) =>
//         getCommentsByPostId(post.id)
//       );
//       const commentsArrays = await Promise.all(commentsPromises);
//       const comments = [].concat(...commentsArrays);

//       const commentsWithUser = await Promise.all(
//         comments.map(async (comment) => {
//           const user = await getUser(comment.user_id);
//           return { ...comment, user };
//         })
//       );

//       const otherUsersComments = commentsWithUser.filter(
//         (comment) => comment.user.id !== currentUser.id
//       );

//       setNotifications(prevNotifications => {
//         if (otherUsersComments.length > prevNotifications.length) {
//           audio.play();
//         }
//         return otherUsersComments;
//       });
//     };
//     fetchNotifications();

//     const intervalId = setInterval(fetchNotifications, 5000);

//     return () => clearInterval(intervalId);
//   }, [currentUser.id]); // Make sure to include audio in the dependencies array


//   return (
//     <div className="h-full bg-opacity-70 w-[25vw] flex flex-col items-center bg-yellow p-6 rounded-t-xl mb-0">
//       <p className="text-white bg-white bg-opacity-30 rounded-full px-4">
//         Notifications
//       </p>
//       <div className="flex flex-col">
//         {notifications.map((comment, index) => {
//           const commentSnippet = `${comment.body.substring(0, 20)}...`;
//           const formattedTime = amPmConverter(comment.created_at);

//           return (
//             <div
//               key={index}
//               className="relative rounded-lg mt-6 bg-white p-4"
//             >
//               <div className="flex-1 flex items-center">
//                 <div className="text-xs w-full">
//                   <strong className="text-bright-orange">
//                     {comment.user.username} left a comment:{" "}
//                   </strong>
//                   <span className="text-black ubuntu-light-italic">
//                     "{commentSnippet}"
//                   </span>
//                 </div>
//               </div>
//               <div className="text-xs bottom-1 right-2 absolute">
//                 <span>{formattedTime}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Notifications;

import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { amPmConverter } from "../utils";
import { getPostsByUserId } from "../adapters/post-adapter";
import { getCommentsByPostId } from "../adapters/comment-adapter";
import { getUser } from "../adapters/user-adapter";
import CurrentUserContext from "../contexts/current-user-context";

import notificationSound from '/notification.wav';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);
  const [audio] = useState(new Audio(notificationSound));
  const navigate = useNavigate(); // Create navigate function

  useEffect(() => {
    const fetchNotifications = async () => {
      const posts = await getPostsByUserId(currentUser.id);
      const commentsPromises = posts.map((post) =>
        getCommentsByPostId(post.id)
      );
      const commentsArrays = await Promise.all(commentsPromises);
      const comments = [].concat(...commentsArrays);

      const commentsWithUser = await Promise.all(
        comments.map(async (comment) => {
          const user = await getUser(comment.user_id);
          return { ...comment, user, postId: comment.post_id }; // Ensure post_id is included
        })
      );

      const otherUsersComments = commentsWithUser.filter(
        (comment) => comment.user.id !== currentUser.id
      );

      setNotifications(prevNotifications => {
        if (otherUsersComments.length > prevNotifications.length) {
          audio.play();
        }
        return otherUsersComments;
      });
    };
    fetchNotifications();

    const intervalId = setInterval(fetchNotifications, 5000);

    return () => clearInterval(intervalId);
  }, [currentUser.id, audio]); // Make sure to include dependencies correctly

  return (
    <div className="h-full bg-opacity-70 w-[25vw] flex flex-col items-center bg-yellow p-6 rounded-t-xl mb-0">
      <p className="text-white bg-white bg-opacity-30 rounded-full px-4">
        Notifications
      </p>
      <div className="flex flex-col">
        {notifications.map((comment, index) => {
          const commentSnippet = `${comment.body.substring(0, 20)}...`;
          const formattedTime = amPmConverter(comment.created_at);

          return (
            <div
              key={index}
              className="relative rounded-lg mt-6 bg-white p-4 cursor-pointer"
              onClick={() => navigate(`/post/${comment.postId}`)} // Navigate on click
            >
              <div className="flex-1 flex items-center">
                <div className="text-xs w-full">
                  <strong className="text-bright-orange">
                    {comment.user.username} left a comment:{" "}
                  </strong>
                  <span className="text-black ubuntu-light-italic">
                    "{commentSnippet}"
                  </span>
                </div>
              </div>
              <div className="text-xs bottom-1 right-2 absolute">
                <span>{formattedTime}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;

