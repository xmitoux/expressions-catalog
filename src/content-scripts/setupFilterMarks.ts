import { getStorage, saveStorage } from '@/utils/chrome-api';
export const setupFilterMarks = (imageTd: HTMLTableCellElement) => {
    const setup = ({ filterMark }: ExtensionSettings) => {
        const tagName = imageTd.id;

        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-container';
        imageTd.prepend(checkboxContainer);

        ['🌟', '📎', '👎'].forEach((icon) => {
            const checkbox = document.createElement('input');
            const checkboxId = `${tagName}-${icon}`;
            checkbox.id = checkboxId;
            checkbox.type = 'checkbox';
            checkbox.className = 'image-checkbox';
            checkbox.checked = !!filterMark[tagName]?.includes(icon);
            checkbox.addEventListener(
                'change',
                (event) => {
                    // 未設定なら空配列で初期化
                    filterMark[tagName] = filterMark[tagName] || [];

                    if ((event.target! as HTMLInputElement).checked) {
                        filterMark[tagName]!.push(icon);
                        imageTd.classList.add(icon);
                    } else {
                        const index = filterMark[tagName]!.indexOf(icon);
                        if (index > -1) {
                            filterMark[tagName]!.splice(index, 1);
                        }
                        imageTd.classList.remove(icon);
                    }
                    saveStorage({ filterMark });
                },
                true,
            );
            // 画像tdにクリックイベントを伝播させない
            checkbox.addEventListener('click', (event) => event.stopPropagation());

            const label = document.createElement('label');
            label.textContent = icon;
            label.htmlFor = checkboxId;
            // 画像tdにクリックイベントを伝播させない
            label.addEventListener('click', (event) => {
                event.stopPropagation();
            });

            const wrapper = document.createElement('div');
            wrapper.className = 'checkbox-wrapper';

            wrapper.appendChild(checkbox);
            wrapper.appendChild(label);

            checkboxContainer.appendChild(wrapper);
        });
    };

    getStorage(setup);
};
