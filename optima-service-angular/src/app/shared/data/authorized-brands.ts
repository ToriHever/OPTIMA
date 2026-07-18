export const AUTHORIZED_BRAND_SLUGS = ['dreame', 'polaris'];

export function isAuthorizedBrandSlug(slug: string | undefined | null): boolean {
  return !!slug && AUTHORIZED_BRAND_SLUGS.includes(slug);
}
