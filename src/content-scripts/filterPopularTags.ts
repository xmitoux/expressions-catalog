export const filterByMarks = (filterMarks: FilterMarkChar[]) => {
    const tds = document.querySelectorAll<HTMLTableCellElement>('td[id]');
    tds.forEach((td) => {
        if (!filterMarks.length) {
            td.style.display = '';
        } else if (filterMarks.every((mark) => td.classList.contains(mark))) {
            td.style.display = '';
        } else {
            td.style.display = 'none';
        }
    });
};
