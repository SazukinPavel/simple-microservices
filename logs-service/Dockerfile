FROM node:alpine

WORKDIR /app

COPY /logs-service/ /app/logs-service
COPY /common /app/common

RUN yarn

WORKDIR /app/logs-service

RUN yarn build

CMD [ "yarn", "start" ]