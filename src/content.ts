import { setupTagImageId } from '@/content-scripts/setupTagImageId';
import { copyTag } from '@/content-scripts/copyTag';
import { setupAppContent } from '@/content-scripts/setupAppContent';
import { getStorage } from '@/utils/chrome-api';

// ページ読み込み時に設定を取得する
getStorage((settings) => {
    // const extensionSettings = response.settings as ExtensionSettings;
    setupAppContent();
    setupTagImageId();

    copyTag();
});
