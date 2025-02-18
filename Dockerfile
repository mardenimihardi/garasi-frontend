# Step 1: Gunakan Node.js untuk build aplikasi
FROM node:20 AS build

# Step 2: Atur direktori kerja dalam container
WORKDIR /app

# Step 3: Salin package.json dan package-lock.json untuk instalasi dependensi
COPY package.json package-lock.json ./

# Step 4: Instal dependensi dengan npm ci (lebih cepat & stabil)
RUN npm ci

# Step 5: Salin semua file proyek ke dalam container
COPY . .

# Step 6: Build proyek dengan Vite
RUN npm run build

# Step 7: Gunakan Nginx untuk serving frontend
FROM nginx:alpine

# Step 8: Salin hasil build dari tahap sebelumnya ke dalam Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Konfigurasi Nginx untuk routing SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Step 10: Expose port 80
EXPOSE 80

# Step 11: Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
