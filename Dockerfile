FROM node:alpine3.16 as builder

COPY . /

ARG API_URL

RUN npm i
ENV VITE_API_URL=${API_URL}

RUN npm run build

LABEL org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.title="natours-frontend" \
      org.opencontainers.image.authors="Pavel Lots <plots418890@gmail.com>" \
      org.opencontainers.image.source="https://github.com/pavel418890/natours-frontend" \
      org.opencontainers.image.revision="${VCS_REF}" \
      org.opencontainers.image.vendor="Pavel Lots"


