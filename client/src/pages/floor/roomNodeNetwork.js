import React, { Component } from 'react';

import NodeNetwork from '../node/nodeNetwork';

export default class RoomNodeNetwork extends Component {

  render() {
    const { router, room } = this.props;
    let node = room.node;
    return <NodeNetwork room={room} node={node} router={router}/>
  }
}