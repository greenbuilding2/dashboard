import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { getRandomColor, getRandomShape } from '../../utils';

export default class RLineChart extends Component {

  formatTime = (value, name, props) => {
    console.log("value, name, props is>>>", value, name, props);
    return value;
  }
	render () {
    const { sensorData } = this.props;
    let data = sensorData.data || [];
    console.log("data in RLine is >>>", data);
    let mData = {};
    _.forEach(data, (value, key) => {
      mData[key] = [];
    });
    let minTime = moment().valueOf();
    let maxTime = 0;
    _.forEach(data, (values, key) => {
      console.log("datum is>>>", values);
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
    console.log("mData is >>>", mData);
    console.log("data.length is>>>", _.isEmpty(data));
  	return (
      <ScatterChart width={900} height={350} margin={{top: 20, right: 20, bottom: 20, left: 20}}>


        <CartesianGrid />
        {!_.isEmpty(data) &&<XAxis type="number" dataKey={'time'} name='time' tickFormatter={v => moment(v).format('YY-MM-DD hh:ss')} domain={[minTime, maxTime ]} angle={-45} /> }
        {!_.isEmpty(data) && <YAxis type="number" dataKey={'y'} name='data'/> }
        <ZAxis range={[100]}/>
        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
        <Legend verticalAlign="top" formatter={this.formatTime} />
        {_.map(mData, (s, key) => (
          <Scatter name={key} data={s} fill={getRandomColor()} line shape={getRandomShape()} />
        ))}
      </ScatterChart>
    );
  }
}