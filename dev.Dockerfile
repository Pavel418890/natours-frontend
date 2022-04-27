FROM node:alpine3.10 as builder

WORKDIR /app

COPY package*.json /app/

RUN npm i

ENV VITE_SVG_PATH="/usr/share/nginx/html/public"
ENV VITE_API_URL="http://localhost:8888"

COPY . /app/

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/ /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf


COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]