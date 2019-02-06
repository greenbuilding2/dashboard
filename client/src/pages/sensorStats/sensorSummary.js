import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';

import clusterImg from '../../assets/cluster_1.jpg';
import nodeImg from '../../assets/node_1.jpg';
import sensorHvacImg from '../../assets/sensor_hvac.jpg';
import sensorAirImg from '../../assets/sensor_air.jpg';
import sensorLightImg from '../../assets/sensor_light.jpg';
import sensorMotionImg from '../../assets/sensor_motion.jpg';

function getDeviceImage(device, device_type) {
  if (device_type === 'cluster') {
    return clusterImg;
  } else if (device_type === 'node'){
    return nodeImg;
  } else if (device_type === 'sensor') {
    switch(device.type) {
      case 'temperature':
      case 'hvac':
        return sensorHvacImg;
      case 'air':
        return sensorAirImg;
      case 'light':
        return sensorLightImg;
      case 'motion':
        return sensorMotionImg;
      default:
        return;
    }
  }
}

export default class SensorSummary extends Component {
  render() {
    const { sensorData } = this.props;
    const device = sensorData.device;
    const device_type = sensorData.device_type;
    return (
      <Card className="centered" style={{boxShadow: '2px 3px 4px #666'}}>
        <Card.Content>
          <Image size='medium' src={getDeviceImage(device, device_type)} />
          <Card.Meta>{device.name}</Card.Meta>
        </Card.Content>
        <Card.Content>
          <Card.Description>
            Device Type {device_type}
          </Card.Description>
          <Card.Description>
            Install Time: <span className='date'>{device.install_time}</span>
          </Card.Description>
          {/*
            <Modal trigger={<Button>See {device_type} Network</Button>}>
              <DeviceNetwork device={device} device_type={device_type} />
            </Modal>
          */}
        </Card.Content>
      </Card>
    )
  }
}