import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import '@/styles/content.css';
import ImageMarker from '@/components/ImageMarker.vue';

export const setupAppContent = () => {};

export const setupFilterMarks = (
    tagTd: HTMLTableCellElement,
    imageTd: HTMLTableCellElement,
    filterMark: FilterMark,
    index: number,
) => {
    const tagName = tagTd.id;

    // vueのマウント先を追加
    const appRootId = `image-marker-${index}`;
    const appRoot = document.createElement('div');
    appRoot.id = appRootId;
    imageTd.prepend(appRoot);

    const app = createApp(ImageMarker, {
        tagName,
        tagTd,
        imageTd,
        initialMarks: filterMark[tagName],
    });

    app.mount(`#${appRootId}`);
};
