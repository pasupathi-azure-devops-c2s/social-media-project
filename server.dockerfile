# Step 1: Build the Node.js server
FROM node:18 AS build

# Set the working directory for the server
WORKDIR /app/ZKU-Social-Media-server

# Copy the package.json and yarn.lock files
COPY ./server/package*.json ./
COPY ./server/index.js ./
COPY ./server/server.js ./

# Install dependencies
RUN yarn install

# Copy the rest of the server source code
COPY ./server/ ./

# Expose the port the server will run on
EXPOSE 5000

# Start the server using Node.js
ENTRYPOINT ["yarn", "start"]
