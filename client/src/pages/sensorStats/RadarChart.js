import React, { Component } from 'react';
import _ from 'lodash';

import { Radar, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const formatData = ({ device_type, device }) => {
  let sensorInfos = {};
  if (device_type === 'cluster' || device_type ==='floor') {
    console.log("device is >>>", device);
    _.forEach(device.nodes, node => {
      _.forEach(node.sensors, sensor => {
        sensorInfos[sensor.type] = sensorInfos[sensor.type] ? sensorInfos[sensor.type] + 1 : 1;
      })
    })
  } else if (device_type === 'room') {
    let node = _.get(device, 'node', {});
    _.forEach(node.sensors, sensor => {
      sensorInfos[sensor.type] = sensorInfos[sensor.type] ? sensorInfos[sensor.type] + 1 : 1;
    })
  } else {
    sensorInfos[device.type] = sensorInfos[device.type] ? sensorInfos[device.type] + 1 : 1;
  }
  let max = _.max(_.values(sensorInfos));
  let info = _.reduce(sensorInfos, (memo, value, key) => {
    let newInfo = {
      subject: key,
      A: value,
      fullMark: max,
    };
    memo.push(newInfo);
    return memo;
  }, []);
  return info;
}

export default class GRadarChart extends Component {
	render () {
    const { sensorData } = this.props;
    const data = formatData(sensorData);
  	return (
    	<RadarChart cx={200} cy={200} outerRadius={150} width={400} height={300} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis/>
        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
      </RadarChart>
    );
  }
}