const db = require('../models');
const _ = require('lodash');
const { generateNest } = require('../utils');

const addFloor = (req, res) => {
  console.log("request.body is>>>", req.body);
  const newFloor = req.body;

  return db.floor.create(newFloor)
  .then(response => {
    console.log("created new Floor>>>", response);
    res.json(response);
  })
  .catch(err => {
    console.log("error inserting building>>>", err);
  })

}

const getClusterFromFloor = (req, res) => {
  console.log("req.params>>>", req.params);
  const floor_id = +req.params.floor_id;
  const { fetch_nested } = req.query;
  let queryObj = {
    where: {
      floor_id: floor_id,
    },
  };
  if(fetch_nested) {
    queryObj.include = generateNest('cluster', fetch_nested, db);
    console.log("nesting 0 is>>>", queryObj.include[0]);
    console.log("nesting 1 is>>>", queryObj.include[1]);
  }
  return db.cluster.findOne(queryObj)
  .then(cluster => {
    console.log("cluster is >>>", cluster);
    res.json(cluster);
  })
  .catch(err => {
    console.log("err fetching cluster from floor>>>", err);
  })
}

const getFloorStats = (req, res) => {
  const { floor_id: floorId } = req.params;
  return db.sequelize.query(`SELECT count(DISTINCT node.id) as node_count,
    count(DISTINCT sensor.id) as sensor_count
    FROM floor
    INNER JOIN cluster on floor.id = cluster.floor_id
    LEFT JOIN node on cluster.id = node.cluster_id
    LEFT JOIN sensor on node.id = sensor.node_id
    WHERE floor.id = :floorId;`,
    { replacements: { floorId: +floorId }, type: db.sequelize.QueryTypes.SELECT }
  )
  .then(results => {
    res.json(results[0]);
  })
  .catch(err => {
    console.log("err getting floor Stats");
  })
}

module.exports = {
  addFloor,
  getClusterFromFloor,
  getFloorStats,
}