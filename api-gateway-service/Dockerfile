FROM node:alpine

WORKDIR /app

COPY /api-gateway-service/ /app/api-gateway-service
COPY /common /app/common

WORKDIR /app/api-gateway-service

RUN npm install --force -g @nestjs/cli yarn
RUN yarn

RUN yarn build

CMD [ "yarn", "start:prod" ]