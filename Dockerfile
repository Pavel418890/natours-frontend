FROM node:alpine3.16 as builder

COPY . /

ARG API_URL

RUN npm i
ENV VITE_API_URL=${API_URL}

RUN npm run build

