import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

/**
 * nginx перед Apache принудительно редиректит любой путь без завершающего
 * слэша на путь со слэшем (/about → /about/). .htaccess это не отменяет.
 * Чтобы поисковые роботы и переходы по ссылкам не упирались в лишний 301,
 * весь фронт должен формировать адреса сразу со слэшем.
 *
 * Этот сериализатор — единая точка: RouterLink, router.url и, как следствие,
 * <link rel="canonical"> получают путь с завершающим слэшем. При разборе
 * входящего адреса слэш срезается, чтобы совпадение с маршрутами не менялось.
 */
export class TrailingSlashUrlSerializer implements UrlSerializer {
  private readonly base = new DefaultUrlSerializer();

  parse(url: string): UrlTree {
    // '/about/' и '/about/?x=1#y' → '/about' перед сопоставлением с маршрутами
    const normalized = url.replace(/\/+(?=$|[?#])/g, (match, offset: number) =>
      offset === 0 ? '/' : ''
    );
    return this.base.parse(normalized === '' ? '/' : normalized);
  }

  serialize(tree: UrlTree): string {
    const url = this.base.serialize(tree);
    const hashIndex = url.indexOf('#');
    const fragment = hashIndex === -1 ? '' : url.slice(hashIndex);
    const withoutFragment = hashIndex === -1 ? url : url.slice(0, hashIndex);

    const queryIndex = withoutFragment.indexOf('?');
    const query = queryIndex === -1 ? '' : withoutFragment.slice(queryIndex);
    let path = queryIndex === -1 ? withoutFragment : withoutFragment.slice(0, queryIndex);

    if (path !== '/' && !path.endsWith('/')) {
      path += '/';
    }

    return path + query + fragment;
  }
}

export const trailingSlashUrlSerializerProvider = {
  provide: UrlSerializer,
  useClass: TrailingSlashUrlSerializer,
};
