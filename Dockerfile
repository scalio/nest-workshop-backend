FROM node:8.9.4-alpine

RUN npm install nodemon -g

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY nodemon.json /usr/src/app/
COPY tsconfig.json /usr/src/app/
COPY ormconfig.json /usr/src/app/

RUN npm install -g -s --no-progress yarn
RUN yarn install

RUN ls

ENV PORT 3000
EXPOSE $PORT 8080 9229

CMD [ "yarn", "start" ]