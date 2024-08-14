# Use the official Node.js image from the Docker Hub
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package* .

# Install the dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Build the React app for production (if needed)
# RUN npm run build  # Uncomment if you want to build the app

# Expose the port your app runs on
EXPOSE 5173

# Command to run your app
CMD ["npm", "run", "dev"]