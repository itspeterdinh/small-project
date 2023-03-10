import { Component } from "react";
import NavBar from "./components/navbar/NavBar";

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
      </main>
    );
  }
}

export default App;
