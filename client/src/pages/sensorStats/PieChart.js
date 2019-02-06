import React, { Component } from 'react';
import _ from 'lodash';

import { PieChart, Pie, Cell } from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (pieData) => {
  const { name, cx, cy, midAngle, innerRadius, outerRadius, percent } = pieData;
 	const radius = innerRadius + (outerRadius - innerRadius) * 1;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const formatData = ({ device_type, device }) => {
  let sensorInfos = {};
  if (device_type === 'cluster' || device_type ==='floor') {
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
  let info = _.reduce(sensorInfos, (memo, value, key) => {
    let newInfo = {
      name: key,
      value: value,
    };
    memo.push(newInfo);
    return memo;
  }, []);
  return info;
}

export default class GPieChart extends Component {
	render () {
    const { sensorData } = this.props;
    console.log("sensorData is >>>", sensorData);
    const data = formatData(sensorData);
  	return (
    	<PieChart width={400} height={300} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={200}
          cy={180}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    );
  }
}