import React, { lazy, Suspense } from 'react';

const LazyCheckoutPage = lazy(() => import('./CheckoutPage'));

const CheckoutPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCheckoutPage {...props} />
  </Suspense>
);

export default CheckoutPage;
