import React from 'react';
import { Notice } from '@/types';

interface NoticeProps {
  notice: Notice;
}

export default function NoticeItem({ notice }: NoticeProps) {
  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      POST
    </div>
  );
}

NoticeItem.Skeleton = function NoticeItemSkeleton() {
  return (
    <div className="bg-white/30 p-8 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
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
