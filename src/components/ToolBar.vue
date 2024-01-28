<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {
    ElButton,
    ElCheckboxButton,
    ElCheckboxGroup,
    ElIcon,
    ElInputNumber,
    ElRow,
} from 'element-plus';
import { Box, Download, Hide, Paperclip, Star } from '@element-plus/icons-vue';
import { useToolBar } from '@/composables/useToolBar';
const { rearrangeImages, changeUnnecessaryElementsVisible, downloadTags } = useToolBar();

const imagesPerRow = ref(5);
const checkboxGroup = ref<FilterMarkChar[]>([]);

onMounted(() => {
    changeUnnecessaryElementsVisible(true);
    rearrangeImages(imagesPerRow.value, checkboxGroup.value);
});

const hideCheckbox = ref(['hide']);
const hide = computed(() => !!hideCheckbox.value.length);
const onHideCheckChagend = () => {
    changeUnnecessaryElementsVisible(hide.value);
};

const onCheckChagend = () => {
    rearrangeImages(imagesPerRow.value, checkboxGroup.value);
};

const onImagesPerRowChange = () => {
    rearrangeImages(imagesPerRow.value, checkboxGroup.value);
};
</script>

<template>
    <div class="toolbar">
        <ElRow align="middle" justify="center">
            <ElCheckboxGroup v-model="hideCheckbox" class="pt-2" @change="onHideCheckChagend">
                <ElCheckboxButton class="mr-2" label="hide">
                    <ElIcon :size="15"><Hide /></ElIcon>
                </ElCheckboxButton>
            </ElCheckboxGroup>

            <ElCheckboxGroup v-model="checkboxGroup" class="pt-2" @change="onCheckChagend">
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

            <ElButton :icon="Download" type="primary" @click="downloadTags">Download Tags</ElButton>
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
