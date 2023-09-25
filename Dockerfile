FROM node:18-alpine

RUN apk add nano curl git busybox-extras

WORKDIR /app

COPY . /app

RUN npm ci
RUN npm run prisma:generate
RUN npm run build
