'use client';
import React from 'react';
import { Container, Link, Text, Heading, Dialog } from '@radix-ui/themes';
import { auth } from '@/helpers/firebase';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useLocalstorageState } from 'rooks';
import { useSearchParams } from 'next/navigation';
import { useEffectOnceWhen } from 'rooks';
import useUser from '@/hooks/useUser';
import SignIn from '@/components/Users/SignIn';
import AppWrapper from '@/components/AppWrapper';
import Menu from '@/components/Users/Menu';
import { Provider as UserProvider } from '@/contexts/User';
import useStatusUpdate from '@/hooks/useStatusUpdate';

type SignInWrapperProps = {
  children: React.ReactNode;
  force?: boolean;
};

const SignInWrapper = ({ children, force }: SignInWrapperProps) => {
  const [user, loading] = useUser(true);
  const searchParams = useSearchParams();
  const [sent, setSent] = React.useState(false);
  const [email, setEmail] = useLocalstorageState('bikebusradio:email', '');
  const [open, setOpen] = React.useState(false);
  const onAddMessage = useStatusUpdate();

  const isSignedIn = !!user?.id;

  const onSignedIn = React.useCallback(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      signInWithEmailLink(auth, email, window.location.href).then(() => {
        window.location.href = window.location.origin;
        onAddMessage({ message: 'You are now signed in', variant: 'success' });
      });
    }
  }, [email, onAddMessage]);

  const onComplete = React.useCallback(
    ({ email }: { email: string }) => {
      setEmail(email);
      setSent(true);
    },
    [setEmail],
  );

  useEffectOnceWhen(
    () => {
      onSignedIn();
    },
    !!searchParams.get('oobCode') && !!email,
  );

  if (loading) {
    return <AppWrapper variant="centered" loading />;
  }

  if (sent) {
    return (
      <AppWrapper variant="centered">
        <Container size="1" align="center">
          <Heading align="center" as="h1">
            Check your inbox
          </Heading>
          <Text as="div" align="center">
            Click the link in the email to sign in.
          </Text>
        </Container>
      </AppWrapper>
    );
  }

  if (!isSignedIn && force) {
    return (
      <AppWrapper variant="centered">
        <Container size="1" align="center">
          <Heading as="h1" mb="8" align="center">
            Please sign in to continue
          </Heading>
          <SignIn
            style={{ width: '100%' }}
            email={email}
            onComplete={onComplete}
          />
        </Container>
      </AppWrapper>
    );
  }

  return (
    <UserProvider value={user}>
      <AppWrapper
        actions={
          <>
            {!isSignedIn && (
              <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger>
                  <Link href="#">Sign In</Link>
                </Dialog.Trigger>
                <Dialog.Content>
                  <SignIn email={email} onComplete={onComplete} />
                </Dialog.Content>
              </Dialog.Root>
            )}
            {isSignedIn && <Menu />}
          </>
        }
      >
        {children}
      </AppWrapper>
    </UserProvider>
  );
};

export default SignInWrapper;
