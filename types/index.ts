export type Notice = {
  id: string;
  authorId: string;
  title: string;
  description: string;
  createdAt: string;
};

export type User = {
  id: string;
  name: string;
  createdAt: string;
  image: string;
};

export type NoticeWithUser = Notice & User;

export type Reply = {
  id: string;
  noticeId: string;
  message: string;
  parentId?: string;
  userId?: string | null;
  createdAt: string;
};
