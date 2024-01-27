import React from 'react';
import { getSession } from '@/lib/auth';
import InputForm from './input-form';

export default async function NoticeForm() {
  const user = await getSession();

  return (
    <div className="bg-white/60 px-8 py-6 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full flex">
      {user?.image && (
        <div className="h-10 w-10 rounded-full mr-2">
          <img className="rounded-full" alt={user.name} src={user.image} />
        </div>
      )}

      <InputForm
        className="flex-1"
        inputProps={{ placeholder: 'Start a notice...' }}
      />
    </div>
  );
}
