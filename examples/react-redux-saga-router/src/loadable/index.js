import React from 'react';
import { combineReducers } from 'redux';

export function createLoadableComponent(store, sagaMiddleware) {
  const loadedReducers = {};
  const loadedComponents = {};

  return loader => {
    return class LoadableComponent extends React.Component {
      state = { componentLoaded: false, component: null };

      componentWillMount() {
        loader().then(module => {
          const { component, reducerName, reducer, saga } = module.default;

          if (loadedComponents[reducerName]) {
            this.setState({
              componentLoaded: true,
              component: loadedComponents[reducerName]
            });
            return;
          }

          loadedComponents[reducerName] = component;
          loadedReducers[reducerName] = reducer;

          store.replaceReducer(combineReducers(loadedReducers));
          sagaMiddleware.run(saga);

          this.setState({ componentLoaded: true, component: component });
        });
      }

      render() {
        if (!this.state.componentLoaded) {
          return <div>loading</div>;
        }
        const Component = this.state.component;
        return <Component />;
      }
    };
  };
}

export function wrapModule({ component, reducerName, reducer, saga }) {
  return {
    component,
    reducerName,
    reducer,
    saga
  };
}
