import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { createLoadableComponent } from '../../../dist/index';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  state => state,
  {},
  applyMiddleware(sagaMiddleware)
);

export const loadable = createLoadableComponent(store, sagaMiddleware);
