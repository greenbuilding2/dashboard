import React, { Component } from 'react';
import {
  Marker,
  InfoWindow,
} from 'react-google-maps';

import BuildingSummary from '../pages/building/buildingSummary';

export default class MarkerWithInfoWindow extends Component {

  constructor() {
    super();
    this.state = {
      isOpen: false
    }
    this.onToggleOpen = this.onToggleOpen.bind(this);
  }

  onToggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleClick = () => {
    const { building, router } = this.props;
    router.push(`/building/${building.id}`);
  }

  render() {
    return (
    <Marker
      position={this.props.position}
      onClick={this.onToggleOpen}>
      {this.state.isOpen && <InfoWindow onCloseClick={this.onToggleOpen}>
        <div onClick={this.handleClick}>
          <BuildingSummary building={this.props.building} />
        </div>
      </InfoWindow>}
    </Marker>)
  }
}