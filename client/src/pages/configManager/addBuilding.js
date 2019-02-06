import React, { Component } from 'react';
import client from '../../client';
import { Container, Form, Input, Button, Dropdown } from 'semantic-ui-react';

import {
  INFRA_MANAGER_HOST
} from '../../api-config';

const stateOptions = [
  { key: 'AK', text: 'AK', value: 'AK' },
  { key: 'AL', text: 'AL', value: 'AL' },
  { key: 'AZ', text: 'AZ', value: 'AZ' },
  { key: 'CA', text: 'CA', value: 'CA' },
  { key: 'CO', text: 'CO', value: 'CO' },
  { key: 'CT', text: 'CT', value: 'CT' },
  { key: 'DE', text: 'DE', value: 'DE' },
  { key: 'FL', text: 'FL', value: 'FL' },
  { key: 'GA', text: 'GA', value: 'GA' },
  { key: 'HI', text: 'HI', value: 'HI' },
  { key: 'IA', text: 'IA', value: 'IA' },
  { key: 'ID', text: 'ID', value: 'ID' },
  { key: 'IL', text: 'IL', value: 'IL' },
  { key: 'IN', text: 'IN', value: 'IN' },
  { key: 'KS', text: 'KS', value: 'KS' },
  { key: 'KY', text: 'KY', value: 'KY' },
  { key: 'LA', text: 'LA', value: 'LA' },
  { key: 'MA', text: 'MA', value: 'MA' },
  { key: 'MD', text: 'MD', value: 'MD' },
  { key: 'ME', text: 'ME', value: 'ME' },
  { key: 'MI', text: 'MI', value: 'MI' },
  { key: 'MO', text: 'MO', value: 'MO' },
  { key: 'MN', text: 'MN', value: 'MN' },
  { key: 'MS', text: 'MS', value: 'MS' },
  { key: 'MT', text: 'MT', value: 'MT' },
  { key: 'NC', text: 'NC', value: 'NC' },
  { key: 'NE', text: 'NE', value: 'NE' },
  { key: 'ND', text: 'ND', value: 'ND' },
  { key: 'NH', text: 'NH', value: 'NH' },
  { key: 'NJ', text: 'NJ', value: 'NJ' },
  { key: 'NM', text: 'NM', value: 'NM' },
  { key: 'NV', text: 'NV', value: 'NV' },
  { key: 'NY', text: 'NY', value: 'NY' },
  { key: 'OH', text: 'OH', value: 'OH' },
  { key: 'OK', text: 'OK', value: 'OK' },
  { key: 'OR', text: 'OR', value: 'OR' },
  { key: 'PA', text: 'PA', value: 'PA' },
  { key: 'RI', text: 'RI', value: 'RI' },
  { key: 'SC', text: 'SC', value: 'SC' },
  { key: 'SD', text: 'SD', value: 'SD' },
  { key: 'TN', text: 'TN', value: 'TN' },
  { key: 'TX', text: 'TX', value: 'TX' },
  { key: 'UT', text: 'UT', value: 'UT' },
  { key: 'VA', text: 'VA', value: 'VA' },
  { key: 'VT', text: 'VT', value: 'VT' },
  { key: 'WA', text: 'WA', value: 'WA' },
  { key: 'WI', text: 'WI', value: 'WI' },
  { key: 'WV', text: 'WV', value: 'WV' },
  { key: 'WY', text: 'WY', value: 'WY' },
];

class AddBuilding extends Component {
  state = {
    address: '',
    city: '',
    state: undefined,
    zipcode: '',
    longitude: '',
    latitude: '',
  }

  handleChange = (event, data) => {
    console.log("data is >>>", data);
    this.setState({[data.name]: data.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    return client.post(`${INFRA_MANAGER_HOST}/buildings/add`, {
      data: {
        address: `${this.state.address}, ${this.state.city}, ${this.state.state} ${this.state.zipcode}`,
        latitude:  +this.state.latitude,
        longitude: +this.state.longitude,
      },
    })
    .then(response => {
      console.log("response from adding a building is >>>", response);
    })
    .catch(err => {
      console.log("err from adding the building is >>", err);
    })
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Address</label>
              <Input name='address' value={this.state.address} placeholder='Address' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <Input name='city' value={this.state.city} placeholder='City' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>State</label>
              <Dropdown
                  name='state'
                  placeholder='State'
                  value={this.state.state}
                  options={stateOptions}
                  onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Zipcode</label>
              <Input name='zipcode' value={this.state.zipcode} placeholder='Zipcode' onChange={this.handleChange} />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Latitude</label>
              <Input name='latitude' value={this.state.latitude} placeholder='Latitude' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Longitude</label>
              <Input name='longitude' value={this.state.longitude} placeholder='Longitude' onChange={this.handleChange} />
            </Form.Field>
          </Form.Group>
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
      </Container>
    )
  }
}

export default AddBuilding;