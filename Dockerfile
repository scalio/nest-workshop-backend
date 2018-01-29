FROM node:boron

RUN npm install nodemon -g

# Create app directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY nodemon.json /usr/src/app/
COPY tsconfig.json /usr/src/app/
COPY ormconfig.json /usr/src/app/

RUN npm install

RUN ls

ENV PORT 3000
EXPOSE $PORT 8080

CMD [ "npm", "run", "start" ]