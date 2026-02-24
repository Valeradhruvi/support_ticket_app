# Support Ticket API

A simple support‑ticket system built with [NestJS](https://nestjs.com/)  
It exposes a set of CRUD endpoints for users, tickets, comments and status
logs, secured with JWT and a basic role‑based guard.

---

## ⚙️ Modules

| Module                  | Description                                      | Guarded |
|-------------------------|--------------------------------------------------|---------|
| `auth`                  | `/auth/login` – obtain JWT                      | –       |
| `users`                 | Manage user accounts (create, read, update, delete) | JWT + `MANAGER` role |
| `tickets`               | Create and manage support tickets              | JWT     |
| `comments`              | Add comments to tickets                         | JWT     |
| `tickets-status-log`    | Track status changes of tickets                 | JWT     |

The JWT strategy lives in [`src/auth/jwt.strategy.ts`](src/auth/jwt.strategy.ts)  
and the access‑level guard in
[`src/auth/guards/roles.guard.ts`](src/auth/guards/roles.guard.ts).

---

## 🛠 Technology stack

- Node.js (ES2023 / `nodenext`)
- NestJS v11
- TypeORM + MySQL (`ticket_system` database)
- Passport & `passport-jwt`
- class‑validator / class‑transformer
- bcrypt for password hashing
- Jest / ts‑jest for unit & e2e tests

Entities include `User`, `Ticket`, `RoleEntity` and placeholders for comments
and status logs.

---

## 🚀 Project setup

```bash
# install dependencies
npm install
