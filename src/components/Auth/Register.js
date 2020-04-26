import React, { Component } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
  Input
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class Register extends Component {
  handleChange = ()=>{

  }
  render() {
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="orange" textAlign="center" >
          <Icon name = "puzzle piece" />
          Register to the Dev
        </Header>
        <Form size="large" >
          <Segment stacked >
            <Form.Input fluid type="text" onChange={this.handleChange} name="username" placeholder="User Name" icon="user" iconPosition="left"/>
            <Form.Input fluid type="email" onChange={this.handleChange} name="email" placeholder="Email" icon="mail" iconPosition="left"/>
            <Form.Input fluid type="password" onChange={this.handleChange} name="password" placeholder="Password" icon="lock" iconPosition="left"/>
            <Form.Input fluid type="password" onChange={this.handleChange} name="passwordConfirmation" placeholder="Confirm Password" icon="repeat" iconPosition="left"/>
          </Segment>
          <Button size="large" color="orange" fluid >Submit</Button>
        </Form>
        <Message>Already a user? <Link to="/login" >Login</Link> </Message>
      </Grid.Column>
    </Grid>    
    );
  }
}

export default Register;
