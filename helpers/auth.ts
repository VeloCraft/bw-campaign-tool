import { Tokens, getTokens } from 'next-firebase-auth-edge';
import { cookies } from 'next/headers';
import { getDoc } from '@/helpers/firebaseAdmin';

const toUser = ({ decodedToken }: Tokens): Partial<User> => {
  const { uid, email, picture: photoURL, name: displayName } = decodedToken;

  return {
    id: uid,
    email: email ?? null,
    displayName: displayName ?? null,
    photoURL: photoURL ?? null,
  };
};

const getUser = async (): Promise<User | null> => {
  const tokens = await getTokens(await cookies(), {
    apiKey: process.env.FIREBASE_API_KEY,
    cookieName: 'AuthToken',
    cookieSignatureKeys: [
      process.env.COOKIE_SECRET_CURRENT,
      process.env.COOKIE_SECRET_PREVIOUS,
    ],
    serviceAccount: {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    },
  });
  const currentUser = tokens ? toUser(tokens) : null;
  const user = currentUser
    ? await getDoc<User>(`users/${currentUser.id}`)
    : null;
  if (user) return user;
  return null;
};

export default getUser;
