FROM node:lts-alpine AS base

RUN npm install -g pnpm

WORKDIR /backend

# ###### Development ######
# FROM base AS development
# ENV NODE_ENV=development

# Install dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install

# Copy source code
COPY . .

CMD ["sh", "startup.sh" ]
EXPOSE 4000