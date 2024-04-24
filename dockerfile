
# Stage 1: Build React frontend
FROM node:14 AS build
COPY package*.json .
RUN npm install
COPY . ..
RUN npm run build

# Stage 2: Setup Nginx server
FROM nginx:alpine
# COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build dist /usr/share/nginx/html

# Expose ports 80 and 5000
EXPOSE 80


# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
