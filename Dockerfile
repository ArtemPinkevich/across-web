FROM node:18.16.1-alpine

WORKDIR /app

COPY package.json /app

RUN npm install --legacy-peer-deps

COPY . /app

ENV SERVER_API_URL="http://localhost:5173"

EXPOSE 5173

CMD ["npm", "run-script", "dev"]