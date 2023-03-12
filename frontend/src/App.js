import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { Component } from "react";
import NavBar from "./components/navbar/NavBar";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import PrivateRoutes from "./components/ProtectedRoutes";
import About from "./components/dashboard/DashBoard";
import auth from "./services/authService";

class App extends Component {
  state = {};
  async componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    return (
      <main
        style={{ paddingLeft: "0", paddingRight: "0" }}
        className="container-fluid"
      >
        <header>
          <NavBar user={this.state.user} />
        </header>

        <article>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<About />} path="/" />
            </Route>
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to={"/"} />} />
          </Routes>
        </article>
      </main>
    );
  }
}

export default App;
