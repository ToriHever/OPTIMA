// Строит sitemap.xml по факту уже собранных страниц — обходит dist и берёт
// реальные index.html, а не отдельный список путей, который легко забыть
// обновить при добавлении новой страницы (бренда, статьи блога, модели
// телефона). Запускается после build (см. "postbuild" в package.json),
// поэтому в sitemap попадает ровно то, что реально задеплоится.

import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const browserDir = path.join(rootDir, '..', 'dist', 'optima-service-angular', 'browser');
const outFile = path.join(browserDir, 'sitemap.xml');

const SITE_ORIGIN = 'https://larina.optima-sc.ru';

// Страницы, которых не должно быть в sitemap, хотя они и собраны
// (напр. админка, закрытая в robots.txt).
const EXCLUDE = [/^\/admin(\/|$)/];

function collectPages(dir, urlPath, pages) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      collectPages(path.join(dir, entry.name), `${urlPath}/${entry.name}`, pages);
    } else if (entry.isFile() && entry.name === 'index.html') {
      pages.push(urlPath || '/');
    }
  }
}

function priorityFor(urlPath) {
  const depth = urlPath === '/' ? 0 : urlPath.split('/').filter(Boolean).length;
  return depth === 0 ? '1.0' : depth === 1 ? '0.9' : depth === 2 ? '0.8' : '0.7';
}

const pages = [];
collectPages(browserDir, '', pages);

const urls = pages
  .filter(urlPath => !EXCLUDE.some(re => re.test(urlPath)))
  .sort()
  .map(urlPath => {
    const file = path.join(browserDir, urlPath === '/' ? '.' : urlPath, 'index.html');
    const lastmod = statSync(file).mtime.toISOString().replace(/\.\d{3}Z$/, 'Z');
    const loc = `${SITE_ORIGIN}${urlPath === '/' ? '/' : urlPath + '/'}`;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <priority>${priorityFor(urlPath)}</priority>`,
      '  </url>',
    ].join('\n');
  });

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.join('\n') +
  '\n</urlset>\n';

writeFileSync(outFile, xml, 'utf-8');
console.log(`generate-sitemap: записано ${urls.length} URL в ${path.relative(process.cwd(), outFile)}`);
