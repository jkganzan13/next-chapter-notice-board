import React from 'react';
import { getSession } from '@/lib/auth';
import InputForm from './input-form';
import { createNotice } from '@/actions/notices';

export default async function NoticeForm() {
  const user = await getSession();

  return (
    <div className="bg-white/60 px-8 py-6 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full flex">
      {user?.image && (
        <div className="h-10 w-10 rounded-full mr-2">
          <img className="rounded-full" alt={user.name} src={user.image} />
        </div>
      )}

      <InputForm className="flex-1 flex flex-col" formAction={createNotice}>
        <input
          className="w-full rounded-full px-3 py-1 text-sm border border-gray-200 rounded-md mb-2"
          name="title"
          placeholder="Enter notice"
        />
        <textarea
          className="w-full rounded-full px-3 py-1 text-sm border border-gray-200 rounded-md mb-2"
          name="description"
          placeholder="Enter description"
        />
      </InputForm>
    </div>
  );
}
