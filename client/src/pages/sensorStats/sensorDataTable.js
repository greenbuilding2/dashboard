import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import { Table, Label, Button, Icon } from 'semantic-ui-react';
import Auth from '../../modules/Auth';
import UpdateSensorDataModal from './updateSensorDataModal';

export default class SensorDataTable extends Component {
  render() {
    const { data, deleteSensorData } = this.props;
    return (
      <Table celled style={{borderRadius: '2px', boxShadow: '2px 3px 4px #666'}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Data</Table.HeaderCell>
            <Table.HeaderCell>Unit</Table.HeaderCell>
            <Table.HeaderCell>Timestamp</Table.HeaderCell>
            { Auth.getUser()!=='client' &&
              <Table.HeaderCell colspan='2'>Operation</Table.HeaderCell>
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {_.map(data, (datum, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>
                <Label ribbon={index===0}>{index}</Label>
              </Table.Cell>
              <Table.Cell>{datum.data}</Table.Cell>
              <Table.Cell>{datum.unit}</Table.Cell>
              <Table.Cell>{datum.date}</Table.Cell>
              { Auth.getUser()!=='client' &&
                <Fragment>
                  <Table.Cell>
                    <UpdateSensorDataModal sensorData={datum}/>
                  </Table.Cell>
                  <Table.Cell>
                    <Icon name="trash alternate" onClick={() => {deleteSensorData(datum)}}/>
                  </Table.Cell>
                </Fragment>
              }
            </Table.Row>
          )
        })}
        { Auth.getUser()!=='client' &&
          <Table.Row>
            <Table.Cell colSpan='4'>
              <Link to={`/sensor-data-manager`}><Button>Add Sensor Data</Button></Link>
            </Table.Cell>
          </Table.Row>
        }
        </Table.Body>
      </Table>
    )
  }
}