import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import { Segment, Input, Button } from "semantic-ui-react";
import firebase from "../../firebase";
import FileModal from "./FileModal";
import ProgressBar from './ProgressBar'

class MessageForm extends Component {
  state = {
    uploadTask: null,
    uploadState: "",
    storageRef: firebase.storage().ref(),
    percentUploaded: 0,
    message: "",
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    loading: false,
    errors: [],
    modal: false,
  };

  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  sendMessage = () => {
    const { getMessagesRef } = this.props;
    const { message, channel } = this.state;
    console.log(channel);

    if (message) {
      this.setState({ loading: true });
      getMessagesRef()
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
    } else {
      this.setState({
        loading: false,
        errors: this.state.errors.concat({ message: "Add a message" }),
      });
    }
  };
  createMessage = (fileURL=null) => {
    const { user } = this.state;
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        name: user.displayName,
        avatar: user.photoURL,
        id: user.uid,
      },
    };

    if(fileURL!=null){
      message['image']=fileURL;
    }else{
      message['content']=this.state.message;
    }
    return message;
  };

  sendFileMessage = (fileURL, ref, pathToUpload)=>{
    ref.child(pathToUpload)
    .push()
    .set(this.createMessage(fileURL))
    .then(()=>{
      this.setState({
        uploadState: 'done'
      })
    })
    .catch(err=>{
      console.error(err);
      this.setState({
        errors:this.state.errors.concat(err)
      })
    })
  }

  getFilePath = ()=>{
    if(this.props.isPrivateChannel){
      return `chat/private-${this.state.channel.id}`
    }else{
      return `chat/public`
    }
  }

  uploadFile = (file, metadata) => {
    const pathToUpload = this.state.channel.id;
    const ref = this.props.getMessagesRef();
    const filePath = `${this.getFilePath()}/${uuidv4()}.jpeg`;
    this.setState(
      {
        uploadState: "uploading",
        uploadTask: this.state.storageRef.child(filePath).put(file, metadata),
      },
      () => {
        this.state.uploadTask.on(
          "state_changed",
          (snap) => {
            const percentUploaded = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
            this.setState({ percentUploaded });
          },
          (err) => {
            console.error(err);
            this.setState({
              errors: this.state.errors.concat(console.err),
              uploadState: "error",
              uploadTask: null,
            });
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then((downloadURL) => {
                this.sendFileMessage(downloadURL, ref, pathToUpload);
              })
              .catch((err) => {
                console.error(err);
                this.setState({
                  errors: this.state.errors.concat(console.err),
                  uploadState: "error",
                  uploadTask: null,
                });
              });
          }
        );
      }
    );
  };

  render() {
    const { loading, message, modal, uploadState, percentUploaded } = this.state;
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
          className={
            this.state.errors.some((error) => error.message.includes("message"))
              ? "error"
              : ""
          }
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
            disabled = {uploadState==='uploading'}
          />
        </Button.Group>
        <FileModal
            modal={modal}
            closeModal={this.closeModal}
            uploadFile={this.uploadFile}
          />
          <ProgressBar
            uploadState = {uploadState}
            percentUploaded = {percentUploaded}
          />
      </Segment>
    );
  }
}
export default MessageForm;
