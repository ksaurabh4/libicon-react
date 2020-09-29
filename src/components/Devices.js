import React, { Component } from "react";

export default class Devices extends Component {
  state = { devices: [], value: "", typingTimeout: 0 };

  addDeviceToState = (e) => {
    let text = e.target.value;
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    this.state.typingTimeout = setTimeout(() => {
      if (text.length > 0) {
        let newDevices = this.state.devices;
        newDevices.push(text + 1);
        this.setState({ devices: newDevices });
      }
    }, 500);
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
          type="text"
          onChange={(e) => this.addDeviceToState(e)}
          autoFocus={true}
        />
        {this.renderDeviceList()}
      </div>
    );
  }
}
