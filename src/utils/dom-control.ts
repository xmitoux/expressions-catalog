export const getAllTagTdElements = (): HTMLTableCellElement[] => {
    const tags = Array.from(document.querySelectorAll<HTMLTableCellElement>('td:has(code)'));
    // 1つ目はサンプルなので消す
    tags.shift();

    return tags;
};

export const getAllImageTdElements = (): HTMLTableCellElement[] => {
    const images = Array.from(document.querySelectorAll<HTMLTableCellElement>('td:has(img)'));
    // 1つ目はサンプルなので消す
    images.shift();

    return images;
};

export const rearrangeImages = (imagesPerRow: number) => {
    const filterPredicate = (td: HTMLTableCellElement) => td.style.display === '';
    const tagTDs = [...getAllTagTdElements()].filter(filterPredicate);
    const imageTDs = [...getAllImageTdElements()].filter(filterPredicate);

    const newRows: HTMLElement[] = [];

    // 指定されたカラム数ごとにtdを分割し、新しいtrを作成
    for (let i = 0; i < tagTDs.length; i += imagesPerRow) {
        const tagTR = document.createElement('tr');
        const imageTR = document.createElement('tr');

        // タグ行と画像行を処理
        tagTDs.slice(i, i + imagesPerRow).forEach((td) => {
            tagTR.appendChild(td);
        });
        imageTDs.slice(i, i + imagesPerRow).forEach((td) => {
            imageTR.appendChild(td);
        });

        newRows.push(tagTR, imageTR);
    }

    const table = document.querySelector('table')!;
    table.innerHTML = '';
    newRows.forEach((tr) => {
        table.appendChild(tr);
    });
};
