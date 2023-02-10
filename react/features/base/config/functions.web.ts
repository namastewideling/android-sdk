import { IReduxState } from '../../app/types';

import { IConfig, IDeeplinkingConfig, IDeeplinkingMobileConfig, IDeeplinkingPlatformConfig } from './configType';
import { TOOLBAR_BUTTONS } from './constants';

export * from './functions.any';

/**
 * Removes all analytics related options from the given configuration, in case of a libre build.
 *
 * @param {*} _config - The configuration which needs to be cleaned up.
 * @returns {void}
 */
export function _cleanupConfig(_config: IConfig) {
    return;
}

/**
 * Returns the replaceParticipant config.
 *
 * @param {Object} state - The state of the app.
 * @returns {boolean}
 */
export function getReplaceParticipant(state: IReduxState): string | undefined {
    return state['features/base/config'].replaceParticipant;
}

/**
 * Returns the list of enabled toolbar buttons.
 *
 * @param {Object} state - The redux state.
 * @returns {Array<string>} - The list of enabled toolbar buttons.
 */
export function getToolbarButtons(state: IReduxState): Array<string> {
    const { toolbarButtons } = state['features/base/config'];

    return Array.isArray(toolbarButtons) ? toolbarButtons : TOOLBAR_BUTTONS;
}

/**
 * Checks if the specified button is enabled.
 *
 * @param {string} buttonName - The name of the button.
 * {@link interfaceConfig}.
 * @param {Object|Array<string>} state - The redux state or the array with the enabled buttons.
 * @returns {boolean} - True if the button is enabled and false otherwise.
 */
export function isToolbarButtonEnabled(buttonName: string, state: IReduxState | Array<string>) {
    const buttons = Array.isArray(state) ? state : getToolbarButtons(state);

    return buttons.includes(buttonName);
}

/**
 * Returns whether audio level measurement is enabled or not.
 *
 * @param {Object} state - The state of the app.
 * @returns {boolean}
 */
export function areAudioLevelsEnabled(state: IReduxState): boolean {
    // Default to false for React Native as audio levels are of no interest to the mobile app.
    return navigator.product !== 'ReactNative' && !state['features/base/config'].disableAudioLevels;
}

/**
 * Sets the defaults for deeplinking.
 *
 * @param {IDeeplinkingConfig} deeplinking - The deeplinking config.
 * @returns {void}
 */
export function _setDeeplinkingDefaults(deeplinking: IDeeplinkingConfig) {
    const {
        desktop = {} as IDeeplinkingPlatformConfig,
        android = {} as IDeeplinkingMobileConfig,
        ios = {} as IDeeplinkingMobileConfig
    } = deeplinking;

    desktop.appName = desktop.appName || 'Namaste';

    ios.appName = ios.appName || 'Namaste';
    ios.appScheme = ios.appScheme || 'com.wideling.namaste';
    ios.downloadLink = ios.downloadLink
        || 'https://itunes.apple.com/us/app/namaste-meet/id1165103905';
    if (ios.dynamicLink) {
        ios.dynamicLink.apn = ios.dynamicLink.apn || 'com.wideling.namaste';
        ios.dynamicLink.appCode = ios.dynamicLink.appCode || 'w2atb';
        ios.dynamicLink.ibi = ios.dynamicLink.ibi || 'com.atlassian.namaste.ios';
        ios.dynamicLink.isi = ios.dynamicLink.isi || '1165103905';
    }

    android.appName = android.appName || 'Namaste';
    android.appScheme = android.appScheme || 'com.wideling.namaste';
    android.downloadLink = android.downloadLink
        || 'https://play.google.com/store/apps/details?id=com.wideling.namaste';
    android.appPackage = android.appPackage || 'org.jitsi.meet';
    android.fDroidUrl = android.fDroidUrl || 'https://f-droid.org/en/packages/com.wideling.namaste/';
    if (android.dynamicLink) {
        android.dynamicLink.apn = android.dynamicLink.apn || 'com.wideling.namaste';
        android.dynamicLink.appCode = android.dynamicLink.appCode || 'w2atb';
        android.dynamicLink.ibi = android.dynamicLink.ibi || 'com.atlassian.namaste.ios';
        android.dynamicLink.isi = android.dynamicLink.isi || '1165103905';
    }
}
