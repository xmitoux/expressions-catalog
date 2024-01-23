import { ACTION_GET_SETTINGS } from '@/constants/chrome-api';
import { setupTagImageId } from '@/content-scripts/setupTagImageId';
import { copyTag } from '@/content-scripts/copyTag';
import { setupNotification } from '@/content-scripts/setupNotification';
import { filterPopularTags } from '@/content-scripts/filterPopularTags';

// ページ読み込み時に設定を取得する
chrome.runtime.sendMessage({ action: ACTION_GET_SETTINGS }, (response) => {
    if (!response || !response.settings) {
        return;
    }

    // const extensionSettings = response.settings as ExtensionSettings;

    setupNotification();
    setupTagImageId();

    copyTag();
    filterPopularTags();
});
