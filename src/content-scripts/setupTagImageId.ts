import { getAllImageTdElements, getAllTagTdElements } from '@/utils/dom-control';
import { setupFilterMarks } from '@/content-scripts/setupFilterMarks';
import { getStorage } from '@/utils/chrome-api';

export const setupTagImageId = (): void => {
    const tagTdElements = getAllTagTdElements();
    const imageTdElements = getAllImageTdElements();

    getStorage(({ filterMarksString }) => {
        const settingFilterMarks = JSON.parse(filterMarksString);

        tagTdElements.forEach((tagTd, index) => {
            const tagName = tagTd.querySelector('code')!.textContent!;

            tagTd.id = tagName;

            // poularフィルタ用にclassを追加
            const isPopularTag = !!tagTd.querySelector('mark');
            isPopularTag && tagTd.classList.add('popular');

            const imageTd = imageTdElements[index]!;
            imageTd.id = `${tagName}-image`;
            isPopularTag && imageTd.classList.add('popular');

            setupFilterMarks(tagTd, imageTd, settingFilterMarks);
        });
    });
};
