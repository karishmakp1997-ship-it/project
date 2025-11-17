import React, { useState, Component } from "react";

// Mini Project 1: Welcome Message
function WelcomeMessage() {
  return (
    <h2 style={{
      color: "purple",
      background: "#fddcdcff",
      padding: "10px",
      borderRadius: "6px"
    }}>
      Welcome to the Getogether everybody....!!
    </h2>
  );
}

// Mini Project 2: Click Counter
class ClickCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  render() {
    return (
      <div>
        <h3>Counter: {this.state.count}</h3>
        <button onClick={this.increment}>Click Me</button>
      </div>
    );
  }
}

// Mini Project 3: Show/Hide Text
function ShowHideText() {
  const show = true; // Change to false to hide text
  return (
    <div>
      {show ? <p>Hello, World!</p> : null}
    </div>
  );
}

// Mini Project 4: Class Component Timer
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date().toLocaleTimeString() };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return <h3>Current Time: {this.state.time}</h3>;
  }
}

// Main App – integrates all 4 mini projects:
function App() {
  return (
    <div>
      <WelcomeMessage />
      <ClickCounter />
      <ShowHideText />
      <Timer />
    </div>
  );
}

export default App;
