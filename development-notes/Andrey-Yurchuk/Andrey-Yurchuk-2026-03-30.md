## 2026-03-30

**Что было сделано:** Расширил ответ GET /knowledge/topics/:topicId/code-tasks: для заданий типа DRAG_DROP в JSON
добавлено поле referenceSolution - строка с кодом из БД (то же содержимое, что импортируется из markdown в колонку
referenceSolution), чтобы клиент мог разбить ее на фрагменты для drag-and-drop.

**Код:** в domain добавлен интерфейс TopicCodeTaskItem и обновлён тип TopicCodeTasks; в PrismaTopicRepository.getTopicCodeTasks
выборка referenceSolution и маппинг только для DRAG_DROP.

**Затраченное время:** 1,5 часа.