# ────── Stage 1 ──────
# Build the application
FROM node:24-alpine AS build

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package.json ./

# Install dependencies
RUN npm install --omit=dev
RUN npm install -g @nestjs/cli

# Copy the rest of the source code
COPY . .

# Build the NestJS app
RUN npm run build

# ────── Stage 2 ──────
# Runtime image
FROM node:24-alpine

# Install only production deps
WORKDIR /app

COPY --from=build /app/package.json ./
RUN npm install --only=production
RUN npm install -g @nestjs/cli

# Copy compiled output & other runtime files
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Expose the port used by the NestJS app
EXPOSE 3000

# Default command (overridden by docker‑compose.yml)
CMD ["npm", "run", "start:prod"]
