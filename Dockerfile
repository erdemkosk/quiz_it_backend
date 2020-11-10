# Builder Docker configurations
FROM node:10-alpine AS builder

# Change working directory
WORKDIR /application

# Add required files
ADD ./package*.json ./

# Install dependencies
RUN npm install --only=production

# Release Docker configurations
FROM node:10-alpine AS release

# Change working directory
WORKDIR /application

# Add the project files
ADD . .

# Remove outdated npm_modules directory if exists
RUN rm -rf /application/node_modules

# Copy dependencies from builder image
COPY --from=builder /application/node_modules /application/node_modules

# Expose port
EXPOSE 3000:3000

CMD ["node", "/application"]
