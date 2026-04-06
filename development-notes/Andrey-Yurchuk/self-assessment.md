# Self-assessment - Андрей Юрчук

**PR с этим файлом:** [PR #77](https://github.com/Maria2721/dev-craft-frontend/pull/77)

---

## 1. Таблица фич (Personal Features, макс. 250 баллов)


| Категория | Фича (по рубрике) | Доказательства | Баллы |
|-----------|-------------------|----------------|------:|
| My Components | **Сложный бэкенд-сервис** - Discord-бот (`discord.js`, чат/STT в Dify, при необходимости `InternalApiChatBackend` - внутренний API, история в PostgreSQL, чанкинг ответов, ffmpeg для аудио) | [`src/discord-bot/`](https://github.com/Maria2721/dev-craft-backend/tree/main/src/discord-bot), PR [#42](https://github.com/Maria2721/dev-craft-backend/pull/42) | 30 |
| My Components | **Сложный бэкенд-сервис** - MCP по HTTP (`McpController`, SDK MCP, tool «сводка по теме» - use cases знаний) | [`src/presentation/api/mcp/`](https://github.com/Maria2721/dev-craft-backend/tree/main/src/presentation/api/mcp), [`src/infrastructure/mcp/`](https://github.com/Maria2721/dev-craft-backend/tree/main/src/infrastructure/mcp), PR [#35](https://github.com/Maria2721/dev-craft-backend/pull/35) | 30 |
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

Основной вклад - **бэкенд на NestJS**: авторизация, API **базы знаний** (темы, вопросы, задачи, попытки), интеграция с **Dify** (чат, проверка кода, сценарии с контекстом), отдельный процесс **Discord-бота** (текст и голос через STT, длинные ответы с **чанкингом**), **MCP** для сводок по темам и связки с **Dify Tools**. В стеке: **TypeScript**, **Prisma**, **PostgreSQL**, **Docker**, **GitHub Actions**, **OpenAPI**.

Сложнее всего было согласовать **Discord**, **Dify** и внутренние API (токены, conversation id, ошибки), отладить цепочку **аудио - STT - чат**, и стабилизировать **MCP** за прокси/авторизацией. Итерации по **промптам и настройкам Dify** задокументированы в дневнике (лимиты Discord, длина ответов модели).

---

## 3. Два личных Feature Component

Здесь - два фича-компонента, которые выносятся на защиту.

### 3.1. Пайплайн Discord-ассистента

Отдельный runtime в [`src/discord-bot/`](https://github.com/Maria2721/dev-craft-backend/tree/main/src/discord-bot): сообщения в канале, опционально **голосовые вложения** (скачивание - **ffmpeg** - **Dify STT** - текст запроса), маршрутизация ответа через **Dify** или **внутренний** бэкенд чата с сохранением истории в **PostgreSQL**.

### 3.2. MCP-сервер и база знаний для Dify Tools

[`McpController`](https://github.com/Maria2721/dev-craft-backend/tree/main/src/presentation/api/mcp/mcp.controller.ts) отдаёт **Streamable HTTP** MCP, регистрирует tool со **сводкой по теме** через те же **get topics / preview**, что и REST API - одна модель знаний для людей и для tooling. Связка с критериями **Tool Use** и **RAG**: в Dify tool может вызывать MCP в workflow.

---

*Критерии: [Week 7 - Self-assessment](https://github.com/Maria2721/dev-craft-backend/blob/main/docs/1-FINAL/WEEK7_CHECKPOINT.md#self-assessment).*
