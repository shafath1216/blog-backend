# ----------------------
# Stage 1: Build
# ----------------------
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Use Cloudflare npm registry mirror (fixes E500 error)
RUN npm config set registry https://registry.npmjs.cf/

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# (Optional) Build step if needed
# RUN npm run build

# ----------------------
# Stage 2: Production
# ----------------------
FROM node:20-alpine

WORKDIR /app

# Copy built code and installed modules from previous stage
COPY --from=build /app /app

# Expose backend port
EXPOSE 3000

# Start backend
CMD ["node", "app.js"]

