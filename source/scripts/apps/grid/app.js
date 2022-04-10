import Vue from 'vue';
import App from './index.vue';

import VueTippy, { TippyComponent } from 'vue-tippy';

Vue.use(VueTippy, {
   directive: "tippy", // => v-tippy
   flipDuration: 0,
   popperOptions: {
      modifiers: {
         preventOverflow: {
            enabled: false,
         },
         hide: {
            enabled: false,
         }
      }
   }
});
Vue.component('tippy', TippyComponent);

const vm = new Vue({
   el: '#grid',
   render: h => h(App),
});