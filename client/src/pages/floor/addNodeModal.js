import React, { Component } from 'react';
import Promise from 'bluebird';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { Form, Button, Modal, Input, Dropdown } from 'semantic-ui-react';

class AddNodeModal extends Component {
  state = {
    node: {
      room_id: null,
    },
    modalOpen: false,
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  handleChange = (event, data) => {
    let node = this.state.node;
    node[data.name] = data.value;
    this.setState({node});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { cluster, addNodeConfig } = this.props;
    let node = this.state.node;
    let newNodeData = _.assign({}, node, { cluster_id: cluster.id});
    return Promise.resolve(addNodeConfig(newNodeData))
    .then(() => {
      this.handleClose();
      toast.info("🔔 Node successfully added");
    })

  }
  render() {
    const{ rooms } = this.props;
    const roomOptions = _.map(rooms, room => {
      return {
        key: `Room ${room.room_number}`,
        value: room.id,
        text: `Room ${room.room_number}`,
      }
    })
    return (
      <Modal
        style={{marginLeft: 'auto', marginRight: 'auto'}}
        trigger={<Button onClick={this.handleOpen}>Add Node</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Add a Node Config</Modal.Header>
        <Modal.Content>
          <Modal.Description>
          <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Field>
                  <label>Select a floor</label>
                  <Dropdown
                    placeholder='Select a Room'
                    value={this.state.node.room_id}
                    name='room_id'
                    options={roomOptions}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Node Name</label>
                  <Input name='name' placeholder='Name' value={this.state.node.name} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field>
                  <label>Status</label>
                  <Input name='status' placeholder='Status' value={this.state.node.status} onChange={this.handleChange} />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <label>Series Number</label>
                  <Input name='series_number' placeholder='Series Number' value={this.state.node.series_number} onChange={this.handleChange} />
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
export default AddNodeModal;