import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fetchUser, fetchClientByClid } from "../actions/index";
import { connect } from "react-redux";

class ClientEdit extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.fetchClientByClid(this.props.match.params.id);
  }
  render() {
    return <div>Edit</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return { client: state.client };
};

export default connect(mapStateToProps, {
  fetchUser,
  fetchClientByClid,
})(ClientEdit);
