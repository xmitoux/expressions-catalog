import { getAllImageTdElements, getAllTagTdElements } from '@/utils/dom-control';
import { setupImageContainer } from '@/content-scripts/setupImageContainer';
import { getStorage } from '@/utils/chrome-api';

export const setupTagImagePairs = (): void => {
    const tagTdElements = getAllTagTdElements();
    const imageTdElements = getAllImageTdElements();

    getStorage(({ filterMarksString }) => {
        const initTagImagePair = (tagTd: HTMLTableCellElement, index: number) => {
            // タグにidを設定
            const tagName = tagTd.querySelector('code')!.textContent!;
            tagTd.id = tagName;

            // poularフィルタ用にclassを追加
            const isPopularTag = !!tagTd.querySelector('mark');
            isPopularTag && tagTd.classList.add('popular');

            // 画像にidとpopularを設定
            const imageTd = imageTdElements[index]!;
            imageTd.id = `${tagName}-image`;
            isPopularTag && imageTd.classList.add('popular');
        };

        tagTdElements.forEach((tagTd, index) => {
            initTagImagePair(tagTd, index);

            const settingFilterMarks = JSON.parse(filterMarksString);
            setupImageContainer(tagTd, settingFilterMarks);
        });
    });
};
