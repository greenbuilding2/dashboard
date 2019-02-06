// Require dependencies
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Schema = mongoose.Schema;

// Define Article schema
const SensorDataSchema = new Schema({
  sensorId: {
    type: Number,
  },
  unit: {
    type: String,
    required: true,
  },
  model: {
    type: String,
  },
  seriesNum:{
    type: String,
  },
  data: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  nodeId: {
    type: Number,
  },
  clusterId: {
    type: Number,
  },
  roomId: {
    type: Number,
  },
  floorId: {
    type: Number,
  },
  buildingId: {
    type: Number,
  }
});

 // Export the model
module.exports = {
  SensorData1: mongoose.model('SensorData', SensorDataSchema),
  SensorData2: mongoose.model('SensorDataTwo', SensorDataSchema),
}