# Развертывание Strapi с PM2 на Hetzner

## Информация о сервере
- **IP**: 157.90.169.205
- **ОС**: Ubuntu 22.04
- **Домен**: shuffle-strapi.hardart.cz
- **Репозиторий**: https://github.com/simon1400/shuffle-strapi
- **База данных**: PostgreSQL (Neon - внешний хостинг)
- **Путь на сервере**: `/opt/shuffle-strapi`

---

## ⚠️ ВАЖНО: Остановка Docker контейнера

**Сначала нужно остановить Docker контейнер, который пытались запустить ранее!**

### Шаг 0: Остановка Docker контейнера (ОБЯЗАТЕЛЬНО!)

```bash
# Подключитесь к серверу
ssh root@157.90.169.205

# Перейдите в директорию проекта
cd /opt/shuffle-strapi

# Остановите и удалите ТОЛЬКО этот контейнер
docker compose down

# Проверьте, что контейнер остановлен
docker ps

# Если контейнер все еще есть, остановите его вручную:
docker stop shuffle-strapi
docker rm shuffle-strapi

# ⚠️ НЕ ТРОГАЙТЕ другие контейнеры!
# Проверьте, что другие контейнеры работают:
docker ps
```

---

## Шаг 1: Подготовка DNS

**ВАЖНО**: Убедитесь, что DNS настроен:

```bash
# Проверьте DNS с локального компьютера
nslookup shuffle-strapi.hardart.cz
```

Если DNS не настроен:
1. Зайдите в панель управления доменом hardart.cz
2. Создайте A-запись: `shuffle-strapi` → `157.90.169.205`
3. Подождите 5-10 минут

---

## Шаг 2: Обновление проекта на сервере

```bash
# На сервере
cd /opt/shuffle-strapi

# Получите последние изменения
git pull origin main

# Проверьте, какие файлы появились
ls -la
# Должны быть: ecosystem.config.js, nginx.conf, update.sh, .env.production
```

---

## Шаг 3: Установка Node.js 20.x (если не установлен)

```bash
# Проверьте версию Node.js
node -v

# Если версия < 20, установите Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Проверьте
node -v  # Должно быть >= 20.x.x
npm -v
```

---

## Шаг 4: Установка Yarn (если не установлен)

```bash
# Установка Yarn
npm install -g yarn

# Проверка
yarn --version
```

---

## Шаг 5: Установка PM2 (если не установлен)

```bash
# Установка PM2 глобально
npm install -g pm2

# Проверка
pm2 --version
```

---

## Шаг 6: Настройка переменных окружения

```bash
cd /opt/shuffle-strapi

# Копирование .env файла
cp .env.production .env

# Проверьте содержимое
cat .env

# Все должно быть правильно (DATABASE_*, CLOUDINARY_*, ключи)
```

---

## Шаг 7: Установка зависимостей и сборка

```bash
cd /opt/shuffle-strapi

# Создание директории для логов
mkdir -p logs

# Установка зависимостей
yarn install

# Сборка админ-панели
NODE_ENV=production yarn build

# Проверьте, что создалась папка dist
ls -la dist/
```

---

## Шаг 8: Запуск приложения через PM2

```bash
cd /opt/shuffle-strapi

# Запуск через PM2
pm2 start ecosystem.config.js

# Проверка статуса
pm2 status

# Просмотр логов
pm2 logs shuffle-strapi

# Если все работает, нажмите Ctrl+C для выхода из логов
```

**Важно**: Дождитесь сообщения в логах:
```
Server started on http://0.0.0.0:1337
```

---

## Шаг 9: Настройка автозапуска PM2

```bash
# Сохранение списка процессов PM2
pm2 save

# Настройка автозапуска при перезагрузке сервера
pm2 startup systemd

# Выполните команду, которую покажет PM2
# Например: sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root
```

---

## Шаг 10: Настройка Nginx

### Вариант А: Если конфигурация для этого домена ещё НЕ существует

```bash
# Копирование конфигурации
cp /opt/shuffle-strapi/nginx.conf /etc/nginx/sites-available/shuffle-strapi

# Создание символической ссылки
ln -s /etc/nginx/sites-available/shuffle-strapi /etc/nginx/sites-enabled/

# ⚠️ Временно закомментируйте SSL строки для получения сертификата
nano /etc/nginx/sites-available/shuffle-strapi
```

Закомментируйте (добавьте `#`):
```nginx
    # ssl_certificate /etc/letsencrypt/live/shuffle-strapi.hardart.cz/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/shuffle-strapi.hardart.cz/privkey.pem;
    # ssl_protocols TLSv1.2 TLSv1.3;
    # ssl_ciphers HIGH:!aNULL:!MD5;
    # ssl_prefer_server_ciphers on;
```

И измените `listen 443 ssl http2;` на `listen 443;`

```bash
# Проверка конфигурации
nginx -t

# Перезагрузка Nginx
systemctl reload nginx
```

### Вариант Б: Если конфигурация уже существует

```bash
# Посмотрите существующие конфигурации
ls -la /etc/nginx/sites-enabled/

# Если есть старая конфигурация для этого домена, замените её
rm /etc/nginx/sites-enabled/shuffle-strapi
ln -s /etc/nginx/sites-available/shuffle-strapi /etc/nginx/sites-enabled/

nginx -t
systemctl reload nginx
```

---

## Шаг 11: Получение SSL сертификата

### Если сертификат ещё НЕ существует

