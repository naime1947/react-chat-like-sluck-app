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
import md5 from "md5";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref("users"),
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
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          createdUser
          .user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `https://www.gravatar.com/avatar/${md5(
                this.state.email
              )}?d=identicon`,
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                this.setState({
                  username: "",
                  email: "",
                  password: "",
                  passwordConfirmation: "",
                  loading: false,
                  errors:[]
                });
              });
            })
            .catch((error) => {
              console.log(error);
              this.setState({
                errors: this.state.errors.concat(error),
                loading: false,
              });
            });
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(error),
          });
        });
    }
  };

  saveUser = (createdUser) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFieldsEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    }
    return true;
  };

  isFieldsEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };
  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (passwordConfirmation !== password) {
      return false;
    }
    return true;
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
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading,
    } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" />
            Register to the Dev
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                type="text"
                value={username}
                onChange={this.handleChange}
                name="username"
                placeholder="User Name"
                icon="user"
                iconPosition="left"
              />
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
              <Form.Input
                fluid
                type="password"
                value={passwordConfirmation}
                onChange={this.handleChange}
                name="passwordConfirmation"
                placeholder="Confirm Password"
                icon="repeat"
                iconPosition="left"
                className={this.handleInputError(errors, "password")}
              />
            </Segment>
            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              size="large"
              color="orange"
              fluid
            >
              Submit
            </Button>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error !</h3>
              {this.displayError(errors)}
            </Message>
          )}
          <Message>
            Already a user? <Link to="/login">Login</Link>{" "}
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
