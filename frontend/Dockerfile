FROM node:18.16.1 AS build

WORKDIR /frontend

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY public/ public
COPY src/ src

COPY .env* .
# must copy tsconfig too, otherwise we result in an error 'Module not found: Error: Can't resolve './App' in '...''
COPY tsconfig.json .

RUN npm run build

FROM nginx:latest
COPY --from=build /frontend/build/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf


