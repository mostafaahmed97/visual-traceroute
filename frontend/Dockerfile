FROM node:alpine

WORKDIR /usr/app

RUN npm i -g http-server

COPY package*.json .

RUN npm i 

COPY . .

RUN npm run build

EXPOSE 8080

CMD http-server dist
