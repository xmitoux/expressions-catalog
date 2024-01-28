<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ElCheckboxButton, ElCheckboxGroup, ElIcon, ElInputNumber, ElRow } from 'element-plus';
import { Box, Paperclip, Star } from '@element-plus/icons-vue';
import { getAllTagTdElements, getAllImageTdElements } from '@/utils/dom-control';

const imagesPerRow = ref(5);

onMounted(() => rearrangeImages());

const checkboxGroup = ref([]);

const rearrangeImages = async () => {
    const tagTDs = [...getAllTagTdElements()];
    const imageTDs = [...getAllImageTdElements()];

    // 指定枚数でtrを再構築する
    const newRows: HTMLElement[] = [];
    let currentTagIndex = 0;
    while (currentTagIndex < tagTDs.length) {
        const tagTR = document.createElement('tr');
        const imageTR = document.createElement('tr');

        // trにタグと画像のtdを詰めていく
        let imageCount = 0;
        while (imageCount < imagesPerRow.value && currentTagIndex < tagTDs.length) {
            const filterByMarks = (td: HTMLTableCellElement) => {
                if (!checkboxGroup.value.length) {
                    td.style.display = '';
                } else if (checkboxGroup.value.every((mark) => td.classList.contains(mark))) {
                    td.style.display = '';
                } else {
                    td.style.display = 'none';
                }
            };

            const tagTd = tagTDs[currentTagIndex]!;
            filterByMarks(tagTd);
            tagTR.appendChild(tagTd);

            const imageTd = imageTDs[currentTagIndex]!;
            filterByMarks(imageTd);
            imageTR.appendChild(imageTd);

            // フィルタ非表示画像も再表示時の保持用に詰めるが、1行あたりの枚数にカウントしない
            if (tagTd.style.display !== 'none') {
                imageCount++;
            }

            currentTagIndex++;
        }

        newRows.push(tagTR, imageTR);
    }

    const table = document.querySelector('table')!;
    table.innerHTML = '';
    newRows.forEach((tr) => {
        table.appendChild(tr);
    });
};

const onCheckChagend = () => {
    rearrangeImages();
};

const onImagesPerRowChange = () => {
    rearrangeImages();
};
</script>

<template>
    <div class="toolbar">
        <ElRow align="middle" justify="center">
            <ElCheckboxGroup
                class="pt-2"
                v-model="checkboxGroup"
                size="large"
                @change="onCheckChagend"
            >
                <ElCheckboxButton label="popular">
                    <ElIcon :size="15"><Box /></ElIcon>
                </ElCheckboxButton>
                <ElCheckboxButton label="🌟">
                    <ElIcon :size="15"><Star /></ElIcon>
                </ElCheckboxButton>
                <ElCheckboxButton label="📎">
                    <ElIcon :size="15"><Paperclip /></ElIcon>
                </ElCheckboxButton>
            </ElCheckboxGroup>

            <ElInputNumber
                v-model="imagesPerRow"
                class="mx-2"
                controls-position="right"
                :min="1"
                :max="10"
                @change="onImagesPerRowChange"
            />
        </ElRow>
    </div>
</template>

<style scoped>
.toolbar {
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    width: 100%;
    padding: 10px;
    background: linear-gradient(315deg, rgb(36, 155, 115) 25%, rgb(0, 24, 144));
    z-index: 1000;
}
</style>
