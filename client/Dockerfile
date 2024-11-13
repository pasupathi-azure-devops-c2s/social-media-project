# Step 1: Use the official Node.js image as a base
FROM node:18 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and yarn.lock (or package-lock.json)
COPY package.json yarn.lock ./

# Step 4: Install dependencies using yarn
RUN yarn install

# Step 5: Copy all other application files
COPY . .

# Step 6: Build the Angular application
RUN yarn build --prod

# Step 7: Set up a lightweight web server to serve the Angular app
FROM nginx:alpine

# Step 8: Copy the build artifacts from the previous stage
COPY --from=build /app/dist/your-angular-app /usr/share/nginx/html

# Step 9: Expose port 80 to serve the app
EXPOSE 80

# Step 10: Run nginx to serve the Angular app
CMD ["nginx", "-g", "daemon off;"]
