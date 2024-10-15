# Byggfasen: Använd en Node-bild för att kompilera TypeScript och Vite
FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Serverfasen: Kopiera byggda filer till nginx
FROM nginx:alpine

COPY --from=build /dist /usr/share/nginx/html

# Exponera porten för nginx
EXPOSE 80

# Starta nginx
CMD ["nginx", "-g", "daemon off;"]
