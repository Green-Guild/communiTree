import React from 'react';

const Comment = ({ comment }) => {
  return (
    <ul className="mt-4 space-y-2">
      <li key={comment.id} className="p-2 bg-gray-100 rounded-md">
        <img
          src={comment.user.image}
          alt={comment.user.display_name}
          className="w-10 h-10 border-4 border-bright-orange rounded-full mr-3"
        />
        <p>
          {comment.user.display_name}: {comment.body}
        </p>
      </li>
    </ul>
  );
};

export default Comment;
