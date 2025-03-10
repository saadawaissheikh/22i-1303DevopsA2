FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

EXPOSE 5004

CMD ["npx", "nodemon", "src/index.js"]
