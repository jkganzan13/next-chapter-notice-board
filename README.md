---
name: Next Chapter Notice Board
description: Notice Board that uses Vercel Postgres as the database.
framework: Next.js 14
css: Tailwind
database: Vercel Postgres
deployUrl: https://next-chapter-notice-board.vercel.app/
---

# Next Chapter Notice Board

Simple Next.js template that uses [Vercel Postgres](https://vercel.com/postgres) as the database. Template from: https://postgres-starter.vercel.app/

## Demo

Link: https://next-chapter-notice-board.vercel.app/

Due to time constraints, the authentication has been mocked and stored in a cookie. When you click login, you will be logged in automatically as "Lee Robinson"

## Tasks

### Database

- [x] Create notices table
- [x] Create users table
- [x] Create replies table (stores both questions and replies to those questions)

### Notices

- [x] (backend) Create notice
- [x] (backend) Read notice
- [ ] (backend) Update notice
- [ ] (backend) Delete notice
- [x] (UI) Show all notices
- [x] (UI) Create notice form (show only for logged in users)
- [ ] (UI) Update notice form
- [ ] (UI) Delete notice button
- [ ] (UI) Clicking notice should open a detailed view

### Questions / replies

- [x] (backend) Create question/reply
- [x] (UI) Show questions/replies on the notices
- [x] Ensure that only the author of a notice can respond to questions about their notice.
