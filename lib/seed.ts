import { sql } from '@vercel/postgres';

export async function seed() {
  const createTable = await Promise.all([
    sql`
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      image VARCHAR(255),
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `,
    sql`
    CREATE TABLE IF NOT EXISTS notices (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      "authorId" BIGINT NOT NULL,
      CONSTRAINT fk_author_id FOREIGN KEY("authorId") REFERENCES users(id)
    );
    `,
    sql`
    CREATE TABLE IF NOT EXISTS replies (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      "noticeId" BIGINT NOT NULL,
      "userId" BIGINT,
      "parentId" BIGINT,
      message TEXT NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_notice_id FOREIGN KEY("noticeId") REFERENCES notices(id) ON DELETE CASCADE,
      CONSTRAINT fk_user_Id FOREIGN KEY("userId") REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT fk_parent_id FOREIGN KEY("parentId") REFERENCES replies(id) ON DELETE CASCADE
    );
    `,
  ]);

  console.log(`Created "users" table`);

  const users = await Promise.all([
    sql`
          INSERT INTO users (name, email, image)
          VALUES ('Guillermo Rauch', 'rauchg@vercel.com', 'https://images.ctfassets.net/e5382hct74si/2P1iOve0LZJRZWUzfXpi9r/9d4d27765764fb1ad7379d7cbe5f1043/ucxb4lHy_400x400.jpg')
          ON CONFLICT (email) DO NOTHING;
      `,
  ]);
  console.log(`Seeded ${users.length} users`);

  return {
    createTable,
    users,
  };
}

// INSERT INTO notices (title, description, "authorId") VALUES ('Hello world', 'This is a description', 1)
