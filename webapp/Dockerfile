FROM node:22.22-slim

WORKDIR /webapp

COPY package.json .

COPY . .
RUN rm -r node_modules

RUN npm install pm2 -g
RUN npm install
CMD ["pm2", "install", "typescript"]
CMD ["pm2","start","--env-file=.env","src/index.ts"]