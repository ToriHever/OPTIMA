import { UrlMatchResult, UrlSegment } from '@angular/router';

/**
 * Матчер для роута «бренд» с необязательным сегментом модели.
 *
 * Поглощает 1 сегмент (`:brand`) или 2 сегмента (`:brand/:model`) и кладёт их
 * в posParams. Оба варианта матчатся ОДНИМ узлом роута — значит при переходе
 * между `/…/brand` и `/…/brand/model` (и между моделями) Angular переиспользует
 * компонент, а не пересоздаёт его: страница не «перезапускается», обновляется
 * только paramMap.
 */
export function brandModelMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  if (segments.length === 1) {
    return { consumed: segments, posParams: { brand: segments[0] } };
  }
  if (segments.length === 2) {
    return { consumed: segments, posParams: { brand: segments[0], model: segments[1] } };
  }
  return null;
}
