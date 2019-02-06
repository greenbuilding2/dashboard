import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Divider, Container, Grid, Image } from 'semantic-ui-react';
import { fetchBuildingStats, fetchBuildingConfig, addClusterConfig, updateClusterConfig, deleteClusterConfig } from '../../reducers/buildingConfig';

import Loading from '../../component/Loading';
import ClusterTable from './clusterTable';
import BuildingSummary from './buildingSummary';

class Building extends Component {

  componentDidMount() {
    const { fetchBuildingConfig, fetchBuildingStats } = this.props;
    const { building_id } = this.props.params;
    fetchBuildingConfig(building_id);
    fetchBuildingStats(building_id);
  }

  render() {
    const { isLoading, building, floors, buildingStats } = this.props.buildingConfig;
    return isLoading ? <Loading /> :
      (
        <Container>
          <Grid className="gb-container" celled columns={2}>
            <Grid.Row stretched>
              <Grid.Column width={4}>
                <BuildingSummary building={building} buildingStats={buildingStats}/>
              </Grid.Column>
              <Grid.Column width={12}>
              <Image.Group>
                <Image floated="left" src="http://www.sjsu.edu/cies/pics/tower_hall_02.jpg" width="300" height="150"/>
                <Image floated="right" src="http://l-vis.univ-lyon1.fr/files/2018/05/statues-02.jpg" width="300" height="150"/>
              </Image.Group>
              <Divider />
              <Image.Group>
                <Image floated="left" src="http://www.sjsu.edu/clfsa/pics/Website%20Banner2.jpg" width="300" height="150"/>
                <Image floated="right" src="http://aba-arch.com/images/properties/MLK_Library/ext_bldg_4thst-lr-large.jpg" width="300" height="150"/>
              </Image.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid className="gb-container" celled columns={1}>
            <Grid.Row stretched>
              <Grid.Column width={16}>
                <ClusterTable
                  params={this.props.params}
                  addClusterConfig={this.props.addClusterConfig}
                  updateClusterConfig={this.props.updateClusterConfig}
                  deleteClusterConfig={this.props.deleteClusterConfig}
                  floors={floors}
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
    buildingConfig: state.buildingConfig,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBuildingConfig: (buildingId) => {
      dispatch(fetchBuildingConfig(buildingId));
    },
    fetchBuildingStats: (buildingId) => {
      dispatch(fetchBuildingStats(buildingId));
    },
    addClusterConfig: (newClusterData) => {
      dispatch(addClusterConfig(newClusterData));
    },
    updateClusterConfig: (clusterId, updatedClusterData) => {
      dispatch(updateClusterConfig(clusterId, updatedClusterData));
    },
    deleteClusterConfig: (clusterId, floorId) => {
      dispatch(deleteClusterConfig(clusterId, floorId));
    }
  }
}

Building = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Building));

export default Building;