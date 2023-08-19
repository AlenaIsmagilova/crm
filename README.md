# Проект реализации внутреннего корпоративного сервиса для учета персонала

## Описание

При инициализации приложения создается суперадмин. С данным суперадмином можно зайти в приложение, введя в поле "пользователь": superadmin, а в поле "пароль": superadmin. Суперадмин может создать сотрудника с любой ролью в организации (в данном приложении две роли: USER и HR).

После создания сотрудника, приходит ссылка с уникальным именем пользователя, которую HR направляет сотруднику для завершения регистрации, сотрудник придумывает пароль и входит в систему. Внутри системы можно увидеть информацию о себе, информацию о других сотрудниках компании.

HR-специалисту доступна страница с метриками: количеством нанятых сотрудников в текущем году/месяце, количеством уволенных сотрудников в текущем году/месяце, линейный график с ожидаемыми выплатами заработной платы, список пользователей с ближайшими днями рождения.

Я старалась реализовать весь функционал согласно ТЗ, из-за отсутствия макета было непросто реализовать экраны, но я, в первую очередь, думала о сотрудниках, чтобы у них было как можно больше фичей для пользования данным сервисом.

### Технологии

Backend:

- Nest.JS v10
- TypeORM
- Typescript

Frontend:

- React v18.2
- React-router-dom v6.14
- Typescript

## Установка и запуск в режиме разработки

1. Клонировать репозиторий

   ```shell
   git clone git@github.com:AlenaIsmagilova/crm.git
   ```

2. Запустить команду

   ```shell
   docker-compose up
   ```
