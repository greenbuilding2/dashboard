import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

const Loading = () => (
  <Segment>
    <Dimmer active inverted>
      <Loader inverted content='Loading' />
    </Dimmer>
  </Segment>

)

export default Loading;