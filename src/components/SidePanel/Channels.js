import React, { Component } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

class Channels extends Component {
  state = {
    channels: [],
    modal: false,
  };
  handleChange = event=>{
      this.setState({
          [event.target.name]: event.target.value
      })
  }
  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });
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
            <Icon style={{cursor:'pointer'}} onClick={this.openModal} name="add" />
          </Menu.Item>
        </Menu.Menu>

        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a channel</Modal.Header>
          <Modal.Content>
            <Form>
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
              <Button color='green' inverted >
                  <Icon  name='checkmark' /> Add
              </Button>
              <Button color='red' inverted onClick={this.closeModal} >
                  <Icon  name='remove' /> Cancel
              </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}
export default Channels;
