# Use the official Node.js base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . ./

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]