FROM node:latest

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

VOLUME [ "/app/node_modules" ]

EXPOSE 8082

CMD [ "npm", "run", "dev" ]
