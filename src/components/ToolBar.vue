<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ElCheckboxButton, ElCheckboxGroup, ElIcon, ElInputNumber, ElRow } from 'element-plus';
import { Box, Paperclip, Star } from '@element-plus/icons-vue';
import { filterByMarks } from '@/content-scripts/filterPopularTags';
import { rearrangeImages } from '@/utils/dom-control';

const imagesPerRow = ref(5);

onMounted(() => rearrangeImages(imagesPerRow.value));

const checkboxGroup = ref([]);

const onCheckChagend = (filterMarks: FilterMarkChar[]) => {
    filterByMarks(filterMarks);
    rearrangeImages(imagesPerRow.value);
};

const onImagesPerRowChange = () => {
    rearrangeImages(imagesPerRow.value);
};
</script>

<template>
    <div class="toolbar">
        <ElRow align="middle" justify="center">
            <ElCheckboxGroup
                class="pt-2"
                v-model="checkboxGroup"
                size="large"
                @change="onCheckChagend(checkboxGroup)"
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
