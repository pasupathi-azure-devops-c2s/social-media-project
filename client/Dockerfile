# Step 1: Use official Node.js image for building the frontend
FROM node:18 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install the project dependencies using npm
RUN npm install

# Step 5: Copy the rest of the source code into the container
COPY . .

# Step 6: Build the React app (or any frontend app)
RUN npm run build

# Step 7: Use the official Nginx image to serve the frontend
FROM nginx:alpine

# Step 8: Copy the build output from the previous build stage to Nginx's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose the port Nginx is listening on (default is 80)
EXPOSE 80

# Step 10: Run Nginx in the foreground to serve the app
CMD ["nginx", "-g", "daemon off;"]
