# Step 1: Build the Angular application using Node.js
FROM node:18 AS build

# Set the working directory
WORKDIR /app/ZKU-Social-Media

# Copy the package.json and yarn.lock files
COPY ./client/package*.json ./
COPY ./client/yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the entire client source code
COPY ./client/ ./

ENV baseURL=http://client-server-socket-service:5000
ENV originURL=http://client-server-socket-service:3000

# Build the Angular application
RUN yarn build --prod

EXPOSE 3000

ENTRYPOINT [ "yarn", "start" ]
