# Build stage
FROM oven/bun:1 as builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM node:18-slim

WORKDIR /app

# Install required dependencies
RUN apt-get update && apt-get install -y \
  curl \
  unzip \
  && rm -rf /var/lib/apt/lists/*

# Copy nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/dist .

# Install serve to host the static files
RUN npm install -g serve

# Expose port 80
EXPOSE 80

# Use serve to host the static files
CMD ["serve", "-s", "dist", "-l", "80"]
