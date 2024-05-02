FROM node:lts-alpine

RUN npm install -g pnpm

WORKDIR /backend

# ###### Development ######
# FROM base AS development
# ENV NODE_ENV=development

# Install dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install
RUN pnpm db:generate

# Copy source code
COPY . .

CMD pnpm run dev
EXPOSE 4000