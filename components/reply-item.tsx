import { Reply, User } from '@/types';
import React from 'react';
import InputForm from './input-form';
import { replyToQuestion } from '@/actions/replies';

interface ReplyItemProps {
  canReply: boolean;
  noticeId: string;
  reply: Reply;
}

export default function ReplyItem({
  canReply,
  noticeId,
  reply,
}: ReplyItemProps) {
  return (
    <div>
      <div className="bg-white w-full border border-gray-100 p-2 rounded text-sm mb-2 shadow">
        <b>Q:</b> {reply.message}
      </div>

      {canReply && (
        <InputForm className="mb-4" formAction={replyToQuestion}>
          <input type="hidden" name="noticeId" value={noticeId} />
          <input type="hidden" name="parentId" value={reply.id} />
          <input
            className="w-full rounded-full px-3 py-1 text-sm border border-gray-200 rounded-md ml-4"
            name="message"
            placeholder="Enter reply"
          />
        </InputForm>
      )}
    </div>
  );
}
