<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
    ElCheckboxButton,
    ElCheckboxGroup,
    ElContainer,
    ElHeader,
    ElIcon,
    ElInputNumber,
    ElMain,
    ElRow,
    ElScrollbar,
} from 'element-plus';
import { Box, Paperclip, Star } from '@element-plus/icons-vue';
import { filterPopularTags } from '@/content-scripts/filterPopularTags';
import { rearrangeImages } from '@/utils/dom-control';

const imagesPerRow = ref(5);

onMounted(() => rearrangeImages(imagesPerRow.value));

const checkboxGroup = ref([]);

const onCheckChagend = () => {
    filterPopularTags(checkboxGroup.value.some((checkLabel) => checkLabel === 'popular'));
    rearrangeImages(imagesPerRow.value);
};

const onImagesPerRowChange = () => {
    rearrangeImages(imagesPerRow.value);
};
</script>

<template>
    <ElContainer>
        <ElHeader>
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
                    <ElCheckboxButton label="star">
                        <ElIcon :size="15"><Star /></ElIcon>
                    </ElCheckboxButton>
                    <ElCheckboxButton label="clip">
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
        </ElHeader>

        <ElMain class="p-0">
            <ElScrollbar height="100vh">
                <slot></slot>
            </ElScrollbar>
        </ElMain>
    </ElContainer>
</template>
