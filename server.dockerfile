# Step 1: Build the Angular application using Node.js
FROM node:18 AS build

# Set the working directory
WORKDIR /app/ZKU-Social-Media-server

# Copy the package.json and yarn.lock files
COPY ./server/package*.json ./
COPY ./server/yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the entire client source code
COPY ./server/ ./

# Build the Angular application
RUN yarn build --prod

EXPOSE 5000

ENTRYPOINT [ "yarn", "start" ]
