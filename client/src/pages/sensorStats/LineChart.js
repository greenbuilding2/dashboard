import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import {curveCatmullRom} from 'd3-shape';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getRandomStrokeStyle, getRandomColor } from '../../utils';

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  LineSeriesCanvas
} from 'react-vis';

export default function LineChart (props) {
  const Line = LineSeries;
  const { sensorData } = props;
  const data = sensorData.data;
  console.log("data is>>>", data);
  let mData = {};
  _.forEach(data, (value, key) => {
    mData[key] = [];
  });
  _.forEach(data, (values, key) => {
    console.log("datum is>>>", values);
    _.forEach(values, value => {
      mData[key].push(
        {
          x: new Date(value.date),
          y: value.data
        }
      );
    })
  });
  console.log("mdata is>>>", mData);
  return (
    <div>
      <XYPlot width={400} height={400} margin={{left: 50, right: 10, top: 10, bottom: 60}} style={{'backgroundColor': 'white', boxShadow: '2px 3px 4px #666'}}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="Time" height={100} postition='start' tickFormat={v => moment(v).format('YY-MM-DD hh:ss')} tickLabelAngle={-35} style={{'fontSize': '8'}} />
        <YAxis title="Data Value" />
        {_.map(mData, (data, key) => {
          console.log("linegraph data is >>>", data);
          return (
            <LineSeries
              key={key}
              color={getRandomColor()}
              data={data}
              strokeDasharray={getRandomStrokeStyle()}
            />
          )
        })}
        <Line className="second-series" data={null} />
      </XYPlot>
    </div>
  )
}