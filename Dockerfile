FROM node:14

WORKDIR /opt/bot

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]
