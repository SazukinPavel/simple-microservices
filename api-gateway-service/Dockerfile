FROM node:alpine

WORKDIR /app

COPY /api-gateway-service/ /app/api-gateway-service
COPY /common /app/common

RUN yarn

WORKDIR /app/api-gateway-service

RUN yarn build

CMD [ "yarn", "start" ]