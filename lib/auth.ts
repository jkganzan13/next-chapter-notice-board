import { cookies } from 'next/headers';

// Get session data via auth provider
export const getSession = async () => {
  const session = cookies().get('auth');
  return session?.value ? JSON.parse(session?.value) : null;
};
