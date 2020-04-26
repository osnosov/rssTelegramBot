FROM node:12-alpine

RUN mkdir -p /src/node_modules && chown -R node:node /src

WORKDIR /src

COPY package*.json ./

USER node

RUN npm install --production

COPY --chown=node:node . .

CMD ["npm", "start"]