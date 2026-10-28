import app from 'flarum/admin/app';
import Component from 'flarum/common/Component';
import type { ComponentAttrs } from 'flarum/common/Component';
import Switch from 'flarum/common/components/Switch';
import saveSettings from 'flarum/admin/utils/saveSettings';
import type Mithril from 'mithril';

export interface IAdminToggleAttrs extends ComponentAttrs {
  setting: string;
  label: Mithril.Children;
  help?: Mithril.Children;
}

export default class AdminToggle<CustomAttrs extends IAdminToggleAttrs = IAdminToggleAttrs> extends Component<CustomAttrs> {
  loading = false;

  view(): Mithril.Children {
    const { setting, label, help } = this.attrs;
    // O valor chega como '1'/'0', mas um padrão do extend.php pode vir booleano.
    const value: unknown = app.data.settings[setting];

    return (
      <div className="Form-group AuthModals-toggle">
        <Switch state={[true, 1, '1', 'true'].includes(value as any)} loading={this.loading} onchange={this.change.bind(this)}>
          {label}
        </Switch>
        {help && <p className="helpText">{help}</p>}
      </div>
    );
  }

  change(checked: boolean): void {
    this.loading = true;

    // O saveSettings do core devolve o valor antigo se o POST falhar, e o
    // app.request já mostra o alerta de erro.
    saveSettings({ [this.attrs.setting]: checked ? '1' : '0' })
      .catch(() => {})
      .finally(() => {
        this.loading = false;
        m.redraw();
      });
  }
}
