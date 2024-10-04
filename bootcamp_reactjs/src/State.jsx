import React from "react";
// import ReactDOM  from "react-dom/client"

class Counting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <h1>You clicked {this.state.count} times</h1>
        {/* Tombol untuk mengubah state count */}
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}

export default Counting;
