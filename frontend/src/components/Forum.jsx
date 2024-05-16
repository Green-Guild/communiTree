import { useContext, useEffect, useState } from 'react';
import Post from './Post';
import { getAllPosts, createPost } from '../adapters/post-adapter';
import CurrentUserContext from '../contexts/current-user-context';

function Forum() {
  const [isAddPostVisible, setIsAddPostVisible] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [postsUpdated, setPostsUpdated] = useState(false);
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      setPosts(await getAllPosts());
    };
    fetchPosts();
  }, [setPosts, postsUpdated]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await createPost({
      title: newPostTitle,
      body: newPostBody,
    });
    const updatedPosts = await getAllPosts();
    setPosts(updatedPosts);
    setNewPostTitle('');
    setNewPostBody('');
    setIsAddPostVisible(false);
    setPostsUpdated(!postsUpdated);
  };

  const handleAddPostToggle = () => setIsAddPostVisible(!isAddPostVisible);
  const handleNewPostTitleChange = (e) => setNewPostTitle(e.target.value);
  const handleNewPostBodyChange = (e) => setNewPostBody(e.target.value);

  return (
    
    <div className="bg-yellow mt-6 mr-6 ml-6 p-6 rounded-t-xl h-full mb-0">
      <div className="-forum">
        {/* Add post button */}
        {currentUser && (
          <button
            className="p-3 flex-col py-1 bg-bright-orange text-white border-dotted rounded-md"
            onClick={handleAddPostToggle}
          >
            +
          </button>
        )}

        {/* Add post form */}
        {currentUser && isAddPostVisible && (
          <form
            className="mt-4 p-4 bg-white rounded-md shadow-md"
            aria-labelledby="Create Post Form"
            onSubmit={handleFormSubmit}
          >
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={newPostTitle}
              onChange={handleNewPostTitleChange}
              placeholder="Post title"
              className="mb-2 border p-2 rounded-md w-full"
            />
            <label htmlFor="body">Body</label>
            <textarea
              id="body"
              name="body"
              value={newPostBody}
              onChange={handleNewPostBodyChange}
              placeholder="Post body"
              className="mb-2 border p-2 rounded-md w-full"
            />
            <button
              className="px-4 py-2 bg-bright-orange text-black rounded-md"
              type="submit"
            >
              Post
            </button>
          </form>
        )}

        {/* Display posts */}
        <div className="mt-4">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Forum;
