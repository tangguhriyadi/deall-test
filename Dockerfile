# base image
FROM node:16

# set working directory
WORKDIR /app

# install app dependencies
COPY package*.json ./

RUN npm install

# copy app source
COPY . .

# start command
CMD ["npm", "run", "start"]