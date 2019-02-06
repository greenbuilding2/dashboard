import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container, Grid } from 'semantic-ui-react';

import NodeNetwork from './nodeNetwork';
import NodeSummary from './nodeSummary';
import SensorTable from './sensorTable';

import { fetchNodeConfig, addSensorConfig, updateSensorConfig, deleteSensorConfig } from '../../reducers/nodeConfig';

class Node extends Component {

  componentDidMount() {
    const  { node_id } = this.props.params;
    return this.props.fetchNodeConfig(node_id);
  }

  render() {
    const { nodeConfig, router, addSensorConfig, updateSensorConfig, deleteSensorConfig } = this.props;
    const { node, sensors } = nodeConfig;
    return (
      <Container>
        <Grid columns={2} celled className="gb-container">
          <Grid.Row stretched>
            <Grid.Column width={6}>
              <NodeSummary node={node} />
            </Grid.Column>
            <Grid.Column width={10}>
              <NodeNetwork node={node} router={router}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns={2} celled className="gb-container">
          <Grid.Row stretched>
            <Grid.Column width={16}>
              <SensorTable
                sensors={sensors}
                addSensorConfig={addSensorConfig}
                updateSensorConfig={updateSensorConfig}
                deleteSensorConfig={deleteSensorConfig}
                node={node}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    nodeConfig: state.nodeConfig,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchNodeConfig: (nodeId) => {
      dispatch(fetchNodeConfig(nodeId));
    },
    addSensorConfig: (newSensorData) => {
      dispatch(addSensorConfig(newSensorData));
    },
    updateSensorConfig: (sensorId, updatedSensorData) => {
      dispatch(updateSensorConfig(sensorId, updatedSensorData));
    },
    deleteSensorConfig: (sensorId) => {
      dispatch(deleteSensorConfig(sensorId));
    }
  }
}

Node = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Node));

export default Node;