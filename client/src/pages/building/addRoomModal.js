import React, { Component } from 'react';
import _ from 'lodash';
import client from '../../client';
import { Form, Button, Header, Image, Modal, Input, Dropdown } from 'semantic-ui-react';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

class AddRoomModal extends Component {
  state = {
    room_number: '',
    floor_id: null,
  }

  handleChange = (event, data) => {
    let room_number = this.state.room_number;
    room_number= +data.value;
    this.setState({room_number});
  }

  handleFloorChange = (event, data) => {
    console.log("event>>", event.target.value);
    console.log('data is >>>', data.value);
    this.setState({ floor_id: data.value });
  }

  handleSubmit = (event) => {
  event.preventDefault();
    console.log("this.props is>>>", this.props);
    const { params } = this.props;
    const building_id = +params.building_id;
    let newRoomData = _.assign({}, this.state, { building_id });
    console.log("newRoomData is>>>", newRoomData);

    return client.post(`${INFRA_MANAGER_HOST}/rooms/add`, newRoomData)
    .then(response => {
      console.log("response adding a room>>>", response);
    })
    .catch(err => {
      console.log("err adding a room>>>", err);
    })

  }
  render() {
    console.log("this.state.floors>>>", this.props.floors);
    const floorOptions = _.map(this.props.floors, floor => {
      return {
        key: `Floor ${floor.floor_number}`,
        value: floor.id,
        text: `Floor ${floor.floor_number}`,
      }
    })
    return (
      <Modal trigger={<Button>Add Room</Button>}>
        <Modal.Header>Add a Room </Modal.Header>
        <Modal.Content>
          <Modal.Description>
          <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Dropdown
                  placeholder='Select a floor'
                  options={floorOptions}
                  onChange={this.handleFloorChange}
                 />
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <label>Room Number</label>
                  <Input name='room_number' placeholder='Room Number' value={this.state.room_number} onChange={this.handleChange} />
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
export default AddRoomModal;