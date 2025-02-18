# Step 1: Use an official Node.js image as the base image
FROM node:20 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the React app using Vite
RUN npm run build

# Step 7: Use an Nginx server to serve the build output
FROM nginx:alpine

# Step 8: Copy the build files from the build image to Nginx's HTML folder
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose the default Nginx port
EXPOSE 80

# Step 10: Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
