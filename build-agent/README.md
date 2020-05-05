# Билд-агент

## Преднастройка

1. Установить nodejs `v12.16.2`.

2. В проекте лежит шаблон `agent-conf-template.json`, его нужно скопировать,
переименовать в `agent-conf.json` и прописать значения.

Пример заполненного конфигурационного файла:

```
{
  "serverHost": "http://127.0.0.1",
  "serverPort": "3002",
  "workspaces": "/home/user/Documents/projects/ci/agent",
  "period": 5000,
  "retryRequest": 5,
  "port": "3003"
}
```

3. Через терминал:

- Перейти в папку с агентом `cd build-agent`;
- Установить зависимости через `npm ci`;
- Поднять агента через `npm start`.

Либо одной командой `cd agent && npm ci && npm start`.

Или 

- Перейти в папку с агентом `cd build-agent`;
- Собрать образ `npm run build-docker-image`;
- Создать контейнер `npm run run-docker-container`.