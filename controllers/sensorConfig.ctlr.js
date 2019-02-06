const _ = require('lodash');
const db = require('../models');

const getSensor = (req, res) => {
  const sensor_id= req.params.sensor_id;
  console.log("getSensor>>>>");
  return db.sensor.findOne({
    where: {
      id: sensor_id
    },
  })
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    console.log("err fetching building>>>", err);
  })
};

const upsertSensor = (req, res) => {
  const sensorToUpsert = req.body;
  if(sensorToUpsert.id) {
    //update
    return updateSensor(sensorToUpsert)
    .then(sensor => {
      res.json(sensor);
    })
  } else {
    //insert
    return addSensor(sensorToUpsert)
    .then(sensor => {
      res.json(sensor);
    })
  }
}

const addSensor = (req, res) => {
  const newSensor = req.body;
  return db.sensor.create(newSensor)
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    console.log("error creating a new sensor>>", err);
  })
}

const updateSensor = (req, res) => {
  const updatedSensor = req.body;
  const { sensor_id } = req.params;

  return db.sensor.update(_.omit(updatedSensor, 'id'),{
    returning: true,
    plain: true,
    where: {id: sensor_id}
  })
  .then(response => {
    return db.sensor.findOne({
      where: {
        id: sensor_id,
      }
    })
  })
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    console.log("err updating sensor is >>>", err);
  })
}

const deleteSensor = (req, res) => {
  const { sensor_id } = req.params;
  return db.sensor.destroy({
    where: {id: sensor_id}
  })
  .then((response) => {
    console.log("deleting sensor response is>>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("err deleting sensor is >>>", err);
  })
}

module.exports = {
  getSensor,
  addSensor,
  updateSensor,
  deleteSensor,
  upsertSensor,
}