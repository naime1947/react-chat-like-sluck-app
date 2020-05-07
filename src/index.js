import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import "semantic-ui-css/semantic.min.css";
import firebase from "./firebase";
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducier from './reducers/index';



const store = createStore(rootReducier, composeWithDevTools());


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
  <Provider store = {store}>
  <Router>
    <RouteWithAuth/>
  </Router>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();

export default Root;

