import React, { Component } from 'react';
import _ from 'lodash';
import Promise from 'bluebird';
import { toast } from 'react-toastify';
import { Form, Button, Modal, Input, Icon } from 'semantic-ui-react';


class AddClusterModal extends Component {
  state = {
    cluster: {},
    modalOpen: false,
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = (event, data) => {
    let cluster = this.state.cluster;
    cluster[data.name] = data.value;
    this.setState({cluster});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { params, floor, addClusterConfig } = this.props;
    const building_id = +params.building_id;
    let cluster = this.state.cluster;
    let newClusterData = _.assign({}, cluster, { building_id, floor_id: floor.id });
    return Promise.resolve(addClusterConfig(newClusterData))
    .then(() => {
      this.handleClose();
      toast.info("🔔 Cluster successfully added");
    })
  }
  render() {
    return (
      <Modal
        style={{marginLeft: 'auto', marginRight: 'auto'}}
        trigger={<Icon name="add" onClick={this.handleOpen} />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Add a Cluster Config</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Field>
                    <label>Cluster Name</label>
                    <Input name='name' placeholder='Name' value={this.state.cluster.name} onChange={this.handleChange} />
                  </Form.Field>
                  <Form.Field>
                    <label>Status</label>
                    <Input name='status' placeholder='Status' value={this.state.cluster.status} onChange={this.handleChange} />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <label>Series Number</label>
                    <Input name='series_number' placeholder='Series Number' value={this.state.cluster.series_number} onChange={this.handleChange} />
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
export default AddClusterModal;