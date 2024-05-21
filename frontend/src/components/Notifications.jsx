import { useNavigate } from 'react-router-dom';
import { amPmConverter } from "../utils";

const Notifications = ({ notifications }) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-opacity-65 w-[25vw] flex flex-col items-center bg-yellow p-6 rounded-t-xl mb-0">
      <p className="text-white bg-white bg-opacity-30 rounded-full px-4">
        Notifications
      </p>
      <div className="flex flex-col">
        {notifications.map((comment, index) => {
          const commentSnippet = `${comment.body.substring(0, 20)}...`;
          const formattedTime = amPmConverter(comment.created_at);

          return (
            <div
              key={index}
              className="relative rounded-lg mt-6 bg-white p-4 cursor-pointer"
              onClick={() => navigate(`/post/${comment.postId}`)}
            >
              <div className="flex-1 flex items-center">
                <div className="text-xs w-full">
                  <strong className="text-bright-orange">
                    {comment.user.username} left a comment:{" "}
                  </strong>
                  <span className="text-black ubuntu-light-italic">
                    "{commentSnippet}"
                  </span>
                </div>
              </div>
              <div className="text-xs bottom-1 right-2 absolute">
                <span>{formattedTime}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;

