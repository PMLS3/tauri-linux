import React, { lazy, Suspense } from 'react';

const LazySuccessPage = lazy(() => import('./SuccessPage'));

const SuccessPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySuccessPage {...props} />
  </Suspense>
);

export default SuccessPage;
