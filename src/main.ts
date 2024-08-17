import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router/router';
import '@assets/styles.scss';

import VIcon from '@/components/UI/VIcon.vue';
import VButton from '@/components/UI/VButton.vue';

createApp(App)
  .component('VIcon', VIcon)
  .component('VButton', VButton)
  .use(createPinia())
  .use(router)
  .mount('#app');


