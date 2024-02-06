import React, { lazy, Suspense } from 'react';

const LazyThankYouPage = lazy(() => import('./ThankYouPage'));

const ThankYouPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyThankYouPage {...props} />
  </Suspense>
);

export default ThankYouPage;
