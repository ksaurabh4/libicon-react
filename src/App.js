import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import Modal from "react-modal";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import Menu from "./components/Menu";
import NotFoundPage from "./components/NotFoundPage";
import Dashboard from "./components/Dashboard";
import Clients from "./components/Clients";
import Devices from "./components/Devices";
import Employee from "./components/Employee";
import Orders from "./components/Orders";
import ClientEdit from "./components/ClientEdit";

export default class App extends Component {
  state = { login: false };
  componentDidMount() {
    Modal.setAppElement("#modal");
    const token = JSON.parse(localStorage.getItem("data"));
    if (token) {
      this.setState({ login: true });
    }
  }
  render() {
    return this.state.login ? (
      <div>
        <Router history={history}>
          <Header />
          <Menu />
          <Switch>
            <div className="content-wrapper">
              <Route path="/" exact={true} component={Dashboard} />

              <Route exact={true} path="/clients" component={Clients} />
              {/* <Route path="/streams/new" exact component={StreamCreate} /> */}
              <Route path="/clients/edit/:id" component={ClientEdit} />

              <Route exact={true} path="/employee" component={Employee} />
              <Route exact={true} path="/orders" component={Orders} />
              <Route exact={true} path="/devices" component={Devices} />

              {/* <Route path="*" component={NotFoundPage} /> */}
            </div>
          </Switch>
        </Router>
        <Footer />
      </div>
    ) : (
      <Login />
    );
  }
}
