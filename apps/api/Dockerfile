FROM node:18-alpine

# Set current user to node
USER node

# Set work directory to the project root directory
WORKDIR /home/node

# Fallback value for the DOCKER_API_ENV argument
ARG DOCKER_API_ENV="prod"

# Set necessary environment variables
ENV ENVIRONMENT=${DOCKER_API_ENV}

# Copy all application files to the container
COPY --chown=node:node apps/api apps/api
COPY --chown=node:node packages packages
COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .

# Install necessary npm dependencies
RUN npm install

# Set work directory to the copied directory
WORKDIR /home/node/apps/api

# Build application for production with minification
RUN npm run build

# Serve application differently depending on the configuration
CMD npm run start:${ENVIRONMENT}
