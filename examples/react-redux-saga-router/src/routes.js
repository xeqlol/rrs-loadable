import React from 'react';
import { Route } from 'react-router-dom';
import Home from './containers/Home';
import { loadable } from './configureStore';

const IncrementerLoadable = loadable(() => import('./containers/Incrementer'), {
  placeholder: <div>loading incrementer</div>
});

const MultiplierLoadable = loadable(() => import('./containers/Multiplier'), {
  placeholder: <div>loading multiplier</div>
});

const DividerLoadable = loadable(() => import('./containers/Divider'), {
  placeholder: <div>loading divider</div>
});

const AboutLoadable = loadable(() => import('./containers/About'), {
  placeholder: <div>loading divider</div>
});

export default class Routes extends React.Component {
  render() {
    return (
      <>
        <Route exact path="/" component={Home} />
        <Route path="/incrementer" component={IncrementerLoadable} />
        <Route path="/multiplier" component={MultiplierLoadable} />
        <Route path="/divider" component={DividerLoadable} />
        <Route path="/about" component={AboutLoadable} />
      </>
    );
  }
}
