FROM node:18-alpine

# Set current user to node
USER node

# Set work directory to the project root directory
WORKDIR /home/node

# Fallback value for the DOCKER_CLIENT_ENV argument
ARG DOCKER_CLIENT_ENV="prod"

# Set necessary environment variables
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
ENV ENVIRONMENT=${DOCKER_CLIENT_ENV}

# Copy all application files to the container
COPY --chown=node:node apps/client apps/client
COPY --chown=node:node packages packages
COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .

# Install necessary npm dependencies
RUN npm install -g http-server
RUN npm install

# Set work directory to the copied directory
WORKDIR /home/node/apps/client

# Build application for production with minification
RUN npm run build

# Serve application differently depending on the configuration
CMD sh .docker/serve ${ENVIRONMENT}
