import React, { Suspense } from 'react';

const UsersContainer = React.lazy(() => import('./containers/users'));

export const UsersLoadable = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <UsersContainer {...props} />
  </Suspense>
);
