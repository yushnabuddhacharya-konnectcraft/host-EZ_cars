k# ez-cars Backend — Hono + PostgreSQL (Local Development)

This is the backend for **ez-cars**, using **Hono (Node + TypeScript)** and **PostgreSQL** running in Docker.  

It is designed for **local development**, not production deployment yet.

---

## Requirements

- Node.js 18+ and npm
- Docker & Docker Compose
- Git (to clone the repo)

---

## Directory Structure

```
backend/
 ├─ src/
 │  ├─ index.ts          # App entrypoint
 │  ├─ db.ts             # DB connection
 │  └─ routes/
 │     └─ users.ts       # Users API routes
 ├─ package.json
 ├─ tsconfig.json
 ├─ .env.example
 ├─ docker-compose.db.yml
 └─ db/
    └─ init/
       └─ 01_create_users.sql
```

## Clone the repository

```bash
git clone <your-repo-url>
cd ez-cars/backend
npm install
npm run dev
cp .env.example .env
```

## Start the DB container
docker compose -f docker-compose.db.yml up -d

## Stop the DB container
docker compose -f docker-compose.db.yml down
