FROM node:alpine3.16 as builder

COPY . /
RUN npm i

ENV VITE_SVG_PATH="/usr/share/nginx/html/public"
ARG VITE_API_URL="https://api.natours-club.site"

RUN npm run build

FROM nginx:1.9.9

COPY --from=builder /dist/ /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
