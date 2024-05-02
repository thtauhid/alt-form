# ALT FORM

Create any form.

## Installation

### Development

Copy the `.env.dev` files to `.env` and set the environment variables.

```bash
cp backend/.env.dev backend/.env
cp frontend/.env.dev frontend/.env
```

Use docker compose to run the project.

```bash
sudo docker compose up
```

Run prisma migrations.

```bash
sudo docker exec -it altform_backend_1 pnpm db:migrate
sudo docker exec -it altform_backend_1 pnpm db:generate
```

### Production

Copy the `.env.prod` files to `.env` and set the environment variables.

```bash
cp backend/.env.prod backend/.env
cp frontend/.env.prod frontend/.env
```

Use docker compose to run the project.

```bash
sudo docker compose -f docker-compose.prod.yml up
```

Run prisma migrations.

```bash
sudo docker exec -it altform_backend_1 pnpm db:migrate
sudo docker exec -it altform_backend_1 pnpm db:generate
```
