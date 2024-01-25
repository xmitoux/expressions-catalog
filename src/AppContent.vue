<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ToolBar from '@/components/ToolBar.vue';

const content = ref<HTMLDivElement>();

onMounted(() => {
    const contentElement = document.querySelector('.container.container-smooth');
    if (contentElement && content.value) {
        content.value.appendChild(contentElement);
    }
});
</script>

<template>
    <ToolBar>
        <div ref="content"></div>
    </ToolBar>
</template>
