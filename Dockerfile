# Stage 1: Build
FROM node:18-alpine as build
WORKDIR /app
VOLUME ["/var/www/angular"]
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN mkdir -p /var/www/angular
RUN cp -r /app/dist/* /var/www/angular/
CMD ["node"]
