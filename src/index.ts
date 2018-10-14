import * as React from 'react';
import { combineReducers } from 'redux';

export function createLoadableComponent(store: any, sagaMiddleware: any) {
  const loadedReducers: any = {};
  const loadedComponents: any = {};

  return (loader: any, options: any = {}) => {
    if (typeof loader !== 'function') {
      throw new Error('Loader should be function.');
    }

    const { placeholder = null } = options;

    return class LoadableComponent extends React.Component {
      state = { component: null };

      componentWillMount() {
        loader().then((module: any) => {
          const {
            wrapperResult,
            component,
            reducerName,
            reducer,
            saga
          } = module.default;

          if (!wrapperResult) {
            throw new Error(
              'Loaded module may not be a wrapModule result. Please, use wrapModule function to wrap loadable module.'
            );
          }

          if (loadedComponents[reducerName]) {
            this.setState({
              component: loadedComponents[reducerName]
            });
            return;
          }

          if (reducerName && reducer) {
            loadedComponents[reducerName] = component;
            loadedReducers[reducerName] = reducer;
            store.replaceReducer(combineReducers(loadedReducers));
          }

          if (saga) {
            sagaMiddleware.run(saga);
          }

          this.setState({ component: component });
        });
      }

      render() {
        if (this.state.component) {
          return React.createElement(this.state.component!);
        }

        return placeholder;
      }
    };
  };
}

export function wrapModule({ component, reducerName, reducer, saga }: any) {
  if (!component) {
    throw new Error('Component should be provided.');
  }

  if ((!reducerName && reducer) || (reducerName && !reducer)) {
    throw new Error(
      `'reducerName' cannot be provided without 'reducer' and vice versa.`
    );
  }

  if (
    typeof saga !== 'function' ||
    saga.constructor.name !== 'GeneratorFunction'
  ) {
    throw new Error('Saga must be a generator function.');
  }

  return {
    wrapperResult: true,
    component,
    reducerName,
    reducer,
    saga
  };
}
