import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute, UnauthRoute } from 'react-router-auth';
import { Home } from 'app/modules/home/components/home';
import DataNodes from 'app/modules/dataNodes/components/dataNodes';
import Login from 'app/modules/auth/containers/login';

import 'c3/c3.css';
import 'tabler-react/dist/Tabler.css';

export const App = ({ authToken }) => {
  return (
    <div className="page">
      <Switch>
        <AuthRoute
          exact
          path="/"
          component={Home}
          redirectTo="/login"
          authenticated={authToken !== ''}
        />
        <AuthRoute
          path="/data-nodes"
          component={DataNodes}
          redirectTo="/login"
          authenticated={authToken !== ''}
        />
        <UnauthRoute
          exact
          path="/login"
          component={Login}
          redirectTo="/"
          authenticated={authToken !== ''}
        />
      </Switch>
    </div>
  );
};
