FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --frozen-lockfile

RUN npm install -g nodemon

COPY . .

EXPOSE 5008

CMD ["npx", "nodemon", "src/server.js"]
