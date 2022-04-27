# Natours Frontend

*[Natours Backend App](https://github.com/Pavel418890/natours-backend)*

## Содержание
* [Краткое описание проекта](#summary)
* [Используемые технологии](#tech)
* [Инстуркция по запуску локально](#local-installation)
* [Сценарий для демонстрации возможностей проекта](#description)
* [Планы по развитию проекта](#plans)

## <a id="summary">Краткое описание проекта</a>
Natours Frontend - UI часть web-приложения тур-агенства, которое решает задачи по созданию, продаже и организации туров. 
## <a id="tech">Используемые технологии</a>
| Название                                          | Описание                                                        |
|---------------------------------------------------|-----------------------------------------------------------------|
| TypeScript                                        | Язык программирования                                           |
| React                                             | JavaScript-библиотека для создания пользовательских интерфейсов |
| Redux Toolkit                                     | Менеджмент состояний приложения                                 |
| Stripe                                            | Сервис для оплаты                                               |
| Nginx                                             | Static Сервер внутри Kubernetes кластера                        |
| Docker                                            | Платформа для разработки, доставки и запуска приложения         |
| Google Cloud Platform/Google Kubernetes Engine    | Хостинг и деплой                                                |

## <a id="local-installation">Инстуркция по запуску локально</a>


*Необходимые условия:*

- [docker / docker compose v2](https://www.docker.com/products/docker-desktop/)

- [git-cli](https://git-scm.com/downloads)

- [stripe-cli ( `optional `)](https://stripe.com/docs/stripe-cli)

### Клонирование репозиториев.

```shell
git clone git@github.com:pavel418890/natours-backend.git
```

```shell
git clone git@github.com:pavel418890/natours-frontend.git
```

### Запуск frontend dev mode.

<sub>Переход в директорию</sub>

```shell
cd natours-frontend
```

<sub>Запуск frontend app</sub>

```shell
docker compose up -d
```

### Настройка переменных окружения


* *путь до переменных окружения`<path-to-natours-backend-project>/environments/.env.dev`*

* *путь до переменных окружения DB `<path-to-natours-backend-project>/environments/.env.db.dev`*


* Заполнить пароль для БД

    `DATABASE_PASSWORD=<{{любой пароль}}>`
        
    `POSTGRES_PASSWORD={{DATABASE_PASSWORD}}`


    <details><summary>`Optional` Для тестирования оплаты локально:</summary>

    - Написать мне в телеграмм `@pavel418890` или на почту `pavel418890@gmail.com` 
для получения УЗ и `{{приватного ключа}}` от stripe аккаунта.

    - Установить stripe [stripe-cli](https://stripe.com/docs/stripe-cli).

    * <sub>Аутентификация stripe-cli.</sub>

    ```shell
    stripe login

    ```
    * <sub>Запуск вебхука</sub>

    ```shell
    stripe listen --forward-to localhost:8888/v1/bookings/tour-booking/

    > OUTPUT:
    Ready! Your webhook signing secret is '{{WEBHOOK_SIGNING_SECRET}}' (^C to quit)
    ```

    * <sub>Вставка переменных окружения</sub>

        `STRIPE_WEBHOOK_SECRET_KEY=<{{WEBHOOK_SIGNING_SECRET}}>`

        `STRIPE_PRIVATE_KEY=<{{приватный ключ}}>`
</details>

### Запуск сервера natours-backend

* <sub>Переходим в директорию проекта</sub>

    ```shell
    cd <path-to-natours-backend-project>
    ```

* <sub>Запуск backend приложения</sub>

    ```shell
    docker compose up -d 
    ```

## <a id="description">Сценарий для демонстрации возможностей проекта</a>
* **Регистрация**
    
    Переходим https://www.natours-club.site/signup

    Ввводим почту и пароль

* **Подтверждение почты**

    На почту приходит письмо подтверждения регистрации, переходим по ссыслке указанной в письме

* **Изменение аватара и имени, почты, пароля. (Опционально)**

* **Просмотр подробностей тура**

    Нажимаем в хедере "All Tours"

    Выбираем любой тур и нажимаем "Details" 

    Нажимаем "Book tour now"

* **"Покупка" тура**

    Ожидаем ридеректа на страницу оформления покупки(Оформление покупки выполняется в тестовом режиме)

    Выполнить оплату можно только с данными значениями 

    `Номер карты:` 4242 4242 4242 4242

    `Срок действия карты:` 24/42

    `CVV/CVC:` 424

    `Имя, фамилия:` Любые

    Ожидаем перехода на страницу приобретённых туров(стилизация пока не реализована)
 
## <a id="plans">Планы по развитию проекта</a>

1. Настройка адаптивной верстки под другие устройства. На данный момент только PC / Ноутбук
1. Доработка всех запросов и проработка дизайна в целом. Возможно добавление фреймворка Next JS, SEO, оптимизация изображений
1. Комментарии в клиенской части
1. Разработка пространства для администратора/гида
1. Добавление чатов. Обмен сообщениями через websoket

