FROM node:alpine

WORKDIR /app

COPY /message-service/ /app/message-service
COPY /common /app/common

RUN yarn

WORKDIR /app/message-service

RUN yarn build

CMD [ "yarn", "start" ]