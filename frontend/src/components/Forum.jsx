import { useEffect, useState } from 'react';
import Post from './Post';
import { getAllPosts } from '../adapters/post-adapter';

function Forum() {
  const [isAddPostVisible, setIsAddPostVisible] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      setPosts(await getAllPosts());
    };
    fetchPosts();
  }, []);

  const handleAddPostToggle = () => setIsAddPostVisible(!isAddPostVisible);
  const handleNewPostTitleChange = (e) => setNewPostTitle(e.target.value);
  const handleNewPostBodyChange = (e) => setNewPostBody(e.target.value);

  return (
    <div className="bg-yellow mt-6 mr-6 ml-6 p-6 rounded-2xl">
      <div className="-forum">
        {/* Add post button */}
        <button
          className="p-3 py-1 bg-bright-orange text-white border-dotted rounded-md"
          onClick={handleAddPostToggle}
        >
          +
        </button>

        {/* Add post form */}
        {isAddPostVisible && (
          <div className="mt-4 p-4 bg-white rounded-md shadow-md">
            <input
              type="text"
              value={newPostTitle}
              onChange={handleNewPostTitleChange}
              placeholder="Post title"
              className="mb-2 border p-2 rounded-md w-full"
            />
            <textarea
              value={newPostBody}
              onChange={handleNewPostBodyChange}
              placeholder="Post body"
              className="mb-2 border p-2 rounded-md w-full"
            />
            <button
              className="px-4 py-2 bg-light-green text-black rounded-md"
              onClick={() => {
                /* Add new post logic */
              }}
            >
              Post
            </button>
          </div>
        )}

        {/* Display posts */}
        <div className="mt-4">
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Forum;
