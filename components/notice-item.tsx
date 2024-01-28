import React from 'react';
import { NoticeWithUser } from '@/types';
import { createReply } from '@/actions/replies';
import { getQuestionsWithReplies } from '@/actions/replies';
import { getSession } from '@/lib/auth';
import InputForm from './input-form';
import Question from './question';

interface NoticeProps {
  notice: NoticeWithUser;
}

export default async function NoticeItem({ notice }: NoticeProps) {
  const questions = await getQuestionsWithReplies(notice.id);
  const user = await getSession();

  return (
    <div className="bg-white/60 p-8 pb-6 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full mb-4">
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-10 w-10 rounded-full">
          <img className="rounded-full" alt={notice.name} src={notice.image} />
        </div>
        <div>
          <div className="w-50 text-base">{notice.name}</div>
          <div className="w-40 text-xs text-gray-400">{notice.email}</div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold">{notice.title}</h2>
        <p className="text-sm">{notice.description}</p>
      </div>

      <InputForm
        className="pt-4 mt-2 border-t border-gray-200 "
        formAction={createReply}
      >
        <input type="hidden" name="noticeId" value={notice.id} />
        <input
          name="message"
          placeholder="Ask a question..."
          className="w-full rounded-full px-3 py-1 text-sm border border-gray-200"
        />
      </InputForm>

      {questions.length > 0 && (
        <div className="pt-4">
          {questions.map((question) => (
            <Question
              key={question.id}
              isOwner={user?.id === parseInt(notice?.authorId)}
              noticeId={notice.id}
              question={question}
            />
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
