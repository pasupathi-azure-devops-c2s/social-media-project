# Stage 1: Build Stage
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock (or package-lock.json) into the container
COPY package*.json ./

# Install dependencies (yarn or npm)
RUN yarn install  # or 'npm install' if you're using npm

# Copy all the source files to the container
COPY . .

# Build the frontend (assuming it's a React/Vue app)
RUN yarn build  # or 'npm run build' for React/Vue.js

# Stage 2: Nginx Stage
FROM nginx:alpine

# Copy the built frontend files from the build stage to Nginx's public directory
COPY --from=build /app/build /usr/share/nginx/html  # For React, it's 'build' folder; for Vue.js, it's 'dist'

# Expose the port that Nginx is listening on
EXPOSE 80

# Run Nginx in the foreground (required for Docker container to keep running)
CMD ["nginx", "-g", "daemon off;"]
