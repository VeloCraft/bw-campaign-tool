'use client';

import React from 'react';
import SignInWrapper from '@/components/SignInWrapper';
import Floods from '@/components/Floods/index';

const Page = () => {
  return (
    <React.Suspense>
      <SignInWrapper breadcrumbs={[{ label: 'Flood map' }]} force>
        <Floods editable />
      </SignInWrapper>
    </React.Suspense>
  );
};

export default Page;
