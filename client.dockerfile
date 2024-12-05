FROM node:18

COPY ./client/package*.json ./app/ZKC-Social-Media/

WORKDIR ./app/ZKC-Social-Media/

RUN npm install

EXPOSE 3000

ENV NODE_ENV=client

ENTRYPOINT [ "npm", "start" ]