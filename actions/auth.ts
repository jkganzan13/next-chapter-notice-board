'use server';
import { cookies } from 'next/headers';

// Mock sign in of auth provider
export const signIn = () => {
  cookies().set(
    'auth',
    JSON.stringify({
      id: 1,
      name: 'Lee Robinson',
      email: 'lee@vercel.com',
      image:
        'https://images.ctfassets.net/e5382hct74si/4BtM41PDNrx4z1ml643tdc/7aa88bdde8b5b7809174ea5b764c80fa/adWRdqQ6_400x400.jpg',
    })
  );
};

// Mock sign out of auth provider
export const signOut = () => {
  cookies().delete('auth');
};
