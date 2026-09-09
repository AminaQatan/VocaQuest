# VocaQuest

Interactive Level 2 vocational English game developed for Ms. Amina Qatan's students.

## The game

- Six worlds: Machines and Tools; Actions in Workshops; Hazards in Workshops; Past Events and Stories; Made in Oman; Instructions.
- Running and jumping worker character, themed scenery, coins, obstacles, and black-and-white finish flags.
- 132 vocabulary, grammar, listening, and reading questions, including dictation and scrambled words.
- Tongue-twister practice with voice recording and a two-line picture-writing activity in each unit. Both are unmarked.
- Saved student progress and a Learning Skills Marks dashboard with response management.
- Purple app theme, original gentle music, and a gift opening to reveal the certificate.

## Marks

Each unit contributes up to 100 learning coins, for 600 coins across six units. Collecting at least 570 learning coins (95%) awards 10/10 in the final progress column. Below that threshold, the total is converted proportionally to a mark out of 10. Platformer bonus coins are for play and do not change learning marks. Writing and tongue twisters do not affect marks.

## Hosting status

This repository contains the game's source code and artwork. Uploading it to GitHub does not deploy a student website, move student data, or automatically synchronize future edits made elsewhere.

The current application uses a Cloudflare Worker, D1 database (`DB`), R2 audio storage (`BUCKET`), and Sites-managed ChatGPT authentication. GitHub Pages cannot host the complete application on its own. Student records, recordings, runtime credentials, and local database files are not included here.

Before hosting outside Sites, provision the database and audio storage, apply the migrations, configure the teacher account through the `TEACHER_EMAIL` environment setting, and replace Sites authentication with verified sessions. The existing authentication headers are trustworthy only behind the Sites authentication proxy; do not expose that implementation directly on another host.

## Local development

Requires Node.js 22.13.0 or newer. A fresh clone defaults to the portable execution profile.

```sh
npm run install:ci
npm run build
```

Initialize the local database once, applying these migrations in order:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_nostalgic_polaris.sql
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0001_moaning_talisman.sql
npm run dev
```

Open the local address printed by the development server. Portable development provides a mock account on loopback requests through `/signin-with-chatgpt?return_to=/`; it is not production authentication. See [development details](docs/SITES-DEVELOPMENT.md) for the existing framework and Sites workflow.

## Project layout

- `app/`: game screens, platformer, music, voice practice, and API routes.
- `lib/`: curriculum questions, scoring, world themes, and game helpers.
- `public/`: artwork, icons, and offline assets.
- `db/` and `drizzle/`: database schema and migrations, without student data.

This source upload preserves the purple theme and original gentle music from the current game.
