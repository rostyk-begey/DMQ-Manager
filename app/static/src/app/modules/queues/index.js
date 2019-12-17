import React, { Suspense } from 'react';

const QueuesContainer = React.lazy(() => import('./containers/queues'));

export const QueuesLoadable = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <QueuesContainer {...props} />
  </Suspense>
);
