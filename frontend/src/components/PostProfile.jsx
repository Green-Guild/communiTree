import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import Post from './Post';
import { getPost } from '../adapters/post-adapter';

function PostProfile() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPost(postId);
        setPost(fetchedPost);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div className="flex items-center justify-center bg-yellow h-screen">
      {post ? (
        <Post post={post} commentsOpen={true} />
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
}

export default PostProfile;
