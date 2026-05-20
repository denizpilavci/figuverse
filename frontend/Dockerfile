FROM node:20-alpine

WORKDIR /app

# Paket dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Kaynak kodları kopyala
COPY . .

# Vite'in geliştirme sunucusu portu
EXPOSE 5173

# Geliştirme modu için default komut
CMD ["npm", "run", "dev"]
