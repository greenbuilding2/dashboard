import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import { Table, Label, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { mapStatusToColor } from '../../utils';

import UpdateSensorModal from './updateSensorModal';
import AddSensorModal from './addSensorModal';
import Auth from '../../modules/Auth';

export default class SensorTable extends Component {
  render() {
    const { node, sensors, addSensorConfig, updateSensorConfig, deleteSensorConfig } = this.props;
    return (
      <Table celled style={{boxShadow: '2px 3px 4px #666'}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Sensor ID</Table.HeaderCell>
            <Table.HeaderCell>Sensor Name</Table.HeaderCell>
            <Table.HeaderCell>Sensor Type</Table.HeaderCell>
            <Table.HeaderCell>Instllation time</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            { Auth.getUser()!=='client' &&
              <Table.HeaderCell colspan='2'>Operation</Table.HeaderCell>
            }
            <Table.HeaderCell>Data</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(sensors, (sensor, index) => {
            return (
              <Table.Row>
                <Table.Cell>
                  <Label ribbon={index===0}>{sensor.id}</Label>
                </Table.Cell>
                <Table.Cell>{sensor.name}</Table.Cell>
                <Table.Cell>{sensor.type}</Table.Cell>
                <Table.Cell>{sensor.install_time}</Table.Cell>
                <Table.Cell>
                  <Label color={mapStatusToColor(sensor.status)}>
                    {sensor.status}
                  </Label>
                </Table.Cell>
                { Auth.getUser()!=='client' &&
                  <Fragment>
                    <Table.Cell>
                      <UpdateSensorModal sensor={sensor} updateSensorConfig={updateSensorConfig}/>
                    </Table.Cell>
                    <Table.Cell>
                      <Icon name="trash alternate" onClick={() => {deleteSensorConfig(sensor.id); toast.info("🔔 Sensor successfully deleted");}}/>
                    </Table.Cell>
                  </Fragment>
                }
                <Table.Cell>
                  <Label>
                    <Link to={`/dashboard?type=sensor&id=${sensor.id}`}>
                      <Icon name="chart area" />Sensor Data
                    </Link>
                  </Label>
                </Table.Cell>
              </Table.Row>
            )
          })}
          { Auth.getUser()!=='client' &&
            <Table.Row>
              <Table.Cell colSpan='8'>
                <AddSensorModal node={node} addSensorConfig={addSensorConfig} />
              </Table.Cell>
            </Table.Row>
          }
        </Table.Body>
      </Table>
    )
  }
}