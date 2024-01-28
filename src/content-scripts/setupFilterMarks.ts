import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import '@/styles/content.css';
import ImageMarker from '@/components/ImageMarker.vue';
import { escapeSelector } from '@/utils/utils';

export const setupAppContent = () => {};

export const setupFilterMarks = (
    tagTd: HTMLTableCellElement,
    imageTd: HTMLTableCellElement,
    filterMark: FilterMark,
) => {
    const tagName = tagTd.id;

    // vueのマウント先を追加
    const appRootId = `${tagName}-app`;
    const appRoot = document.createElement('div');
    appRoot.id = appRootId;
    imageTd.prepend(appRoot);

    const app = createApp(ImageMarker, {
        tagName,
        tagTd,
        imageTd,
        initialMarks: filterMark[tagName],
    });

    app.mount('#' + escapeSelector(appRootId));
};
