import React from "react";
import commentsData from "./commentData";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    // Inisialisasi state untuk jumlah like
    this.state = {
      likes: new Array(commentsData.length).fill(0), // Semua komentar dimulai dengan 0 likes
    };
  }

  // Fungsi untuk menangani klik tombol like
  handleLike = (index) => {
    const newLikes = [...this.state.likes]; // Salin array likes
    newLikes[index] += 1; // Tambah like pada komentar tertentu
    this.setState({ likes: newLikes }); // Perbarui state dengan jumlah like baru
  };

  render() {
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
              <div className="actions">
                <button onClick={() => this.handleLike(index)}>Like</button>
                <span>{this.state.likes[index]} Likes</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Comment;
