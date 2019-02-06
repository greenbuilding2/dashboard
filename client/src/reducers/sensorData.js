import _ from 'lodash';
import moment from 'moment-timezone';
import client from '../client';

import {
  DATA_MANAGER_HOST,
  INFRA_MANAGER_HOST,
} from '../api-config';

//
// INITIAL STATE
//
const INITIAL_STATE = {
  device: {},
  device_type: null,
  data: {},
  liveData: {},
  isLoading: true,
};

//
// CONSTANTS
//
const FETCH_SENSOR_DATA = 'FETCH_SENSOR_DATA';
const SUCCESS_SENSOR_DATA = 'SUCCESS_SENSOR_DATA';
const ERROR_SENSOR_DATA = 'ERROR_SENSOR_DATA';
const FETCH_LIVE_SENSOR_DATA = 'FETCH_LIVE_SENSOR_DATA';
const SUCCESS_LIVE_SENSOR_DATA = 'SUCCESS_LIVE_SENSOR_DATA';
const ERROR_LIVE_SENSOR_DATA = 'ERROR_LIVE_SENSOR_DATA';
const FETCH_DEVICE = 'FETCH_DEVICE';
const SUCCESS_DEVICE  = 'SUCCESS_DEVICE';
const ERROR_DEVICE  = 'ERROR_DEVICE';

const DELETE_SENSOR_DATA = 'DELETE_SENSOR_DATA';
const SUCCESS_DELETE_SENSOR_DATA = 'SUCCESS_DELETE_SENSOR_DATA';
const ERROR_DELETE_SENSOR_DATA = 'ERROR_DELETE_SENSOR_DATA';

//
// ACTIONS
//

export const fetchSensorData = (type, id, startTime, endTime) => (dispatch, getState) => {
  dispatch({
    type: FETCH_SENSOR_DATA,
  });
  const tz = moment.tz.guess();

  return client(`${DATA_MANAGER_HOST}/sensor_data/${type}/${id}`, {
    method: 'GET',
    params: {
      startTime: moment(startTime).tz(tz).format("ddd MMM DD hh:mm:ss zz YYYY"),
      endTime: moment(endTime).tz(tz).format("ddd MMM DD hh:mm:ss zz YYYY")
    },
  })
  .then(
    response => {
      dispatch({
        type: SUCCESS_SENSOR_DATA,
        result: _.sortBy(response.data, function(o) {
          return moment(o.date);
        }),
      });
    },
    error => {
      dispatch({
        type: ERROR_SENSOR_DATA,
        message: error.message || 'Something went wrong.',
      });
    }
  );
};

export const fetchLiveSensorData = (type, id, startTime, endTime) => (dispatch, getState) => {
  dispatch({
    type: FETCH_LIVE_SENSOR_DATA,
  });
  const tz = moment.tz.guess();

  return client(`${DATA_MANAGER_HOST}/sensor_data/${type}/${id}`, {
    method: 'GET',
    params: {
      startTime: moment(startTime).tz(tz).format("ddd MMM DD hh:mm:ss zz YYYY"),
      endTime: moment(endTime).tz(tz).format("ddd MMM DD hh:mm:ss zz YYYY")
    },
  })
  .then(
    response => {
      dispatch({
        type: SUCCESS_LIVE_SENSOR_DATA,
        result: response.data,
      });
    },
    error => {
      dispatch({
        type: ERROR_LIVE_SENSOR_DATA,
        message: error.message || 'Something went wrong.',
      });
    }
  );
};

