import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import Tree from 'react-d3-tree';
import { Button } from 'semantic-ui-react';

export default class NodeNetwork extends Component {

  handleClick = (nodeData, evt) => {
    const { router } = this.props;
    if(nodeData.sensor_id) {
      router.push(`/dashboard?type=sensor&id=${nodeData.sensor_id}`);
    } else if (nodeData.node_id) {
      router.push(`/node/${nodeData.node_id}`);
    }
  }
  render() {
    let treeDataWrapper = [];
    const { node, room } = this.props;
    let treeData = {
      name: `node:${node.id}`,
      node_id: node.id,
      nodeSvgShape: {
        shape: 'rect',
        shapeProps: {
          width: 20,
          height: 20,
          x: -10,
          y: -10,
          fill: 'black',
        },
      },
    }
    treeData.children = _.map(node.sensors, child => {
      return {
        name: `${child.type}:${child.id}`,
        sensor_id: child.id,
        nodeSvgShape: {
          shape: 'circle',
          shapeProps: {
            r: 10,
            fill: 'gray',
          },
        },
      };
    });
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
          textLayout:{transform: 'translate(10px 10px)'}
        },
        leafNode: {
          circle: nodeAttr,
          name: nodeAttr,
          attributes: nodeAttr,
          textLayout:{transform: 'translate(10px 10px)'}
        },
      }
    }
    return (
      <div>
        <div id="treeWrapper" style={{ height: '30em', boxShadow: '2px 3px 4px #666'}}>
          <Tree
            data={treeDataWrapper}
            nodeSvgShape={{shape: 'circle', shapeProps: {r: 10}}}
            translate={{x: 300, y: 50}}
            pathFunc="straight"
            onClick={this.handleClick}
            collapsible={false}
            zoom={1}
            styles={styles}
            orientation="vertical"
          />

        </div>
        <div>
          {room && <Link to={`/dashboard?type=room&id=${room.id}`}><Button>Chceck sensor data</Button></Link>}
        </div>
      </div>
    );
  }
}