import { Suspense } from 'react';
import NoticeForm from '@/components/notice-form';
import NoticeItem from '@/components/notice-item';
import { getSession } from '@/lib/auth';
import { NoticeWithUser } from '@/types';

export const revalidate = 0;

// Using route handler
const getNotices = async (): Promise<NoticeWithUser[]> => {
  const notices = await fetch(`${process.env.DOMAIN}/api/notices`);
  return notices.json();
};

export default async function HomePage() {
  const notices = await getNotices();
  const session = await getSession();

  return (
    <main className="relative flex min-h-screen flex-col items-center p-8">
      {!!session && <NoticeForm />}

      <h1 className="pt-4 pb-8 mt-4 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-4xl font-medium tracking-tight text-transparent md:text-4xl">
        Notices
      </h1>

      {notices?.length > 0 ? (
        notices.map((notice) => (
          <Suspense key={notice.id} fallback={<NoticeItem.Skeleton />}>
            <NoticeItem notice={notice} />
          </Suspense>
        ))
      ) : (
        <div className="bg-white/30 p-8 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
          No notices
        </div>
      )}
    </main>
  );
}
