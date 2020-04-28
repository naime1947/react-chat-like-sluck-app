import React, { Component } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ loading: true, errors: [] });
      firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(createdUser => {
        console.log(createdUser);
        this.setState({loading:false});
      } )
      .catch(error => {
        console.log(error);
        this.setState({loading:false, errors:[...this.state.errors, error]});
      });
    }
  };

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFieldsEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } 
    return true;
  };

  isFieldsEmpty = ({ email, password }) => {
    return (
      !email.length ||
      !password.length
    );
  };
  

  //displayError = errors => errors.map((error, i)=> <p key={i}>{error.message}</p> )
  displayError = (errors) => {
    return errors.map((error, i) => {
      return <p key={i}>{error.message}</p>;
    });
  };

  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  render() {
    const {
      email,
      password,
      errors,
      loading,
    } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="code branch" />
            Login to the Dev Chat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              
              <Form.Input
                fluid
                type="email"
                value={email}
                onChange={this.handleChange}
                name="email"
                placeholder="Email"
                icon="mail"
                iconPosition="left"
                className={this.handleInputError(errors, "email")}
              />
              <Form.Input
                fluid
                type="password"
                value={password}
                onChange={this.handleChange}
                name="password"
                placeholder="Password"
                icon="lock"
                iconPosition="left"
                className={this.handleInputError(errors, "password")}
              />
              
            </Segment>
            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              size="large"
              color="violet"
              fluid
            >
              Login
            </Button>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error !</h3>
              {this.displayError(errors)}
            </Message>
          )}
          <Message>
            Don't have an account? <Link to="/register">Register</Link>{" "}
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
