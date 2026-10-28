// Troca `\` por `/`, junta barras repetidas e tira os segmentos `..`.
const normalizePath = (path: string): string =>
  String(path)
    .replace(/\\/g, '/')
    .replace(/\/+/g, '/')
    .split('/')
    .filter((seg, i) => {
      if (seg === '.' || seg === '') return i === 0;
      if (seg === '..') return false;
      return true;
    })
    .join('/');

interface AppWithForum {
  forum: { attribute<T = string>(key: string): T };
}

/**
 * URL completa de um arquivo salvo em `assets/`. URLs http(s) passam direto;
 * qualquer outro esquema (`javascript:`, `data:`) vira null.
 *
 * Recebe o `app` porque o admin e o fórum têm cada um o seu.
 */
export const resolveAssetUrl = (assetPath: string | null | undefined, app: AppWithForum): string | null => {
  if (!assetPath) return null;
  if (/^https?:\/\//i.test(assetPath)) return assetPath;
  if (/^[a-z][a-z0-9+.-]*:/i.test(assetPath)) return null;

  const normalized = normalizePath(assetPath);
  const base = app.forum.attribute<string>('assetsBaseUrl') || `${app.forum.attribute<string>('baseUrl')}/assets`;

  return `${base.replace(/\/+$/, '')}/${normalized}`;
};

export const safeCssUrl = (url: string): string => {
  const escaped = String(url).replace(/"/g, '\\"');
  return `url("${escaped}")`;
};
