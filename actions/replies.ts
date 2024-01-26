'use server';
import { Reply } from '@/types';
import { sql } from '@vercel/postgres';

export async function getReplies(noticeId: string): Promise<Reply[]> {
  const { rows } =
    await sql`SELECT * FROM replies where "noticeId" = ${noticeId} ORDER BY "createdAt" DESC;`;
  return rows as Reply[];
}
