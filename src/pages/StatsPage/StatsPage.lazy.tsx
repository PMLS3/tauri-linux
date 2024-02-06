import React, { lazy, Suspense } from 'react';

const LazyStatsPage = lazy(() => import('./StatsPage'));

const StatsPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <h1>Loading</h1>
    <LazyStatsPage {...props} />
  </Suspense>
);

export default StatsPage;
