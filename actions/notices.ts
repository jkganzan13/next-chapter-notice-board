'use server';

import { auth } from '@/lib/auth';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function postQuestion(formData: FormData) {
  const noticeId = Number(formData.get('noticeId'));
  const message = formData.get('message') as string;

  // Validate here
  if (!message) {
    throw new Error('Notice and message required');
  }

  try {
    await sql`INSERT INTO replies ("noticeId", message) VALUES (${noticeId}, ${message});`;
  } catch {
    throw new Error('Unable to post question');
  }

  revalidatePath('/notices');
}
