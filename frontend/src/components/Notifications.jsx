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
  }, [setNotifications]);

  return (
    <div className="flex flex-col">
      {notifications.map((comment, index) => {
        const commentSnippet = `${comment.body.substring(0, 20)}...`;
        const formattedTime = amPmConverter(comment.created_at);

        return (
          <div key={index} className="flex-row">
            <img
              src={comment.user.image}
              alt={comment.user.display_name}
              className="w-10 h-10 border-4 border-bright-orange rounded-full mr-3"
            />
            <strong>{comment.user.username}</strong>{' '}
            <strong>left a comment:</strong> {commentSnippet}{' '}
            <span>{formattedTime}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
