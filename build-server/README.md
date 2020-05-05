# Билд-сервер

## Преднастройка

1. Установить nodejs `v12.16.2`.

2. В проекте лежит шаблон `server-conf-template.json`, его нужно скопировать,
переименовать в `server-conf.json` и прописать значения.

Пример заполненного конфигурационного файла:

```
{
  "port": 3002,
  "apiBaseUrl": "https://hw.shri.yandex/api/",
  "apiToken": "//токен для работы с https://hw.shri.yandex/api/",
  "limitBuildInQueue": 100,
  "agentBuildTimeout": 120,
  "agentBuildPeriod": 60000,
  "retryRequest": 5,
  "buildPeriod": 5000,
  "vapidPublicKey": "//публичная часть ключа для push-уведомлений. 
Сгенерировать публичную/приватную часть можно здесь  https://web-push-codelab.glitch.me/",
  "vapidPrivateKey": "//приватная часть ключа для push-уведомлений.
Сгенерировать публичную/приватную часть можно здесь  https://web-push-codelab.glitch.me/",
  "email": "example@example.com"
}
```

3. Через терминал:

- Перейти в папку с сервером `cd build-server`;
- Установить зависимости через `npm ci`;
- Поднять агента через `npm start`.

Либо одной командой `cd agent && npm ci && npm start`.

Или 

- Перейти в папку с сервером `cd build-server`;
- Собрать образ `npm run build-docker-image`;
- Создать контейнер `npm run run-docker-container`.

## Особенности реализации

* Для кэша использовал json базу данных `lowdb`



