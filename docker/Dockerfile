# Stage 1: Build
FROM node as builder

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY src ./src

# Run TypeScript build
RUN npm run build

# Stage 2: Production
FROM node:slim

ENV NODE_ENV production
ENV MONGO_USER wisdo
ENV MONGO_PASSWORD wisdo12345
ENV MONGO_HOST mongodb
USER node

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --production

# Copy built files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose port and run the application
EXPOSE 8080
CMD [ "node", "dist/server.js" ]
