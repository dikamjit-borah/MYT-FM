FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8082
CMD [ "node", "server.js" ]
LABEL tag="MYT-FM"