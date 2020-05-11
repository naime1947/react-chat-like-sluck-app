import React, { Component } from "react";
import { Modal, Button, Form, Input, Icon } from "semantic-ui-react";

class FileModal extends Component {
  render() {
    const { modal, closeModal } = this.props;
    return (
      <Modal open={modal}>
        <Modal.Header>Upload Image File</Modal.Header>
        <Modal.Content>
          <Form>
            <Input fluid label="File tye jpg/png" name="file" type="file" />
          </Form>
        </Modal.Content>
        <Modal.Actions>
        <Button color="green" onClick={closeModal} inverted >
                <Icon name="checkmark "/>
              Send
          </Button>
        
          <Button color="red" onClick={closeModal} inverted >
              <Icon name ="remove"/>
              Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FileModal;
