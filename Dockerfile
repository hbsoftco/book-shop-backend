# Stage 1: Build environment (TypeScript compilation)
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production image (slim Node.js environment)
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --only=production

# Create .env file and add environment variables
RUN echo "APP_PORT=3002" >> .env && \
    echo "MONGO_URL=mongodb://localhost:27017/book_sara" >> .env && \
    echo "SECRET_KEY=sgU2Vv7BeJp6B#14{vo=[" >> .env

EXPOSE 3000

CMD [ "node", "dist/index.js" ]
