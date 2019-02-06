import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';

import MapWithASearchBox from '../component/Map';


class Home extends Component {
  componentDidMount() {
  }
  render() {
    console.log("this.props>>>", this.props);
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <MapWithASearchBox router={this.props.router}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Home;
