FROM node:alpine

WORKDIR /usr/app

COPY package*.json .

RUN apk update && apk add traceroute

RUN npm install

COPY tsconfig.json .

COPY . .

RUN npm run build

EXPOSE 3000 3000

CMD npm run start
