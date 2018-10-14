import React from 'react';
import { wrapModule } from '../../../../dist/index';

class About extends React.Component {
  render() {
    return (
      <>
        <h3>page without reducer and without saga</h3> <div>simple page</div>
      </>
    );
  }
}

export default wrapModule({ component: About });
