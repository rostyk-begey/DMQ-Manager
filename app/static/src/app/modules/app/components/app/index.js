import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../home';

import 'c3/c3.css';
import 'tabler-react/dist/Tabler.css';

export const App = props => {
  const { getProfile } = props;

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="page">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};
