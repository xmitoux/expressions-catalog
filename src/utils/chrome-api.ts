import { ACTION_GET_SETTINGS } from '@/constants/chrome-api';

export const getStorage = (callback: (settings: ExtensionSettings) => void) => {
    chrome.runtime.sendMessage({ action: ACTION_GET_SETTINGS }, (response) => {
        if (!response || !response.settings) {
            return;
        }

        callback(response.settings);
    });
};

export const saveStorage = (settings: ExtensionSettings) => {
    chrome.storage.local.set(settings);
};
