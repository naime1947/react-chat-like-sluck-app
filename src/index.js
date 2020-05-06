import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import "semantic-ui-css/semantic.min.css";
import firebase from "./firebase";

import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";

class Root extends React.Component {

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
        this.props.history.push("/");
    });
  }

  render() {
    return (
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
    );
  }
}

const RouteWithAuth = withRouter(Root);

ReactDOM.render(
  <Router>
    <RouteWithAuth/>
  </Router>,
  document.getElementById("root")
);
serviceWorker.unregister();

export default Root;

