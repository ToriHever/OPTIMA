// Читает markdown-посты из content/blog/*.md (их редактирует Decap CMS)
// и превращает их в TS-модуль с уже отрендеренным HTML — так же, как
// остальные данные сайта (masters-data.ts и т.п.), чтобы страницы блога
// могли попасть в общий механизм статического prerender (app.routes.server.ts).

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(rootDir, '..', 'content', 'blog');
const outDir = path.join(rootDir, '..', 'src', 'app', 'features', 'blog');
const outFile = path.join(outDir, 'blog-data.generated.ts');

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

// Держим в синхроне с src/app/features/masters/masters-data.ts — это те же
// мастера, но их нельзя импортировать напрямую (тот файл компилируется
// Angular'ом, а этот скрипт — обычный Node).
const AUTHORS = {
  aleksey: { slug: 'aleksey', name: 'Алексей', role: 'Главный мастер', initials: 'АЛ', bg: 'linear-gradient(135deg, #00444D 0%, #30676E 100%)' },
  dmitriy: { slug: 'dmitriy', name: 'Дмитрий', role: 'Мастер по крупной технике', initials: 'ДМ', bg: 'linear-gradient(135deg, #1e8a8a 0%, #00444D 100%)' },
  stanislav: { slug: 'stanislav', name: 'Станислав', role: 'Администратор сервиса', initials: 'СТ', bg: 'linear-gradient(135deg, #2a7a80 0%, #00444D 100%)' }
};

const TRANSLIT = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i',
  й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't',
  у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '',
  э: 'e', ю: 'yu', я: 'ya'
};

function slugify(text) {
  const transliterated = String(text)
    .toLowerCase()
    .split('')
    .map(ch => TRANSLIT[ch] ?? ch)
    .join('');
  return transliterated
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';
}

const HEADING_RE = /<h([23])>([\s\S]*?)<\/h\1>/g;
const TOC_MARKER = /\{toc\}\s*$/i;

function addHeadingIdsAndCollectToc(html) {
  const used = new Set();
  const toc = [];

  const withIds = html.replace(HEADING_RE, (match, level, inner) => {
    let cleanInner = inner;
    let include = level === '2';

    if (level === '3' && TOC_MARKER.test(inner.trim())) {
      include = true;
      cleanInner = inner.trim().replace(TOC_MARKER, '').trimEnd();
    }

    const plainText = cleanInner.replace(/<[^>]+>/g, '').trim();
    let id = slugify(plainText);
    let unique = id;
    let i = 2;
    while (used.has(unique)) {
      unique = `${id}-${i++}`;
    }
    used.add(unique);

    if (include && plainText) {
      toc.push({ id: unique, text: plainText, level: Number(level) });
    }

    return `<h${level} id="${unique}">${cleanInner}</h${level}>`;
  });

  return { html: withIds, toc };
}

const files = existsSync(contentDir)
  ? readdirSync(contentDir).filter(f => f.endsWith('.md'))
  : [];

const posts = files.map(file => {
  const raw = readFileSync(path.join(contentDir, file), 'utf-8');
  const { data, content } = matter(raw);

  if (!data.title) {
    throw new Error(`Пост "${file}" без обязательного поля "title" во frontmatter`);
  }

  const slug = data.slug || slugify(data.title) || file.replace(/\.md$/, '');
  const rawHtml = marked.parse(content);
  const { html: bodyHtml, toc } = addHeadingIdsAndCollectToc(rawHtml);
  const author = data.author && AUTHORS[data.author] ? AUTHORS[data.author] : null;

  return {
    slug,
    title: data.title,
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    excerpt: data.excerpt ?? '',
    cover: data.cover ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    author,
    seoTitle: data.seoTitle ?? '',
    seoDescription: data.seoDescription ?? '',
    toc,
    bodyHtml
  };
}).sort((a, b) => b.date.localeCompare(a.date));

const header = `// АВТОГЕНЕРИРУЕМЫЙ ФАЙЛ. Не редактировать вручную —
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

`;

const body = `export const BLOG_POSTS: BlogPostData[] = ${JSON.stringify(posts, null, 2)};\n`;

writeFileSync(outFile, header + body, 'utf-8');
console.log(`generate-blog-data: записано ${posts.length} пост(ов) в ${path.relative(process.cwd(), outFile)}`);
