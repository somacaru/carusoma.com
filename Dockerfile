# Base image for installing dependencies
FROM node:24-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production --frozen-lockfile && npm cache clean --force

# Base image for building the application
FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set proper permissions
RUN chown -R nextjs:nodejs /app
RUN chmod -R 755 /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000
ENV PORT 3000

<<<<<<< Current (Your changes)
=======
# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

>>>>>>> Incoming (Background Agent changes)
CMD ["node", "server.js"] 
