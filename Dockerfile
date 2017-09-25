FROM node:alpine

#Create app dir
WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]