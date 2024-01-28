import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import '@/styles/content.css';
import ToolBar from '@/components/ToolBar.vue';

export const setupAppContent = () => {
    // vueのマウント先を追加
    const appRootId = 'app';
    const appRoot = document.createElement('div');
    appRoot.style.height = '80px';
    appRoot.id = appRootId;
    document.body.prepend(appRoot);

    const app = createApp(ToolBar);

    app.mount(`#${appRootId}`);
};
