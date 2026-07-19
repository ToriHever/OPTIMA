import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'remont-bytovoy-tekhniki/:slug', renderMode: RenderMode.Server },
  { path: 'remont-bytovoy-tekhniki/:slug/**', renderMode: RenderMode.Server },
  { path: 'remont-kompyuterov/:slug', renderMode: RenderMode.Server },
  { path: 'remont-kompyuterov/:slug/**', renderMode: RenderMode.Server },
  { path: 'remont-audiovideo/:slug', renderMode: RenderMode.Server },
  { path: 'remont-audiovideo/:slug/**', renderMode: RenderMode.Server },
  { path: 'brands/:slug', renderMode: RenderMode.Server },
  { path: 'masters/:slug', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Prerender }
];
