# ----------------------
# Stage 1: Build
# ----------------------
FROM node:20-bullseye AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage caching
COPY package*.json ./

# Use official npm registry to avoid network issues
RUN npm config set registry https://registry.npmjs.org/

# Upgrade npm to latest stable
RUN npm install -g npm@latest

# Optional: clear npm cache
RUN npm cache clean --force

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# ----------------------
# Stage 2: Production
# ----------------------
FROM node:20-bullseye

WORKDIR /app

# Copy built code and node_modules from build stage
COPY --from=build /app /app

# Expose backend port
EXPOSE 3000

# Start backend
CMD ["npm", "start"]

