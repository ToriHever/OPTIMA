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

const files = existsSync(contentDir)
  ? readdirSync(contentDir).filter(f => f.endsWith('.md'))
  : [];

const posts = files.map(file => {
  const raw = readFileSync(path.join(contentDir, file), 'utf-8');
  const { data, content } = matter(raw);
  const slug = data.slug || file.replace(/\.md$/, '');

  if (!data.title) {
    throw new Error(`Пост "${file}" без обязательного поля "title" во frontmatter`);
  }

  return {
    slug,
    title: data.title,
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    excerpt: data.excerpt ?? '',
    cover: data.cover ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    bodyHtml: marked.parse(content)
  };
}).sort((a, b) => b.date.localeCompare(a.date));

const header = `// АВТОГЕНЕРИРУЕМЫЙ ФАЙЛ. Не редактировать вручную —
// пересоздаётся скриптом scripts/generate-blog-data.mjs из content/blog/*.md
// (запускается автоматически перед build и serve, см. package.json).

export interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  tags: string[];
  bodyHtml: string;
}

`;

const body = `export const BLOG_POSTS: BlogPostData[] = ${JSON.stringify(posts, null, 2)};\n`;

writeFileSync(outFile, header + body, 'utf-8');
console.log(`generate-blog-data: записано ${posts.length} пост(ов) в ${path.relative(process.cwd(), outFile)}`);
