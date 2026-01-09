# Use official Node.js LTS image
FROM node:24-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies (production only)
RUN npm install --production

# Copy the rest of your source code
COPY . .

# Create a non-root user and switch to it for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the port your app will run on
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production

# Start the app explicitly
CMD ["node", "src/app.js"]
