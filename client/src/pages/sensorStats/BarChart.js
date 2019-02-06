import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {name: 'May 2018', temperature: 75.1, humidity: 30},
  {name: 'Jun 2018', temperature: 79.3, humidity: 27},
  {name: 'Jul 2018', temperature: 81.2, humidity: 35},
  {name: 'Aug 2018', temperature: 83.4, humidity: 31},
  {name: 'Sep 2018', temperature: 79.6, humidity: 41},
  {name: 'Oct 2018', temperature: 74.1, humidity: 37},
  {name: 'Nov 2018', temperature: 70.8, humidity: 30},
];

export default class BarrChart extends Component {
  render () {
    return (
      <BarChart width={400} height={300} data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="name"/>
      <YAxis/>
      <Tooltip/>
      <Legend />
      <Bar dataKey="temperature" stackId="a" fill="#8884d8" />
      <Bar dataKey="humidity" fill="#ffc658"/>
      </BarChart>
    );
  }
}