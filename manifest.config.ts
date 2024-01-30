import { defineManifest } from '@crxjs/vite-plugin';
import pkg from './package.json';

const extensionName = 'Expressions Catalog';

export const manifest = defineManifest((env) => ({
    manifest_version: 3,
    name: env.mode === 'production' ? extensionName : `[DEV] ${extensionName}`,
    description: 'A extension to make NAIDv3expressions a bit more user-friendly',
    version: pkg.version,
    // icons: {
    //     '128': 'icon.png',
    // },
    permissions: ['activeTab', 'storage', 'unlimitedStorage'],
    options_page: 'index.html',
    background: {
        service_worker: './src/background.ts',
    },
    action: {
        // default_icon: {
        //     '128': 'icon.png',
        // },
    },
    content_scripts: [
        {
            matches: ['https://rentry.co/NAIDv3expressions'],
            js: ['./src/content.ts'],
        },
    ],
    web_accessible_resources: [
        {
            matches: ['https://rentry.co/*'],
            resources: ['assets/*'],
        },
    ],
}));
