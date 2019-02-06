const _ = require('lodash');
const { SensorData2 } = require('../mongoModels/SensorData');

const insertSensorData = (req, res) => {
  const sensorData = req.body;

  console.log("sensorData is >>>", sensorData);
  sensorData.date = new Date(sensorData.date);
  return SensorData2.create(sensorData)
  .then(response => {
    console.log("insert sensor data successful>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("error inserting sensor data >>>", err);
  });
};

const bulkInsertSensorData = (req, res) => {
  console.log("req.body is >>>>here>>>", req.body);
  const sensorData = req.body;
  _.forEach(sensorData, datum => {
    datum.date = new Date(datum.date)
  });
  console.log("sensorData is >>>", sensorData);

  return SensorData2.collection.insert(sensorData)
  .then(response => {
    console.log("bulk insert sensor data successful>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("error bulk inserting sensor data >>>", err);
  });
};

const searchSensorData = (req, res) => {
  let { startTime, endTime } = req.query;
  let { sensor_id: sensorId } = req.params;
  console.log("startTime>>>", startTime, endTime);
  let query = {
    sensorId,
    date: {
      $gte: new Date(startTime),
      $lte: new Date(endTime),
    }
  };

  console.log("query is>>>", query);
  return SensorData2.find(query).exec()
  .then(sensorData => {
    console.log("getting sensor data is>>>", sensorData);
    res.json(sensorData);
  })
  .catch(err => {
    console.log("err getting sensor data is>>>", err);
  });
}

const searchSensorDataByCluster = (req, res) => {
  let { startTime, endTime } = req.query;
  let { cluster_id: clusterId } = req.params;
  let query = {
    clusterId,
    date: {
      $gte: new Date(startTime),
      $lte: new Date(endTime),
    }
  };

  console.log("query is>>>", query);
  return SensorData2.find(query).exec()
  .then(sensorData => {
    console.log("getting sensor data is>>>", sensorData);
    res.json(sensorData);
  })
  .catch(err => {
    console.log("err getting sensor data is>>>", err);
  });
}

const searchSensorDataByNode = (req, res) => {
  let { startTime, endTime } = req.query;
  let { node_id: nodeId } = req.params;
  let query = {
    nodeId,
    date: {
      $gte: new Date(startTime),
      $lte: new Date(endTime),
    }
  };

  console.log("query is>>>", query);
  return SensorData2.find(query).exec()
  .then(sensorData => {
    console.log("getting sensor data is>>>", sensorData);
    res.json(sensorData);
  })
  .catch(err => {
    console.log("err getting sensor data is>>>", err);
  });
}

const searchSensorDataByFloor = (req, res) => {
  let { startTime, endTime } = req.query;
  let { floor_id: floorId } = req.params;
  let query = {
    floorId,
    date: {
      $gte: new Date(startTime),
      $lte: new Date(endTime),
    }
  };

  return SensorData2.find(query).exec()
  .then(sensorData => {
    console.log("getting floor sensor data is>>>", sensorData);
    res.json(sensorData);
  })
  .catch(err => {
    console.log("err getting floor sensor data is>>>", err);
  });
}

const searchSensorDataByRoom = (req, res) => {
  let { startTime, endTime } = req.query;
  let { room_id: roomId } = req.params;
  let query = {
    roomId,
    date: {
      $gte: new Date(startTime),
      $lte: new Date(endTime),
    }
  };

  return SensorData2.find(query).exec()
  .then(sensorData => {
    console.log("getting room sensor data is>>>", sensorData);
    res.json(sensorData);
  })
  .catch(err => {
    console.log("err getting room sensor data is>>>", err);
  });
}

const deleteSensorData = (req, res) => {
  let { id } = req.params;
  console.log("id is>>>", id);
  return SensorData2.remove({_id: id}).exec()
  .then(sensorData => {
    res.json('ok');
  })
  .catch(err => {
    console.log("err deleting sensor data >>>", err);
  });
}

const updateSensorData = (req, res) => {
  let {id} = req.params;
  let data = req.body;
  return SensorData2.update({_id: id}, data)
  .then(response =>{
    res.json(response);
  })
  .catch(err =>{
    console.log("err updating data", err);
  })
}

module.exports = {
  insertSensorData,
  bulkInsertSensorData,
  searchSensorData,
  searchSensorDataByCluster,
  searchSensorDataByNode,
  searchSensorDataByFloor,
  searchSensorDataByRoom,
  deleteSensorData,
  updateSensorData,
}