import { getAllImageElements, getAllTagElements } from '@/utils/dom-control';

export const setupImageTagMap = (): ImageTagMap => {
    const imageTagMap = new Map<string, string>();

    const images = getAllImageElements();
    const imageUrlList = [...images].map((image) => image.src);

    const tags = getAllTagElements();
    const tagNameList = [...tags].map((tag) => tag.textContent!);

    if (imageUrlList.length !== tagNameList.length) {
        throw new Error('画像とタグの数が一致しません。');
    }

    imageUrlList.forEach((url, index) => {
        imageTagMap.set(url, tagNameList[index]);
    });

    return imageTagMap;
};
