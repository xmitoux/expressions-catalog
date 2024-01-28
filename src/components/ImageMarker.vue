<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ElCheckboxButton, ElCheckboxGroup, ElIcon } from 'element-plus';
import { Paperclip, Star } from '@element-plus/icons-vue';
import { getStorage, saveStorage } from '@/utils/chrome-api';
import { escapeSelector } from '@/utils/utils';

const props = defineProps<{
    tagName: string;
    tagTd: HTMLTableCellElement;
    imageTd: HTMLTableCellElement;
    initialMarks?: FilterMarkChar[];
}>();

const checkboxGroup = ref<FilterMarkChar[]>([]);

onMounted(() => {
    checkboxGroup.value = props.initialMarks || [];
    props.tagTd.classList.add(...checkboxGroup.value);
    props.imageTd.classList.add(...checkboxGroup.value);

    injectImageElement();
});

const onCheckChagend = (filterMarks: FilterMarkChar[]) => {
    getStorage(({ filterMarksString }) => {
        const settingFilterMarks = JSON.parse(filterMarksString);

        settingFilterMarks[props.tagName] = filterMarks;
        saveStorage({ filterMarksString: JSON.stringify(settingFilterMarks) });

        const tagTd = props.tagTd;
        const imageTd = props.imageTd;

        // popular以外を置換用に全削除
        tagTd.classList.forEach((mark) => {
            if (mark !== 'popular') {
                tagTd.classList.remove(mark);
                imageTd.classList.remove(mark);
            }
        });

        // チェックされたマークをclassに追加
        tagTd.classList.add(...filterMarks);
        imageTd.classList.add(...filterMarks);
    });
};

const onClickCheckbox = (event: Event) => event.stopPropagation();

const isHovered = ref(false);

const image = ref<HTMLDivElement>();
const injectImageElement = () => {
    const imageElement = document.querySelector(`#${escapeSelector(props.tagName)}-image img`);
    if (imageElement && image.value) {
        image.value.appendChild(imageElement);
    }
};
</script>

<template>
    <div @mouseover="isHovered = true" @mouseleave="isHovered = false">
        <ElCheckboxGroup
            v-show="isHovered"
            v-model="checkboxGroup"
            class="pt-3 pr-3 checkbox-container"
            size="small"
            @change="onCheckChagend(checkboxGroup)"
            @click="onClickCheckbox"
        >
            <ElCheckboxButton label="🌟">
                <ElIcon :size="15"><Star /></ElIcon>
            </ElCheckboxButton>
            <ElCheckboxButton label="📎">
                <ElIcon :size="15"><Paperclip /></ElIcon>
            </ElCheckboxButton>
        </ElCheckboxGroup>
        <div ref="image"></div>
    </div>
</template>

<style scoped>
.checkbox-container {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    z-index: 10;
}

.checkbox-wrapper {
    display: inline-flex;
    align-items: center;
    margin: 0.5em;
}
</style>
