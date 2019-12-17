import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute, UnauthRoute } from 'react-router-auth';
import { HomeLoadable } from 'app/modules/home';
import { DataNodesLoadable } from 'app/modules/dataNodes';
import { QueuesLoadable } from 'app/modules/queues';
import Login from 'app/modules/auth/containers/login';

import 'c3/c3.css';
import 'tabler-react/dist/Tabler.css';

export const App = ({ authToken, getDataNodes, getQueues }) => {
  useEffect(() => {
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
          authenticated={authToken !== ''}
        />
        <AuthRoute
          path="/data-nodes"
          component={DataNodesLoadable}
          redirectTo="/login"
          authenticated={authToken !== ''}
        />
        <AuthRoute
          path="/queues"
          component={QueuesLoadable}
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
