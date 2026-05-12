import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import type ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';

import { settingEnabled, trans } from './utils';

/**
 * Open a Flarum 2.0 code-split modal by name. Mirrors Flarum's own pattern:
 * `app.modal.show()` accepts a thunk returning a promise resolving to a
 * component constructor.
 */
const showModal = (id: string) => () =>
  app.modal.show(() => flarum.reg.asyncModuleImport(id) as Promise<any>);

/**
 * Replace the default `signUp` / `logIn` HeaderSecondary items with pill-style
 * buttons and inject an "or" separator between them. Only renders when the
 * setting is enabled AND the visitor is a guest.
 */
export default function addHeaderAuthButtons(): void {
  extend(HeaderSecondary.prototype, 'items', function (items: ItemList<Mithril.Children>) {
    if (!settingEnabled('authModalsShowHeaderButtons', false) || app.session.user) return;

    // Flarum 2.0 ItemList uses setContent() — replace() does not exist.
    // Keys: 'signUp' (capital U) and 'logIn'.
    if (items.has('signUp')) {
      items.setContent(
        'signUp',
        <button
          className="Button AuthModals-headerBtn AuthModals-headerBtn--signup"
          onclick={showModal('flarum/forum/components/SignUpModal')}
        >
          <i className="fas fa-user-plus" aria-hidden="true" />
          {app.translator.trans('core.forum.header.sign_up_link')}
        </button>
      );
    }

    if (items.has('logIn')) {
      items.setContent(
        'logIn',
        <button
          className="Button AuthModals-headerBtn AuthModals-headerBtn--login"
          onclick={showModal('flarum/forum/components/LogInModal')}
        >
          <i className="fas fa-sign-in-alt" aria-hidden="true" />
          {app.translator.trans('core.forum.header.log_in_link')}
        </button>
      );
    }

    if (items.has('logIn') && items.has('signUp')) {
      items.add(
        'authModalsSep',
        <span className="AuthModals-headerSep">
          {trans('ramon-auth-modals.forum.header.or', 'or')}
        </span>,
        5
      );
    }
  });
}
