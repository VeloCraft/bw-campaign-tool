import React from 'react';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { Card } from '@radix-ui/themes';
import Form, { Field } from '@/components/Form';
import { auth } from '@/helpers/firebase';

type SignInProps = {
  email?: string;
  onComplete: (data: { email: string }) => void;
  style?: React.CSSProperties;
};

const SignIn = ({ email, onComplete, style = {} }: SignInProps) => {
  const onSignIn = async (data: FormSubmission) => {
    await sendSignInLinkToEmail(auth, data.email as string, {
      url: window.location.href,
      handleCodeInApp: true,
    }).then(() => onComplete({ email: data.email as string }));
  };

  return (
    <Card size="3" style={{ width: '300px', ...style }}>
      <Form
        onSubmit={onSignIn}
        initialValues={{ email }}
        noCancel
        submitLabel="Send sign in link"
      >
        <Field
          name="email"
          label="Email"
          type="email"
          defaultValue={email}
          required
        />
      </Form>
    </Card>
  );
};

export default SignIn;
