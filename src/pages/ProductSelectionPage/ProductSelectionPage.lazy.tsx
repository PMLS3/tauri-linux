import React, { lazy, Suspense } from 'react';

const LazyProductSelectionPage = lazy(() => import('./ProductSelectionPage'));

const ProductSelectionPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyProductSelectionPage {...props} />
  </Suspense>
);

export default ProductSelectionPage;
