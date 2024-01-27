import { signIn, signOut } from '@/actions/auth';
import { getSession } from '@/lib/auth';

export default async function Navbar() {
  const session = await getSession();

  return (
    <header className="flex h-15 items-center justify-center py-2 bg-white">
      <nav className="flex w-full max-w-xl justify-between">
        <div className="flex items-center gap-1">
          <img
            alt="NC"
            className="w-6 h-6"
            src="https://framerusercontent.com/images/e0FpHX7MDKrQX6aBiNUAmrAqDg.png"
          />
          <span className="font-semibold">Next Chapter</span>
        </div>
        <form action={session ? signOut : signIn}>
          <button
            type="submit"
            className="bg-blue-500 rounded-md w-20 text-sm px-2 py-1 text-white font-semibold ml-2"
          >
            {session ? 'Logout' : 'Login'}
          </button>
        </form>
      </nav>
    </header>
  );
}
