const _ = require('lodash');

function generateNest(start, query, db) {
  const map = _.reduce(query.split(','), (memo, value, key) => {
    memo[value] = true;
    return memo;
  }, {});
  switch(start) {
    case 'building':
      return buildingCase(map, db);
    case 'floor':
      return floorCase(map, db);
    case 'room':
      return roomCase(map, db);
    case 'cluster':
      return clusterCase(map, db);
    case 'node':
      return nodeCase(map, db);
    default:
      throw new Error("invalid option");
  }
}

function buildingCase(map, db) {
  let floorMapping = {}, clusterMapping = {}, result=[];
  if (map['floor']) {
    floorMapping = {
      model: db.floor,
    }
    if(map['room']) {
      floorMapping.include = [
        {model: db.room}
      ]
    }
  }
  if (map['cluster']) {
    clusterMapping = {
      model: db.cluster,
    }
    if(map['node']) {
      clusterMapping.include = [
        {model: db.node}
      ]
    }
    if(map['sensor']) {
      clusterMapping.include[0].include = [
        {model: db.sensor}
      ]
    }
  }
  if(!_.isEmpty(floorMapping)) {
    result.push(floorMapping);
  }
  if(!_.isEmpty(clusterMapping)) {
    result.push(clusterMapping);
  }
  return result;
}

function floorCase(map, db) {
  let roomMapping = {}, clusterMapping = {}, result=[];
  if (map['room']) {
    roomMapping = {
      model: db.room,
    }
  }
  if (map['cluster']) {
    clusterMapping = {
      model: db.cluster,
    }
    if(map['node']) {
      clusterMapping.include = [
        {model: db.node}
      ]
    }
    if(map['sensor']) {
      clusterMapping.include[0].include = [
        {model: db.sensor}
      ]
    }
  }
  if(!_.isEmpty(roomMapping)) {
    result.push(roomMapping);
  }
  if(!_.isEmpty(clusterMapping)) {
    result.push(clusterMapping);
  }
  return result;
}

function clusterCase(map, db) {
  let floorMapping = {}, nodeMapping = {}, result=[];
  if (map['floor']) {
    floorMapping = {
      model: db.floor,
    }
    if(map['room']) {
      floorMapping.include = [
        {model: db.room}
      ]
    }
  }
  if (map['node']) {
    nodeMapping = {
      model: db.node,
    }
    if(map['sensor']) {
      nodeMapping.include = [
        {model: db.sensor}
      ]
    }
  }
  if(!_.isEmpty(floorMapping)) {
    result.push(floorMapping);
  }
  if(!_.isEmpty(nodeMapping)) {
    result.push(nodeMapping);
  }
  return result;
}

function roomCase(map, db) {
  let nodeMapping = {}, result=[];

  if (map['node']) {
    nodeMapping = {
      model: db.node,
    }
    if(map['sensor']) {
      nodeMapping.include = [
        {model: db.sensor}
      ]
    }
  }
  if(!_.isEmpty(nodeMapping)) {
    result.push(nodeMapping);
  }
  return result;
}

function nodeCase(map, db) {
  let roomMapping = {}, sensorMapping = {}, result=[];
  if (map['room']) {
    roomMapping = {
      model: db.room,
    }
  }
  if (map['sensor']) {
    sensorMapping = {
      model: db.sensor,
    }
  }
  if(!_.isEmpty(roomMapping)) {
    result.push(roomMapping);
  }
  if(!_.isEmpty(sensorMapping)) {
    result.push(sensorMapping);
  }
  return result;
}

module.exports =  {
  generateNest,
};