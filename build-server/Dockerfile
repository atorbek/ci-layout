FROM node:12.16.2-slim

# Cоздаем директорию приложения
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код агента
COPY . .

# Копируем конфигурационный файл для агента
COPY $CONFIG_PATH .

EXPOSE 3000
CMD [ "node", "./bin/www" ]
