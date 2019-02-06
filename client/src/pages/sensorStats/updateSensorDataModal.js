import React, { Component } from 'react';
import client from '../../client';
import { Form, Button, Modal, Input, Icon } from 'semantic-ui-react';

import {
  DATA_MANAGER_HOST
} from '../../api-config';

class UpdateSensorDataModal extends Component {
  state = {
    sensorData: this.props.sensorData,
  }

  handleChange = (event, data) => {

    let sensorData = this.state.sensorData;
    sensorData[data.name] = data.value;
    this.setState({sensorData});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    return client.put(`${DATA_MANAGER_HOST}/sensor_data/${this.state.sensorData._id}`, this.state.sensorData);
  }
  render() {
    return (
      <Modal
        trigger={<Icon name="edit" />}
        style={{marginLeft: 'auto', marginRight: 'auto'}}
      >
        <Modal.Header>Update a Sensor Data</Modal.Header>
        <Modal.Content>
          <Modal.Description>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Field>
                <label>Data</label>
                <Input name='data' placeholder='Data' value={this.state.sensorData.data} onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <label>Unit</label>
                <Input name='unit' placeholder='Unit' value={this.state.sensorData.unit} onChange={this.handleChange} />
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
export default UpdateSensorDataModal;