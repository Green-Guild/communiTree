import { useState } from 'react';

function Post({ post, user, comments }) {
  const [commentText, setCommentText] = useState('');
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const handleCommentChange = (e) => setCommentText(e.target.value);
  const handleToggleComments = () => setIsCommentsVisible(!isCommentsVisible);

  return (
    <div className='post bg-white p-4 rounded-md shadow-md mb-4'>
      {/* User info */}
      <div className='flex items-center mb-3'>
        <img
          src={user.photoUrl}
          alt={user.name}
          className='w-10 h-10 rounded-full mr-3'
        />
        <div>
          <p className='font-bold'>{user.name}</p>
          <p className='text-sm text-gray-500'>{user.location}</p>
        </div>
      </div>

      {/* Post title and body */}
      <h3 className='text-xl font-semibold mb-2'>{post.title}</h3>
      <p className='text-gray-700 mb-2'>{post.body}</p>
      <p className='text-sm text-gray-400 mb-4'>Posted at: {post.createdAt}</p>

      {/* Add comment button */}
      <div className='mb-2'>
        <input
          type='text'
          value={commentText}
          onChange={handleCommentChange}
          placeholder='Add a comment...'
          className='border p-2 rounded-md w-full'
        />
        <button
          className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-md'
          onClick={() => {/* Add comment logic */}}
        >
          Comment
        </button>
      </div>

      {/* Toggle comments button */}
      <button
        className='mt-2 text-blue-500'
        onClick={handleToggleComments}
      >
        {isCommentsVisible ? 'Collapse comments' : 'View all comments'}
      </button>

      {/* Display comments */}
      {isCommentsVisible && (
        <ul className='mt-4 space-y-2'>
          {comments.map((comment, index) => (
            <li key={index} className='p-2 bg-gray-100 rounded-md'>
              {comment.body}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Post;
