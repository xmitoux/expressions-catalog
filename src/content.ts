import { ACTION_GET_SETTINGS } from '@/constants/chrome-api';
import { setupTagImageId } from '@/content-scripts/setupTagImageId';
import { copyTag } from '@/content-scripts/copyTag';
import { setupAppContent } from '@/content-scripts/setupAppContent';

// ページ読み込み時に設定を取得する
chrome.runtime.sendMessage({ action: ACTION_GET_SETTINGS }, (response) => {
    if (!response || !response.settings) {
        return;
    }

    // const extensionSettings = response.settings as ExtensionSettings;
    setupAppContent();
    setupTagImageId();

    copyTag();
});
