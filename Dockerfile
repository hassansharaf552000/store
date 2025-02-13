# Stage 1: Build
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
VOLUME [ "/app/dist" ]
CMD ["sh", "-c", "cp -r /app/dist/* /output"]
# Stage 2: Serve
# FROM nginx:alpine
# COPY --from=build /app/dist /app/dist/new
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
