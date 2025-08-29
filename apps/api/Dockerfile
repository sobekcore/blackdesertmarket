FROM node:18-bookworm-slim as install

# Set current user to node
USER node

# Set work directory to the project root directory
WORKDIR /home/node

# Copy all application files to the container
COPY --chown=node:node apps/api apps/api
COPY --chown=node:node packages packages
COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .

# Install npm dependencies
RUN npm ci --workspace=apps/api

FROM install as dev

# Install chromium for Playwright
USER root
RUN npx playwright install-deps chromium && \
    apt-get install -y procps
USER node
RUN npx playwright install chromium --only-shell

# Set work directory to the application directory
WORKDIR /home/node/apps/api

# Serve application for development
ENTRYPOINT ["npm", "run", "start:dev"]

FROM install as build

# Set work directory to the application directory
WORKDIR /home/node/apps/api

# Build application for production with minification
RUN npm run build

FROM node:18-bookworm-slim as prod

# Set current user to node
USER node

# Set work directory to the project root directory
WORKDIR /home/node

# Copy built application
COPY --from=build /home/node/apps/api/dist apps/api/dist
COPY --from=build /home/node/apps/api/public apps/api/public
COPY --from=build /home/node/apps/api/package.json apps/api
COPY --from=build /home/node/packages packages
COPY --from=build /home/node/package.json .
COPY --from=build /home/node/package-lock.json .

# Install npm dependencies for production
RUN npm ci --only=prod --workspace=apps/api

# Install chromium for Playwright
USER root
RUN npx playwright install-deps chromium
USER node
RUN npx playwright install chromium --only-shell

# Set work directory to the application directory
WORKDIR /home/node/apps/api

# Serve application for production
ENTRYPOINT ["npm", "run", "start:prod"]
