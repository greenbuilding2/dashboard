import React, { Fragment } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import { Table, Label, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';

import AddClusterModal from './addClusterModal';
import UpdateClusterModal from './updateClusterModal';
import { mapStatusToColor } from '../../utils';
import Auth from '../../modules/Auth';

export default function({ floors, params, addClusterConfig, updateClusterConfig, deleteClusterConfig }) {
  return (
    <Table celled style={{boxShadow: '2px 3px 4px #666'}}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Floor</Table.HeaderCell>
          <Table.HeaderCell>Cluster Name</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          {Auth.getUser()!=='client' && <Table.HeaderCell colSpan='2'>Operation</Table.HeaderCell> }
          <Table.HeaderCell>Data</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {_.map(floors, (floor, index) => {
          return (
            <Table.Row key={floor.id}>
              <Table.Cell>
                <Label ribbon={index===0}>{floor.floor_number}</Label>
              </Table.Cell>
              <Table.Cell>
              { floor.cluster ?
                <Link to={`/floor/${floor.id}`}>{floor.cluster.name}</Link> :
                null
              }
              </Table.Cell>
              <Table.Cell>
              { floor.cluster ?
                (<Label color={mapStatusToColor(floor.cluster.status)}>
                  {floor.cluster.status}
                </Label>) : null
              }
              </Table.Cell>
              { Auth.getUser()!=='client' &&
                <Fragment >
                  <Table.Cell>
                  { floor.cluster ?
                    <UpdateClusterModal
                      buildingId={params.building_id}
                      floor={floor}
                      cluster={floor.cluster}
                      updateClusterConfig={updateClusterConfig}
                    /> : null
                  }
                  </Table.Cell>
                  <Table.Cell >
                  { floor.cluster ?
                    <Icon onClick={() => {deleteClusterConfig(floor.cluster.id, floor.id); toast.info("🔔 Cluster successfully deleted");}} name="trash alternate"/> :
                    <AddClusterModal params={params} floor={floor} addClusterConfig={addClusterConfig} />
                  }
                  </Table.Cell>
                </Fragment>
              }
              <Table.Cell>
              { floor.cluster ?
                (<Label>
                  <Link to={`/dashboard?type=floor&id=${floor.id}`}>
                    <Icon name="chart area" />Sensor Data By Floor
                  </Link>
                </Label>) : null
              }
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}