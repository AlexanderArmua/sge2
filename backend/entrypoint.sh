#!/bin/sh

# Run database migrations
npx prisma migrate deploy --schema=/usr/src/app/prisma/schema.prisma

# Start the application
npm start
