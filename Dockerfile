# Stage 1: Build environment (TypeScript compilation)
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

# Stage 2: Production image (slim Node.js environment)
FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]
