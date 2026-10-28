import app from 'flarum/admin/app';
import Extend from 'flarum/common/extenders';
import UploadImageButton from 'flarum/common/components/UploadImageButton';

import { resolveAssetUrl } from '../common/utils/assetUrl';
import AdminCard from './components/AdminCard';
import AdminToggle from './components/AdminToggle';

export default [
  new Extend.Admin()
    .customSetting(
      () => (
        <AdminCard title={app.translator.trans('ramon-auth-modals.admin.settings.section_image')} icon="fas fa-image">
          <div className="Form-group">
            <label className="AuthModals-label">{app.translator.trans('ramon-auth-modals.admin.settings.image_label')}</label>
            <UploadImageButton
              name="auth-modals"
              routePath="auth-modals/image"
              value={app.data.settings['auth-modals.image']}
              url={resolveAssetUrl(app.data.settings['auth-modals.image'], app)}
            />
            <p className="helpText">{app.translator.trans('ramon-auth-modals.admin.settings.image_help')}</p>
          </div>
        </AdminCard>
      ),
      100
    )
    .customSetting(
      () => (
        <AdminCard title={app.translator.trans('ramon-auth-modals.admin.settings.section_header')} icon="fas fa-sign-in-alt">
          <AdminToggle
            setting="auth-modals.show_header_buttons"
            label={app.translator.trans('ramon-auth-modals.admin.settings.show_header_buttons_label')}
            help={app.translator.trans('ramon-auth-modals.admin.settings.show_header_buttons_help')}
          />
        </AdminCard>
      ),
      90
    ),
];
