# Use a multi-stage build for small image
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm ci || yarn || pnpm i
COPY . .
RUN npm run build || yarn build || pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Add a non-root user
RUN addgroup -S app && adduser -S app -G app

# Copy build output & minimal deps
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Photos mount point
RUN mkdir -p /photos && chown -R app:app /photos

USER app
EXPOSE 3000
CMD ["node", ".next/standalone/server.js"]