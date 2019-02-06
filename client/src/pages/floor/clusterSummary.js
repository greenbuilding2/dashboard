import React, { Component } from 'react';
import { Card, Image, List, Icon } from 'semantic-ui-react';

import floor1 from '../../assets/floor_1.jpg';
import floor2 from '../../assets/floor_2.jpg';
import floor3 from '../../assets/floor_3.jpg';

function generateRandFloorPic() {
  let rand = Math.round(Math.random() * 2);
  let floors = [ floor1, floor2, floor3];
  return floors[rand];
}

export default class ClusterSummary extends Component {
  state = {
    floorPic: ''
  }
  componentDidMount() {
    let floorPic = generateRandFloorPic();
    this.setState({floorPic});
  }
  render() {
    const { floor, cluster, rooms, floorStats } = this.props;
    return (
      <Card className="centered" style={{boxShadow: '2px 3px 4px #666'}}>
        <Image src={this.state.floorPic} alt="floor picture"/>
        <Card.Content>
          <Card.Header>Floor # {floor.floor_number}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Icon name='cogs' />
          {cluster.name}
        </Card.Content>
        <Card.Content extra>
          <Icon name='warehouse' />
          {rooms.length} rooms
        </Card.Content>
        <Card.Content extra>
          <List>
            <List.Item>
              <List.Icon name='certificate' />
              <List.Content># of nodes: {floorStats.node_count}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='lightbulb' />
              <List.Content># of sensors: {floorStats.sensor_count}</List.Content>
            </List.Item>
          </List>
        </Card.Content>
      </Card>
    );
  }
}