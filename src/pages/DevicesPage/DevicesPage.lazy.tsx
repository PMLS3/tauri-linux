import React, { lazy, Suspense } from 'react';

const LazyDevicesPage = lazy(() => import('./DevicesPage'));

const DevicesPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <h1>Loading</h1>
    <LazyDevicesPage {...props} />
  </Suspense>
);

export default DevicesPage;
