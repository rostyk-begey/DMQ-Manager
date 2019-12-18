import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute, UnauthRoute } from 'react-router-auth';
import { HomeLoadable } from 'app/modules/home';
import { DataNodesLoadable } from 'app/modules/dataNodes';
import { QueuesLoadable } from 'app/modules/queues';
import { UsersLoadable } from 'app/modules/users';
import Login from 'app/modules/auth/containers/login';

import 'c3/c3.css';
import 'tabler-react/dist/Tabler.css';

export const App = ({ accessToken, getDataNodes, getQueues, getUsers }) => {
  useEffect(() => {
    getUsers();
    getQueues();
    getDataNodes();
  }, []);

  return (
    <div className="page">
      <Switch>
        <AuthRoute
          exact
          path="/"
          component={HomeLoadable}
          redirectTo="/login"
          authenticated={accessToken !== ''}
        />
        <AuthRoute
          path="/data-nodes"
          component={DataNodesLoadable}
          redirectTo="/login"
          authenticated={accessToken !== ''}
        />
        <AuthRoute
          path="/queues"
          component={QueuesLoadable}
          redirectTo="/login"
          authenticated={accessToken !== ''}
        />
        <AuthRoute
          path="/users"
          component={UsersLoadable}
          redirectTo="/login"
          authenticated={accessToken !== ''}
        />
        <UnauthRoute
          exact
          path="/login"
          component={Login}
          redirectTo="/"
          authenticated={accessToken !== ''}
        />
      </Switch>
    </div>
  );
};
