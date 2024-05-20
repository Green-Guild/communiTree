import { useState, useContext, useEffect } from 'react';
import CurrentUserContext from '../contexts/current-user-context';
import { getPostsByUserId } from '../adapters/post-adapter';
import { getEventsByUserId } from '../adapters/event-adapter';
import { getGardensByUserId } from '../adapters/garden-adapter';
import { updateUser } from '../adapters/user-adapter';
import { UploadButton } from '../uploadthing';
import GardenCard from '../components/GardenCard';
import EventCard from '../components/EventsCard';
import Post from '../components/Post';
import Post from '../components/Post';

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [contributionType, setContributionType] = useState('posts');
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState(currentUser.image);
  const [editData, setEditData] = useState({
    username: currentUser.username ?? '',
    display_name: currentUser.display_name ?? '',
    zipcode: currentUser.zipcode ?? '',
  });

  useEffect(() => {
    const fetchUserContributions = async () => {
      setLoading(true);
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
      setLoading(false);
    };
    fetchUserContributions();
  }, [contributionType]);

  const handleEditToggle = () => setEditMode(!editMode);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await updateUser({
      id: currentUser.id,
      image,
      ...editData,
    });
    setCurrentUser(updatedUser);
    setEditMode(false);
  };
  const renderContributions = () => {
    if (loading) return <div>Loading...</div>;
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
        {contributions.map((contribution, index) => {
          return (
            <li key={index}>
              {contribution.user_id ? (
                <Post post={contribution} />
              ) : contribution.host_id ? (
                <EventCard event={contribution} />
              ) : contribution.owner_id ? (
                <GardenCard garden={contribution} />
              ) : (
                <div>ERROR</div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow mt-6 mr-6 ml-6 rounded-t-3xl">
      <div className="flex flex-col items-center">
        {!editMode && (
          <img
            src={currentUser.image}
            alt="Profile"
            className="rounded-full border-4 border-yellow w-20 h-20 shadow-md mb-4"
          />
        )}
        <div>
          {/* TODO: make pfp auto update on file upload */}
          {editMode ? (
            <form className="space-y-4" onSubmit={handleEditSubmit}>
              <UploadButton
                className="ut-button:rounded-full ut-button:border-4 ut-button:border-yellow ut-button:w-20 ut-button:h-20 ut-button:shadow-md ut-allowed-content:h-0"
                endpoint="imageUploader"
                skipPolling
                onClientUploadComplete={(files) => {
                  setTimeout(() => {
                    setImage(files[0].url);
                  }, 1000);
                }}
                onUploadError={(error) => {
                  console.error(error, error.cause);
                  alert('Upload failed');
                }}
                content={{
                  button({ ready }) {
                    return ready ? (
                      <img src={image} alt="Profile picture" />
                    ) : (
                      <p className="text-black">Uploading...</p>
                    );
                  },
                  allowedContent() {
                    return <div></div>;
                  },
                }}
              />
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={editData.username}
                onChange={handleInputChange}
                className="input"
              />
              <label htmlFor="display_name">Display Name</label>
              <input
                type="text"
                name="display_name"
                value={editData.display_name}
                onChange={handleInputChange}
                className="input"
              />
              <label htmlFor="zipcode">Zipcode</label>
              <input
                type="text"
                name="zipcode"
                value={editData.zipcode}
                onChange={handleInputChange}
                className="input"
              />
              <button
                className="bg-bright-orange text-white rounded-full px-4 py-2"
                type="submit"
              >
                Save
              </button>
              <button
                onClick={handleEditToggle}
                className="ml-4 bg-dark-orange text-white rounded-full px-4 py-2"
              >
                Cancel
              </button>
            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-xl text-white font-bold">
                {currentUser.display_name}
              </h2>
              <p className="text-white">{currentUser.zipcode}</p>
              <button
                onClick={handleEditToggle}
                className="top-0 right-0 bg-white text-black rounded-full px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 bg-white bg-opacity-90 rounded-lg p-6 w-2/3">
        <label htmlFor="contributionType" className="font-bold text-bright-orange">
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
