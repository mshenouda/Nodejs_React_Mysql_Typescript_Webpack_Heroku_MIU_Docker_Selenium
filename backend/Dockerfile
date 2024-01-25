FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install --force

COPY . .

VOLUME [ "/app/node_modules" ]

EXPOSE 8080

CMD [ "npm", "start" ]