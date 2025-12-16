FROM node:22.21.1-alpine

# Adiciona lib para comtatibilidade devido ao 'musl'
RUN apk add --no-cache libc6-compact
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# Imagem de produção com tadas as configurações necessárias
FROM base AS production
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_SHARP_PATH "/app/node_modules/sharp"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=deps /app/public ./public

# Permissões para poder usar corretamente o prerender do Next.js 
RUN mkdir .nextjs
RUN chown nextjs:nodejs .next

COPY --from=deps /app/next.config.mjs ./
COPY --from=deps --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=deps --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Standalone output para não precisar usar todas as libs
CMD ["node","server.js"]