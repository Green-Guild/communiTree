import { useContext, useEffect, useState } from 'react';
import { getUser } from '../adapters/user-adapter';
import Comment from './Comment';
import { getCommentsByPostId } from '../adapters/comment-adapter';
import { createComment } from '../adapters/comment-adapter';
import { capitalizeWords, fetchHandler } from '../utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { capitalizeFirstChar } from '../utils';
import CurrentUserContext from '../contexts/current-user-context';
dayjs.extend(relativeTime);

function Post({ post, commentsOpen = false }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isCommentsVisible, setIsCommentsVisible] = useState(commentsOpen);
  const [isCommentInputVisible, setIsCommentInputVisible] = useState(false);
  const [commentsUpdated, setCommentsUpdated] = useState(false);
  const [user, setUser] = useState({});
  const [location, setLocation] = useState('');
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const fetch = async () => {
      try {
        const userRes = await getUser(post.user_id);
        setUser(userRes);

        const [data, err] = await fetchHandler(
          `https://ZiptasticAPI.com/${userRes.zipcode}`
        );
        if (err) throw new Error(err);

        const parsed = JSON.parse(data);
        setLocation(`${parsed.city}, ${parsed.state}`);

        const comments = await getCommentsByPostId(post.id);
        const commentsWithUser = await Promise.all(
          comments.map(async (comment) => {
            const user = await getUser(comment.user_id);
            return { ...comment, user };
          })
        );
        setComments(commentsWithUser);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  const handleCommentChange = (e) => setCommentText(e.target.value);
  const handleToggleComments = () => setIsCommentsVisible(!isCommentsVisible);
  const handleToggleCommentInput = () =>
    setIsCommentInputVisible(!isCommentInputVisible);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim() !== '') {
      await createComment({
        body: commentText,
        post_id: post.id,
      });
      const comments = await getCommentsByPostId(post.id);
      const commentsWithUser = await Promise.all(
        comments.map(async (comment) => {
          const user = await getUser(comment.user_id);
          return { ...comment, user };
        })
      );
      setComments(commentsWithUser);
      setCommentText('');
      setCommentsUpdated(!commentsUpdated);
    }
  };

  const renderPostBody = (text) => {
    return text.split(' ').map((word, index) =>
      word.includes('#') ? (
        <span key={index} className="text-yellow">
          {word}{' '}
        </span>
      ) : (
        word + ' '
      )
    );
  };

  return (
    <div className="flex-col w-[50vw] m-9 rounded-xl shadow-sm">
      <div className="post bg-white dark:bg-black p-4 flex-col rounded-t-xl">
        <div className="flex items-center mb-3">
          <img
            src={user.image}
            alt={user.display_name}
            className="w-10 h-10 border-4 object-cover dark:border-yellow border-bright-orange rounded-full mr-3"
          />
          <div>
            <p className="font-bold text-yellow">{user.display_name}</p>
            <p className="text-sm text-yellow font-thin ubuntu-light-italic">
              {capitalizeWords(location)} •{' '}
              {capitalizeFirstChar(dayjs().to(dayjs(post.created_at)))}
            </p>
          </div>
        </div>

        <h3 className="text-xl dark:text-white font-semibold mb-2 pr-6 pl-6">
          {post.title}
        </h3>
        <p className="text-black dark:text-white mb-2 pr-6 pl-6">
          {renderPostBody(post.body)}
        </p>

        <div className="mb-2 rounded-lg border-none">
          {isCommentInputVisible && (
            <form
              className="rounded-lg border-none"
              onSubmit={handleCommentSubmit}
            >
              <input
                type="text"
                value={commentText}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
                className="border p-2 rounded-md w-full pr-6 pl-6"
              />
              <button
                className="px-3 p-1 bg-bright-orange text-white font-medium rounded-full button-bulge"
                type="submit"
              >
                Reply
              </button>
            </form>
          )}
          <div className="relative">
            {currentUser && (
              <button
                className="absolute button-bulge right-0 flex"
                onClick={handleToggleCommentInput}
              >
                <img src="/chat.svg" alt="Comment Icon" className="w-10 h-10 dark:mix-blend-luminosity" />
              </button>
            )}
          </div>
        </div>

        {isCommentsVisible &&
          comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
      </div>
      <button
        className="text-white dark:bg-yellow bg-light-yellow w-full p-1 rounded-b-lg"
        onClick={handleToggleComments}
      >
        {isCommentsVisible ? 'Collapse comments' : 'View all comments'}
      </button>
    </div>
  );
}

export default Post;
