export const filterPopularTags = () => {
    const nonPopularTds = document.querySelectorAll<HTMLElement>('td:not(.popular)[id]');
    nonPopularTds.forEach((td) => {
        td.style.display = 'none';
    });
};
