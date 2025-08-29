FROM node:18-alpine as install

# Set current user to node
USER node

# Set work directory to the project root directory
WORKDIR /home/node

# Copy all application files to the container
COPY --chown=node:node apps/client apps/client
COPY --chown=node:node packages packages
COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .

# Install npm dependencies
RUN npm ci --workspace=apps/client

FROM install as dev

# Set work directory to the application directory
WORKDIR /home/node/apps/client

# Serve application for development
ENTRYPOINT ["npm", "run", "serve"]

FROM install as build

# Set work directory to the application directory
WORKDIR /home/node/apps/client

# Build application for production with minification
RUN npm run build

FROM node:18-alpine as prod

# Set current user to node
USER node

# Set work directory to the project root directory
WORKDIR /home/node

# Set necessary environment variables for npm global
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Install server to serve application
RUN npm install -g serve

# Copy built application
COPY --from=build /home/node/apps/client/dist dist

# Serve application for production
ENTRYPOINT ["serve", "dist", "-s", "-p", "8080"]
