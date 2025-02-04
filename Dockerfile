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

COPY --chown=node:node --from=build /app/.output ./

USER node

ENV HOST=0.0.0.0
ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

CMD [ "node", "/app/server/index.mjs" ]
