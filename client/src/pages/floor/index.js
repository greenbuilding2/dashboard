import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container, Grid } from 'semantic-ui-react';

import ClusterSummary from './clusterSummary';
import FloorRoomMap from './floorRoomMap';
import NodeTable from './nodeTable';

import { fetchFloorStats, fetchFloorConfig, addNodeConfig, updateNodeConfig, deleteNodeConfig } from '../../reducers/clusterConfig';

class Floor extends Component {

  componentDidMount() {
    const  { floor_id } = this.props.params;
    this.props.fetchFloorConfig(floor_id);
    this.props.fetchFloorStats(floor_id);
  }

  render() {
    const { params, router, clusterConfig, addNodeConfig, updateNodeConfig, deleteNodeConfig } = this.props;
    const { floor, cluster, nodes, rooms, roomMap, floorStats } = clusterConfig;
    return (
      <Container>
        <Grid className="gb-container" columns={2} celled>
          <Grid.Row stretched>
            <Grid.Column width={6}>
              <ClusterSummary floorStats={floorStats} floor={floor} cluster={cluster} nodes={nodes} rooms={rooms} />
            </Grid.Column>
            <Grid.Column width={10}>
              <FloorRoomMap roomMap={roomMap} rooms={rooms} router={router}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid className="gb-container" columns={2} celled>
          <Grid.Row stretched>
            <Grid.Column width={16}>
              <NodeTable
                cluster={cluster}
                params={params}
                rooms={rooms}
                nodes={nodes}
                router={router}
                addNodeConfig={addNodeConfig}
                updateNodeConfig={updateNodeConfig}
                deleteNodeConfig={deleteNodeConfig}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    clusterConfig: state.clusterConfig,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchFloorConfig: (floorId) => {
      dispatch(fetchFloorConfig(floorId));
    },
    fetchFloorStats: (floorId) => {
      dispatch(fetchFloorStats(floorId));
    },
    addNodeConfig: (newNodeData) => {
      dispatch( addNodeConfig(newNodeData));
    },
    updateNodeConfig: (nodeId, updatedNodeData) => {
      dispatch(updateNodeConfig(nodeId, updatedNodeData));
    },
    deleteNodeConfig: (nodeId) => {
      dispatch(deleteNodeConfig(nodeId));
    }
  }
}

Floor = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Floor));

export default Floor;