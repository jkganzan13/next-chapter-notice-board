'use server';
import { Reply } from '@/types';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function getReplies(noticeId: string): Promise<Reply[]> {
  const { rows } =
    await sql`SELECT * FROM replies where "noticeId" = ${noticeId} ORDER BY "createdAt" DESC;`;
  return rows as Reply[];
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
