import React, { Component } from 'react';
import { Link } from 'react-router';
import { Container, Grid, Button, Form, Segment, Header, Message } from 'semantic-ui-react';
import client from '../client';
import qs from 'qs';

import Auth from '../modules/Auth';

import {
  AUTH_HOST,
} from '../api-config';

class Login extends Component {
  state = {
    email:'',
    password: '',
  }

  handleChange = (event, data) => {
    this.setState({[data.name]: data.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
      email: this.state.email,
      password: this.state.password
    }

    return client({
      method: 'post',
      url: `${AUTH_HOST}/auth/login`,
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
    return (
      <Container>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Login with an existing account
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
                <Button type="submit" color='teal' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              Don't have an account Yet?  <Link to="/signup">Sign up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Login;
