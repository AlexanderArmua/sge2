# Stage 1: Build stage
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./

# Copy application source code
COPY . .

# Copy prisma config
COPY prisma ./prisma

# Generate all Prisma client code
# RUN npm run migrate:generate
RUN npm run migrate:generate

RUN ls -al

# TODO: Try to add ` --omit=dev` back
RUN npm ci

# Compile TypeScript files to JavaScript
RUN npm run build

# Run database migrations
# RUN npm run migrate:prod

# Stage 2: Production stage
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app /usr/src/app

# Copy entrypoint script and set permissions
COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# Create and use a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the port the app runs on
EXPOSE 3000

# Health check to ensure the app is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 CMD curl -f http://localhost:3000/api/v1/health || exit 1

# CMD ["npm", "start"]

# Run the entrypoint script
CMD ["/usr/src/app/entrypoint.sh"]
