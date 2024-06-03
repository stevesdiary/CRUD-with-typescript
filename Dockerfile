FROM node:20 As development
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./

RUN rm -rf /usr/src/app/node_modules
RUN npm install
COPY . .
RUN npm i -g rimraf
# RUN npm run build
EXPOSE 4000
CMD ["npm", "run", "start"]
