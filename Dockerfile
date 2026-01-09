# Stage 1: Dev
FROM node:24-alpine AS dev
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
EXPOSE 5000
ENV NODE_ENV=development
CMD ["npx", "nodemon", "src/app.js"]

# Stage 2: Prod
FROM node:24-alpine AS prod
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN addgroup -S appgroup && adduser -S appuser -G appgroup 
USER appuser
EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "src/app.js"]
