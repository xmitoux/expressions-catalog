import { NOTIFICATION_ID } from '@/content-scripts/setupNotification';

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

export const showNotification = (message: string, duration = 2000) => {
    const notification = document.querySelector(`#${NOTIFICATION_ID}`);

    if (!notification) {
        throw new Error('通知用divが存在しません。');
    }

    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
};
