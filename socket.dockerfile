# Dockerfile for Socket Service
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app/Social-Media-Socket

# Copy the package.json and package-lock.json
COPY ./socket/package*.json ./
COPY ./socket/.env /.env

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port the socket service will run on (e.g., 5001 or any port you are using)
EXPOSE 5001

# Run the socket server
CMD ["node", "index.js"]
