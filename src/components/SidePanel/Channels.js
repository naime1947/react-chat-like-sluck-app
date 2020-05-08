import React, { Component } from "react";
import {connect} from 'react-redux'
import firebase from "../../firebase";
import {setCurrentChannel} from '../../actions'
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

class Channels extends Component {
  state = {
    activeChannelId:'',
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    modal: false,
    channelRef: firebase.database().ref("chennels"),
    firstLoaded:true
  };
  componentDidMount(){
      this.addListener();
  }
  addListener = ()=>{
      const loadedChannels = [];
      this.state.channelRef.on('child_added', snap=>{
          loadedChannels.push(snap.val());
          this.setState({channels: loadedChannels});
          this.setFirstChannel();
      })
  }
  setFirstChannel = ()=>{
      const firstChannel = this.state.channels[0];
      if(this.state.firstLoaded && this.state.channels.length>0){
        this.props.setCurrentChannel(firstChannel);
      }

      this.setState({firstLoaded:false, activeChannelId: firstChannel.id})
  }
  changeChannel = channel=>{
    this.props.setCurrentChannel(channel);
    this.setActiveChannel(channel);
  }
  setActiveChannel = channel=>{
      this.setState({activeChannelId:channel.id});
  }
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

  displayChannels = channels => (
      channels.length && channels.map(channel=>(
          <Menu.Item
            key={channel.id}
            name={channel.name}
            onClick={()=> this.changeChannel(channel)}
            style = {{opacity:0.7}}
            active={this.state.activeChannelId === channel.id}
          >
              # {channel.name}
          </Menu.Item>
      ))
  )

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
          {this.displayChannels(channels)}
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
export default connect(null,{setCurrentChannel})(Channels);
