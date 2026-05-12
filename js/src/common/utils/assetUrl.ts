/**
 * Normalize an asset path: strip backslashes, collapse duplicate slashes, and
 * drop traversal segments. Keeps the path safe to append to a base URL.
 */
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
 * Resolve a setting-stored path (or absolute URL) into a full asset URL.
 * Returns null when the input is empty or uses a non-http(s) scheme — e.g.
 * `javascript:` — which would be unsafe to render as a background image.
 *
 * Accepts `app` as a parameter so the same helper works from both admin and
 * forum entry points (each has its own typed Application singleton).
 */
export const resolveAssetUrl = (
  assetPath: string | null | undefined,
  app: AppWithForum
): string | null => {
  if (!assetPath) return null;
  if (/^https?:\/\//i.test(assetPath)) return assetPath;
  if (/^[a-z][a-z0-9+.-]*:/i.test(assetPath)) return null;

  const normalized = normalizePath(assetPath);
  const base =
    app.forum.attribute<string>('assetsBaseUrl') ||
    `${app.forum.attribute<string>('baseUrl')}/assets`;

  return `${base.replace(/\/+$/, '')}/${normalized}`;
};

/**
 * Build a CSS `url(...)` value that escapes embedded double quotes so we
 * don't end up with a broken `background-image` if the URL contains them.
 */
export const safeCssUrl = (url: string): string => {
  const escaped = String(url).replace(/"/g, '\\"');
  return `url("${escaped}")`;
};
