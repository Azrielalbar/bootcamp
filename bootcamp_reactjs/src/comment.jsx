// Comment.js
import React from "react";
import commentsData from "./commentData";
import Clock from "./clock"; // Import komponen Clock

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: new Array(commentsData.length).fill(0),
    };
  }

  handleLike = (index) => {
    const newLikes = [...this.state.likes];
    newLikes[index] += 1;
    this.setState({ likes: newLikes });
  };

  render() {
    return (
      <div>
        <Clock /> {/* Menampilkan jam di kanan atas */}
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
                <div className="actions">
                  <button onClick={() => this.handleLike(index)}>Like</button>
                  <span>{this.state.likes[index]} Likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Comment;
