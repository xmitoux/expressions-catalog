import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import '@/styles/content.css';
import ImageContainer from '@/components/ImageContainer.vue';
import { escapeSelector } from '@/utils/utils';

export const setupImageContainer = (
    tagTd: HTMLTableCellElement,
    imageTd: HTMLTableCellElement,
    filterMarksJson: string,
) => {
    const tagName = tagTd.id;

    // vueのマウント先を追加
    const appRootId = `${tagName}-app`;
    const appRoot = document.createElement('div');
    appRoot.id = appRootId;

    // 画像tdの子にvueをマウント
    imageTd.prepend(appRoot);

    const app = createApp(ImageContainer, {
        tagName,
        tagTd,
        imageTd,
        initialMarks: JSON.parse(filterMarksJson),
    });

    app.mount(`#${escapeSelector(appRootId)}`);
};
