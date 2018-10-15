import React from 'react';
import { divide } from '../reducers/divider/actions';
import { connect } from 'react-redux';
import { wrap } from '../../../../dist/index';
import { rootReducer } from '../reducers/divider';

class Divider extends React.Component {
  render() {
    const { value, fetchIncrement } = this.props;
    return (
      <>
        <h3>page with reducer and without saga</h3>{' '}
        <span>current divider value: {value}</span>{' '}
        <button onClick={fetchIncrement}>divide</button>
      </>
    );
  }
}

const connected = connect(
  ({ divider }) => ({ value: divider.value }),
  dispatch => ({ fetchIncrement: () => dispatch(divide()) })
)(Divider);

export default wrap({
  component: connected,
  reducerName: 'divider',
  reducer: rootReducer
});
