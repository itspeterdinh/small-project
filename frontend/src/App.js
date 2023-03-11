import { Routes, Route, Navigate } from "react-router-dom";
import React, { Component } from "react";
import NavBar from "./component/navbar/navbar";
import Login from "./component/login/Login";
import PrivateRoutes from "./component/ProtectedRoutes";
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
              <Route path="/" element={<Navigate to={"/"} />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to={"/"} />} />
          </Routes>
        </article>
      </main>
    );
  }
}

export default App;
