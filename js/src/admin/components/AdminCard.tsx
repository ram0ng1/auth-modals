import Component from 'flarum/common/Component';
import type { ComponentAttrs } from 'flarum/common/Component';
import type Mithril from 'mithril';

export interface IAdminCardAttrs extends ComponentAttrs {
  title: Mithril.Children;
  icon?: string;
}

/**
 * Card shell used to group a single setting in the admin page. The header
 * shows an optional Font Awesome icon next to the title; children render as
 * the card body.
 */
export default class AdminCard<CustomAttrs extends IAdminCardAttrs = IAdminCardAttrs> extends Component<CustomAttrs> {
  view(vnode: Mithril.Vnode<CustomAttrs, this>): Mithril.Children {
    const { title, icon } = this.attrs;

    return (
      <div className="AuthModals-card">
        <div className="AuthModals-card-header">
          {icon && (
            <span className="AuthModals-card-icon">
              <i className={icon} aria-hidden="true" />
            </span>
          )}
          <h3 className="AuthModals-card-title">{title}</h3>
        </div>
        <div className="AuthModals-card-body">{vnode.children}</div>
      </div>
    );
  }
}
