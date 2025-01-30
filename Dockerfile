ARG NODE_VERSION=22.13.1

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lockfile

COPY . .

ARG BUILD_MODE=production
RUN MODE=$BUILD_MODE yarn build

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxt

COPY --from=build /app/.output ./

RUN chown nuxt:nodejs ./

USER nuxt

ENV HOST=0.0.0.0
ENV PORT=80
ENV NODE_ENV=production

EXPOSE 80

CMD [ "node", "/app/server/index.mjs" ]
