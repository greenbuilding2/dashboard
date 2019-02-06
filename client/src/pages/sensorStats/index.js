import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SelectTimeRange from './SelectTimeRange';
import BarChart from './BarChart';
import LineChart from './RLineChart';
import ScatterChart from './ScatterChart';
import RadarChart from './RadarChart';
import PieChart from './PieChart';
import AreaChart from './AreaChart';
import SensorDataTab from './sensorDataTab';
import SensorSummary from './sensorSummary';

import { fetchDevice, deleteSensorData } from '../../reducers/sensorData';

class sensorStats extends Component {
  componentDidMount() {
    const { type, id } = this.props.location.query;
    this.props.fetchDevice(type, id);
  }
  render() {
    const { data, sensorData, params, deleteSensorData } = this.props;
    console.log("sensorData is >>", data);
    return (
      <Container>
        <Grid columns={2} celled className="gb-container">
          <Grid.Row stretched>
            <Grid.Column width={8}>
              <SelectTimeRange params={params} />
            </Grid.Column>
            <Grid.Column width={8}>
              <SensorSummary sensorData={sensorData} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns={2} celled  className="gb-container">
          <Grid.Row>
            <Grid.Column width={8}>
              <LineChart sensorData={sensorData} />
            </Grid.Column>
            <Grid.Column width={8}>
              <ScatterChart sensorData={sensorData} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns={2} celled  className="gb-container">
          <Grid.Row>
            <Grid.Column width={8}>
              <PieChart sensorData={sensorData} />
            </Grid.Column>
            <Grid.Column width={8}>
              <RadarChart sensorData={sensorData} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns={2} celled className="gb-container">
          <Grid.Row>
            <Grid.Column width={8}>
              <AreaChart />
            </Grid.Column>
            <Grid.Column width={8}>
              <BarChart />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid columns={1} celled  className="gb-container">
          <Grid.Row>
            <Grid.Column width={16}>
              <SensorDataTab sensorData={sensorData} deleteSensorData={deleteSensorData} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    sensorData: state.sensorData,
    data: state.sensorData.data
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchDevice: (type, id) => {
      dispatch(fetchDevice(type, id))
    },
    deleteSensorData: (sensorData) => {
      dispatch(deleteSensorData(sensorData));
    }
  }
}

sensorStats = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(sensorStats));

export default sensorStats;