import { getAllImageTdElements, showNotification } from '@/utils/dom-control';

export const copyTag = () => {
    const images = getAllImageTdElements();

    const onImageClick = async (event: MouseEvent) => {
        const image = event.target as HTMLImageElement;
        const tagName = image.parentElement!.id.replace('-image', '');

        try {
            await navigator.clipboard.writeText(tagName);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`クリップボードのコピーに失敗しました。${error.message}`);
                console.error(error);
            }
        }

        showNotification(`Copied "${tagName}"`);
    };

    images.forEach((image) => {
        image.addEventListener('click', onImageClick);
    });
};
