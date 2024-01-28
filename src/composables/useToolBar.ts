import { getAllTagTdElements, getAllImageTdElements } from '@/utils/dom-control';

export const useToolBar = () => {
    const rearrangeImages = async (imagesPerRow: number, checkboxGroup: FilterMarkChar[]) => {
        const tagTDs = [...getAllTagTdElements()];
        const imageTDs = [...getAllImageTdElements()];

        // 指定枚数でtrを再構築する
        const newRows: HTMLElement[] = [];
        let currentTagIndex = 0;
        while (currentTagIndex < tagTDs.length) {
            const tagTR = document.createElement('tr');
            const imageTR = document.createElement('tr');

            // trにタグと画像のtdを詰めていく
            let imageCount = 0;
            while (imageCount < imagesPerRow && currentTagIndex < tagTDs.length) {
                const filterByMarks = (td: HTMLTableCellElement) => {
                    if (!checkboxGroup.length) {
                        td.style.display = '';
                    } else if (checkboxGroup.every((mark) => td.classList.contains(mark))) {
                        td.style.display = '';
                    } else {
                        td.style.display = 'none';
                    }
                };

                const tagTd = tagTDs[currentTagIndex]!;
                filterByMarks(tagTd);
                tagTR.appendChild(tagTd);

                const imageTd = imageTDs[currentTagIndex]!;
                filterByMarks(imageTd);
                imageTR.appendChild(imageTd);

                // フィルタ非表示画像も再表示時の保持用に詰めるが、1行あたりの枚数にカウントしない
                if (tagTd.style.display !== 'none') {
                    imageCount++;
                }

                currentTagIndex++;
            }

            newRows.push(tagTR, imageTR);
        }

        const table = document.querySelector('table')!;
        table.innerHTML = '';
        newRows.forEach((tr) => {
            table.appendChild(tr);
        });
    };

    const changeUnnecessaryElementsVisible = (hide: boolean) => {
        const actionIcon = document.querySelector<HTMLDivElement>('.actions')!;
        actionIcon.style.display = hide ? 'none' : '';
        const paragraphElements = document.querySelectorAll<HTMLParagraphElement>('article p');
        paragraphElements.forEach((el) => {
            el.style.display = hide ? 'none' : '';
        });
    };

    const downloadTags = () => {
        const filteredtagTds = getAllTagTdElements().filter((td) => td.style.display !== 'none');
        const ids = filteredtagTds.map((td) => td.id);
        const textData = ids.join('\n');

        // テキストデータをBlobとしてダウンロード用に準備
        const blob = new Blob([textData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'expressions.txt';
        a.click();

        // URLをクリーンアップ
        URL.revokeObjectURL(url);
    };

    return {
        rearrangeImages,
        changeUnnecessaryElementsVisible,
        downloadTags,
    };
};
