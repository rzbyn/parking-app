FROM node:20-alpine

USER node

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

RUN npm clean-install

COPY --chown=node:node . .

EXPOSE 3001

RUN mkdir -p dist && \
    chown node:node dist

CMD ["npm", "run", "start:dev"]
