import { createApp } from 'vue'
import App from './App.vue'
import { Tabs, Tab } from '../src'

createApp(App)
    .component('tabs', Tabs)
    .component('Tab', Tab)
    .mount('#app')