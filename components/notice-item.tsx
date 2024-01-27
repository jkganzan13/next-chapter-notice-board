import React from 'react';
import { NoticeWithUser } from '@/types';
import { postQuestion } from '@/actions/notices';
import { getReplies } from '@/actions/replies';
import InputForm from './input-form';

interface NoticeProps {
  notice: NoticeWithUser;
}

export default async function NoticeItem({ notice }: NoticeProps) {
  const replies = await getReplies(notice.id);

  return (
    <div className="bg-white/60 p-8 pb-6 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-10 w-10 rounded-full">
          <img className="rounded-full" alt={notice.name} src={notice.image} />
        </div>
        <div>
          <div className="w-50 text-base">{notice.name}</div>
          <div className="w-40 text-xs text-gray-400">Author name</div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold">{notice.title}</h2>
        <p className="text-sm">{notice.description}</p>
      </div>

      <InputForm formAction={postQuestion}>
        <input type="hidden" name="noticeId" value={notice.id} />
      </InputForm>

      {replies.length > 0 && (
        <div className="pt-4">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="bg-white w-full border border-gray-100 p-2 rounded text-sm mb-2 shadow"
            >
              <b>Q:</b> {reply.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

NoticeItem.Skeleton = function NoticeItemSkeleton() {
  return (
    <div className="bg-white/60 p-8 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
        <div className="space-y-1 flex-1">
          <div className="h-6 w-50 rounded-md bg-gray-200 animate-pulse" />
          <div className="h-4 w-40 rounded-md bg-gray-200 animate-pulse" />
        </div>
      </div>
      <div className="h-12 bg-gray-200 rounded-md animate-pulse w-100"></div>
    </div>
  );
};
