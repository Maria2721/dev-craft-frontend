# Self-assessment - Андрей Юрчук

**PR с этим файлом:** [PR #77](https://github.com/Maria2721/dev-craft-frontend/pull/77)

---

## 1. Таблица фич (Personal Features, макс. 250 баллов)


| Категория | Фича (по рубрике) | Доказательства | Баллы |
|-----------|-------------------|----------------|------:|
| My Components | **Сложный бэкенд-сервис** - Discord-бот (`discord.js`, чат и STT в Dify, история в PostgreSQL, чанкинг ответов, **ffmpeg** для голоса) | [`src/discord-bot/`](https://github.com/Maria2721/dev-craft-backend/tree/main/src/discord-bot), PR [#42](https://github.com/Maria2721/dev-craft-backend/pull/42) и PR [#58](https://github.com/Maria2721/dev-craft-backend/pull/58) | 30 |
| My Components | **Сложный бэкенд-сервис** - MCP (`McpController`, SDK MCP): tools **`get_topic_code_tasks`**, **`submit_code_task_ai_check`**, **`get_platform_stats`** | [`src/presentation/api/mcp/`](https://github.com/Maria2721/dev-craft-backend/tree/main/src/presentation/api/mcp), [`src/infrastructure/mcp/`](https://github.com/Maria2721/dev-craft-backend/tree/main/src/infrastructure/mcp), PR [#35](https://github.com/Maria2721/dev-craft-backend/pull/35) и PR [#58](https://github.com/Maria2721/dev-craft-backend/pull/58) | 30 |
| My Components | **Сложный бэкенд-сервис** - домен знаний + **AI-проверка code-task** (use case, разбор ответа LLM) | [`src/application/knowledge/`](https://github.com/Maria2721/dev-craft-backend/tree/main/src/application/knowledge), `submit-code-task-ai-check.use-case.ts` | 30 |
| Backend & Data | Custom Auth (JWT + bcrypt + guards) | модуль auth, Passport | 20 |
| Backend & Data | Custom backend + локальная БД (NestJS + Prisma + PostgreSQL) | Схема и миграции: [`prisma/schema.prisma`](https://github.com/Maria2721/dev-craft-backend/tree/main/prisma), доступ к данным через Prisma Client в репозиториях; PostgreSQL в [`docker-compose.yml`](https://github.com/Maria2721/dev-craft-backend/blob/main/docker-compose.yml) | 30 |
| Backend & Data | Backend framework (NestJS) | Приложение собрано на NestJS: корневой [`AppModule`](https://github.com/Maria2721/dev-craft-backend/blob/main/src/app.module.ts), подключение модулей (`@Module`), DI, контроллеры/use cases; запуск в [`main.ts`](https://github.com/Maria2721/dev-craft-backend/blob/main/src/main.ts) | 10 |
| Backend & Data | Документация API (OpenAPI) | `openapi/openapi.yaml`, Swagger | 5 |
| AI | AI RAG (поиск/ретривал в **Dify**, бэкенд отдаёт контекст и связан с Chatflow) | сценарии Dify + AI-слой бэкенда | 20 |
| AI | Tool Use (Dify tool - **MCP**) | MCP controller, tools | 15 |
| Quality | Unit tests ≥20% | [скриншот сводки покрытия](https://files.catbox.moe/hf7t5y.png) | 10 |
| Quality | Unit tests ≥50% | [тот же скриншот](https://files.catbox.moe/hf7t5y.png) | 10 |
| DevOps & Role | Prompt Engineering (3+ итераций в дневнике) | [2026-03-23](https://github.com/Maria2721/dev-craft-frontend/blob/main/development-notes/Andrey-Yurchuk/Andrey-Yurchuk-2026-03-23.md), [2026-03-29](https://github.com/Maria2721/dev-craft-frontend/blob/main/development-notes/Andrey-Yurchuk/Andrey-Yurchuk-2026-03-29.md) | 15 |
| DevOps & Role | Architect (ADR, схемы) | [`architecture/`](https://github.com/Maria2721/dev-craft-backend/tree/main/architecture) | 10 |
| DevOps & Role | Docker (app + БД + бот + опционально прокси в compose) | [`docker-compose.yml`](https://github.com/Maria2721/dev-craft-backend/blob/main/docker-compose.yml) | 10 |
| DevOps & Role | Auto-deploy | [`.github/workflows/deploy.yml`](https://github.com/Maria2721/dev-craft-backend/tree/main/.github/workflows) | 5 |
| Architecture | Design Patterns (слои, use cases, порты) | [`presentation/`](https://github.com/Maria2721/dev-craft-backend/tree/main/src/presentation), [`application/`](https://github.com/Maria2721/dev-craft-backend/tree/main/src/application), [`domain/`](https://github.com/Maria2721/dev-craft-backend/tree/main/src/domain), [`infrastructure/`](https://github.com/Maria2721/dev-craft-backend/tree/main/src/infrastructure) | 10 |
| | **Итого:** | | **260** |

---

## 2. Описание моей работы

Основной вклад - **бэкенд на NestJS**: авторизация, API **базы знаний** (темы, вопросы, задачи, попытки), интеграция с **Dify** (чат, проверка кода, сценарии с контекстом), отдельный процесс **Discord-бота** (текст и голос через STT, длинные ответы с **чанкингом**), **MCP** для **Dify Tools**: список code-task по теме, **сабмит AI-проверки**, **статистика практики** по пользователю Discord. В стеке: **TypeScript**, **Prisma**, **PostgreSQL**, **Docker**, **GitHub Actions**, **OpenAPI**.

Сложнее всего было согласовать **Discord**, **Dify** и внутренние API (токены, conversation id, ошибки), отладить цепочку **аудио - STT - чат**, стабилизировать **MCP** за прокси/авторизацией и выстроить **чатфлоу** (классификатор, переменные сессии, MCP-узлы без утечки JSON в ответ). Итерации по **промптам и настройкам Dify** задокументированы в дневнике (лимиты Discord, длина ответов модели).

---

## 3. Два личных Feature Component

Здесь - два фича-компонента, которые выносятся на защиту.

### 3.1. Пайплайн Discord-ассистента

Бот — **отдельный процесс** с кодом в [`src/discord-bot/`](https://github.com/Maria2721/dev-craft-backend/tree/main/src/discord-bot); входящие сообщения приходят из Discord-канала.

В обычном сценарии человек пишет в канал **текстом**, бот отправляет этот текст в **основной бэкенд** (Nest). Бэкенд смотрит: **какой это канал** и **какой пользователь Discord** — по этой паре в **PostgreSQL** всегда одна и та же **беседа** (если её ещё не было, строка создаётся при первом сообщении). У беседы в базе есть **свой id**; и вопрос пользователя, и ответ ассистента сохраняются **отдельными записями** в таблице сообщений и **привязаны к id этой беседы**. Перед тем как снова позвать модель, бэкенд **подтягивает из PostgreSQL последние сообщения этой беседы** и отдаёт их в цепочку с LLM — поэтому следующий ответ продолжает диалог, а не начинает «с чистого листа», даже после перезапуска бота или сервера.

### 3.2. MCP-сервер и база знаний для Dify Tools

**MCP-сервер** собран на официальном **SDK** Model Context Protocol — пакет **`@modelcontextprotocol/sdk`**: соединение с клиентом идёт через транспорт **Streamable HTTP** (`StreamableHTTPServerTransport`), набор tools и схемы аргументов задаёт **`createDevCraftMcpServer`** (валидация **Zod**). В Nest это подключает [`McpController`](https://github.com/Maria2721/dev-craft-backend/tree/main/src/presentation/api/mcp/mcp.controller.ts), чтобы **Dify** мог вызывать инструменты из чатфлоу.

Зарегистрированы **три инструмента**:

1. **`get_topic_code_tasks`** — по выбранной **теме** возвращает **задачи с кодом** (можно получить краткий каталог или полный список), чтобы пользователь в Discord видел, что можно решать.
2. **`submit_code_task_ai_check`** — принимает **решение по задаче** и запускает **ту же AI-проверку**, что и веб: ответ модели разбирается на бэкенде, результат попадает в **базу** как **попытка**, как при отправке с сайта.
3. **`get_platform_stats`** — отдаёт **сводную статистику** по уже пройденным **AI-проверкам** для человека из Discord: бэкенд понимает пользователя по **идентификатору Discord** и считает агрегаты по его попыткам.

---

*Критерии: [Week 7 - Self-assessment](https://github.com/Maria2721/dev-craft-backend/blob/main/docs/1-FINAL/WEEK7_CHECKPOINT.md#self-assessment).*
