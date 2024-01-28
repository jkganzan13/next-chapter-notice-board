import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Example of using route handlers. We should try to use server actions instead.
export async function GET() {
  try {
    const { rows } =
      await sql`SELECT notices.*, users.email, users.name, users.image FROM notices JOIN users ON "authorId" = users.id;`;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
