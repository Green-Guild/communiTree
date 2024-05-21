import { useState, useEffect, useContext } from 'react';
import Forum from '../components/Forum';
import Notifications from '../components/Notifications';
import notificationSound from '/notification.wav';
import { getPostsByUserId } from '../adapters/post-adapter';
import { getCommentsByPostId } from '../adapters/comment-adapter';
import { getUser } from '../adapters/user-adapter';
import CurrentUserContext from '../contexts/current-user-context';

const Community = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const audio = new Audio(notificationSound);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!currentUser) return;

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
          return { ...comment, user, postId: comment.post_id };
        })
      );

      const otherUsersComments = commentsWithUser.filter(
        (comment) => comment.user.id !== currentUser.id
      );

      setNotifications((prevNotifications) => {
        if (otherUsersComments.length > prevNotifications.length) {
          audio.play();
        }
        return otherUsersComments;
      });
    };
    fetchNotifications();

    const intervalId = setInterval(fetchNotifications, 5000);

    return () => clearInterval(intervalId);
  }, [currentUser]);

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

      <button className="notification-button" onClick={toggleNotifications}>
        <img className="w-6 h-6" src="/notification.svg" alt="Notifications" />
      </button>
      <div
        className={`flex flex-row mt-6 mr-6 ml-6 ${
          showNotifications ? 'justify-start' : 'justify-center'
        }`}
      >
        <div className="flex justify-center flex-auto">
          <Forum query={searchQuery} />
        </div>
        {showNotifications && (
          <div className="flex justify-center">
            <Notifications notifications={notifications} />
          </div>
        )}
      </div>
    </>
  );
};
export default Community;
