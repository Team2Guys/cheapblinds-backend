FROM node:24-alpine

WORKDIR /usr/src/app

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./

RUN if [ "$NODE_ENV" = "production" ]; then \
    npm install --omit=dev; \
    else \
    npm install && npm install -g nodemon; \
    fi

COPY . .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 5000

CMD if [ "$NODE_ENV" = "production" ]; then \
    node src/app.js; \
    else \
    npx nodemon src/app.js; \
    fi
