## 2026-03-26

**Что сделал:** купил домен у регистратора, привязал к VPS с проектом; разобрался с DNS; 
спланировал и внедрил в репозиторий Caddy как reverse proxy с TLS (Let’s Encrypt); подготовил соотвествующий PR.

**Почему Caddy и как в Docker:**
- Сравнивал с Nginx: для одного домена и автоматического TLS Caddy проще по конфигу (Caddyfile + встроенный ACME). 
Решил поднимать Caddy в контейнере в том же docker-compose, что и app и postgres, а не отдельным пакетом на сервере.
- В docker-compose.yml: сервис Caddy (имадж caddy:2.11-alpine), порты стандарт 80/443, тома caddy_data / caddy_config,
монтирование docker/caddy/Caddyfile; у app убрал проброс порта на хост - API с интернета только через HTTPS; 
postgres пробросил только на 127.0.0.1, чтобы базулечка не светилась на публичный интерфейс.
- Caddyfile: сайт по PUBLIC_DOMAIN, reverse_proxy на app с flush_interval -1 (для MCP/streaming), базовые security-заголовки 
(HSTS, nosniff, referrer, скрытие Server).

**Фронтенд проект:**
- На фронтенд проекте после деплоя нужно сменить базовый URL API со старого варианта по IP и порту 6969 на новый; 
Dify - URL MCP на купленный домен с теми же заголовками Authorization и Accept (включая text/event-stream - иначе снова буду ловить 406).

**Затраченное время:** 5-6 часов.