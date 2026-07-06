FROM node:20-alpine AS builder

WORKDIR /app
RUN npm install -g bun@1.3.10
COPY package.json ./
RUN --mount=type=cache,target=/root/.bun/install/cache bun install
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
