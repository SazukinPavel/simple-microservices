FROM node:alpine

WORKDIR /app

COPY /message-service/ /app/message-service
COPY /common /app/common

WORKDIR /app/message-service

RUN npm install --force -g @nestjs/cli yarn
RUN yarn

RUN yarn build

CMD [ "yarn", "start:prod" ]