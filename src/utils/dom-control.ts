export const getAllTagTdElements = (): HTMLTableCellElement[] => {
    return Array.from(document.querySelectorAll<HTMLTableCellElement>('td:has(code)'));
};

export const getAllImageTdElements = (): HTMLTableCellElement[] => {
    return Array.from(document.querySelectorAll<HTMLTableCellElement>('td:has(img)'));
};

export const rearrangeImages = (imagesPerRow: number) => {
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
            tagTR.appendChild(tagTDs[currentTagIndex]!);
            imageTR.appendChild(imageTDs[currentTagIndex]!);

            // フィルタ非表示画像も再表示時の保持用に詰めるが、1行あたりの枚数にカウントしない
            if (tagTDs[currentTagIndex]!.style.display !== 'none') {
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
