import React, { lazy, Suspense } from 'react';

const LazyDeclinedPage = lazy(() => import('./DeclinedPage'));

const DeclinedPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDeclinedPage {...props} />
  </Suspense>
);

export default DeclinedPage;
