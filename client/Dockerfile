FROM node:19.5.0-alpine AS angular

WORKDIR /app

RUN npm cache clean --force

COPY . .

RUN npm install

RUN npm run build --prod


FROM nginx:latest AS ngix

COPY --from=angular /app/dist/client/browser /usr/share/nginx/html

COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
