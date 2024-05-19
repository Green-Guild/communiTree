import React from 'react';

const Comment = ({ comment }) => {
  return (
    <ul className="mt-6 p-1 px-10 space-y-2">
      <li key={comment.id} className="p-6 w-[90%] rounded-md bg-opacity-10 bg-bright-orange">
        {/* <img
          src={comment.user.image}
          alt={comment.user.display_name}
          className="w-10 h-10 border-4 border-bright-orange rounded-full mr-3"
        /> */}
                <div className="flex items-center mb-3">
          <img
            src={comment.user.image}
            alt={comment.user.display_name}
            className="w-10 h-10 border-4 border-bright-orange rounded-full mr-3"
          />
          <div>
            <p className="font-bold text-bright-orange">{comment.user.display_name}</p>
          </div>
        </div>
        <p>
          <span className='text-bright-orange'>Commented:</span> {comment.body}
        </p>
      </li>
    </ul>
  );
};

{/* <div className="flex items-center mb-3">
<img
  src={user.image}
  alt={user.display_name}
  className="w-10 h-10 border-4 border-bright-orange rounded-full mr-3"
/>
<div>
  <p className="font-bold text-yellow">{user.display_name}</p>
  <p className="text-sm text-yellow font-thin ubuntu-light-italic">
    {capitalizeWords(location)} • {capitalizeFirstChar(dayjs().to(dayjs(post.created_at)))}
  </p>
</div>
</div> */}

export default Comment;
