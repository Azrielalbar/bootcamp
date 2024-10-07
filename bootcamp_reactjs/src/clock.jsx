// Clock.js
import React from "react";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: new Date().toLocaleTimeString(),
    });
  }

  render() {
    return (
      <div style={styles.clockContainer}>
        <h2>{this.state.time}</h2>
      </div>
    );
  }
}

// CSS untuk menempatkan jam di kanan atas
const styles = {
  clockContainer: {
    position: "absolute",
    top: "0px",
    right: "0px",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
  },
};

export default Clock;
