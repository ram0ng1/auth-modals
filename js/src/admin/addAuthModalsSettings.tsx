import app from 'flarum/admin/app';
import UploadImageButton from 'flarum/common/components/UploadImageButton';

import { resolveAssetUrl } from '../common/utils/assetUrl';

import AdminCard from './components/AdminCard';
import AdminToggle from './components/AdminToggle';
import { trans } from './utils/settings';

const EXT_ID = 'ramon-auth-modals';

/**
 * Register the two settings panels (background image + header buttons toggle)
 * on the Auth Modals extension page. Settings auto-save on change.
 */
export default function addAuthModalsSettings(): void {
  const reg = app.registry.for(EXT_ID);

  reg.registerSetting(
    () => (
      <AdminCard
        title={trans('ramon-auth-modals.admin.settings.section_image', 'Modal background')}
        icon="fas fa-image"
      >
        <div className="Form-group">
          <label className="AuthModals-label">
            {trans('ramon-auth-modals.admin.settings.image_label', 'Auth Modal Image')}
          </label>
          <UploadImageButton
            name="auth-modals"
            routePath="auth-modals/image"
            value={app.data.settings['auth-modals.image']}
            url={resolveAssetUrl(app.data.settings['auth-modals.image'], app)}
          />
          <p className="helpText">
            {trans(
              'ramon-auth-modals.admin.settings.image_help',
              'Background image shown in the right panel of the login, sign up, and forgot password modals.'
            )}
          </p>
        </div>
      </AdminCard>
    ),
    100
  );

  reg.registerSetting(
    () => (
      <AdminCard
        title={trans('ramon-auth-modals.admin.settings.section_header', 'Header buttons')}
        icon="fas fa-sign-in-alt"
      >
        <AdminToggle
          settingKey="auth-modals.show_header_buttons"
          label={trans(
            'ramon-auth-modals.admin.settings.show_header_buttons_label',
            'Show Login / Sign Up buttons in header for guests'
          )}
          help={trans(
            'ramon-auth-modals.admin.settings.show_header_buttons_help',
            'Display Log In and Sign Up pill buttons in the header secondary nav for guests.'
          )}
        />
      </AdminCard>
    ),
    90
  );
}
