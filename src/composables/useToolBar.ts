import { getStorage, saveStorage } from '@/utils/chrome-api';
import { getAllTagTdElements, getAllImageTdElements } from '@/utils/dom-control';

export const useToolBar = () => {
    const filterImages = (imagesPerRow: number, checkboxGroup: FilterMarkChar[]) => {
        const tagTDs = [...getAllTagTdElements()];
        const imageTDs = [...getAllImageTdElements()];

        // 指定枚数でtrを再構築する
        const newRows: HTMLElement[] = [];
        let currentTagIndex = 0;
        while (currentTagIndex < tagTDs.length) {
            const tagTR = document.createElement('tr');
            const imageTR = document.createElement('tr');

            // class名でフィルタしつつtrにタグと画像のtdを詰めていく
            let imageCount = 0;
            while (imageCount < imagesPerRow && currentTagIndex < tagTDs.length) {
                const filterByMarks = (td: HTMLTableCellElement) => {
                    if (!checkboxGroup.length) {
                        td.style.display = '';
                    } else if (
                        checkboxGroup
                            .filter((mark) => mark !== 'mute')
                            .every((mark) => td.classList.contains(mark))
                    ) {
                        td.style.display = '';
                    } else {
                        td.style.display = 'none';
                    }

                    // 抽出されてもmuteの非表示を優先
                    if (checkboxGroup.includes('mute') && td.classList.contains('mute')) {
                        td.style.display = 'none';
                    }
                };

                const tagTd = tagTDs[currentTagIndex]!;
                filterByMarks(tagTd);

                // タグの長さで列幅が変わらないようにする(よくわからんが正常動作してる)
                tagTd.style.width = '100px';
                tagTR.appendChild(tagTd);

                const imageTd = imageTDs[currentTagIndex]!;
                filterByMarks(imageTd);

                // 画像のサイズを枚数に反比例させる
                const numberOfImages = imagesPerRow;
                const baseHeight = 1000 / numberOfImages;
                const aspectRatio = 13 / 19;
                const height = baseHeight;
                const width = height * aspectRatio;
                imageTd.style.height = `${height}px`;
                imageTd.style.width = `${width}px`;

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

    const showInfoContents = (show: boolean) => {
        const actionIcon = document.querySelector<HTMLDivElement>('.actions')!;
        actionIcon.style.display = show ? '' : 'none';
        const paragraphElements = document.querySelectorAll<HTMLParagraphElement>('article p');
        paragraphElements.forEach((el) => {
            el.style.display = show ? '' : 'none';
        });
    };

    const downloadTags = () => {
        const filteredtagTds = getAllTagTdElements().filter((td) => td.style.display !== 'none');
        const ids = filteredtagTds.map((td) => td.id);
        const textData = ids.join('\n');
        downloadTagsSettings(textData, 'expressions');
    };

    const exportFilter = () => {
        getStorage(({ tagsSettings }) => {
            const tagsSettingsJson = JSON.stringify(tagsSettings);
            downloadTagsSettings(tagsSettingsJson, 'expressions-filter', 'json');
        });
    };

    const importFilter = (file: File) => {
        return new Promise<void>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const tagsSettingsJson = event.target?.result as string;
                const tagsSettings = JSON.parse(tagsSettingsJson);
                saveStorage({ tagsSettings });
                resolve();
            };

            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    };

    return {
        filterImages,
        showInfoContents,
        downloadTags,
        exportFilter,
        importFilter,
    };
};

const downloadTagsSettings = (textData: string, fileName: string, extension: string = 'txt') => {
    // テキストデータをBlobとしてダウンロード用に準備
    const blob = new Blob([textData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.${extension}`;
    a.click();

    // URLをクリーンアップ
    URL.revokeObjectURL(url);
};
