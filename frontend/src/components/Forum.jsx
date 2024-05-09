import { useState } from 'react';
import Post from '../pages/Post';

function Forum({ posts }) {
  const [isAddPostVisible, setIsAddPostVisible] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');

  const handleAddPostToggle = () => setIsAddPostVisible(!isAddPostVisible);
  const handleNewPostTitleChange = (e) => setNewPostTitle(e.target.value);
  const handleNewPostBodyChange = (e) => setNewPostBody(e.target.value);

  return (
    <div className='-forum'>
      {/* Add post button */}
      <button
        className='px-4 py-2 bg-green-500 text-white rounded-md'
        onClick={handleAddPostToggle}
      >
        Add Post
      </button>

      {/* Add post form */}
      {isAddPostVisible && (
        <div className='mt-4 p-4 bg-white rounded-md shadow-md'>
          <input
            type='text'
            value={newPostTitle}
            onChange={handleNewPostTitleChange}
            placeholder='Post title'
            className='mb-2 border p-2 rounded-md w-full'
          />
          <textarea
            value={newPostBody}
            onChange={handleNewPostBodyChange}
            placeholder='Post body'
            className='mb-2 border p-2 rounded-md w-full'
          />
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded-md'
            onClick={() => {
              /* Add new post logic */
            }}
          >
            Post
          </button>
        </div>
      )}

      {/* Display posts */}
      <div className='mt-4'>
        {posts.map((post, index) => (
          <Post
            key={index}
            post={post}
            user={user}
            comments={replies}
          />
        ))}
      </div>
    </div>
  );
}

export default Forum;
