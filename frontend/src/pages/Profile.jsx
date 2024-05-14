// import { useState, useContext, useEffect } from "react";
// import { getUser } from "../adapters/user-adapter";
// import CurrentUserContext from "../contexts/current-user-context";

// const Profile = () => {
//   const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
//   const [contributionType, setContributionType] = useState("posts");
//   const [contributions, setContributions] = useState([]);
//   const [editMode, setEditMode] = useState(false);
//   const [editData, setEditData] = useState({
//     username: currentUser?.username || "",
//     displayName: currentUser?.display_name || "",
//     location: currentUser?.location || "",
//   });

//   useEffect(() => {
//     const fetchUserContributions = async () => {
//       // Fetch contributions based on the selected type (posts/gardens/events)
//       // Update setContributions with the fetched data
//       // This is a placeholder. Replace with actual API calls.
//       const data = []; // Replace with actual fetched data
//       setContributions(data);
//     };

//     fetchUserContributions();
//   }, [contributionType]);

//   const handleEditToggle = () => setEditMode(!editMode);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditSubmit = async () => {
//     // Update user info using the appropriate adapter function
//     // Example: updateUser(editData)
//     setCurrentUser({ ...currentUser, ...editData });
//     setEditMode(false);
//   };

//   const renderContributions = () => {
//     if (contributions.length === 0) {
//       return (
//         <p>
//           No {contributionType} yet. Make your first{" "}
//           <a href="/">community page</a>!
//         </p>
//       );
//     }

//     return (
//       <ul>
//         {contributions.map((contribution, index) => (
//           <li key={index}>{contribution.name}</li>
//         ))}
//       </ul>
//     );
//   };

//   return (
//     <div>
//       <div className="flex">
//         <img src={currentUser?.image || "/default-profile-pic.jpg"} alt="Profile" className="rounded-full size-20" />
//         {editMode ? (
//           <div>
//             <input
//               type="text"
//               name="username"
//               value={editData.username}
//               onChange={handleInputChange}
//             />
//             <input
//               type="text"
//               name="displayName"
//               value={editData.displayName}
//               onChange={handleInputChange}
//             />
//             <input
//               type="text"
//               name="location"
//               value={editData.location}
//               onChange={handleInputChange}
//             />
//             <button onClick={handleEditSubmit}>Save</button>
//             <button onClick={handleEditToggle}>Cancel</button>
//           </div>
//         ) : (
//           <div>
//             <h2>{currentUser?.display_name}</h2>
//             <p>{currentUser?.location}</p>
//             <button onClick={handleEditToggle}>Edit</button>
//           </div>
//         )}
//       </div>
//       <div>
//         <label htmlFor="contributionType">Contributions: </label>
//         <select
//           id="contributionType"
//           value={contributionType}
//           onChange={(e) => setContributionType(e.target.value)}
//         >
//           <option value="posts">Posts</option>
//           <option value="gardens">Gardens</option>
//           <option value="events">Events</option>
//         </select>
//         {renderContributions()}
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { useState, useContext, useEffect } from 'react';
import { getUser } from '../adapters/user-adapter';
import CurrentUserContext from '../contexts/current-user-context';
import { getPostsByUserId } from '../adapters/post-adapter';
import { getEventsByUserId } from '../adapters/event-adapter';
import { getGardensByUserId } from '../adapters/garden-adapter';

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [contributionType, setContributionType] = useState('posts');
  const [contributions, setContributions] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    username: currentUser?.username || '',
    displayName: currentUser?.display_name || '',
    location: currentUser?.location || '',
  });

  useEffect(() => {
    const fetchUserContributions = async () => {
      let data;
      switch (contributionType) {
        case 'posts':
          data = await getPostsByUserId(currentUser.id);
          break;
        case 'events':
          data = await getEventsByUserId(currentUser.id);
          break;
        case 'gardens':
          data = await getGardensByUserId(currentUser.id);
          break;
        default:
          data = [];
      }
      setContributions(data);
    };
    fetchUserContributions();
  }, [contributionType]);

  const handleEditToggle = () => setEditMode(!editMode);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditSubmit = async () => {
    setCurrentUser({ ...currentUser, ...editData });
    setEditMode(false);
  };
  const renderContributions = () => {
    if (contributions.length === 0) {
      return (
        <p>
          No {contributionType} yet. Make your first{' '}
          <a href="/" className="text-dark-orange">
            community page
          </a>
          !
        </p>
      );
    }
    return (
      <ul>
        {contributions.map((contribution, index) => (
          <li key={index}>{contribution.name}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow mt-6 mr-6 ml-6 rounded-3xl">
      <div className="flex flex-col items-center">
        <img
          src={currentUser?.image || '/default-profile-pic.jpg'}
          alt="Profile"
          className="rounded-full border-4 border-yellow w-20 h-20 shadow-md mb-4"
        />
        <div>
          {editMode ? (
            <div className="space-y-4">
              <input
                type="text"
                name="username"
                value={editData.username}
                onChange={handleInputChange}
                className="input"
              />
              <input
                type="text"
                name="displayName"
                value={editData.displayName}
                onChange={handleInputChange}
                className="input"
              />
              <input
                type="text"
                name="location"
                value={editData.location}
                onChange={handleInputChange}
                className="input"
              />
              <button
                onClick={handleEditSubmit}
                className="bg-bright-orange text-white rounded-full px-4 py-2"
              >
                Save
              </button>
              <button
                onClick={handleEditToggle}
                className="ml-4 bg-dark-orange text-white rounded-full px-4 py-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-xl text-white font-bold">
                {currentUser?.display_name}
              </h2>
              <p className="text-white">{currentUser?.location}</p>
              <button
                onClick={handleEditToggle}
                className="absolute top-0 right-0 bg-bright-orange text-white rounded-full px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 bg-white rounded-lg p-6 w-2/3">
        <label htmlFor="contributionType" className="font-bold">
          Contributions:{' '}
        </label>
        <select
          id="contributionType"
          value={contributionType}
          onChange={(e) => setContributionType(e.target.value)}
          className="ml-2 rounded-lg p-2 bg-light-green text-black"
        >
          <option value="posts">Posts</option>
          <option value="gardens">Gardens</option>
          <option value="events">Events</option>
        </select>
        {renderContributions()}
      </div>
    </div>
  );
};

export default Profile;
