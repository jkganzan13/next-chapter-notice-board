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
  parentId?: string;
  userId?: string;
  createdAt: string;
};
