'use server';

import { getSession } from '@/lib/auth';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function getNoticeById(id: number) {
  const { rows } = await sql`SELECT * FROM notices WHERE id = ${id}`;
  return rows[0];
}

export async function createNotice(formData: FormData) {
  const session = await getSession();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  // Validate here
  if (!session?.id) {
    throw new Error('Only authenticated users can create notice');
  }

  try {
    await sql`INSERT INTO notices (title, description, "authorId") VALUES (${title}, ${description}, ${session.id});`;
  } catch {
    throw new Error('Unable to create notice');
  }

  revalidatePath('/notices');
}
