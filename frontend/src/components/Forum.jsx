import { useContext, useEffect, useState } from 'react';
import Post from './Post';
import { getAllPosts, createPost, searchPosts } from '../adapters/post-adapter';
import CurrentUserContext from '../contexts/current-user-context';

function Forum({ query }) {
  const [isAddPostVisible, setIsAddPostVisible] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [postsUpdated, setPostsUpdated] = useState(false);
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      setPosts(query ? await searchPosts(query) : await getAllPosts());
    };
    fetchPosts();
  }, [setPosts, postsUpdated, query]);

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
    <div className="bg-yellow flex flex-col items-center mt-6 w-[70vw] mr-6 ml-6 p-6 rounded-t-xl h-full min-h-[70vh] mb-0 relative">
      <div className="-forum">
        {currentUser && (
          <button
            className="absolute top-0 right-0 m-6 p-3 py-1 bg-bright-orange text-white border-dotted rounded-md button-bulge"
            onClick={handleAddPostToggle}
          >
            +
          </button>
        )}

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

        {posts.length > 0 ? (
          posts.map((post) => (
            <Post key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center text-white mt-24">
            <p>It's a little quiet here. <span className="text-dark-orange cursor-pointer" onClick={handleAddPostToggle}>create a post</span> on this topic!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Forum;
