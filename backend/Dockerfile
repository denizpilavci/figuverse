FROM node:20-alpine

WORKDIR /app

# Paket dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle (Sadece production ise npm ci kullanılabilir)
RUN npm install

# Kaynak kodları kopyala
COPY . .

# Uygulamanın çalışacağı port
EXPOSE 5000

# Geliştirme modu için default komut (docker-compose üzerinden de ezilebilir)
CMD ["npm", "run", "dev"]
