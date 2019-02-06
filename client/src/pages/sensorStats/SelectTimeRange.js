import React, { Component } from 'react';
import { Form, Segment } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchSensorData } from '../../reducers/sensorData';

class SelectTimeRange extends Component {
  state = {
    startTime: moment().subtract(1, 'd').format("YYYY-MM-DDThh:mm:ss"),
    endTime: moment().format("YYYY-MM-DDThh:mm:ss"),
  };

  componentDidMount() {
    const { fetchSensorData, location } = this.props;
    return fetchSensorData(location.query.type, location.query.id, this.state.startTime,this.state.endTime);
  }

  handleChange = (event, {name, value, type}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { fetchSensorData, location } = this.props;
    console.log("this.state is >>>", this.state);
    return fetchSensorData(location.query.type, location.query.id, this.state.startTime,this.state.endTime);
  }

  render() {
    return (
      <Segment style={{borderRadius: '2px', boxShadow: '2px 3px 4px #666'}}>
        <Form onSubmit={this.onSubmit}>
          <Form.Group widths='equal'>
            <Form.Input
              label='StartTime'
              type='datetime-local'
              step="1"
              onChange={this.handleChange}
              name="startTime"
              value={this.state.startTime}
            />
            <Form.Input
              label='EndTime'
              type='datetime-local'
              step="1"
              onChange={this.handleChange}
              name="endTime"
              value={this.state.endTime}
            />
            <Form.Button label='Submit'>Submit</Form.Button>
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSensorData: (type, id, startTime, endTime) => {
      dispatch(fetchSensorData(type, id, startTime, endTime))
    },
  }
}

SelectTimeRange = withRouter(connect(
  null,
  mapDispatchToProps
)(SelectTimeRange));

export default SelectTimeRange;