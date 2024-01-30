export const getAllTagTdElements = (): HTMLTableCellElement[] => {
    return Array.from(document.querySelectorAll<HTMLTableCellElement>('td:has(code)'));
};

export const getAllImageTdElements = (): HTMLTableCellElement[] => {
    return Array.from(document.querySelectorAll<HTMLTableCellElement>('td:has(img)'));
};
