import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';
import {
  faMars,
  faVenus,
  faTransgender,
  faStar,
  faHeart,
  faTimes,
  faCheck,
  faBan,
  faLocationArrow,
  faCog,
  faSortAmountDownAlt,
  faSortAmountDown,
  faPaperPlane,
  faUserSlash,
  faHeartBroken,
  faEye,
  faEnvelope,
  faCommentAlt,
  faPlus,
  faSignOutAlt,
  faBell,
  faCogs,
  faUser,
  faSearch,
  faHistory,
  faCircle,
  faCaretDown,
  faCaretLeft,
} from '@fortawesome/free-solid-svg-icons';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(faMars);
library.add(faVenus);
library.add(faTransgender);
library.add(faStar);
library.add(faHeart);
library.add(faTimes);
library.add(faCheck);
library.add(faBan);
library.add(faLocationArrow);
library.add(faCog);
library.add(faSortAmountDownAlt);
library.add(faSortAmountDown);
library.add(faPaperPlane);
library.add(faUserSlash);
library.add(faHeartBroken);
library.add(faEye);
library.add(faEnvelope);
library.add(faCommentAlt);
library.add(faPlus);
library.add(faSignOutAlt);
library.add(faBell);
library.add(faCogs);
library.add(faUser);
library.add(faSearch);
library.add(faHistory);
library.add(faCircle);
library.add(faCaretDown);
library.add(faCaretLeft);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('font-awesome-layers-text', FontAwesomeLayersText);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
