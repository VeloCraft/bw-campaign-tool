'use client';
import React from 'react';
import { Button } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';

const SignInMenu = () => {
  const [loading, setLoading] = React.useState(false);

  const onSignIn = async () => {
    setLoading(true);
    await signIn('discord');
    setLoading(false);
  };

  return (
    <Button size="3" loading={loading} variant="outline" onClick={onSignIn}>
      Sign in
    </Button>
  );
};

export default SignInMenu;
