import React, { lazy, Suspense } from 'react';

const LazyPinPage = lazy(() => import('./PinPage'));

const PinPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyPinPage {...props} />
  </Suspense>
);

export default PinPage;
