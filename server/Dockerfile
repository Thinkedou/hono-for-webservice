FROM node:22.22-alpine

WORKDIR /server

COPY package.json .

RUN npm i && npm cache clean --force

COPY --chown=node:node . .
EXPOSE 3000


CMD ["npm","run","dev"]



