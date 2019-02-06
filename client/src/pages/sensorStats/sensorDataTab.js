import React, { Component } from 'react';
import _ from 'lodash';
import { Tab } from 'semantic-ui-react';
import SensorDataTable from './sensorDataTable';

export default class SensorDataTab extends Component {
  state = {
    sensorId: null,
  }

  handleChange = (e, data) => {
    let activeIndex = data.activeIndex;
    let sensorId = data.panes[activeIndex].menuItem;
    this.setState({sensorId});
  }

  render() {
    const {sensorData, deleteSensorData } = this.props;
    const data = sensorData.data;
    const panes = _.reduce(data, (result, sData, sensorId) => {
      let pane = {
        menuItem: sensorId,
      };
      result.push(pane);
      return result;
    }, []);
    panes.unshift({
      menuItem: 'select sensor ID',
    })
    return (
      <div>
        <Tab panes={panes} onTabChange={this.handleChange} />
        <SensorDataTable
          data={data[this.state.sensorId]}
          sensorId={this.state.sensorId}
          deleteSensorData={deleteSensorData}
        />
      </div>
    )
  }
}