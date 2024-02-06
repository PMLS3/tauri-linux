import React, { lazy, Suspense } from 'react';

const LazyActionRequiredPage = lazy(() => import('./ActionRequiredPage'));

const ActionRequiredPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyActionRequiredPage {...props} />
  </Suspense>
);

export default ActionRequiredPage;
