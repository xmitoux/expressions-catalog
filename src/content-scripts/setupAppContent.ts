import { createApp } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import '@/styles/content.css';
import AppContent from '@/AppContent.vue';

export const setupAppContent = () => {
    // vueのマウント先を追加
    const appRootId = 'app';
    const appRoot = document.createElement('div');
    appRoot.id = appRootId;
    document.body.prepend(appRoot);

    const app = createApp(AppContent);

    // elment-plusのアイコンを使用
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component);
    }

    app.mount(`#${appRootId}`);
};
