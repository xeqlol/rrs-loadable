import * as React from 'react';
import { Store, combineReducers, Reducer } from 'redux';
import { SagaMiddleware } from 'redux-saga';

interface Options {
  placeholder?: React.ReactNode;
}

interface WrapperArguments {
  component: React.ReactNode;
  reducerName?: string;
  reducer?: Reducer;
  saga?: (...args: any[]) => any;
}
interface LoadableModule extends WrapperArguments {
  __SECRET_KEY_DO_NOT_USE_PLEASE_OH_GOD_WHY: string;
}

const __SECRET_KEY_DO_NOT_USE_PLEASE_OH_GOD_WHY = 'SUPER_MEGA_KEY';

export function createLoadableComponent(
  store: Store,
  sagaMiddleware?: SagaMiddleware<{}>
) {
  const loadedReducers: any = {};
  const loadedComponents: any = {};

  return (loader: () => Promise<LoadableModule>, options: Options = {}) => {
    if (typeof loader !== 'function') {
      throw new Error('Loader should be function.');
    }

    const { placeholder = null } = options;

    return class LoadableComponent extends React.Component {
      state = { component: null };

      componentWillMount() {
        loader().then((module: any) => {
          const {
            __SECRET_KEY_DO_NOT_USE_PLEASE_OH_GOD_WHY,
            component,
            reducerName,
            reducer,
            saga
          } = module.default;

          if (!__SECRET_KEY_DO_NOT_USE_PLEASE_OH_GOD_WHY) {
            throw new Error(
              'Probably, loaded module is not a result of wrap function. Please, use wrap function to wrap loadable module.'
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

          if (sagaMiddleware && saga) {
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

export function wrap({
  component,
  reducerName,
  reducer,
  saga
}: WrapperArguments): LoadableModule {
  if (!component) {
    throw new Error('Component should be provided.');
  }

  if ((!reducerName && reducer) || (reducerName && !reducer)) {
    throw new Error(
      `reducerName cannot be provided without reducer and vice versa.`
    );
  }

  if (
    saga &&
    (typeof saga !== 'function' ||
      saga.constructor.prototype.name !== 'GeneratorFunctionPrototype')
  ) {
    throw new Error('Saga must be a generator function.');
  }

  return {
    __SECRET_KEY_DO_NOT_USE_PLEASE_OH_GOD_WHY,
    component,
    reducerName,
    reducer,
    saga
  };
}
