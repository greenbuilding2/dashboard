import _ from 'lodash';
import client from '../client';

import {
  INFRA_MANAGER_HOST,
} from '../api-config';

//
// INITIAL STATE
//
const INITIAL_STATE = {
  node: {},
  sensors: [],
  isLoading: true,
  errorMessage: null,
};

//
// CONSTANTS
//

const GET_NODE_CONFIG = 'GET_NODE_CONFIG';
const SUCCESS_GET_NODE_CONFIG = 'SUCCESS_GET_NODE_CONFIG';
const ERROR_GET_NODE_CONFIG  = 'ERROR_GET_NODE_CONFIG';

const ADD_SENSOR_CONFIG = 'ADD_SENSOR_CONFIG';
const SUCCESS_ADD_SENSOR_CONFIG = 'SUCCESS_ADD_SENSOR_CONFIG';
const ERROR_ADD_SENSOR_CONFIG = 'ERROR_ADD_SENSOR_CONFIG';

const UPDATE_SENSOR_CONFIG = 'UPDATE_SENSOR_CONFIG';
const SUCCESS_UPDATE_SENSOR_CONFIG = 'SUCCESS_UPDATE_SENSOR_CONFIG';
const ERROR_UPDATE_SENSOR_CONFIG = 'ERROR_UPDATE_SENSOR_CONFIG';

const DELETE_SENSOR_CONFIG = 'DELETE_SENSOR_CONFIG';
const SUCCESS_DELETE_SENSOR_CONFIG = 'SUCCESS_DELETE_SENSOR_CONFIG';
const ERROR_DELETE_SENSOR_CONFIG = 'ERROR_DELETE_SENSOR_CONFIG';

//
// ACTIONS
//
export const fetchNodeConfig = (nodeId) => (dispatch, getState) => {
  dispatch({
    type: GET_NODE_CONFIG,
  });

  return client.get(`${INFRA_MANAGER_HOST}/nodes/${nodeId}?fetch_nested=sensor`)
  .then(
    response => {
      let node = response.data;
      let sensors = node.sensors;
      dispatch({
        type: SUCCESS_GET_NODE_CONFIG,
        node,
        sensors,
      });
    },
    error => {
      dispatch({
        type: ERROR_GET_NODE_CONFIG,
        message: error.message || 'Something went wrong.',
      });
    }
  );
};

export const addSensorConfig = (newSensorData) => (dispatch, getState) => {
  dispatch({
    type: ADD_SENSOR_CONFIG,
  });

  return client.post(`${INFRA_MANAGER_HOST}/sensors`, newSensorData)
  .then(
    response => {
      let sensor = response.data;
      dispatch({
        type: SUCCESS_ADD_SENSOR_CONFIG,
        sensor,
      });
    },
    error => {
      dispatch({
        type: ERROR_ADD_SENSOR_CONFIG,
        message: error.message || 'Something went wrong.',
      });
    }
  );
};

export const updateSensorConfig = (sensorId, updatedSensorData) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_SENSOR_CONFIG,
  });

  return client.put(`${INFRA_MANAGER_HOST}/sensors/${sensorId}`, _.omit(updatedSensorData, 'id'))
  .then(
    response => {
      dispatch({
        type: SUCCESS_UPDATE_SENSOR_CONFIG,
        sensorId,
        sensor: updatedSensorData
      });
    },
    error => {
      dispatch({
        type: ERROR_UPDATE_SENSOR_CONFIG,
        message: error.message || 'Something went wrong.',
      });
    }
  );
};

export const deleteSensorConfig = (sensorId) => (dispatch, getState) => {
  dispatch({
    type: DELETE_SENSOR_CONFIG,
  });

  return client.delete(`${INFRA_MANAGER_HOST}/sensors/${sensorId}`)
  .then(
    response => {
      dispatch({
        type: SUCCESS_DELETE_SENSOR_CONFIG,
        sensorId,
      });
    },
    error => {
      dispatch({
        type: ERROR_DELETE_SENSOR_CONFIG,
        message: error.message || 'Something went wrong.',
      });
    }
  );
};


const nodeConfig = (state = INITIAL_STATE, action) => {
  let sensors, sensor, sensorId;
  switch (action.type) {
    case SUCCESS_GET_NODE_CONFIG:
      return _.assign({}, state, { node: action.node, sensors: action.sensors, isLoading: false});
    case SUCCESS_ADD_SENSOR_CONFIG:
      sensor = action.sensor;
      sensors = state.sensors;
      sensors = sensors.concat(sensor);
      return _.assign({}, state, { sensors: sensors, isLoading: false });
    case SUCCESS_UPDATE_SENSOR_CONFIG:
      sensorId = action.sensorId;
      sensors = state.sensors;
      let index = _.findIndex(sensors, { id: sensorId });
      sensors[index] = action.sensor;
      return _.assign({}, state, { sensors: sensors, isLoading: false });
    case SUCCESS_DELETE_SENSOR_CONFIG:
      sensorId = action.sensorId;
      sensors = state.sensors;
      sensors = _.filter(sensors, sensor => sensor.id !== sensorId);
      return _.assign({}, state, { sensors: sensors, isLoading: false });
    case ERROR_GET_NODE_CONFIG:
    case ERROR_ADD_SENSOR_CONFIG:
    case ERROR_UPDATE_SENSOR_CONFIG:
    case ERROR_DELETE_SENSOR_CONFIG:
      return _.assign({}, state, { isLoading: false, errorMessage: action.message });
    default:
      return state;
  }
};

export default nodeConfig;