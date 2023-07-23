
// Vue app
import { createApp } from 'vue'
// import { log } from './utils/log';
import App from './App.vue'

// const F = f(__filename);

// log.info(F, `Started!`);

// Pinia store
import { createPinia } from 'pinia'

// Router
import router from './router'

// Translations
import il8n from './il8n'

// Toast notifications
import Toast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

// Transitions
import 'vue3-sfc-transitions/dist/style.css'
import Transitions from 'vue3-sfc-transitions'

// Main css
import './assets/css/main.css'

// Tailwind
import '@/assets/css/tailwind.css';

import sourceMap from 'source-map-support';

sourceMap.install();

createApp(App)
    .use(createPinia())
    .use(router)
    .use(il8n)
    .use(Toast)
    .use(Transitions)
    .mount('#app')
