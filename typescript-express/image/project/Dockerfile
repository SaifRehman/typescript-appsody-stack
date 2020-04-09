FROM node:12
# Install OS updates
RUN apt-get update \
 && apt-get dist-upgrade -y \
 && apt-get clean \
 && echo 'Finished installing dependencies'
# Install stack dependencies
WORKDIR /project/user-app   
COPY ./package*.json ./
RUN npm install --production
# Install user-app dependencies
WORKDIR /project/user-app
COPY ./user-app/package*.json ./
RUN npm install --production
WORKDIR /project/user-app/node_modules
# Copy the dependencies into a slim Node docker image


FROM node:12-slim
RUN npm i -g webpack webpack-cli jest
# Install OS updates
RUN apt-get update \
 && apt-get dist-upgrade -y \
 && apt-get clean \
 && echo 'Finished installing dependencies'
# Copy the project
COPY --chown=node:node . /project
# Copy all dependencies
# COPY --chown=node:node --from=0 /project/node_modules /project/node_modules
COPY --chown=node:node --from=0 /project/user-app/node_modules /project/user-app/node_modules
WORKDIR /project
ENV NODE_PATH=/project/user-app/node_modules
ENV NODE_ENV production
ENV PORT 3000
RUN webpack-cli
USER node
EXPOSE 3000
RUN pwd
RUN ls
RUN ls dist/


CMD ["npm", "start"]