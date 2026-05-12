import app from 'flarum/admin/app';
import type Mithril from 'mithril';

/**
 * Coerce common truthy raw values into a real boolean. Settings come back as
 * strings ('1', 'true') or numbers depending on how they were saved.
 */
export const isOn = (raw: unknown): boolean =>
  raw === true || raw === 'true' || raw === 1 || raw === '1';

/**
 * Live `app.data.settings` map — mutate for instant UI feedback before the
 * POST resolves.
 */
export const settings = (): Record<string, unknown> =>
  (app as unknown as { data: { settings: Record<string, unknown> } }).data.settings || {};

export const getBool = (key: string): boolean => isOn(settings()[key]);

/**
 * POST a partial settings update. Mirrors the Flarum core pattern of saving
 * on every change instead of using a submit button.
 */
export function saveSetting(payload: Record<string, unknown>): Promise<unknown> {
  const apiUrl = (app.forum.attribute<string>('apiUrl') || '/api').replace(/\/+$/, '');
  return app.request({ method: 'POST', url: `${apiUrl}/settings`, body: payload });
}

/**
 * Translate a key with a hard-coded fallback for the case where the locale
 * file is missing the entry (e.g. during early bootstrapping or a partial
 * translation).
 */
export const trans = (key: string, fallback: string): Mithril.Children => {
  const out = app.translator.trans(key);
  if (out === key) return fallback;
  return out;
};
