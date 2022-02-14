FROM node:14.15-alpine

WORKDIR /auth-api

COPY ./package.json ./package-lock.json ./
RUN npm install

RUN mkdir ./src
COPY ./src/auth-service ./src

CMD ["node", "./src/server.js"]