import Tab from './components/Tab.vue';
import Tabs from './components/Tabs.vue';

export default {
    install(Vue) {
        Vue.component('tab', Tab);
        Vue.component('tabs', Tabs);
    },
};

export { Tab, Tabs };