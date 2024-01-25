export const filterPopularTags = (filter: boolean) => {
    const nonPopularTds = document.querySelectorAll<HTMLElement>('td:not(.popular)[id]');
    nonPopularTds.forEach((td) => {
        td.style.display = filter ? 'none' : '';
    });
};
