import React from "react";

const Comment = ({ comment }) => {
  return (
    <ul className="mt-6 p-1 px-10 space-y-2">
      <li
        key={comment.id}
        className="p-6 w-[90%] rounded-lg bg-opacity-10 bg-bright-orange dark:text-white dark:bg-yellow dark:bg-opacity-30"
      >
        <div className="flex items-center mb-3">
          <img
            src={comment.user.image}
            alt={comment.user.display_name}
            className="w-10 h-10 border-4 dark:border-yellow border-bright-orange rounded-full mr-3"
          />
          <div>
            <p className="font-bold dark:text-yellow text-bright-orange">
              {comment.user.display_name}
            </p>
          </div>
        </div>
        <p>
          <span className="text-bright-orange dark:text-yellow">Commented:</span> {comment.body}
        </p>
      </li>
    </ul>
  );
};

export default Comment;
