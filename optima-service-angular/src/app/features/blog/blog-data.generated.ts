// АВТОГЕНЕРИРУЕМЫЙ ФАЙЛ. Не редактировать вручную —
// пересоздаётся скриптом scripts/generate-blog-data.mjs из content/blog/*.md
// (запускается автоматически перед build и serve, см. package.json).

export interface BlogAuthorData {
  slug: string;
  name: string;
  role: string;
  initials: string;
  bg: string;
}

export interface BlogTocItem {
  id: string;
  text: string;
  level: number;
}

export interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  tags: string[];
  author: BlogAuthorData | null;
  seoTitle: string;
  seoDescription: string;
  toc: BlogTocItem[];
  bodyHtml: string;
}

export const BLOG_POSTS: BlogPostData[] = [
  {
    "slug": "kak-prohodit-process-remonta-vertikalnogo-moyushego-pylesosa-dreame",
    "title": "Как проходит процесс ремонта вертикального моющего пылесоса Dreame",
    "date": "2026-09-13T00:00:00.000Z",
    "excerpt": "Рассказываем как прошел ремонт пылесоса Dreame: замента гофры, двигателей роликовых щеток, очистка механизмов и ревизия электических контактов.",
    "cover": "/assets/blog/l.jpg",
    "tags": [
      "Вертикальный моющий пылесос",
      "Dreame"
    ],
    "author": null,
    "seoTitle": "",
    "seoDescription": "",
    "toc": [
      {
        "id": "kak-prohodit-process-remonta",
        "text": "Как проходит процесс ремонта",
        "level": 2
      }
    ],
    "bodyHtml": "<p>В сервисный центр поступил вертикальный моющий пылесос Dreame. Выполнен комплексный ремонт чистящего модуля, включающий замену гофры и двигателей роликовых щеток.</p>\n<p><img src=\"/assets/blog/l-1-.jpg\" alt=\"Фото гофры вертикального моющего пылесоса Dreame\" title=\"Гофра вертикального моющего пылесоса Dreame\"></p>\n<p><strong>Показания к замене деталей</strong></p>\n<ul>\n<li>Гофра: устанавливается новая при появлении трещин, разрывов и любом нарушении герметичности.</li>\n<li>Двигатели роликовых щеток: меняются при критическом износе механизмов или полном отказе (щетка перестает вращаться).</li>\n</ul>\n<h2 id=\"kak-prohodit-process-remonta\">Как проходит процесс ремонта</h2>\n<p>Восстановление работоспособности моющего пылесоса требует аккуратной полной разборки узла и состоит из следующих этапов:</p>\n<ul>\n<li>Глубокая очистка механизмов от спрессованной пыли, грязи и намотанных волос.</li>\n<li>Ревизия электрических контактов.</li>\n<li>Установка новых двигателей и гофры с обязательной проверкой герметичности системы.</li>\n<li>Закладка новой смазки в редуктор для предотвращения трения и плавного хода щеток.</li>\n<li>Обратная сборка и финальное тестирование устройства во всех режимах.</li>\n</ul>\n<p><img src=\"/assets/blog/l-3-.jpg\" alt=\"Фото процесса ремонта пылесоса Dreame\" title=\"Процесса ремонта пылесоса Dreame\"></p>\n<p>Неквалифицированная разборка моющей техники часто приводит к повреждению хрупких пластиковых защелок или случайному залитию электроники остатками воды. </p>\n<p>При отсутствии опыта ремонта подобных устройств рекомендуем сразу обращаться к инженерам «<a href=\"https://larina.optima-sc.ru/\">Оптима Сервис</a>».</p>\n<p><img src=\"/assets/blog/l-2-.jpg\" alt=\"Фото успешного ремонта пылесоса Dreame\" title=\"Успешный ремонт пылесоса Dreame\"></p>\n"
  }
];
