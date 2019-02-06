import React, { Component } from 'react';
import _ from 'lodash';
import Tree from 'react-d3-tree';

export default class DeviceNetwork extends Component {
  render() {
    let treeDataWrapper = [];
    let treeData;
    const { device, device_type } = this.props;
    if( device_type === 'cluster') {
      let cluster = device;
      treeData = {
        name: `cluster:${cluster.id}`,
        cluster_id: cluster.id,
        nodeSvgShape: {
          shape: 'circle',
          shapeProps: {
            r: 30,
            fill: 'green',
          },
        },
      }
      treeData.children = _.map(cluster.nodes, node => {
        return {
          name: `node:${node.id}`,
          node_id: node.id,
          nodeSvgShape: {
            shape: 'rect',
            shapeProps: {
              width: 20,
              height: 20,
              x: -10,
              y: -10,
              fill: 'cyan',
            },
          },
          children: _.map(node.sensors, sensor => {
            return {
              name: `${sensor.type}:${sensor.id}`,
              sensor_id: sensor.id,
              nodeSvgShape: {
                shape: 'circle',
                shapeProps: {
                  r: 10,
                  fill: 'orange',
                },
              },
            }
          })
        };
      });
    } else if (device_type === 'node') {
      let node = device;
      treeData = {
        name: `node:${node.id}`,
        node_id: node.id,
        nodeSvgShape: {
          shape: 'rect',
          shapeProps: {
            width: 20,
            height: 20,
            x: -10,
            y: -10,
            fill: 'cyan',
          },
        },
      };
      treeData.children = _.map(node.sensors, sensor => {
        return {
          name: `${sensor.type}:${sensor.id}`,
          sensor_id: sensor.id,
          nodeSvgShape: {
            shape: 'circle',
            shapeProps: {
              r: 10,
              fill: 'orange',
            },
          }
        };
      });
    } else {
      let sensor = device;
      treeData = {
        name: `${sensor.type}:${sensor.id}`,
        node_id: sensor.id,
        nodeSvgShape: {
          shape: 'circle',
          shapeProps: {
            r: 10,
            fill: 'orange',
          },
        },
      };
    }

    treeDataWrapper.push(treeData);
    const lineAttr = {
      stroke: 'black',
      strokeWidth: 1,
    };
    const nodeAttr = {
      stroke: 'transparent',
      strokeWidth: 1,
    }
    let styles= {
      links: lineAttr,
      nodes: {
        node: {
          circle: nodeAttr,
          name: nodeAttr,
          attributes: nodeAttr,
        },
        leafNode: {
          circle: nodeAttr,
          name: nodeAttr,
          attributes: nodeAttr,
        },
      }
    }
    return (
      <div id="treeWrapper2" style={{ height: '30em'}}>
        <Tree
          data={treeDataWrapper}
          nodeSvgShape={{shape: 'circle', shapeProps: {r: 10}}}
          translate={{x: 350, y: 100}}
          pathFunc="straight"
          onClick={this.handleClick}
          collapsible={false}
          zoom={1}
          styles={styles}
          textLayout={{transform: 'rotate(-20 70 100)'}}
          orientation="vertical"
        />
      </div>
    );
  }
}