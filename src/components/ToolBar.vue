<script setup lang="ts">
import { ref } from 'vue';
import {
    ElCheckboxButton,
    ElCheckboxGroup,
    ElContainer,
    ElHeader,
    ElIcon,
    ElMain,
    ElScrollbar,
} from 'element-plus';
import { Box, Paperclip, Star } from '@element-plus/icons-vue';
import { filterPopularTags } from '@/content-scripts/filterPopularTags';

const checkboxGroup = ref([]);

const onCheckChagend = () => {
    filterPopularTags(checkboxGroup.value.some((checkLabel) => checkLabel === 'popular'));
};
</script>

<template>
    <ElContainer>
        <ElHeader class="header">
            <ElCheckboxGroup v-model="checkboxGroup" size="large" @change="onCheckChagend">
                <ElCheckboxButton label="popular">
                    <ElIcon :size="20"><Box /></ElIcon>
                </ElCheckboxButton>
                <ElCheckboxButton label="star">
                    <ElIcon :size="20"><Star /></ElIcon>
                </ElCheckboxButton>
                <ElCheckboxButton label="clip">
                    <ElIcon :size="20"><Paperclip /></ElIcon>
                </ElCheckboxButton>
            </ElCheckboxGroup>
        </ElHeader>

        <ElMain class="content">
            <ElScrollbar height="100vh">
                <slot></slot>
            </ElScrollbar>
        </ElMain>
    </ElContainer>
</template>

<style scoped>
.header {
    text-align: center;
    margin-top: 8px;
    height: 56px;
}

.content {
    padding: 0;
}
</style>
