import React, { Component } from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from "../../firebase";
import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";
import { connect } from "react-redux";

class Messages extends Component {
  state = {
    privateChannel: this.props.isPrivateChannel,
    messagesRef: firebase.database().ref("messages"),
    privateMessagesRef: firebase.database().ref("privateMessages"),
    currentUser: this.props.currentUser,
    currentChannel: this.props.currentChannel,
    numUniqueUsers: "",
    messages: [],
    loadingMessages: true,
    searchTerm:'',
    searchLoading: false,
    searchResults:[]
  };
  componentDidMount() {
    const { currentChannel, currentUser } = this.state;
    if (currentUser && currentChannel) {
      this.addMessageListener(currentChannel.id);
    }
  }
  addMessageListener = (currentChannelId) => {
    const loadedMessages = [];
    const ref = this.getMessagesRef();
    ref.child(currentChannelId).on("child_added", (snap) => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        loadingMessages: false,
      });
      this.countUniqueUsers(loadedMessages);
    });
  };

  getMessagesRef = ()=>{
    const {messagesRef, privateMessagesRef, privateChannel}= this.state;
    return privateChannel ? privateMessagesRef : messagesRef;
  }

  countUniqueUsers = (messages) => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
    const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : ""}`;
    this.setState({ numUniqueUsers: numUniqueUsers });
  };

  displayMessages = (messages) =>
    messages.length > 0 &&
    messages.map((message) => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.currentUser}
      />
    ));

  handleSearchChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
      searchLoading: true,
    }, this.handleSearchMessages());
  };

  handleSearchMessages = ()=>{
    const channelMessages = [...this.state.messages];
    const regex = new RegExp(this.state.searchTerm, 'gi');
    const searchResults = channelMessages.reduce((acc, msg)=>{
      if(msg.content && (msg.content.match(regex) || msg.user.name.match(regex))){
        acc.push(msg);
      }
      return acc;

    }, []);

    this.setState({
      searchResults: searchResults
    });

    setTimeout(() => {
      this.setState({searchLoading:false})
    }, 1000);
  }

  displayChannelName = (channel) => {
    return channel? `${this.state.privateChannel ? '@': '#'}${channel.name}`:'';
  }
  render() {
    const {
      messagesRef,
      currentChannel,
      currentUser,
      messages,
      numUniqueUsers,
      searchTerm,
      searchResults,
      searchLoading,
      privateChannel
    } = this.state;
    return (
      <React.Fragment>
        <MessageHeader
          channelName={this.displayChannelName(currentChannel)}
          numUniqueUsers={numUniqueUsers}
          handleSearchChange={this.handleSearchChange}
          searchLoading = {searchLoading}
          isPrivateChannel = {privateChannel}
        />
        <Segment>
          <Comment.Group className="messages">
            { searchTerm? this.displayMessages(searchResults) : this.displayMessages(messages)}
          </Comment.Group>
        </Segment>
        <MessageForm
          messagesRef={messagesRef}
          currentChannel={currentChannel}
          currentUser={currentUser}
          isPrivateChannel = {privateChannel}
          getMessagesRef = {this.getMessagesRef}
        />
      </React.Fragment>
    );
  }
}
export default Messages;
