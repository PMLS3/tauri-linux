import React, { lazy, Suspense } from 'react';

const LazyTieredProductSelectionPage = lazy(() => import('./TieredProductSelectionPage'));

const TieredProductSelectionPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyTieredProductSelectionPage {...props} />
  </Suspense>
);

export default TieredProductSelectionPage;
