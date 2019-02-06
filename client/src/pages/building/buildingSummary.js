import React, { Component } from 'react';
import { Card, Image, List, Icon } from 'semantic-ui-react';

export default class BuildingSummary extends Component {
  render() {
    const { building, buildingStats } = this.props;
    return (
      <Card style={{boxShadow: '2px 3px 4px #666'}}>
        <Image src={building.image_url}/>
        <Card.Content>
          <Card.Header>{building.name}</Card.Header>
          <Card.Description>{building.address}</Card.Description>
          <Card.Meta>
            <span className='date'>{building.city}, {building.state} {building.zipcode}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Icon name='building' />
          {building.num_of_floors} floors
        </Card.Content>
        {buildingStats &&
          <Card.Content extra>
            <List>
              <List.Item>
                <List.Icon name='cogs' />
                <List.Content># of clusters: {buildingStats.cluster_count}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='certificate' />
                <List.Content># of nodes: {buildingStats.node_count}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='lightbulb' />
                <List.Content>
                # of sensors: {buildingStats.sensor_count}
                </List.Content>
              </List.Item>
            </List>
          </Card.Content>
        }
      </Card>
    );
  }
}