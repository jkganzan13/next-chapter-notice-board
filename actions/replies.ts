'use server';
import { getSession } from '@/lib/auth';
import { Question } from '@/types';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { getNoticeById } from './notices';

export async function getQuestionsWithReplies(
  noticeId: string
): Promise<Question[]> {
  const { rows } =
    await sql`SELECT * FROM replies where "noticeId" = ${noticeId} ORDER BY "createdAt" DESC;`;

  const questions = rows.filter((r) => !r.parentId);

  return questions.map((q) => {
    const children = rows.filter((r) => r.parentId === q.id);
    return {
      ...q,
      children,
    } as Question;
  });
}

export async function createReply(formData: FormData) {
  const noticeId = Number(formData.get('noticeId'));
  const message = formData.get('message') as string;

  // Validate here
  if (!message) {
    throw new Error('Notice and message required');
  }

  try {
    await sql`INSERT INTO replies ("noticeId", message) VALUES (${noticeId}, ${message});`;
  } catch (ex) {
    throw new Error('Unable to post question');
  }

  revalidatePath('/replies');
}

export async function replyToQuestion(formData: FormData) {
  const session = await getSession();

  const noticeId = Number(formData.get('noticeId'));
  const parentId = Number(formData.get('parentId'));
  const message = formData.get('message') as string;

  // Validate here
  if (!session?.id) {
    throw new Error('Unauthorized');
  }

  const notice = await getNoticeById(noticeId);
  if (parseInt(notice?.authorId) !== session.id) {
    throw new Error('Unauthorized');
  }

  try {
    await sql`INSERT INTO replies ("noticeId", "parentId", "userId", message) VALUES (${noticeId},${parentId}, ${session.id}, ${message});`;
  } catch (ex) {
    console.log('====ex', ex);
    throw new Error('Unable to post question');
  }

  revalidatePath('/replies');
}
