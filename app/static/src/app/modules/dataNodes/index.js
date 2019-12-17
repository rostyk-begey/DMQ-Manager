import React, { Suspense } from 'react';

const DataNodesContainer = React.lazy(() => import('./containers/dataNodes'));

export const DataNodesLoadable = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <DataNodesContainer {...props} />
  </Suspense>
);
