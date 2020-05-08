import React, { Component } from "react";
import firebase from "../../firebase";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

class Channels extends Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    modal: false,
    channelRef: firebase.database().ref("chennels"),
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };
  isFormValid = ({ channelName, channelDetails }) => {
    return channelName && channelDetails;
  };

  addChannel = () => {
    const { channelRef, channelName, channelDetails, user } = this.state;
    const key = channelRef.push().key;
    const newChennel = {
      name: channelName,
      details: channelDetails,
      id: key,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL,
      },
    };

    channelRef
      .child(key)
      .update(newChennel)
      .then(() => {
          this.setState({chennelName:'', chennelDetails:''});
          this.closeModal();
        console.log("channel update");
      })
      .catch(error=>{
          console.error(error);
      })
  };

  render() {
    const { channels, modal } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu>
          <Menu.Item>
            <span>
              {" "}
              <Icon name="exchange" /> CHANNELS ({channels.length})
            </span>
            <Icon
              style={{ cursor: "pointer" }}
              onClick={this.openModal}
              name="add"
            />
          </Menu.Item>
        </Menu.Menu>

        <Modal size="tiny" basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of the chaneel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About channel details"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleSubmit} color="green" inverted>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}
export default Channels;
