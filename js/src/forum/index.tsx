import app from 'flarum/forum/app';

import addAuthPanelOverride from './addAuthPanelOverride';
import addHeaderAuthButtons from './addHeaderAuthButtons';

app.initializers.add('ramon-auth-modals', () => {
  addAuthPanelOverride();
  addHeaderAuthButtons();
});
