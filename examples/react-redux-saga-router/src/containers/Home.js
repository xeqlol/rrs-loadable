import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        Home
        <ul>
          <li>
            <Link to="/incrementer">Incrementer</Link>
          </li>
          <li>
            <Link to="/multiplier">Multiplier</Link>
          </li>
          <li>
            <Link to="/divider">Divider</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    );
  }
}
