#!/bin/bash

# Скрипт обновления Strapi проекта
set -e

echo "🔄 Обновление Strapi проекта..."

# Переход в директорию проекта
cd /opt/shuffle-strapi

# Получение последних изменений
echo "📥 Получение обновлений из Git..."
git pull origin main

# Установка зависимостей
echo "📦 Установка зависимостей..."
yarn install

# Сборка админ-панели
echo "🔨 Сборка админ-панели..."
NODE_ENV=production yarn build

# Перезапуск PM2
echo "🔄 Перезапуск приложения..."
pm2 restart shuffle-strapi

echo "✅ Обновление завершено!"
echo "📊 Логи: pm2 logs shuffle-strapi"
