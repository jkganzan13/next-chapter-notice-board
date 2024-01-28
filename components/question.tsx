import { Question } from '@/types';
import React from 'react';
import InputForm from './input-form';
import { replyToQuestion } from '@/actions/replies';

interface ReplyItemProps {
  isOwner: boolean;
  noticeId: string;
  question: Question;
}
const ReplyItem = ({ message }: { message: string }) => {
  return (
    <div className="pl-8">
      <div className="bg-white w-full border border-gray-100 p-2 rounded text-sm mb-2 shadow ">
        <b>A:</b> {message}
      </div>
    </div>
  );
};

export default function Question({
  isOwner,
  noticeId,
  question,
}: ReplyItemProps) {
  return (
    <div>
      <div className="bg-white w-full border border-gray-100 p-2 rounded text-sm mb-2 shadow">
        <b>Q:</b> {question.message}
      </div>

      {/* Replies */}
      {question.children.map((c) => (
        <ReplyItem key={c.id} message={c.message} />
      ))}

      {isOwner && question.children.length === 0 && (
        <InputForm className="mb-4" formAction={replyToQuestion}>
          <input type="hidden" name="noticeId" value={noticeId} />
          <input type="hidden" name="parentId" value={question.id} />
          <input
            className="w-full rounded-full px-3 py-1 text-sm border border-gray-200 rounded-md ml-8"
            name="message"
            placeholder="Enter reply"
          />
        </InputForm>
      )}
    </div>
  );
}
