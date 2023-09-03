FROM node:alpine

WORKDIR /app

COPY /auth-service/ /app/auth-service
COPY /common /app/common

WORKDIR /app/auth-service

RUN npm install --force -g @nestjs/cli yarn
RUN yarn

RUN yarn build

CMD [ "yarn", "start:prod" ]