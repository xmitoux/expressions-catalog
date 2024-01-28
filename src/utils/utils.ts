export const getTagNameFromImageId = (imageId: string) => imageId.replace('-image', '');

export const escapeSelector = (id: string): string => {
    const specialChars = /([ !"$%&'\\()*+,./:;<=>?@[\]^`{|}~])/g;
    const replacedSpecial = id.replace(specialChars, '\\$1');
    if (isNaN(Number(replacedSpecial.charAt(0)))) {
        return replacedSpecial;
    } else {
        return `\\3${replacedSpecial.charAt(0)} ${replacedSpecial.slice(1)}`;
    }
};
