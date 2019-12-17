import React, { Suspense } from 'react';

const HomeContainer = React.lazy(() => import('./containers/home'));

export const HomeLoadable = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <HomeContainer {...props} />
  </Suspense>
);
