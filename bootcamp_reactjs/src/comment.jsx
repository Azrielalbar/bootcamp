import React from "react";
import ReactDOM from "react-dom";
import commentsData from "./commentData";
import {faker} from '@faker-js/faker'

const Comment = () => {
  return (
    <div className="ui comments">
      <h3 className="ui dividing header">Comments</h3>
      {commentsData.map((comment, index) => (
        <div className="comment" key={index}>
          <a className="avatar">
            <img src={comment.avatar} alt={`${comment.author}'s avatar`} />
          </a>
          <div className="content">
            <a className="author">{comment.author}</a>
            <div className="metadata">
              <span className="date">{comment.date}</span>
            </div>
            <div className="text">{comment.comment}</div>
            <div className="actions">
              <a className="reply">Reply</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
