# Стартер

- Минифицирует
- Импорты HTML
- Модульный JS
- Модульный SCSS
- Сжатие картинок и конверт в webp
- Не превязан к редактору
- Линтеры
- Автоперезагрузка
- Удобные ручки. Можешь легко выдергивать ненужный css и js

## Как пользоваться

`gulp` — запустить дев сервер.

- Скопирует картинки, шрифты, иконки
- склеити scss в 1 css
- склеит js в 1 файл и минифицирует его

`gulp convertImages` — оптимизирует картинки и помещает их в папку convert-images

`prod`

`prodCopyImages`

## Функционал сборки

### Общие

- Функционал Gulp (`gulp`)
- Создание локального сервера и его автоматическое обновление, при изменении содержимого файлов (`browser-sync`, `del`)
- Уведомление об ошибках (`gulp-plumber`, `gulp-notify`)

### HTML

- Возможность использования шаблонов (`gulp-file-include`)
- Решение проблемы кеширования файлов (`gulp-version-number`)
- Автоматическая замена тегов img на picture для использования webp (`gulp-webp-html-nosvg`)

### CSS

- Препроцессор SASS (`gulp-sass`, `sass`)
- Минимизация CSS (`gulp-clean-css`, `gulp-rename`)
- Автопрефиксы для CSS (`gulp-autoprefixer`)
- Объединение одинаковых медиа-запросов в один (`gulp-group-css-media-queries`)
- Возможность использования webp изображений указанных в теге background-img (`gulp-webpcss`)

### JavaScript

- Синтаксис ES6 для JavaScript (`webpack-stream`, `webpack`)

### Медиа

- Оптимизация и сжатие изображений (`gulp-imagemin`)
- Конвертация в webp (`gulp-webp`)

## Что еще можно сделать

- Добавить отдельную задачу для компиляции изображений
- Общие плагины объединить в один файл
- Создание svg-спрайта
- Конвертация шрифтов из ttf и otf в woff и woff2
