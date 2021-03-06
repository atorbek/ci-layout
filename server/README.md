## Серверная часть

### Преднастройка до запуска приложения

1. Установить nodejs `v12.16.2`.

2. В проекте лежит шаблон `.env-template`, его нужно скопировать, переименовать
   в `.env` и прописать значения переменным.

Где,

- `AUTH_TOKEN` - токен для работы с api;
- `WORKSPACES` - путь к папке, где лежат все склонированные репозитории;
- `TMP` - путь к папке, где хранится кэш логов;
- `PORT` - порт на котором поднимается приложение.

3. Через терминал:

- Перейти в папку с сервером `cd server`;
- Установить зависимости через `npm install`.

### Доступные команды

- `npm start` - запуск приложения
- `npm nodemon` - запуск приложения в режиме автоматического перезапуска сервера
  каждый раз после внесения измений в код
- `npm test` - unit-тесты на код

### API

Разработано REST API для работы клиентской части приложения:

- `GET /api/settings` - получение сохраненных настроек репозитория;
- `POST /api/settings` - сохранение настроек;
- `GET /api/builds` - получение списка сборок, которые стоят в очереди на
  выполнение;
- `POST /api/builds/:commitHash` - добавление сборки в очередь на выполнение;
- `GET /api/builds/:buildId` - получение информации о конкретной сборке по
  uid-сборки;
- `GET /api/builds/:buildId/logs` - получение логов завершенной сборки.

### Особенности реализации

- При выполнении запроса `POST /api/settings` клонируется репозиторий. Операция
  клонирования репозитория переделал на синхронную. Форма сохранения будет
  недоступна до тех пор, пока репозиторий не склонируется полностью.

- При сохранении настроек через `POST /api/settings` добавил кэширование
  названия репозитория, чтобы при повторной отправки запроса не клонировать
  репозиторий еще раз.

Алгоритм такой:

- Проверяем, есть ли в кэше репозиторий;
- Если нет, то клонируем;
- Иначе ничего не делаем.

Участок кода при клонировании репозитория:

```javascript
if (!isRepo(repoName)) {
  await gitClone(process.env.WORKSPACES, repoName);
}
```

- При выполнении `GET /api/builds/:buildId/logs` лог кэшируются. В json
  кэшируется только uid лога, а сам лог хранится в файле. JSON - это
  структурированные данные, у меня не получилось работать с ним через потоки.
  Поэтому, я решил, что из кэша буду получать только uid-файла с логом, а сам
  лог уже перенаправлю на клиент через потоки. Таким способом решил избавиться
  от возможных проблем с переполнением памяти.

- Информация о `commitHash` извлекается командой

`git log -1 --pretty=format:{"authorName":"%cn", "commitMessage":"%s", "branchName":"master" }' hash`,
пока зашил master в branchName. Планирую написать метод, в котором отдельно буду
доставать имя ветки. Командой git log получить название нельзя.

- Есть метод,

  ```
   const parseRepoName = (fullname) => {
     const arr = fullname.split('/');
     const len = arr.length;
     return parse(arr[len - 1]).name;
   };

  ```

  который парсит строку и вытаскивает название корневой папки репозитория. Метод
  может работать нестабильно, например, из-за отстутствия валидации названия
  репозитория на клиенте. Подразумевается, что валидация на клиенте будет.

### Технологии

- `lowdb` - библиотека с удобным api для работы с json (использовал для работы с
  кэшем);
- `axios` - библиотека для выполнения http-запросов;
- `dotenv` - утилита для задания переменных окружения в файле `.env`;
- `express` - фреймворк для web-приложений.
