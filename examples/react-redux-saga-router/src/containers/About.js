import React from 'react';
import { wrap } from '../../../../dist/index';

class About extends React.Component {
  render() {
    return (
      <>
        <h3>page without reducer and without saga</h3> <div>simple page</div>
      </>
    );
  }
}

export default wrap({ component: About });
