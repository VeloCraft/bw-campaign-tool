'use client';
import React from 'react';
import SignInWrapper from '@/components/SignInWrapper';
import Map from '@/components/Maps';
import Editor from '@/components/TrafficSpeed/Editor';

type ComponentProps = {
  user?: User;
};

const Component = ({ user }: ComponentProps) => {
  return (
    <SignInWrapper
      force
      user={user}
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Traffic speed' },
      ]}
      innerProps={{ p: '0', height: '100%' }}
    >
      <Map>
        <Editor />
      </Map>
    </SignInWrapper>
  );
};

export default Component;
