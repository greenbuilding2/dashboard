import { combineReducers } from 'redux';
import sensorData from './sensorData';
import buildingConfig from './buildingConfig';
import clusterConfig from './clusterConfig';
import nodeConfig from './nodeConfig';

const greenBuildingReducer = combineReducers({
  sensorData,
  buildingConfig,
  clusterConfig,
  nodeConfig,
});

export default greenBuildingReducer;