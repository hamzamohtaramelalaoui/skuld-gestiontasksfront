FROM node:22

WORKDIR /app

COPY package*.json ./
COPY src ./src
COPY public ./public
COPY package-lock.json ./
COPY tailwind.config.js ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]