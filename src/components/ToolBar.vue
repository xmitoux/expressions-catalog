<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {
    ElButton,
    ElCheckboxButton,
    ElCheckboxGroup,
    ElIcon,
    ElInputNumber,
    ElMessageBox,
    ElRow,
    ElUpload,
    UploadRequestHandler,
    UploadRequestOptions,
    UploadUserFile,
} from 'element-plus';
import {
    Box,
    Download,
    Hide,
    InfoFilled,
    Paperclip,
    PriceTag,
    Star,
    Upload,
} from '@element-plus/icons-vue';
import { useToolBar } from '@/composables/useToolBar';
const { filterImages, showInfoContents, downloadTags, exportFilter, importFilter } = useToolBar();

const imagesPerRow = ref(5);
const checkboxGroup = ref<FilterMarkChar[]>([]);

onMounted(() => {
    showInfoContents(false);
    filterImages(imagesPerRow.value, checkboxGroup.value);
});

const infoCheckbox = ref([]);
const showInfo = computed(() => infoCheckbox.value.length !== 0);
const onHideCheckChagend = () => {
    showInfoContents(showInfo.value);
};

const onCheckChagend = () => {
    filterImages(imagesPerRow.value, checkboxGroup.value);
};

const onImagesPerRowChange = () => {
    filterImages(imagesPerRow.value, checkboxGroup.value);
};

const fileList = ref<UploadUserFile[]>([]);
const onUpload: UploadRequestHandler = async (options: UploadRequestOptions) => {
    await importFilter(options.file);

    ElMessageBox.alert(
        'Filter settings imported. Please reload the page to apply changes.',
        'Info',
        {
            confirmButtonText: 'OK',
        },
    );
};
</script>

<template>
    <div class="toolbar">
        <ElRow align="middle" justify="center">
            <ElCheckboxGroup v-model="infoCheckbox" class="pt-2" @change="onHideCheckChagend">
                <ElCheckboxButton class="mr-2" label="info">
                    <ElIcon :size="15"><InfoFilled /></ElIcon>
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
                <ElCheckboxButton label="mute">
                    <ElIcon :size="15"><Hide /></ElIcon>
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

            <ElButton :icon="PriceTag" type="primary" @click="downloadTags">Download Tags</ElButton>

            <ElButton :icon="Upload" type="primary" @click="exportFilter">Export Filter</ElButton>
            <ElUpload
                v-model:file-list="fileList"
                accept="json"
                :auto-upload="true"
                :show-file-list="false"
                :http-request="onUpload"
            >
                <ElButton :icon="Download" type="primary">Import Filter</ElButton>
            </ElUpload>
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
    background: linear-gradient(315deg, rgb(36, 155, 115, 0.8) 25%, rgb(0, 24, 144, 0.8));
    z-index: 1000;
}
</style>
