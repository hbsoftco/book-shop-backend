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

COPY --from=builder /app/ ./
COPY package*.json ./
RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
