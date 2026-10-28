import app from 'flarum/forum/app';
import { override } from 'flarum/common/extend';
import type Mithril from 'mithril';

import { resolveAssetUrl, safeCssUrl } from '../common/utils/assetUrl';

/**
 * Coloca o ícone e o painel lateral (imagem de fundo) antes do conteúdo
 * original do modal.
 */
const authContent = (iconCls: string) =>
  function (this: unknown, original: () => Mithril.Children): Mithril.Children {
    const heroUrl = resolveAssetUrl(app.forum.attribute<string | null>('authModalsImage'), app);

    return (
      <>
        <div className="AuthModals-formIcon">
          <i className={iconCls} aria-hidden="true" />
        </div>
        <div
          className="AuthModals-panel"
          style={heroUrl ? { backgroundImage: safeCssUrl(heroUrl), backgroundSize: 'cover', backgroundPosition: 'center top' } : {}}
        >
          <div className="AuthModals-panelOverlay" />
        </div>
        {original()}
      </>
    );
  };

// Os modais são chunks carregados sob demanda no Flarum 2. Com o caminho do
// módulo, o override só é aplicado quando o chunk carrega.
export default function addAuthPanelOverride(): void {
  override('flarum/forum/components/LogInModal', 'content', authContent('fas fa-lock'));
  override('flarum/forum/components/SignUpModal', 'content', authContent('fas fa-user-plus'));
  override('flarum/forum/components/ForgotPasswordModal', 'content', authContent('fas fa-envelope'));
}
