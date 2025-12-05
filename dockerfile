# ----------------------
# Stage 1: Build
# ----------------------
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json first to leverage caching
COPY package*.json ./

# Use Cloudflare npm registry to avoid npm registry issues
RUN npm config set registry https://registry.npmjs.cf/

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# ----------------------
# Stage 2: Production
# ----------------------
FROM node:20-alpine

WORKDIR /app

# Copy built code and node_modules from the build stage
COPY --from=build /app /app

# Expose backend port
EXPOSE 3000

# Start backend
CMD ["node", "app.js"]

