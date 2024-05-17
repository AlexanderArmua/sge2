FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY .env .env

COPY . .

RUN npm run migrate:prod

EXPOSE 3000

CMD ["npm", "run", "dev"]