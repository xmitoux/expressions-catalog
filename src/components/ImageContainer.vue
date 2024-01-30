<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ElCheckboxButton, ElCheckboxGroup, ElIcon, ElMessage } from 'element-plus';
import { Hide, Paperclip, Star } from '@element-plus/icons-vue';
import { getStorage, saveStorage } from '@/utils/chrome-api';
import { escapeSelector } from '@/utils/utils';

const props = defineProps<{
    tagName: string;
    tagTd: HTMLTableCellElement;
    imageTd: HTMLTableCellElement;
    initialMarks: FilterMarkChar[];
}>();

const checkboxGroup = ref<FilterMarkChar[]>([]);

onMounted(() => {
    checkboxGroup.value = props.initialMarks;
    props.tagTd.classList.add(...checkboxGroup.value);
    props.imageTd.classList.add(...checkboxGroup.value);

    injectImageElement();
});

const onCheckChagend = (filterMarks: FilterMarkChar[]) => {
    getStorage(({ tagsSettings }) => {
        if (!tagsSettings[props.tagName]) {
            // 初めてマークするタグはプロパティがないので初期化
            const initialTagSetting: TagSetting = {
                filterMarksJson: '[]',
            };
            tagsSettings[props.tagName] = initialTagSetting;
        }

        tagsSettings[props.tagName]!.filterMarksJson = JSON.stringify(filterMarks);
        saveStorage({ tagsSettings });

        // popular以外を置換用に全削除
        const classListOrg = [...props.tagTd.classList];
        classListOrg.forEach((mark) => {
            if (mark !== 'popular') {
                props.tagTd.classList.remove(mark);
                props.imageTd.classList.remove(mark);
            }
        });

        // チェックされたマークをclassに追加
        props.tagTd.classList.add(...filterMarks);
        props.imageTd.classList.add(...filterMarks);
    });
};

const onClickCheckbox = (event: Event) => event.stopPropagation();

const isHovered = ref(false);

const imageContainer = ref<HTMLDivElement>();
const injectImageElement = () => {
    const imageElement = document.querySelector(`#${escapeSelector(props.tagName)}-image img`);
    if (imageElement && imageContainer.value) {
        imageContainer.value.appendChild(imageElement);
    }
};

const copyTagName = async () => {
    try {
        await navigator.clipboard.writeText(props.tagName);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`クリップボードのコピーに失敗しました。${error.message}`);
            console.error(error);
        }
    }

    ElMessage.success({
        message: `Copied "${props.tagName}"`,
        duration: 1500,
    });
};
</script>

<template>
    <div
        class="checkbox-container"
        @click="copyTagName"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <ElCheckboxGroup
            v-show="isHovered"
            v-model="checkboxGroup"
            class="checkbox"
            size="small"
            @change="onCheckChagend(checkboxGroup)"
            @click="onClickCheckbox"
        >
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
        <div ref="imageContainer"></div>
    </div>
</template>

<style scoped>
.checkbox-container {
    position: relative;
}

.checkbox {
    position: absolute;
    top: 0;
    right: 0;
}
</style>
