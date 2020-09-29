import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  fetchUser,
  fetchAllClient,
  fetchClientBySearch,
  fetchClientByClid,
} from "../actions/index";
import { connect } from "react-redux";
import Modal from "react-modal";

class Clients extends Component {
  //state
  state = { pageNumber: 0, isVisible: false };

  //component did mount
  componentDidMount() {
    this.props.fetchAllClient(this.state.pageNumber);
    Modal.setAppElement("#modal");
  }

  //render Modal

  renderModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  //Edit button click handler

  editButtonClickHandler = (e) => {
    // this.props.fetchClientByClid();
    console.log(e.target.parentNode.parentNode.parentNode.parentNode);
  };

  // render client card
  renderClientList = (array) => {
    return array.map((el) => {
      return (
        <div
          key={el.CLID}
          CLID={el.CLID}
          className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch"
          style={{ width: "auto" }}
        >
          <div className="card bg-light">
            <div className="card-header text-muted border-bottom-0">
              {`${el.CompanyName} (${el.ClientID})`}{" "}
            </div>
            <div className="card-body pt-0">
              <div className="row">
                <div className="col-7">
                  <h2 className="lead">
                    <b>
                      {el.ContactPerson
                        ? el.ContactPerson.toUpperCase()
                        : "UNKNOWN"}
                    </b>
                  </h2>
                  {/* <p className="text-muted text-sm">
                    <b>Role: </b> {el.ClientRole}{" "}
                  </p> */}
                  <p className="text-muted text-sm mt-1">
                    <b>Account Manager: </b> {el.AccountManager}{" "}
                  </p>
                </div>
                <div className="col-5 text-center">
                  <img
                    src="../../dist/img/user1-128x128.png"
                    alt
                    className="img-circle img-fluid bg-gradient-primary"
                  />
                </div>
              </div>
              <div className="row">
                <ul className="ml-4 mb-0 fa-ul text-muted">
                  <li className="small mt-2">
                    <span className="fa-li">
                      <i className="fas fa-lg fa-building" />
                    </span>{" "}
                    Address: {el.Address}
                  </li>
                  <li className="small mt-1">
                    <span className="fa-li">
                      <i className="fas fa-lg fa-envelope-open" />
                    </span>{" "}
                    Email : {el.Email}
                  </li>
                  <li className="small mt-1">
                    <span className="fa-li">
                      <i className="fas fa-lg fa-phone" />
                    </span>{" "}
                    Phone #: {el.Mobile}
                  </li>
                  <li className="small mt-1">
                    <span className="fa-li">
                      <i className="fas fa-lg fa-rupee-sign" />
                    </span>{" "}
                    GST #: {el.GST ? el.GST : "Not Available"}
                  </li>
                </ul>
              </div>
            </div>

            <div className="card-footer">
              {/* <div className="text-left"></div> */}
              <div className="text-right">
                <Link
                  to={`/clients/edit/${el.CLID}`}
                  className="btn btn-sm btn-secondary"
                  style={{ marginRight: "5px" }}
                >
                  <i className="fas fa-cogs" /> Edit
                </Link>
                <a
                  href="#"
                  className="btn btn-sm bg-teal"
                  style={{ marginRight: "5px" }}
                >
                  <i className="fas fa-file-signature" /> Notes
                </a>
                <a href="#" className="btn btn-sm btn-primary">
                  <i className="fas fa-user" /> View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  //next button click handler

  nextButtonClickHandler = () => {
    if (this.props.client.numClients - 20 > this.state.pageNumber) {
      this.props.fetchAllClient(this.state.pageNumber + 20);
      let newPageNumber = this.state.pageNumber;
      newPageNumber = newPageNumber + 20;
      this.setState({ pageNumber: newPageNumber });
    }
  };

  //previous button click handler

  previousButtonClickHandler = () => {
    if (this.state.pageNumber > 0) {
      this.props.fetchAllClient(this.state.pageNumber - 20);
      let newPageNumber = this.state.pageNumber;
      newPageNumber = newPageNumber - 20;
      this.setState({ pageNumber: newPageNumber });
    }
  };

  //search on change click handler
  SearchBoxChangeHandler = (e) => {
    this.props.fetchClientBySearch(e.target.value);
    console.log(e.target.value);
  };

  //cards

  renderCards = () => {
    return (
      <div>
        <div className="row ml-2 mr-2">
          <div className="col-lg-3 col-6">
            {/* small card */}
            <div className="small-box bg-info">
              <div className="inner">
                <h3>{this.props.client.numClients}</h3>
                <p>Total Clients</p>
              </div>
              <div className="icon">
                <i className="fas fa-shopping-cart" />
              </div>
              <a href="#" className="small-box-footer">
                More info <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small card */}
            <div className="small-box bg-success">
              <div className="inner">
                <h3>
                  {this.props.client.client
                    ? this.props.client.client.filter((el) => {
                        return el.ClientRole === "Dealer";
                      }).length
                    : "NA"}
                </h3>
                <p>Dealers</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars" />
              </div>
              <a href="#" className="small-box-footer">
                More info <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small card */}
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>
                  {this.props.client.client
                    ? this.props.client.client.filter((el) => {
                        return el.ClientRole === "User";
                      }).length
                    : "NA"}
                </h3>
                <p>End Users</p>
              </div>
              <div className="icon">
                <i className="fas fa-user-plus" />
              </div>
              <a href="#" className="small-box-footer">
                More info <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small card */}
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>
                  {this.props.client.client
                    ? this.props.client.client.filter((el) => {
                        return el.Status.toUpperCase() === "TRUE";
                      }).length
                    : "NA"}
                </h3>
                <p>Active Clients</p>
              </div>
              <div className="icon">
                <i className="fas fa-chart-pie" />
              </div>
              <a href="#" className="small-box-footer">
                More info <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </div>
          {/* ./col */}
        </div>
      </div>
    );
  };

  //main render function

  render() {
    return (
      <div>
        <Modal isOpen={this.state.isVisible} onRequestClose={this.renderModal}>
          value
        </Modal>
        ;
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Clients</h1>
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Clients</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          {this.renderCards()}
          {/* Default box */}
          <div className="card card-solid">
            <div
              className="row"
              style={{ padding: "20px", alignItems: "center" }}
            >
              <div className="col-12 col-md-6">
                <div
                  className="dataTables_info"
                  id="example1_info"
                  role="status"
                  aria-live="polite"
                >
                  {this.props.client.client &&
                  this.props.client.client.length > 0
                    ? `Showing ${this.state.pageNumber + 1} to ${
                        this.state.pageNumber + this.props.client.client.length
                      } of
                  ${this.props.client.numClients} entries`
                    : "No record found!"}
                </div>
              </div>
              <div className="col-12 col-md-6" style={{ textAlign: "right" }}>
                <div id="example1_filter " className="">
                  {/* <form className="form-inline ml-3">
                    <div className="input-group input-group-sm">
                      <input
                        className="form-control form-control-navbar"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        autoComplete="off"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-navbar" type="submit">
                          <i className="fas fa-search" />
                        </button>
                      </div>
                    </div>
                  </form> */}

                  <label
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      marginBottom: "0",
                    }}
                  >
                    <span style={{ marginRight: "4px", fontWeight: "normal" }}>
                      {"Search: "}{" "}
                    </span>

                    <input
                      onChange={this.SearchBoxChangeHandler}
                      type="search"
                      className="form-control form-control-sm"
                      placeholder
                      aria-controls="example1"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="card-body pb-0">
              <div className="row d-flex align-items-stretch">
                {this.props.client.client
                  ? this.renderClientList(this.props.client.client)
                  : ""}
              </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
              <nav aria-label="Contacts Page Navigation">
                <div className="pagination justify-content-center m-0">
                  <button
                    className="btn btn-success mr-2"
                    onClick={this.previousButtonClickHandler}
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={this.nextButtonClickHandler}
                  >
                    Next
                  </button>
                </div>
              </nav>
            </div>
            {/* /.card-footer */}
          </div>
          {/* /.card */}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return { client: state.client };
};

export default connect(mapStateToProps, {
  fetchAllClient,
  fetchUser,
  fetchClientBySearch,
  fetchClientByClid,
})(Clients);
