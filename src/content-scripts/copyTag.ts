import { getAllImageTdElements } from '@/utils/dom-control';
import { getTagNameFromImageId } from '@/utils/utils';
import { ElMessage } from 'element-plus';

export const copyTag = () => {
    const imageTds = getAllImageTdElements();

    const onImageClick = async (event: MouseEvent) => {
        const image = event.target as HTMLImageElement;
        const tagName = getTagNameFromImageId(image.parentElement!.id);

        try {
            await navigator.clipboard.writeText(tagName);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`クリップボードのコピーに失敗しました。${error.message}`);
                console.error(error);
            }
        }

        ElMessage.success({
            message: `Copied "${tagName}"`,
            duration: 1500,
        });
    };

    imageTds.forEach((imageTd) => {
        imageTd.addEventListener('click', onImageClick);
    });
};
