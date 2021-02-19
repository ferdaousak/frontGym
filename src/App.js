import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Table } from 'react-bootstrap';

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import TrainerGyms from "./components/trainer.gyms.component";
import GymPage from "./components/gym.page.component";
import AllGyms from "./components/user.gyms.component"

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showTrainerBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showTrainerBoard: user.roles.includes("ROLE_TRAINER"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showTrainerBoard, showAdminBoard } = this.state;
    return (
      <>
      <Router>
          <Navbar className="color-nav" variant="light">
            <Link to={"/"} className="navbar-brand link" style={{color:"white"}}>
              GYM WITH ME
            </Link>
            <Nav className="mr-auto">
              <Link to={"/home"} className="nav-link link" style={{color:"white"}}>
                Home
              </Link>
              {showTrainerBoard && (
                <>
                  <li className="nav-item">
                  <Link to={"/gyms"} className="nav-link link" style={{color:"white"}}>
                    Trainer's Gyms
                  </Link>
                  </li>
              </>
              )}
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link link" style={{color:"white"}}>
                    Admin Board
                </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/allgyms"} className="nav-link link" style={{color:"white"}}>
                    Browse Gyms
                </Link>
                </li>
              )}

            </Nav>
            <Nav>
              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link link" style={{color:"white"}}>
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link link" style={{color:"white"}} onClick={this.logOut}>
                      LogOut
                </a>
                  </li>
                </div>
              ) : (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Login
                </Link>
                    </li>

                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link">
                        Sign Up
                </Link>
                    </li>
                  </div>
                )}
            </Nav>
          </Navbar>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/allgyms" component={AllGyms} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/gyms" component={TrainerGyms} />
              <Route path="/gym" component={GymPage} />

            </Switch>
          </div>
      </Router>
    </>
    );
  }
}

export default App;