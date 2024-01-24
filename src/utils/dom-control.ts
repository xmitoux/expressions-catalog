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
