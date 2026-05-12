import app from 'flarum/forum/app';
import { override } from 'flarum/common/extend';
import type Mithril from 'mithril';

import { resolveAssetUrl, safeCssUrl } from '../common/utils/assetUrl';

const PATCHED_FLAG = '__authModalsPanelPatched';

interface PatchableProto {
  [PATCHED_FLAG]?: boolean;
}

/**
 * Build a Mithril `content()` override that injects the auth-modals side
 * panel (background image + contextual icon) before the modal's original
 * content. `iconCls` is the Font Awesome class for the modal's icon.
 */
const buildAuthPanelOverride = (iconCls: string) =>
  function authContent(this: unknown, original: () => Mithril.Children): Mithril.Children {
    const rawUrl = app.forum.attribute<string | null | undefined>('authModalsImage') || null;
    const heroUrl = rawUrl ? resolveAssetUrl(rawUrl, app) : null;

    return (
      <>
        <div className="AuthModals-formIcon">
          <i className={iconCls} aria-hidden="true" />
        </div>
        <div
          className="AuthModals-panel"
          style={
            heroUrl
              ? {
                  backgroundImage: safeCssUrl(heroUrl),
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                }
              : {}
          }
          oncreate={(vnode: Mithril.VnodeDOM) => {
            // CSS `:has()` can lose to Flarum's inline max-width on
            // `.Modal-dialog`. Use `setProperty('…', 'important')` so our
            // inline style beats everything, including any Flarum JS-set
            // inline style. We target both `.Modal-dialog` and `.Modal` as
            // fallback (structure varies between Flarum 2.x builds).
            if (window.innerWidth < 768) return;
            const dom = vnode.dom as HTMLElement;
            const targets = [dom.closest('.Modal-dialog'), dom.closest('.Modal')].filter(
              (el): el is HTMLElement => el instanceof HTMLElement
            );
            targets.forEach((el) => {
              el.style.setProperty('max-width', '860px', 'important');
              el.style.setProperty('width', '92vw', 'important');
            });
          }}
        >
          <div className="AuthModals-panelOverlay" />
        </div>
        {original()}
      </>
    );
  };

/**
 * Inject the side-panel + icon into the Log In, Sign Up and Forgot Password
 * modals. These modals are code-split chunks in Flarum 2.0, so we must use
 * `flarum.reg.asyncModuleImport` to resolve them at runtime — static imports
 * return `undefined` at load time.
 *
 * `ExportRegistry.chunkUrl` needs `app.forum.attribute('assetsUrl')` to build
 * chunk URLs, and `app.forum` is set during `boot()` AFTER initializers run.
 * `setTimeout(fn, 0)` defers to the next event-loop tick — after `boot()`.
 */
export default function addAuthPanelOverride(): void {
  setTimeout(() => {
    Promise.all([
      flarum.reg.asyncModuleImport('flarum/forum/components/LogInModal'),
      flarum.reg.asyncModuleImport('flarum/forum/components/SignUpModal'),
      flarum.reg.asyncModuleImport('flarum/forum/components/ForgotPasswordModal'),
    ])
      .then((modules) => {
        const [logIn, signUp, forgot] = modules as Array<{ prototype: PatchableProto }>;
        if (logIn.prototype[PATCHED_FLAG]) return;

        override(logIn.prototype as any, 'content', buildAuthPanelOverride('fas fa-lock'));
        override(signUp.prototype as any, 'content', buildAuthPanelOverride('fas fa-user-plus'));
        override(forgot.prototype as any, 'content', buildAuthPanelOverride('fas fa-envelope'));

        logIn.prototype[PATCHED_FLAG] = true;
      })
      .catch(() => {
        // Graceful no-op if any chunk is unavailable — the modals still work,
        // they just render without our panel.
      });
  }, 0);
}
