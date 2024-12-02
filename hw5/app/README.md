## Практическое задание: Настройка CI/CD в Github Actions.

### Отчет о выполненном задании

#### Проект

-   Для workflow был выбран проект на JS - Калькулятор.
-   Unit-тесты написаны на Jest, включен вывод отчета в стандартный output, включена таблица с результатом coverage - объем покрытия тестами приложения Калькулятор.
-   Деплой двух файлов - index.html (frontend Калькулятора) и самого скрипта calc.js производится на Github Pages (source - Github Actions).
-   Чтобы сработал импорт класса Calculator в тесты Jest, после подготовки файлов к деплою, но перед тестированием, к скрипту calc.js добавляется строка экспорта класса.

#### Файл workflow

-   [код файла ci-cd.yml](https://github.com/eugenekweb/pipelineDev/blob/main/.github/workflows/ci-cd.yml)

#### Запись выполнения workflow и результата

-   [workflow_video.mkv](../video/workflow_video.mkv)

#### Описание настроенных джобов

##### Triggers

```bash
on:
    workflow_dispatch:
    push:
        branches: [main]
    pull_request:
        branches: [main]
```

-   workflow_dispatch: Позволяет запускать workflow вручную из интерфейса GitHub Actions.
-   push: Запускает workflow при пуше изменений в ветку main.
-   pull_request: Запускает workflow при создании или обновлении Pull Request в ветке main.

##### Permissions (разрешения)

```bash
permissions:
    contents: read
    pages: write
    id-token: write
```

-   contents: read: Чтение содержимого репозитория.
-   pages: write: Доступ к публикации на GitHub Pages.
-   id-token: write: Генерация токенов для безопасной аутентификации.

##### Конкурентность публикации

```bash
concurrency:
    group: "pages"
    cancel-in-progress: false
```

Позволяет ограничить одновременный запуск нескольких workflow для публикации. Если запущено несколько workflow в группе pages, предыдущие не отменяются (cancel-in-progress: false).

##### Jobs (Джобы)

Три, по сути, одинаковых джоба:

-   build_and_run_tests_ubuntu
-   build_and_run_tests_macos
-   build_and_run_tests_windows

и джоб публикации подготовленных файлов в Github Pages

-   publish_app

```bash
needs:
    - build_and_run_tests_linux
    - build_and_run_tests_macos
    - build_and_run_tests_windows
```

Здесь джоб зависит от трех предыдущих. И не начнется, если упал хотя бы 1 из них.

** Описание джобов build_and_run_tests **

1. **Checkout репозитория**:

```bash
uses: actions/checkout@v4
```

Загружает содержимое репозитория для работы.

2. **Настройка Node.js**:

```bash
uses: actions/setup-node@v4
with:
    node-version: 20
    cache: "npm"
    cache-dependency-path: ./hw5/app/package-lock.json

```

Устанавливает Node.js версии 20 и кэширует зависимости.

3. **Подготовка файлов для публикации**:

```bash
mkdir -p public/js
cp hw5/app/index.html public/
cp hw5/app/src/calc.js public/js/
echo "module.exports = Calculator;" >> hw5/app/src/calc.js
```

Создает директорию `public/js`, копирует файлы для публикации.

4. **Установка зависимостей и запуск тестов**:

```bash
working-directory: ./hw5/app
run: |
    npm ci
    npm test
```

Выполняет установку зависимостей (`npm ci`) и тесты (`npm test`).
В джобах Windows и MacOS на этом шаге также добавлена строка, которая в JS-скрипт добавлет возможность экспорта класса:

```bash
echo "module.exports = Calculator;" >> src/calc.js
```

5. **Сохранение файлов для GitHub Pages**:

```bash
uses: actions/upload-pages-artifact@v3
with:
    path: public
```

Сохраняет папку `public` для дальнейшей публикации.
