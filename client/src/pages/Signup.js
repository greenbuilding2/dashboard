import React, { Component } from 'react';
import { Link } from 'react-router';
import { Container, Grid, Button, Form, Segment, Header, Message, Dropdown } from 'semantic-ui-react';
import client from '../client';
import qs from 'qs';

import Auth from '../modules/Auth';

import {
  AUTH_HOST,
} from '../api-config';

class Signup extends Component {
  state = {
    email:'',
    password: '',
    name: '',
    user_type:'',
  }

  handleChange = (event, data) => {
    this.setState({[data.name]: data.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      user_type: this.state.user_type,
    }

    return client({
      method: 'post',
      url: `${AUTH_HOST}/auth/signup`,
      data: qs.stringify(requestBody),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => {
      const { token, user } = response.data;
      Auth.authenticateUser(token, user.user_type );
      this.props.router.replace('/');
    })
  }

  render() {
    const options = [
      {
        key: "Admin",
        value: "admin",
        text: "Admin",
      },
      {
        key: "Infrastructure Manager",
        value: "infra",
        text: "Infrastructure Manager",
      },
      {
        key: "Maintenance People",
        value: "maintenance",
        text: "Maintenance People",
      },
      {
        key: "Client",
        value: "client",
        text: "Client",
      },
    ];
    return (
      <Container>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Sign up with an account
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='mail'
                  iconPosition='left'
                  label='Email'
                  name='email'
                  value={this.state.email}
                  placeholder='Email'
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  name='password'
                  type='password'
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='address card'
                  iconPosition='left'
                  name='name'
                  placeholder='Name'
                  onChange={this.handleChange}
                />
                <Form.Field>
                <Dropdown
                  placeholder='User Type'
                  value={this.state.user_type}
                  name='user_type'
                  options={options}
                  onChange={this.handleChange}
                />
                </Form.Field>
                <Button type="submit" color='teal' fluid size='large'>
                  Signup
                </Button>
              </Segment>
            </Form>
            <Message>
              Already Have an Account?  <Link to="/login">Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Signup;