```bash
# Получение сертификата от Let's Encrypt
certbot --nginx -d shuffle-strapi.hardart.cz

# Следуйте инструкциям:
# 1. Введите email
# 2. Согласитесь с условиями (Y)
# 3. Certbot автоматически настроит Nginx
```

После получения сертификата:

```bash
# Раскомментируйте SSL строки в конфигурации
nano /etc/nginx/sites-available/shuffle-strapi

# Верните все SSL строки и listen 443 ssl http2;

# Проверка и перезагрузка
nginx -t
systemctl reload nginx
```

### Если сертификат уже существует

```bash
# Проверьте существующие сертификаты
certbot certificates

# Если сертификат есть, просто используйте его
# Убедитесь, что SSL строки раскомментированы в nginx.conf

nginx -t
systemctl reload nginx
```

---

## Шаг 12: Проверка работы

```bash
# Проверьте, что приложение работает локально
curl http://localhost:1337

# Проверьте логи PM2
pm2 logs shuffle-strapi --lines 50

# Проверьте статус PM2
pm2 status

# Откройте браузер
# https://shuffle-strapi.hardart.cz
```

---

## ✅ Готово!

Ваш Strapi проект развернут на PM2 и работает на `https://shuffle-strapi.hardart.cz`

---

## Полезные команды PM2

```bash
# Просмотр статуса
pm2 status

# Просмотр логов
pm2 logs shuffle-strapi
pm2 logs shuffle-strapi --lines 100

# Перезапуск
pm2 restart shuffle-strapi

# Остановка
pm2 stop shuffle-strapi

# Запуск
pm2 start shuffle-strapi

# Удаление из PM2
pm2 delete shuffle-strapi

# Мониторинг в реальном времени
pm2 monit

# Информация о процессе
pm2 info shuffle-strapi
```

---

## Обновление приложения

### Быстрое обновление через скрипт

```bash
# Сделайте скрипт исполняемым (один раз)
chmod +x /opt/shuffle-strapi/update.sh

# Запуск обновления
/opt/shuffle-strapi/update.sh
```

### Ручное обновление

```bash
cd /opt/shuffle-strapi

# Получение изменений
git pull origin main

# Установка зависимостей
yarn install

# Сборка
NODE_ENV=production yarn build

# Перезапуск
pm2 restart shuffle-strapi

# Проверка логов
pm2 logs shuffle-strapi
```

---

## Troubleshooting

### Приложение не запускается

```bash
# Проверьте логи PM2
pm2 logs shuffle-strapi --lines 100

# Проверьте .env файл
cat /opt/shuffle-strapi/.env

# Проверьте, не занят ли порт 1337
netstat -tulpn | grep 1337

# Если порт занят, найдите процесс
lsof -i :1337

# Остановите старый процесс (только если это не другой важный проект!)
```

### Nginx возвращает 502 Bad Gateway

```bash
# Убедитесь, что PM2 процесс запущен
pm2 status

# Проверьте логи приложения
pm2 logs shuffle-strapi

# Проверьте логи Nginx
tail -f /var/log/nginx/strapi_error.log

# Проверьте, слушает ли приложение порт 1337
curl http://localhost:1337
```

### Ошибка подключения к базе данных

```bash
# Проверьте переменные окружения
cat /opt/shuffle-strapi/.env | grep DATABASE

# Проверьте подключение к Neon
ping ep-wandering-rain-a2ka4u1n.eu-central-1.aws.neon.tech

# Проверьте логи приложения
pm2 logs shuffle-strapi | grep -i database
```

### После перезагрузки сервера приложение не запускается

```bash
# Проверьте, что PM2 в автозапуске
pm2 startup

# Если нет, настройте автозапуск
pm2 save
pm2 startup systemd

# Проверьте статус
pm2 status
```

---

## Бэкапы

```bash
# Создание бэкапа проекта
cd /opt
tar -czf shuffle-strapi-backup-$(date +%Y%m%d).tar.gz shuffle-strapi/

# Бэкап сохранен в /opt/shuffle-strapi-backup-YYYYMMDD.tar.gz
```

---

## Безопасность

1. **Регулярно обновляйте систему**:
   ```bash
   apt update && apt upgrade -y
   ```

2. **Настройте fail2ban** (опционально):
   ```bash
   apt install -y fail2ban
   systemctl enable fail2ban
   systemctl start fail2ban
   ```

3. **Ограничьте доступ к SSH** только с ваших IP (опционально)

4. **Регулярно обновляйте зависимости**:
   ```bash
   cd /opt/shuffle-strapi
   yarn upgrade
   ```

---

## Краткая шпаргалка

```bash
# Подключение
ssh root@157.90.169.205

# Переход в проект
cd /opt/shuffle-strapi

# Логи
pm2 logs shuffle-strapi

# Перезапуск
pm2 restart shuffle-strapi

# Обновление
./update.sh

# Статус
pm2 status

# Проверка порта
netstat -tulpn | grep 1337
```

---

## Что делать, если что-то пошло не так

1. **Остановите PM2 процесс**: `pm2 stop shuffle-strapi`
2. **Проверьте логи**: `pm2 logs shuffle-strapi --lines 200`
3. **Проверьте .env файл**: `cat .env`
4. **Проверьте подключение к БД**: данные из .env
5. **Перезапустите**: `pm2 restart shuffle-strapi`

Если ничего не помогает, создайте issue в репозитории с логами ошибок.
