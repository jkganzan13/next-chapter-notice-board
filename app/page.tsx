import { Suspense } from 'react';
import NoticeItem from '@/components/notice-item';
import { NoticeWithUser } from '@/types';

export const revalidate = 0;

// Using route handler
const getNotices = async (): Promise<NoticeWithUser[]> => {
  const notices = await fetch('http://localhost:3000/api/notices');
  return notices.json();
};

export default async function HomePage() {
  const notices = await getNotices();

  return (
    <main className="relative flex min-h-screen flex-col items-center p-8">
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-4xl">
        Next Chapter Notice Board
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
