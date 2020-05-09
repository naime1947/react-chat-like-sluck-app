import React, { Component } from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from "../../firebase";
import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm";

class Messages extends Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    currentUser:this.props.currentUser,
    currentChannel: this.props.currentChannel,
  };
  render() {
    const { messagesRef, currentChannel, currentUser } = this.state;
    return (
      <React.Fragment>
        <MessageHeader />
        <Segment>
          <Comment.Group className="messages"></Comment.Group>
        </Segment>
        <MessageForm
          messagesRef={messagesRef}
          currentChannel={currentChannel}
          currentUser = {currentUser}
        />
      </React.Fragment>
    );
  }
}
export default Messages;
