import React from 'react';
import { fetchMultiply } from '../reducers/multiplier/actions';
import { connect } from 'react-redux';
import { wrapModule } from '../../../../dist/index';
import { rootReducer, rootSaga } from '../reducers/multiplier';

class Multiplier extends React.Component {
  render() {
    const { value, fetchMultiply } = this.props;
    return (
      <>
        <h3>page with reducer and saga</h3>{' '}
        <span>current multiplier value: {value}</span>{' '}
        <button onClick={fetchMultiply}>multiply</button>
      </>
    );
  }
}

const connected = connect(
  ({ multiplier }) => ({ value: multiplier.value }),
  dispatch => ({ fetchMultiply: () => dispatch(fetchMultiply()) })
)(Multiplier);

export default wrapModule({
  component: connected,
  reducerName: 'multiplier',
  reducer: rootReducer,
  saga: rootSaga
});
