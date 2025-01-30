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

COPY --from=build /app/.output ./

ENV NITRO_PORT=80

EXPOSE 80

CMD [ "node", "/app/server/index.mjs" ]
