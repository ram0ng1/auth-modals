import app from 'flarum/forum/app';

import addAuthPanelOverride from './addAuthPanelOverride';
import addHeaderAuthButtons from './addHeaderAuthButtons';

export { default as extend } from './extend';

app.initializers.add('ramon-auth-modals', () => {
  addAuthPanelOverride();
  addHeaderAuthButtons();
});
