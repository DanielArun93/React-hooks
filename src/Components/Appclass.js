import React, { Component } from "react";

class Appclass extends React.Component {
  state = {
    count: 0,
    isOn: false,
    x: null,
    y: null
  };

  increment = () => {
    this.setState(prevState => {
      return {
        count: prevState.count + 1
      };
    });
  };

  toggleLight = () => {
    this.setState(prevState => {
      return {
        isOn: !prevState.isOn
      };
    });
  };

  handlemousemove = e => {
    this.setState(prevState => {
      return {
        x: e.pageX,
        y: e.pageY
      };
    });
  };

  componentDidMount() {
    document.title = `you have clicked ${this.state.count} times`;
    window.addEventListener("mousemove", this.handlemousemove);
  }

  componentDidUpdate() {
    document.title = `you have clicked ${this.state.count} times`;
  }

  componentWillUnmount(){
    window.removeEventListener("mousemove", this.handlemousemove);
  }

  render() {
    const divStyle = {
      height: "50px",
      width: "50px",
      background: this.state.isOn ? "yellow" : "grey"
    };
    return (
      <div>
        <h2>Counter</h2>
        <button onClick={this.increment}>
          I was clicked {this.state.count} times!..
        </button>

        <h2>ToggleLight</h2>
        <div style={divStyle} onClick={this.toggleLight} />

        <h2>Mouse Position</h2>
        <p>Position x:{this.state.x}</p>
        <p>Position y:{this.state.y}</p>
      </div>
    );
  }
}

export default Appclass;
