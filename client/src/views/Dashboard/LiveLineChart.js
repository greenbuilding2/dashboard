import React, { Component } from 'react';
import moment from 'moment-timezone';
import Promise from 'bluebird';
import _ from 'lodash';
import { Bar, Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';

import { fetchLiveSensorData } from '../../reducers/sensorData';
import client from '../../client';
import {
  DATA_MANAGER_HOST,
  INFRA_MANAGER_HOST,
} from '../../api-config';

const brandPrimary = getStyle('--primary');
const brandSuccess = getStyle('--success');
const brandInfo = getStyle('--info');
const brandWarning = getStyle('--warning');
const brandDanger = getStyle('--danger');
var elements = 27;
var data1 = [];

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
}


const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 150,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class LiveLineChart extends Component {
  state = {
    currentCount: 10,
    mainChart: {
      label: [],
      datasets: [
        {
          label: 'Sensor Data',
          backgroundColor: hexToRgba(brandInfo, 10),
          borderColor: brandInfo,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: [],
        },
      ]
    }
  }

  componentDidMount() {
    this.countdown = setInterval(this.timer, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  timer = () => {
    const { fetchLiveSensorData, device, device_type } = this.props;
    const tz = moment.tz.guess();
    let tenSecEarly = moment().subtract(10, 'sec').format("YYYY-MM-DDThh:mm:ss");
    let nowTime =  moment().format("YYYY-MM-DDThh:mm:ss");
    return client(`${DATA_MANAGER_HOST}/sensor_data/${device_type}/${device.id}`, {
      method: 'GET',
      params: {
        startTime: moment(tenSecEarly).tz(tz).format("ddd MMM DD hh:mm:ss zz YYYY"),
        endTime: moment(nowTime).tz(tz).format("ddd MMM DD hh:mm:ss zz YYYY")
      },
    })
    .then(response => {
      let liveData = response.data;
      const { currentCount} = this.state;
      let pureData = _.map(liveData, d => {
        return _.round(d.data, 2);
      });
      let mainChart = _.cloneDeep(this.state.mainChart);
      let oldData = mainChart.datasets[0].data;
      if(oldData.length >100) {
        oldData = pureData;
      } else {
        oldData = oldData.concat(pureData)
      }
      let newMainChart = {
        datasets: [
          {
            label: 'Sensor Data',
            backgroundColor: hexToRgba(brandInfo, 10),
            borderColor: brandInfo,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: oldData,
          },
        ],
        labels: oldData,
      }
      this.setState({
        currentCount: this.state.currentCount+10,
        mainChart: _.assign({}, newMainChart),
      });
    })
  }
  reloadChart = () => {
    return _.cloneDeep(this.state.mainChart);
  }

  render() {
    return (
      <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
        <p1>{this.state.currentCount}</p1>
        <Line data={this.state.mainChart} options={mainChartOpts} height={300} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    device: state.sensorData.device,
    device_type: state.sensorData.device_type,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchLiveSensorData: (type, id, startTime, endTime) => {
      dispatch(fetchLiveSensorData(type, id, startTime, endTime))
    },
  }
}

LiveLineChart = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LiveLineChart));

export default LiveLineChart;

