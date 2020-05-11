import React, { Component } from "react";
import { Segment, Input, Button } from "semantic-ui-react";
import firebase from "../../firebase";
import FileModal from './FileModal';

class MessageForm extends Component {
  state = {
    message: "",
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    loading: false,
    errors: [],
    modal:false
  };

  openModal = ()=> this.setState({modal:true});
  closeModal = ()=> this.setState({modal:false});

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  sendMessage = () => {
    const { messagesRef } = this.props;
    const { message, channel } = this.state;
    console.log(channel);

    if (message) {
      this.setState({ loading: true });
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({
            loading: false,
            message: "",
            errors: [],
          });
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(error),
          });
        });
    }else{
      this.setState({
        loading:false,
        errors:this.state.errors.concat({message:'Add a message'})
      })
    }
  };
  createMessage = () => {
    const { user } = this.state;
    const message = {
      content: this.state.message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        name: user.displayName,
        avatar: user.photoURL,
        id: user.uid,
      },
    };
    return message;
  };

  render() {
    const {loading, message, modal} = this.state;
    return (
      <Segment className="message__form">
        <Input
          name="message"
          fluid
          value={message}
          style={{ marginBottom: "0.7em" }}
          label={<Button icon="add" />}
          labelPosition="left"
          placeholder="Write your message"
          onChange={this.handleChange}
          className={this.state.errors.some(error=> error.message.includes('message'))? 'error':''}
        />
        <Button.Group icon widths="2">
          <Button
            color="orange"
            content="Add Replay"
            labelPosition="left"
            icon="edit"
            onClick={this.sendMessage}
            disabled={loading}
          />
          <Button
            color="teal"
            labelPosition="right"
            content="Upload Media"
            icon="cloud upload"
            onClick={this.openModal}
          />
          <FileModal
            modal = {modal}
            closeModal = {this.closeModal}
          />
        </Button.Group>
      </Segment>
    );
  }
}
export default MessageForm;
