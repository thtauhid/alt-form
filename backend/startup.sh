#!/bin/sh

# Generate database schema and migrate
pnpm db:generate
pnpm db:migrate

# Start the server
pnpm run dev
