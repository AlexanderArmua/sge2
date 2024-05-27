FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

# TODO: Test if can be added the flag `--omit=dev` to reduce the size of the image
# TODO 2: It can't we have an error called `[cause]: Error: Cannot find module '@rollup/rollup-linux-arm64-musl'`
RUN npm ci

# This also copies the `env`
COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl -f http://localhost/index.html || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# We create a container of a builded frontend and serve it with nginx
# CMD ["npm", "run", "dev"]
