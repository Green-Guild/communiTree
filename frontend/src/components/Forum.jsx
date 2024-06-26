import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import {
  getAllPosts,
  createPost,
  searchPosts,
  getPostsByHashtag,
} from "../adapters/post-adapter";
import CurrentUserContext from "../contexts/current-user-context";

function Forum({ query }) {
  const [isAddPostVisible, setIsAddPostVisible] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [postsUpdated, setPostsUpdated] = useState(false);
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      if (query) {
        setPosts(
          query.startsWith("#")
            ? await getPostsByHashtag(query.slice(1))
            : await searchPosts(query)
        );
      } else setPosts(await getAllPosts());
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
    setNewPostTitle("");
    setNewPostBody("");
    setIsAddPostVisible(false);
    setPostsUpdated(!postsUpdated);
  };

  const handleAddPostToggle = () => setIsAddPostVisible(!isAddPostVisible);
  const handleNewPostTitleChange = (e) => setNewPostTitle(e.target.value);
  const handleNewPostBodyChange = (e) => setNewPostBody(e.target.value);

  

  return (
    <div className=" bg-yellow dark:bg-opacity-30 max-w-[80vw] w-[65vw] flex flex-col items-center p-8 rounded-t-xl h-full min-h-screen mb-0 relative">
      <p className="text-white bg-white bg-opacity-30 rounded-full px-4">
        Community
      </p>
      <div className="-forum">
        {currentUser && (
          <button
            className="absolute top-0 right-0 m-6 p-3 py-1 dark:bg-yellow bg-bright-orange text-white border-dotted rounded-md button-bulge"
            onClick={handleAddPostToggle}
          >
            +
          </button>
        )}

        {currentUser && isAddPostVisible && (
          <form
            className="mt-4 p-4 w-96 border-none dark:bg-black dark:text-white bg-white rounded-md shadow-sm"
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
              className="mb-2 dark:bg-white dark:bg-opacity-10 border-0 p-2 rounded-md w-full"
            />
            <label htmlFor="body">Body</label>
            <textarea
              id="body"
              name="body"
              value={newPostBody}
              onChange={handleNewPostBodyChange}
              placeholder="Post body"
              className="mb-2  dark:bg-white dark:bg-opacity-10 border-0 p-2 rounded-md w-full"
            />
            <button
              className="px-4 py-1 dark:bg-yellow bg-bright-orange text-white rounded-full button-bulge"
              type="submit"
            >
              Post
            </button>
          </form>
        )}
  
        <div>
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <div className="text-center text-white mt-24">
            <p>
              It's a little quiet here.{" "}
              <span
                className="text-dark-orange cursor-pointer"
                onClick={handleAddPostToggle}
              >
                create a post
              </span>{" "}
              on this topic!
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default Forum;
