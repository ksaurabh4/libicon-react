import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  fetchUser,
  fetchAllEmployee,
  // fetchClientBySearch,
} from "../actions/index";
import { connect } from "react-redux";

class Clients extends Component {
  //state
  state = { pageNumber: 0 };

  //component did mount
  componentDidMount() {
    this.props.fetchAllEmployee(this.state.pageNumber);
  }
  // render Employee card
  renderEmployeeList = (array) => {
    console.log(array);
    return array.map((el) => {
      return (
        <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
          <div className="card bg-light">
            <div className="card-header text-muted border-bottom-0">
              {`${el.designation} (${el.empCode})`}{" "}
            </div>
            <div className="card-body pt-0">
              <div className="row">
                <div className="col-7">
                  <h2 className="lead">
                    <b>{el.name.toUpperCase()}</b>
                  </h2>
                  <p className="text-muted text-sm">
                    <b>Status: </b>{" "}
                    {el.status === "True" ? "Active" : "Deactivated"}{" "}
                  </p>
                </div>
                <div className="col-5 text-center">
                  <img
                    src="../../dist/img/profile.png"
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
                    Address: {el.address}
                  </li>
                  <li className="small mt-1">
                    <span className="fa-li">
                      <i className="fas fa-lg fa-envelope-open" />
                    </span>{" "}
                    Email : {el.email}
                  </li>
                  <li className="small mt-1">
                    <span className="fa-li">
                      <i className="fas fa-lg fa-phone" />
                    </span>{" "}
                    Phone #: {el.mobile1}
                  </li>
                  {/* <li className="small mt-1">
                    <span className="fa-li">
                      <i className="fas fa-lg fa-rupee-sign" />
                    </span>{" "}
                    GST #: {el.GST ? el.GST : "Not Available"}
                  </li> */}
                </ul>
              </div>
            </div>

            <div className="card-footer">
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
    if (this.props.employee.numEmployees > this.state.pageNumber) {
      this.props.fetchAllEmployee(this.state.pageNumber + 20);
      let newPageNumber = this.state.pageNumber;
      newPageNumber = newPageNumber + 20;
      this.setState({ pageNumber: newPageNumber });
    }
  };

  //previous button click handler

  previousButtonClickHandler = () => {
    if (this.state.pageNumber > 0) {
      this.props.fetchAllEmployee(this.state.pageNumber - 20);
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

  //main render function

  render() {
    return (
      <div>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Employee</h1>
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Employee</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}

        <section className="content">
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
                  {this.props.employee && this.props.employee.length > 0
                    ? `Showing 1 to ${this.props.employee.length} of
                  ${this.props.employee.numEmployees} entries`
                    : "No record found!"}
                </div>
              </div>
              <div className="col-12 col-md-6" style={{ textAlign: "right" }}>
                <div id="example1_filter" className="">
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
                {this.props.employee
                  ? this.renderEmployeeList(this.props.employee)
                  : ""}
              </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
              <nav aria-label="Contacts Page Navigation">
                <div className="pagination justify-content-center m-0">
                  <button
                    className="btn btn-success mr-2"
                    onClick={this.nextButtonClickHandler}
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

const mapStateToProps = (state) => {
  console.log(state.employee);
  return { employee: Object.values(state.employee) };
};

export default connect(mapStateToProps, {
  fetchAllEmployee,
  fetchUser,
})(Clients);
