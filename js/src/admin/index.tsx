import app from 'flarum/admin/app';

import addAuthModalsSettings from './addAuthModalsSettings';
import addHideExtensionSubmitButton from './addHideExtensionSubmitButton';

addHideExtensionSubmitButton();

app.initializers.add('ramon-auth-modals', () => {
  addAuthModalsSettings();
});
