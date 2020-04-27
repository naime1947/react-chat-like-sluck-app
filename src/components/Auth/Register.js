import React, { Component } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
  Input,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors:[]
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          console.log(createdUser);
        })
        .catch((error) => {
          console.error(error);
        });

      this.setState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      });
    }
  };
  isFormValid = ()=>{
    let errors = [];
    let error;
    if(this.isFieldsEmpty(this.state)){
      error = {message:"Fill in all fields"};
      this.setState({errors:errors.concat(error)});
      return false;
    }
    else if(!this.isPasswordValid(this.state)){
      error = {message:"Password is invalid"};
      this.setState({errors:errors.concat(error)});
      return false;
    }
    return true;
  }

  isFieldsEmpty = ({username, email, password, passwordConfirmation})=>{
    return (!username.length || !email.length || !password.length || !passwordConfirmation.length);
  }
  isPasswordValid = ({password, passwordConfirmation})=>{
    if(password.length<6 || passwordConfirmation.length<6){
      return false;
    }else if(passwordConfirmation!==password){
      return false;
    }
    return true;
  }

  displayError = errors => errors.map((error, i)=> <p key={i}>{error.message}</p> ) 

  render() {
    const { username, email, password, passwordConfirmation, errors } = this.state;
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
              />
            </Segment>
            <Button size="large" color="orange" fluid>
              Submit
            </Button>
          </Form>
          {errors.length>0 && (
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
