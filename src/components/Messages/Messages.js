import React, { Component } from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from "../../firebase";
import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm";
import Message from './Message'

class Messages extends Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    currentUser:this.props.currentUser,
    currentChannel: this.props.currentChannel,
    messages:[],
    loadingMessages:true
  };
  componentDidMount(){
    const {currentChannel, currentUser} = this.state;
    if(currentUser && currentChannel){
        this.addMessageListener(currentChannel.id);  
    }
  }
  addMessageListener = currentChannelId =>{
      const loadedMessages = [];
      this.state.messagesRef.child(currentChannelId).on('child_added', snap=>{
          loadedMessages.push(snap.val());
          this.setState({
            messages:loadedMessages,
            loadingMessages:false
          })
      });
      

  }

  displayMessages = messages=>(
      messages.length>0 && messages.map(message=>(
          <Message
            key={message.timestamp}
            message={message}
            user={this.state.currentUser}
          />
      ))
  )
displayChannelName = channel => channel ? `#${channel.name}`:'';
  render() {
    const { messagesRef, currentChannel, currentUser, messages } = this.state;
    return (
      <React.Fragment>
        <MessageHeader
          channelName = {this.displayChannelName(currentChannel)}
        />
        <Segment>
          <Comment.Group className="messages">
              {this.displayMessages(messages)}
          </Comment.Group>
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
