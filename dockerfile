
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

EXPOSE 80


# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

FROM python:3.9-slim-buster
WORKDIR /app
COPY backend/requirement.txt /app
RUN pip install -r requirement.txt
COPY backend .
EXPOSE 5000
ENV FLASK_APP=recomandation.py
CMD ["flask", "run", "--host", "0.0.0.0"]