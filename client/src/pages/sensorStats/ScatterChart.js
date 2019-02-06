import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { getRandomColor, getRandomShape } from '../../utils';

export default class GScatterChart extends Component {
	render () {
    const { sensorData } = this.props;
    let data = sensorData.data;
    let mData = {};
    _.forEach(data, (value, key) => {
      mData[key] = [];
    });
    let minTime = moment().valueOf();
    let maxTime = 0;
    _.forEach(data, (values, key) => {
      _.forEach(values, value => {
        let time = moment(value.date).valueOf();
        mData[key].push(
          {
            time: time,
            y: value.data
          }
        );
        if(time < minTime ) {
          minTime = time;
        }
        if( time > maxTime) {
          maxTime = time;
        }
      })
    });
  	return (
    	<ScatterChart width={500} height={350} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
      	<CartesianGrid />
        <XAxis type="number" dataKey={'time'} name='time' tickFormatter={v => moment(v).format('YY-MM-DD hh:ss')} domain={[minTime, maxTime ]} angle={-45} />
      	<YAxis type="number" dataKey={'y'} name='data'/>
      	<Tooltip cursor={{strokeDasharray: '3 3'}}/>
        <Legend verticalAlign="top" formatter={this.formatTime} />
        {_.map(mData, (s, key) => (
          <Scatter name={key} data={s} fill={getRandomColor()} shape={getRandomShape()} />
        ))}
      </ScatterChart>
    );
  }
}