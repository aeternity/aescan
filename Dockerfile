FROM node:lts-alpine as server
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lockfile

COPY . .

ARG BUILD_MODE=production
RUN MODE=$BUILD_MODE yarn build

EXPOSE 80
CMD [ "npm", "start" ]
