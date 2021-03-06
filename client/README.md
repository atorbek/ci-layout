## Клиентская часть

### Преднастройка до запуска приложения

1. В проекте в папке `/src` лежит шаблон `client-conf-template.json`, его нужно
   скопировать, переименовать в `client-conf.json` и прописать значения.

Пример заполненного конфигурационного файла:

```
{
 "pushServerKey": "//публичная часть ключа для push-уведомлений.
 Сгенерировать публичную часть можно здесь  https://web-push-codelab.glitch.me/",
 "buildServerHost": "http://127.0.0.1",
 "buildServerPort": "3002",
 "baseURL": http://localhost:3001/api
}
```

2. Через терминал:

- Перейти в папку с клиентом `cd client`;
- Установить зависимости через `npm install --python=python3.7`;
- Поднять приложение через `npm run start`.

### Доступные команды

- `npm run start` - запускает приложение;
- `npm run build` - команда собирает проект в папку `build`;
- `npm run test` - запуск интеграционных тестов.
