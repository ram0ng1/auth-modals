import app from 'flarum/forum/app';
import type Mithril from 'mithril';

/**
 * Translate a key with a hard-coded fallback for the case where the locale
 * file is missing the entry.
 */
export const trans = (key: string, fallback: string): Mithril.Children => {
  const out = app.translator.trans(key);
  if (out === key) return fallback;
  return out;
};

/**
 * Read a forum-attribute boolean. The PHP side uses `boolval` in
 * `serializeToForum`, so values arrive as true/false/null.
 */
export const settingEnabled = (key: string, defaultValue = false): boolean => {
  const val = app.forum.attribute<boolean | null | undefined>(key);
  if (val === null || val === undefined) return defaultValue;
  return !!val;
};
