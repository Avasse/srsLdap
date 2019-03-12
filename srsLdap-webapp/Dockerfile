FROM node:10.0.0-alpine

WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./app/

RUN    npm install 

COPY . .

CMD npm run serve

