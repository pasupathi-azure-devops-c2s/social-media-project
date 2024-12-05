# Step 1: Build the Angular application using Node.js
FROM node:18 AS build

# Set the working directory
WORKDIR /app/ZKU-Social-Media

# Copy the package.json and yarn.lock files
COPY ./client/package*.json ./app/ZKU-Social-Media
COPY ./client/yarn.lock ./app/ZKU-Social-Media

# Install dependencies
RUN yarn install

# Copy the entire client source code
COPY ./client/ ./

# Build the Angular application
RUN yarn build --prod

EXPOSE 3000

ENTRYPOINT [ "yarn", "Start" ]
