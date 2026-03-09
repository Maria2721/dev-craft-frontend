## 2026-03-09

**Что было сделано:** Rate limiting, подключение Swagger UI через OpenAPI YAML и закрытие этой документации паролем.

**Rate limiting.** Подключил @nestjs/throttler: на POST /ai/chat - 50 запросов в час с одного IP, на POST /auth/register 
25 запросов в час, на остальные эндпоинты - 30 запросов в мин. При превышении лимита выбрасываем 429 Too Many Requests.
Дабы не было спама и баловства.

**Swagger UI.** Написал OpenAPI 3.0 спецификацию в openapi/openapi.yaml: все эндпоинты (health, auth, ai chat), 
схемы запросов и ответов, коды ошибок, примеры. В main.ts загружаю YAML через js-yaml и отдаю в SwaggerModule - 
интерактивная документация доступна по /openapi. Можно прямо из браузера отправлять запросы, авторизоваться 
через Bearer-токен и тестировать API.

**Защита Swagger.** Закрыл /openapi через express-basic-auth (как в nginx basic auth): при открытии браузер просит логин и пароль. 
Логин и пароль задаются через переменные окружения SWAGGER_USER и SWAGGER_PASSWORD.

**Затраченное время:** 4 часа.