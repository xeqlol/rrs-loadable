import React from 'react';
import { fetchIncrement } from '../reducers/incrementer/actions';
import { connect } from 'react-redux';
import { wrapModule } from '../../../../dist/index';
import { rootReducer, rootSaga } from '../reducers/incrementer';

class Incrementer extends React.Component {
  render() {
    const { value, fetchIncrement } = this.props;
    return (
      <>
        <h3>page with reducer and saga</h3>{' '}
        <span>current incremental value: {value}</span>{' '}
        <button onClick={fetchIncrement}>increment</button>
      </>
    );
  }
}

const connected = connect(
  ({ incrementer }) => ({ value: incrementer.value }),
  dispatch => ({ fetchIncrement: () => dispatch(fetchIncrement()) })
)(Incrementer);

export default wrapModule({
  component: connected,
  reducerName: 'incrementer',
  reducer: rootReducer,
  saga: rootSaga
});
