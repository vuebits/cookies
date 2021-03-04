import { createApp } from 'vue';
import App from './App.vue';
import { createCookies } from '@/index';

createApp(App).use(createCookies({ })).mount('#app');