export const fetchDevice = (type, id) => (dispatch, getState) => {
  dispatch({
    type: FETCH_DEVICE,
  });
  let fetchDeviceUrl;
  if(type === "floor") {
    if (INFRA_MANAGER_HOST.indexOf('v0') !== -1) {
      fetchDeviceUrl = `${INFRA_MANAGER_HOST}/floors/${id}?fetch_nested=floor,room,node,sensor`;
    } else {
      fetchDeviceUrl = `${INFRA_MANAGER_HOST}/floors/${id}?fetch_nested=room,node,sensor`;
    }
  } else if (type === "room") {
    fetchDeviceUrl = `${INFRA_MANAGER_HOST}/rooms/${id}?fetch_nested=node,sensor`;
  } else {
    fetchDeviceUrl = `${INFRA_MANAGER_HOST}/sensors/${id}`;
  }
  return client.get(fetchDeviceUrl)
  .then(
    response => {
      let device, floor, rooms, nodes, sensors;
      if (type === 'floor') {
        if (INFRA_MANAGER_HOST.indexOf('v0') !== -1) {
          device = response.data;
          floor = device.floor;
          rooms = floor.rooms;
          nodes = device.nodes;
        } else {
          floor = response.data;
          device = floor.cluster;
          rooms = floor.rooms;//cluster.floor.rooms;
          nodes = _.compact(floor.nodes);
          sensors = _.compact(floor.sensors);
          _.forEach(nodes, node => {
            node.sensors = _.filter(sensors, {node_id: node.id}) || {};
          });
          device.nodes = nodes;
        }
      } else if (type==='room') {
        if (INFRA_MANAGER_HOST.indexOf('v0') === -1) {
          let room = response.data;
          room.node = room.node || {};
          room.node.sensors = room.sensors;
          device = room;
        } else {
          device = response.data;
        }
      } else {
        device = response.data;
      }
      dispatch({
        type: SUCCESS_DEVICE,
        device_type: type,
        device: device,
      });
    },
    error => {
      dispatch({
        type: ERROR_DEVICE,
        message: error.message || 'Something went wrong.',
      });
    }
  );
};

export const deleteSensorData = (sensorData) => (dispatch, getState) => {
  let id = sensorData.id || sensorData._id;
  dispatch({
    type: DELETE_SENSOR_DATA,
  });
  return client.delete(`${DATA_MANAGER_HOST}/sensor_data/${id}`)
  .then(
    response => {
      dispatch({
        type: SUCCESS_DELETE_SENSOR_DATA,
        sensorData,
      });
    },
    error => {
      dispatch({
        type: ERROR_DELETE_SENSOR_DATA,
        message: error.message || 'Something went wrong.',
      });
    }
  );
}

function groupSensorData(sensorData) {
  return _.groupBy(sensorData, 'sensorId');
}

function combineSensorData(sensorData, liveData) {
  console.log(sensorData, liveData)
  _.forEach(sensorData, (data, key) => {
    if(!liveData[key]) {
      liveData[key] = [];
    }
    if (liveData[key].length >100) {
      liveData[key] = data;
    } else {
      liveData[key] = liveData[key].concat(data);
    }
  })
  return liveData;
}

const sensorData = (state = INITIAL_STATE, action) => {
  let groupedSensorData;
  switch (action.type) {
    case SUCCESS_SENSOR_DATA:
      groupedSensorData = groupSensorData(action.result);
      return _.assign({}, state, { data: groupedSensorData, isLoading: false });
    case SUCCESS_LIVE_SENSOR_DATA:
      groupedSensorData = groupSensorData(action.result);
      let newLiveData = combineSensorData(groupedSensorData,state.liveData);
      return _.assign({}, state, { liveData: newLiveData, isLoading: false });
    case SUCCESS_DEVICE:
      let device = action.device;
      if (action.device_type === 'cluster' && device.sensors) {
        _.forEach(device.nodes, node => {
          node.sensors = _.filter(device.sensors, {node_id: node.id});
        })
      }
      return _.assign({}, state, { device: action.device, device_type: action.device_type });
    case SUCCESS_DELETE_SENSOR_DATA:
      let data = state.data;
      let deletedData = action.sensorData;
      let sensorId = deletedData.sensorId;
      if (deletedData.id) {
        data[sensorId] = _.remove(data[sensorId], {id: deletedData.id});
      } else if (deletedData._id) {
        data[sensorId] = _.remove(data[sensorId], {id: deletedData._id});
      }
      return _.assign({}, state, { data });
    case ERROR_DELETE_SENSOR_DATA:
    case ERROR_SENSOR_DATA:
    case ERROR_LIVE_SENSOR_DATA:
    case ERROR_DEVICE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default sensorData;