import React, { Component } from 'react';
import Promise from 'bluebird';
import { toast } from 'react-toastify';
import { Form, Button, Modal, Input, Icon } from 'semantic-ui-react';

class UpdateNodeModal extends Component {
  state = {
    node: this.props.node,
    modalOpen: false,
  }
  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  handleChange = (event, data) => {
    console.log("data is>>>", data);

    let node = this.state.node;
    node[data.name] = data.value;
    this.setState({node});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { updateNodeConfig } = this.props;
    return Promise.resolve(updateNodeConfig(this.props.node.id, this.state.node))
    .then(() => {
      this.handleClose();
      toast.info("🔔 Node successfully updated");
    })
  }
  render() {
    return (
      <Modal
        style={{marginLeft: 'auto', marginRight: 'auto'}}
        trigger={<Icon name="edit" onClick={this.handleOpen} />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Update a Node Config</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Field>
                  <label>Node Name</label>
                  <Input name='name' placeholder='Name' value={this.state.node.name} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field>
                  <label>Status</label>
                  <Input name='status' placeholder='Status' value={this.state.node.status} onChange={this.handleChange} />
                </Form.Field>
              </Form.Group>
              <Form.Field control={Button}>Submit</Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
export default UpdateNodeModal;