import App from './App.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Slider from '@jeremyhamm/vue-slider';
import Vue from 'vue';
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core'
import vuetify from './plugins/vuetify';

library.add(fab);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(Slider);
Vue.config.productionTip = false;

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app');
