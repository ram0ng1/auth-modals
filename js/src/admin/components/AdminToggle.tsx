import Component from 'flarum/common/Component';
import type { ComponentAttrs } from 'flarum/common/Component';
import Switch from 'flarum/common/components/Switch';
import type Mithril from 'mithril';

import { getBool, saveSetting, settings } from '../utils/settings';

export interface IAdminToggleAttrs extends ComponentAttrs {
  settingKey: string;
  label: Mithril.Children;
  help?: Mithril.Children;
}

/**
 * Boolean settings toggle that auto-saves on change. Mutates the live
 * `app.data.settings` map so other components reading the same key reflect
 * the new value before the API roundtrip resolves.
 */
export default class AdminToggle<CustomAttrs extends IAdminToggleAttrs = IAdminToggleAttrs> extends Component<CustomAttrs> {
  view(): Mithril.Children {
    const { settingKey, label, help } = this.attrs;
    const value = getBool(settingKey);

    return (
      <div className="Form-group AuthModals-toggle">
        <Switch
          state={value}
          onchange={(checked: boolean) => {
            settings()[settingKey] = checked;
            m.redraw();
            saveSetting({ [settingKey]: checked ? '1' : '0' });
          }}
        >
          {label}
        </Switch>
        {help && <p className="helpText">{help}</p>}
      </div>
    );
  }
}
