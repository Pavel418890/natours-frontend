FROM node:alpine3.16 as builder

COPY . /

ARG DOMAIN

RUN npm i
ENV VITE_SVG_PATH="/var/www/${DOMAIN}/public"
ENV VITE_API_URL="https://api.${DOMAIN}"

RUN npm run build

