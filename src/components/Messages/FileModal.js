import React, { Component } from "react";
import { Modal, Button, Form, Input, Icon } from "semantic-ui-react";
import mime from 'mime-types'

class FileModal extends Component {
  state = {
    file:null,
    authorized: ['image/jpeg', 'image/png']
  }

  addFile = event =>{
    const file = event.target.files[0];
    if(file!=null){
      this.setState({file:file});
    }
  }
  sendFile = ()=>{
    const {file} = this.state;
    const {uploadFile, closeModal}=this.props;
    if(file!=null){
      if(this.isAuthorized(file.name)){
        const metadata = {contentType: mime.lookup(file.name)};
        uploadFile(file, metadata);
        closeModal();
        this.clearFile();
      }
    }
  }
  isAuthorized = fileName => this.state.authorized.includes(mime.lookup(fileName));
  clearFile = ()=>{
    this.setState({file:null});
  }
  

  render() {
    const { modal, closeModal } = this.props;
    return (
      <Modal open={modal}>
        <Modal.Header>Upload Image File</Modal.Header>
        <Modal.Content>
          <Form>
            <Input onChange={this.addFile} fluid label="File tye jpg/png" name="file" type="file" />
          </Form>
        </Modal.Content>
        <Modal.Actions>
        <Button color="green" onClick={this.sendFile} inverted >
                <Icon name="checkmark"/>
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
