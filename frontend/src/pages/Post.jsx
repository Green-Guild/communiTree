// import { useEffect, useState } from "react";
// import { getUser } from "../adapters/user-adapter";

// function Post({ post }) {
//   const [commentText, setCommentText] = useState("");
//   const [isCommentsVisible, setIsCommentsVisible] = useState(false);
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     const hand = async () => {
//       setUser(await getUser(post.user_id));
//     };
//     hand();
//   }, [setUser]);

//   const handleCommentChange = (e) => setCommentText(e.target.value);
//   const handleToggleComments = () => setIsCommentsVisible(!isCommentsVisible);

//   return (
//     <div className="flex-col w-[50vw] m-3 rounded-xl shadow-top-md">
//       <div className="post bg-white p-4 flex-col rounded-t-xl">

//         <div className="flex items-center mb-3">
//           <img
//             src={user.image}
//             alt={user.display_name}
//             className="w-10 h-10 border-4 border-bright-orange rounded-full mr-3"
//           />
//           <div>
//             <p className="font-bold text-yellow">{user.display_name}</p>
//             <p className="text-sm text-yellow font-thin">
//               {user.location} • 2 hours ago{post.createdAt}
//             </p>
//           </div>
//         </div>

//         <h3 className="text-xl font-semibold mb-2 pr-6 pl-6">{post.title}</h3>
//         <p className="text-black mb-2 pr-6 pl-6">{post.body}</p>

//         <div className="mb-2">

//           <input
//             type="text"
//             value={commentText}
//             onChange={handleCommentChange}
//             placeholder="Add a comment..."
//             className="border p-2 rounded-md w-full pr-6 pl-6"
//           />
//           <button
//             className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
//             onClick={() => {
//               /* Add comment logic */
//             }}
//           >
//             Comment
//           </button>
//         </div>

//         {isCommentsVisible && (
//           <ul className="mt-4 space-y-2">
//             {comments.map((comment, index) => (
//               <li key={index} className="p-2 bg-gray-100 rounded-md">
//                 {comment.body}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <button
//         className=" text-white bg-light-yellow w-full p-2 rounded-b-lg"
//         onClick={handleToggleComments}
//       >
//         {isCommentsVisible ? "Collapse comments" : "View all comments"}
//       </button>
//     </div>
//   );
// }

// export default Post;

import { useEffect, useState } from 'react';
import { getUser } from '../adapters/user-adapter';

function Post({ post }) {
  const [commentText, setCommentText] = useState('');
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [isCommentInputVisible, setIsCommentInputVisible] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const hand = async () => {
      setUser(await getUser(post.user_id));
    };
    hand();
  }, [setUser]);

  const handleCommentChange = (e) => setCommentText(e.target.value);
  const handleToggleComments = () => setIsCommentsVisible(!isCommentsVisible);
  const handleToggleCommentInput = () =>
    setIsCommentInputVisible(!isCommentInputVisible);

  return (
    <div className="flex-col w-[50vw] m-9 rounded-xl shadow-sm">
      <div className="post bg-white p-4 flex-col rounded-t-xl">
        <div className="flex items-center mb-3">
          <img
            src={user.image}
            alt={user.display_name}
            className="w-10 h-10 border-4 border-bright-orange rounded-full mr-3"
          />
          <div>
            <p className="font-bold text-yellow">{user.display_name}</p>
            <p className="text-sm text-yellow font-thin ubuntu-light-italic">
              {user.location} • 2 hours ago{post.createdAt}
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2 pr-6 pl-6">{post.title}</h3>
        <p className="text-black mb-2 pr-6 pl-6">{post.body}</p>

        <div className="mb-2">
          {isCommentInputVisible && (
            <>
              <input
                type="text"
                value={commentText}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
                className="border p-2 rounded-md w-full pr-6 pl-6"
              />
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => {
                  /* Add comment logic */
                }}
              >
                Comment
              </button>
            </>
          )}
          <div className="relative">
            <button
              className="absolute right-0 flex"
              onClick={handleToggleCommentInput}
            >
              <img
                src="/public/parallax/chat-icon.svg"
                alt="Chat Icon"
                className="w-10 h-10"
              />
              {/* <span className="ml-2">{isCommentInputVisible ? "Hide comment input" : "Add a comment"}</span> */}
            </button>
          </div>
        </div>

        {isCommentsVisible && (
          <ul className="mt-4 space-y-2">
            {comments.map((comment, index) => (
              <li key={index} className="p-2 bg-gray-100 rounded-md">
                {comment.body}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        className="text-white bg-light-yellow w-full p-1 rounded-b-lg"
        onClick={handleToggleComments}
      >
        {isCommentsVisible ? 'Collapse comments' : 'View all comments'}
      </button>
    </div>
  );
}

export default Post;
