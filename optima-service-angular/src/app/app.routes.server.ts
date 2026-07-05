import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'remont-bytovoy-tekhniki/:slug', renderMode: RenderMode.Server },
  { path: 'remont-bytovoy-tekhniki/:slug/:brand', renderMode: RenderMode.Server },
  { path: 'remont-kompyuterov/:slug', renderMode: RenderMode.Server },
  { path: 'remont-kompyuterov/:slug/:brand', renderMode: RenderMode.Server },
  { path: 'remont-audiovideo/:slug', renderMode: RenderMode.Server },
  { path: 'remont-audiovideo/:slug/:brand', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Prerender }
];
