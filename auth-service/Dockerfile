FROM node:alpine

WORKDIR /app

COPY /auth-service/ /app/auth-service
COPY /common /app/common

RUN yarn

WORKDIR /app/auth-service

RUN yarn build

CMD [ "yarn", "start" ]