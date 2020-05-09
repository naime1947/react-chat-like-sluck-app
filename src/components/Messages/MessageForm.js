import React, { Component } from "react";
import { Segment, Input, Button } from "semantic-ui-react";

class MessageForm extends Component {
  render() {
    return (
      <Segment className="message__form">
        <Input
          fluid
          style={{ marginBottom: "0.7em" }}
          label={<Button icon="add" />}
          labelPosition="left"
          placeholder="Write your message"
        />
        <Button.Group icon widths="2">
          <Button
            color="orange"
            content="Add Replay"
            labelPosition="left"
            icon="edit"
          />
          <Button
            color="teal"
            labelPosition="right"
            content="Upload Media"
            icon = "cloud upload"
          />
        </Button.Group>
      </Segment>
    );
  }
}
export default MessageForm;
