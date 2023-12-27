FROM node:18.16.1

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 10000

CMD [ "npm", "start" ]