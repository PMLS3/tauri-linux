import React, { lazy, Suspense } from 'react';

const LazyAboutPage = lazy(() => import('./AboutPage'));

const AboutPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAboutPage {...props} />
  </Suspense>
);

export default AboutPage;
