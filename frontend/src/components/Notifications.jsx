import { useState, useEffect, useContext } from 'react';
import { amPmConverter } from '../utils';
import { getPostsByUserId } from '../adapters/post-adapter';
import { getCommentsByPostId } from '../adapters/comment-adapter';
import { getUser } from '../adapters/user-adapter';
import CurrentUserContext from '../contexts/current-user-context';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);

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
          return { ...comment, user };
        })
      );

      const otherUsersComments = commentsWithUser.filter(
        (comment) => comment.user.id !== currentUser.id
      );

      setNotifications(otherUsersComments);
    };
    fetchNotifications();

    const intervalId = setInterval(fetchNotifications, 5000);

    return () => clearInterval(intervalId);
  }, [setNotifications]);

  return (
    <div className='h-full bg-opacity-70 w-[25vw] flex flex-col items-center bg-yellow p-6 rounded-t-xl mb-0'>
      <p className='text-white bg-white bg-opacity-30 rounded-full px-4'>Notifications</p>
    <div className="flex flex-col">
      {notifications.map((comment, index) => {
        const commentSnippet = `${comment.body.substring(0, 20)}...`;
        const formattedTime = amPmConverter(comment.created_at);

        return (
          <div key={index} className="m-4 h-20 w-48 p-5 rounded-lg bg-white flex-row">
            {/* <img
              src={comment.user.image}
              alt={comment.user.display_name}
              className="w-10 h-10 border-4 border-bright-orange rounded-full mr-3"
            /> */}
            <div className='text-sm relative'>
            <strong className='text-bright-orange'>{comment.user.username}</strong>{' '}
            <strong className='text-bright-orange'>left a comment:</strong> {commentSnippet}{' '}
            <span className='absalute right-2'>{formattedTime}</span>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default Notifications;
