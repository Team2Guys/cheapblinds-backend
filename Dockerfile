# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your code
COPY . .

# Expose the port your app will run on
EXPOSE 5000

# Set environment variables (optional, you can override on VPS)
ENV NODE_ENV=production

# Start the app
CMD ["node", "src/app.js"]
