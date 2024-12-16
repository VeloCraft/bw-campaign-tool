'use client';
 
import { useSession, SessionProvider } from 'next-auth/react';
import SignIn from '@/components/signin-button';
import Image from 'next/image';
 
const Avatar = () => {
  const session = useSession();
  const fallbackURL = "https://www.gravatar.com/avatar/"

 
  return (
    <SessionProvider>
     {(session.status === "authenticated") ? ( <Image className="h-8 w-8 rounded-full border border-gray-300 shadow-sm" width={32} height={32} src={session?.data?.user?.image || fallbackURL } alt={session?.data?.user?.name || "User"}/>


                ) : (
                
                <SignIn />)

  }
     </SessionProvider>
  )
}

export default Avatar;
