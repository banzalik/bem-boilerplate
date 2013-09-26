# Заготовка для работы с BEM проектами
---
## Основная идея:
Шаблон, позволяющий быстро начать разрабатываться с *полным* стеком [BEM](http://bem.info) .

###Внимание
Данный шаблон настроен под меня и отражает мое видение и мои потребности от BEM проектов, если вы хотите использовать **правильный BEM стек** то необходимо использовать [project-stub](https://github.com/bem/project-stub).

---
## Что уже есть:
###Поддержка stylus, как препроцессора
Можно писать код, как на чистом CSS, так и в .styl файлах.

###Иное (старое) именование папок
 * Папки с блоками - `blocks-*`
 * Папки со страницами - `pages-*`
 Выбрано в пользу удобства восприятия и нормальной сортировки на файловой системе.
 
###Шаблонизатор
Для шаблонизации используется 2 технологии:

 * `bemjson` - для описания вью ориентированного HTML
 * [bh](https://github.com/enb-make/bh) - декларотивный шаблонизатор, позволяющий преобразовывать bemjson в HTML. 
Отличается тем, что имеет js синтакисис (будет правильная подсветка в редакторах).
Умеет компилироваться как на клиенте так и на сервере (nodejs).

###Зависимости
Для описания зависимостей, используется технология `deps.js`.

###Сборка
Для сборки BEM проекта используется инструмент [enb](https://github.com/enb-make/enb).

###Установка и запуск
Очень сырая (малофункциональная) beta.

```
npm install
make
```

## Планы:
* Добавить возможность использовать Grunt, как часть сборки
* Добавить возможность автогенерации спрайтов
* Добавить bootstrap, для быстрого прототипирования
* Подключить csso / svgo /imgo
* Подключить *Lint
* Экпорт проекта в структуру вида `*.html images/ js/ css/`
* Возможность создавать общие и раздельные сборки
* Возможность создавать responsive сайты
* Один проект - много представлений (десткоп, мобайл, тач)
* Поддержка LiveReload.
* Работа как на сервере, так и на клиенте
* Возможность использовать общий конфиг для JS / HTML / СSS
* Генерация документации из JSDoc + CSSDoc + *.md
* Тестирование JS
* Тестирование CSS
* Тестирование соответствия верстки и дизайна
* Использование техник freeze для деплоя статики/
* Использование разных частей HTML5 ★ BOILERPLATE, для скелета проекта
* Использование [if-ie.styl](https://github.com/kizu/if-ie.styl)
* Использование авто-генерации спрайтов