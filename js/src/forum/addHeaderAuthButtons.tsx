import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import type ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';

// Mesmo jeito do core: o modal é um chunk carregado sob demanda.
const showModal = (id: string) => () => app.modal.show(() => flarum.reg.asyncModuleImport(id) as Promise<any>);

/**
 * Troca os itens `signUp` e `logIn` do header por botões em pílula, com um
 * "ou" entre eles. Só para visitantes e com a opção ligada no admin.
 */
export default function addHeaderAuthButtons(): void {
  extend(HeaderSecondary.prototype, 'items', function (items: ItemList<Mithril.Children>) {
    if (!app.forum.attribute<boolean>('authModalsShowHeaderButtons') || app.session.user) return;

    if (items.has('signUp')) {
      items.setContent(
        'signUp',
        <button className="Button AuthModals-headerBtn AuthModals-headerBtn--signup" onclick={showModal('flarum/forum/components/SignUpModal')}>
          <i className="fas fa-user-plus" aria-hidden="true" />
          {app.translator.trans('core.forum.header.sign_up_link')}
        </button>
      );
    }

    if (items.has('logIn')) {
      items.setContent(
        'logIn',
        <button className="Button AuthModals-headerBtn AuthModals-headerBtn--login" onclick={showModal('flarum/forum/components/LogInModal')}>
          <i className="fas fa-sign-in-alt" aria-hidden="true" />
          {app.translator.trans('core.forum.header.log_in_link')}
        </button>
      );
    }

    if (items.has('logIn') && items.has('signUp')) {
      // Só visual: o leitor de tela já anuncia os dois botões.
      items.add(
        'authModalsSep',
        <span className="AuthModals-headerSep" aria-hidden="true">
          {app.translator.trans('ramon-auth-modals.forum.header.or')}
        </span>,
        5
      );
    }
  });
}
