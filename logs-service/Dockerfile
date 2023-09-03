FROM node:alpine

WORKDIR /app

COPY /logs-service/ /app/logs-service
COPY /common /app/common

WORKDIR /app/logs-service

RUN npm install --force -g @nestjs/cli yarn
RUN yarn

RUN yarn build

CMD [ "yarn", "start:prod" ]