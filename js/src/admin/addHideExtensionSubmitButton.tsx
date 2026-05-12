import { override } from 'flarum/common/extend';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';

const EXT_ID = 'ramon-auth-modals';

/**
 * Hide the default submit button on this extension's settings page — every
 * setting auto-saves on change, so the button is unused and confusing.
 */
export default function addHideExtensionSubmitButton(): void {
  override(ExtensionPage.prototype, 'submitButton', function (this: any, original: () => unknown) {
    if (this.extension && this.extension.id === EXT_ID) return null;
    return original();
  });
}
