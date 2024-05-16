import { useEffect, useState, useContext } from 'react';
import { getUser } from '../adapters/user-adapter';
import Comment from './Comment';
import { getCommentsByPostId } from '../adapters/comment-adapter';
import { createComment } from '../adapters/comment-adapter';
import CurrentUserContext from '../contexts/current-user-context';
import { capitalizeWords, fetchHandler } from '../utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

function Post({ post }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [isCommentInputVisible, setIsCommentInputVisible] = useState(false);
  const [commentsUpdated, setCommentsUpdated] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const [user, setUser] = useState({});
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const userRes = await getUser(post.user_id);
        setUser(userRes);

        const [data, err] = await fetchHandler(
          `http://ZiptasticAPI.com/${userRes.zipcode}`
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
      const comment = await createComment({
        body: commentText,
        post_id: post.id,
      });
      // TODO: figure out why only passing in the wrong user works??????
      setComments([...comments, { ...comment, user }]);
      setCommentText('');
      setCommentsUpdated(!commentsUpdated);
    }
  };

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
              {capitalizeWords(location)} • {dayjs().to(dayjs(post.created_at))}
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2 pr-6 pl-6">{post.title}</h3>
        <p className="text-black mb-2 pr-6 pl-6">{post.body}</p>

        <div className="mb-2">
          {isCommentInputVisible && (
            <form onSubmit={handleCommentSubmit}>
              <input
                type="text"
                value={commentText}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
                className="border p-2 rounded-md w-full pr-6 pl-6"
              />
              <button
                className="mt-2 px-4 py-2 bg-bright-orange text-black rounded-md"
                type="submit"
              >
                Comment
              </button>
            </form>
          )}
          <div className="relative">
            <button
              className="absolute right-0 flex"
              onClick={handleToggleCommentInput}
            >
              <img src="/chat.svg" alt="Chat Icon" className="w-10 h-10" />
              {/* <span className="ml-2">{isCommentInputVisible ? "Hide comment input" : "Add a comment"}</span> */}
            </button>
          </div>
        </div>

        {isCommentsVisible &&
          comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
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
