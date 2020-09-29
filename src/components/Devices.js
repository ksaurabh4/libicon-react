import React, { Component, createRef } from "react";

export default class Devices extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  state = { devices: [], value: "", typingTimeout: 0 };

  componentDidUpdate() {
    const node = this.myRef.current;
    node.value = "";
  }

  addDeviceToState = (e) => {
    let text = e.target.value;
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    this.state.typingTimeout = setTimeout(() => {
      if (text.length > 0) {
        let newDevices = this.state.devices;
        newDevices.push(text);
        this.setState({ devices: newDevices });
      }
    }, 100);
  };
  renderDeviceList = () => {
    if (this.state.devices.length > 0) {
      return this.state.devices.map((el) => {
        return <div>{el}</div>;
      });
    }
  };
  render() {
    return (
      <div>
        <input
          ref={this.myRef}
          type="text"
          onChange={(e) => this.addDeviceToState(e)}
          autoFocus={true}
        />
        {this.renderDeviceList()}
      </div>
    );
  }
}
