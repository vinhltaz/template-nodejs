FROM node:20.15.1-alpine
# Set environment variables
ENV NODE_ENV=production
# Set non-root user
USER node
WORKDIR /home/node/app-prod
COPY --chown=node:node package.json yarn.lock ./
COPY --chown=node:node src ./src
COPY --chown=node:node server.js ./
RUN yarn install --frozen-lockfile --production
CMD [ "yarn", "docker:start" ]