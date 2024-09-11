import React, { useState } from "react";
import { FaCheckCircle, FaThumbsUp, FaRegThumbsUp } from "react-icons/fa"; 
import axios from "axios";
import "./style.css";

const DiscussionItem = ({
  discussion,
  collegeName,
  societyName,
  handleLikeAnimation,
}) => {
  const [likes, setLikes] = useState(discussion.likes || 0);
  const [likedByUser, setLikedByUser] = useState(
    discussion.likedByUser || false
  );
  const [comments, setComments] = useState(discussion.comments || []);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    axios
      .post(
        `/societies/${collegeName}/${societyName}/discussions/${discussion._id}/like`
      )
      .then((response) => {
        setLikes(response.data.likes);
        setLikedByUser(response.data.likedByUser);
        if (response.data.likedByUser) {
          handleLikeAnimation(discussion._id); 
        }
      })
      .catch((err) => console.error("Error liking/unliking discussion:", err));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `/societies/${collegeName}/${societyName}/discussions/${discussion._id}/comment`,
        { comment }
      )
      .then((response) => setComments(response.data.comments))
      .catch((err) => console.error("Error adding comment:", err));
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <div className="flex items-center space-x-2">
        <p className="font-semibold">{discussion.userId.name}</p>
        {discussion.isCreator && (
          <FaCheckCircle className="text-blue-500" title="Society Creator" />
        )}
      </div>
      <h3 className="text-lg font-bold">{discussion.title}</h3>
      <p>{discussion.content}</p>

      <button
        onClick={handleLike}
        className={`mt-2 px-4 py-2 rounded flex items-center space-x-2 ${
          likedByUser ? "" : ""
        } text-blue-500`}
      >
        {likedByUser ? (
          <>
            <FaThumbsUp />
          </>
        ) : (
          <>
            <FaRegThumbsUp />
          </>
        )}
        <span>{likes} likes</span>
      </button>

      <div className="mt-4 space-y-2 border p-2 mx-8 pb-4">
        <p className="text-left ml-2 text-slate-700">
          <i class="fa-regular fa-comment"></i> Comments
        </p>
        <div className="scrollable">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="border p-2 rounded mx-4 m-2">
                <p className="font-semibold">{comment.userId.name}</p>{" "}
                {/* Display commenter's name */}
                <p>{comment.comment}</p> {/* Display comment text */}
                <p className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>{" "}
                {/* Display comment time */}
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>

      <form onSubmit={handleCommentSubmit} className="mt-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          className="border p-2 "
        />
        <button
          type="submit"
          className="text-slate-700 px-4 py-2 rounded mt-2 ml-2 border font-bold hover:bg-slate-300"
        >
          <i class="fa-solid fa-plus"></i> Add
        </button>
      </form>
    </div>
  );
};

export default DiscussionItem;
