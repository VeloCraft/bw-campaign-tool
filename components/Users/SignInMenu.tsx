'use client';
import React from 'react';
import SignIn from './SignIn'; 
import  Register  from './Register';

const SignInMenu = () => {

  return (
    <>
    <Register>
    Register
    </Register>
    <SignIn> 
      Sign in
    </SignIn>
    </>
  );
};

export default SignInMenu;
