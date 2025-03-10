# Use a minimal Node.js base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Expose the correct port
EXPOSE 5006

# Start the service
CMD ["npx", "nodemon", "src/server.js"]
