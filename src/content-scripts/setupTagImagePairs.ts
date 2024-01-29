import { getAllImageTdElements, getAllTagTdElements } from '@/utils/dom-control';
import { setupImageContainer } from '@/content-scripts/setupImageContainer';
import { getStorage } from '@/utils/chrome-api';

export const setupTagImagePairs = (): void => {
    const tagTdElements = getAllTagTdElements();
    const imageTdElements = getAllImageTdElements();

    getStorage(({ tagsSettings }) => {
        const initTagImagePair = (tagTd: HTMLTableCellElement, imageTd: HTMLTableCellElement) => {
            // タグにidを設定
            const tagName = tagTd.querySelector('code')!.textContent!;
            tagTd.id = tagName;

            // poularフィルタ用にclassを追加
            const isPopularTag = !!tagTd.querySelector('mark');
            isPopularTag && tagTd.classList.add('popular');

            // 画像にidとpopularを設定
            imageTd.id = `${tagName}-image`;
            isPopularTag && imageTd.classList.add('popular');
        };

        tagTdElements.forEach((tagTd, index) => {
            const imageTd = imageTdElements[index]!;
            initTagImagePair(tagTd, imageTd);

            const tagName = tagTd.id;
            const filterMarksJson = tagsSettings[tagName]?.filterMarksJson || '[]';
            setupImageContainer(tagTd, imageTd, filterMarksJson);
        });
    });
};
