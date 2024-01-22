export const getAllImageElements = (): HTMLImageElement[] => {
    const images = Array.from(document.querySelectorAll<HTMLImageElement>('img'));
    // 1つ目はサンプルなので消す
    images.shift();

    return images;
};

export const getAllTagElements = (): HTMLElement[] => {
    const tags = Array.from(document.querySelectorAll('code'));
    // 1つ目はサンプルなので消す
    tags.shift();

    return tags;
};
